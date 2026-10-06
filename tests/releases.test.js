const test = require('node:test');
const assert = require('node:assert/strict');
const snapshot = require('../assets/releases/tauri-stable.json');
const { resolveRelease, selectLatest, loadLatest, CACHE_KEY } = require('../js/releases');

function release(version, options = {}) {
  return {
    ...snapshot,
    tag_name: `tauri-v${version}`,
    assets: snapshot.assets.map((asset) => ({
      ...asset,
      name: asset.name.replaceAll('1.0.2', version),
      browser_download_url: asset.browser_download_url.replaceAll('1.0.2', version),
    })),
    ...options,
  };
}

function memoryStorage(data) {
  const values = new Map(data ? [[CACHE_KEY, JSON.stringify(data)]] : []);
  return { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
}

function requestWith(releases, { fail = false } = {}) {
  return async (url) => {
    if (url === 'assets/releases/tauri-stable.json') return { ok: true, json: async () => snapshot };
    assert.match(url, /\/releases\?per_page=100&page=\d+$/);
    return { ok: !fail, json: async () => releases };
  };
}

test('uses Tauri installers instead of the higher-numbered PyQt latest release and updater archives', () => {
  const pyqt = { ...snapshot, tag_name: 'v1.60.2' };
  const selected = selectLatest([pyqt, { ...snapshot, tag_name: 'tauri-stable', prerelease: true }, snapshot]);
  assert.equal(selected.version, '1.0.2');
  assert.match(selected.urls.macos, /darwin-aarch64\.dmg$/);
  assert.match(selected.urls.windows, /DataPyn-Tauri-1\.0\.2-windows-x86_64-setup\.exe$/);
  assert.match(selected.urls.checksums, /SHA256SUMS\.txt$/);
});

test('selects numerical versions regardless of order, excluding previews and drafts', () => {
  const selected = selectLatest([
    release('1.0.9'), release('1.1.0', { draft: true }),
    release('2.0.0', { prerelease: true }), release('1.0.10'), release('1.0.2'),
  ]);
  assert.equal(selected.version, '1.0.10');
});

test('rejects missing platform installers, mixed-version assets, and external download URLs', () => {
  const assets = snapshot.assets.filter((asset) => !asset.name.endsWith('.dmg'));
  assert.equal(resolveRelease({ ...snapshot, assets }), null);
  assert.equal(resolveRelease(release('1.0.3', { assets: snapshot.assets })), null);
  const changed = structuredClone(snapshot);
  changed.assets.find((asset) => asset.name.endsWith('-setup.exe')).browser_download_url = 'https://example.com/install.exe';
  assert.equal(resolveRelease(changed), null);
  assert.equal(selectLatest({ tag_name: 'tauri-v1.0.2' }), null);
});

test('absent optional ZIP, tarball and checksums do not get invented URLs', () => {
  const assets = snapshot.assets.filter((asset) => !/\.zip$|linux-x86_64\.tar\.gz$|SHA256SUMS/.test(asset.name));
  const selected = resolveRelease({ ...snapshot, assets });
  assert.equal(selected.urls.windowsZip, null);
  assert.equal(selected.urls.linuxTarball, null);
  assert.equal(selected.urls.checksums, null);
});

test('GitHub failure falls back to the verified local Tauri release', async () => {
  const selected = await loadLatest({ request: requestWith([], { fail: true }) });
  assert.equal(selected.version, '1.0.2');
  assert.equal(selected.source, 'fallback');
});

test('an old or poisoned PyQt cache cannot override Tauri downloads', async () => {
  const storage = memoryStorage({ data: { ...snapshot, tag_name: 'v1.60.2' }, timestamp: 100 });
  const selected = await loadLatest({ request: requestWith([snapshot]), storage, now: 101 });
  assert.equal(selected.version, '1.0.2');
  assert.equal(JSON.parse(storage.getItem(CACHE_KEY)).data.tag_name, 'tauri-v1.0.2');
});

test('retains a newer verified Tauri cache on network failure', async () => {
  const storage = memoryStorage({ data: release('1.0.3'), timestamp: 1 });
  const selected = await loadLatest({ request: requestWith([], { fail: true }), storage, now: 400000 });
  assert.equal(selected.version, '1.0.3');
});

test('download lookup works with unavailable browser storage', async () => {
  const storage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  const selected = await loadLatest({ request: requestWith([snapshot]), storage });
  assert.equal(selected.version, '1.0.2');
});

test('a stale API response or older cache cannot downgrade the verified snapshot', async () => {
  const storage = memoryStorage({ data: release('1.0.1'), timestamp: 100 });
  const selected = await loadLatest({ request: requestWith([release('1.0.1')]), storage, now: 101 });
  assert.equal(selected.version, '1.0.2');
});

test('finds Tauri when the first API page contains only legacy releases', async () => {
  const pages = [];
  const request = async (url) => {
    if (url === 'assets/releases/tauri-stable.json') return { ok: true, json: async () => snapshot };
    pages.push(url);
    return { ok: true, json: async () => url.endsWith('page=1') ? Array.from({ length: 100 }, () => ({ ...snapshot, tag_name: 'v1.60.2' })) : [snapshot] };
  };
  const selected = await loadLatest({ request });
  assert.equal(selected.version, '1.0.2');
  assert.equal(pages.length, 2);
});

test('ignores malformed assets and versions in cache or release data', () => {
  assert.equal(resolveRelease({ ...snapshot, assets: [null, ...snapshot.assets] }).version, '1.0.2');
  assert.equal(resolveRelease(release('01.0.2')), null);
  assert.equal(resolveRelease(release('9999999999999999999.0.2')), null);
});

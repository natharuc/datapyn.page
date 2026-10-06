(function () {
  'use strict';

  const REPOSITORY = 'https://github.com/natharuc/datapyn';
  const API_URL = 'https://api.github.com/repos/natharuc/datapyn/releases';
  const CACHE_KEY = 'datapyn-tauri-release-cache-v1';
  const CACHE_DURATION = 5 * 60 * 1000;
  const SNAPSHOT_URL = 'assets/releases/tauri-stable.json';
  const ASSET_SUFFIXES = {
    windows: 'windows-x86_64-setup.exe',
    windowsZip: 'windows-x86_64.zip',
    linuxDeb: 'linux-x86_64.deb',
    linuxAppImage: 'linux-x86_64.AppImage',
    linuxTarball: 'linux-x86_64.tar.gz',
    macos: 'darwin-aarch64.dmg',
  };

  function versionOf(release) {
    const match = /^tauri-v((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))$/.exec(release && release.tag_name);
    return match && match[1].split('.').every((part) => Number.isSafeInteger(Number(part))) ? match[1] : null;
  }

  function compareVersions(left, right) {
    const a = left.split('.').map(Number);
    const b = right.split('.').map(Number);
    for (let index = 0; index < 3; index++) {
      if (a[index] !== b[index]) return a[index] > b[index] ? 1 : -1;
    }
    return 0;
  }

  function assetUrl(asset, release) {
    if (!asset || typeof asset.name !== 'string') return null;
    const expected = `${REPOSITORY}/releases/download/${release.tag_name}/${asset.name}`;
    return asset.browser_download_url === expected ? expected : null;
  }

  function resolveRelease(release) {
    const version = versionOf(release);
    if (!version || release.draft !== false || release.prerelease !== false || !Array.isArray(release.assets)) return null;
    const urls = {};
    for (const [key, suffix] of Object.entries(ASSET_SUFFIXES)) {
      const name = `DataPyn-Tauri-${version}-${suffix}`;
      urls[key] = assetUrl(release.assets.find((asset) => asset && asset.name === name), release);
    }
    urls.checksums = assetUrl(release.assets.find((asset) => asset && asset.name === 'SHA256SUMS.txt'), release);
    // A published Tauri release includes an installer for all three platforms.
    if (!urls.windows || !urls.linuxDeb || !urls.linuxAppImage || !urls.macos) return null;
    return { version, urls, releaseUrl: `${REPOSITORY}/releases/tag/${release.tag_name}`, release };
  }

  function selectLatest(releases) {
    if (!Array.isArray(releases)) return null;
    return releases.reduce((latest, release) => {
      const candidate = resolveRelease(release);
      if (!candidate) return latest;
      return !latest || compareVersions(candidate.version, latest.version) > 0 ? candidate : latest;
    }, null);
  }

  async function fetchJson(request, url) {
    const response = await request(url, { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('Release lookup failed');
    return response.json();
  }

  async function loadLatest({ request = fetch, storage = null, now = Date.now() } = {}) {
    const snapshotPromise = fetchJson(request, SNAPSHOT_URL).then(resolveRelease).catch(() => null);
    let cached = null;
    let timestamp = 0;
    try {
      const saved = JSON.parse(storage && storage.getItem(CACHE_KEY));
      cached = saved && resolveRelease(saved.data);
      timestamp = saved && saved.timestamp;
    } catch (_) { /* Storage can be unavailable or contain an old/invalid entry. */ }
    if (cached && Number.isFinite(timestamp) && now >= timestamp && now - timestamp < CACHE_DURATION) {
      const snapshot = await snapshotPromise;
      if (!snapshot || compareVersions(cached.version, snapshot.version) >= 0) return { ...cached, source: 'cache' };
    }

    try {
      // GitHub's /releases/latest belongs to the historical PyQt6 channel.
      // Only complete stable releases with a dedicated Tauri tag are candidates.
      for (let page = 1; page <= 5; page++) {
        const releases = await fetchJson(request, `${API_URL}?per_page=100&page=${page}`);
        if (!Array.isArray(releases)) throw new Error('Invalid release list');
        const latest = selectLatest(releases);
        if (latest) {
          const snapshot = await snapshotPromise;
          const selected = [latest, cached, snapshot].filter(Boolean).reduce((best, candidate) => compareVersions(candidate.version, best.version) > 0 ? candidate : best);
          try { if (storage) storage.setItem(CACHE_KEY, JSON.stringify({ data: selected.release, timestamp: now })); } catch (_) { /* Optional cache. */ }
          return { ...selected, source: 'live' };
        }
        if (releases.length < 100) break;
      }
    } catch (_) { /* Retain verified Tauri downloads if GitHub is unreachable or rate limited. */ }

    const snapshot = await snapshotPromise;
    const fallback = cached && (!snapshot || compareVersions(cached.version, snapshot.version) > 0) ? cached : snapshot;
    return fallback ? { ...fallback, source: 'fallback' } : null;
  }

  const api = { resolveRelease, selectLatest, loadLatest, CACHE_KEY };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else window.DataPynReleases = api;
})();

/* ============================================================
   Gurukool - keep every device on the newest version.

   Pages and iPad Home Screen apps cache the page itself, so a device
   can keep showing an old version even after a new one is deployed.
   This checks the REAL version from the server (bypassing the cache),
   and if this page is behind it jumps once to a fresh copy.

   From this version onwards, a device that is one version behind will
   catch itself up on the next open.
   ============================================================ */
(function () {
  'use strict';
  function go() {
    try {
      var loaded = (window.GK_VERSION && window.GK_VERSION.v) || 0;
      /* find where version.js lives, relative to this page */
      var tag = document.querySelector('script[src*="version.js"]');
      var base = tag ? String(tag.getAttribute('src')).replace(/\?.*$/, '') : 'version.js';
      if (!window.fetch) return;
      fetch(base + '?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.text(); })
        .then(function (t) {
          var m = t.match(/v:\s*(\d+)/);
          if (!m) return;
          var server = parseInt(m[1], 10);
          if (!(server > loaded)) return;
          var key = 'gk_fresh_' + server;
          try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch (e) {}
          /* a different URL means the browser cannot answer from its cache */
          var u = location.href.replace(/[?&]gkfresh=\d+/, '');
          location.replace(u + (u.indexOf('?') < 0 ? '?' : '&') + 'gkfresh=' + Date.now());
        })
        .catch(function () {});
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

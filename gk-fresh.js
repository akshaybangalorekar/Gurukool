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
          /* If the browser insists on serving its cached copy, at least tell
             the family, with one tap that always works. */
          setTimeout(function () {
            try {
              if ((window.GK_VERSION && window.GK_VERSION.v) >= server) return;
              var bar = document.createElement('div');
              bar.setAttribute('style', 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#b45309;color:#fff;font:800 16px system-ui,sans-serif;padding:14px 16px;text-align:center;box-shadow:0 -4px 16px rgba(0,0,0,.25)');
              bar.innerHTML = 'A new version is ready. <button style="font:800 16px system-ui;margin-left:8px;padding:8px 16px;border:0;border-radius:10px;background:#fff;color:#b45309;cursor:pointer" onclick="location.replace(location.pathname+\'?fresh=\'+Date.now())">Tap to refresh</button>';
              document.body.appendChild(bar);
            } catch (e) {}
          }, 1500);
        })
        .catch(function () {});
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

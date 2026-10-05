/* ============================================================
   Gurukool - the left rail and the compact top bar
   One calm vertical index down the left, so nothing needs scrolling
   to get somewhere. Shared by every champ: a champ passes in its own
   items and its own "More" list.

   ChampRail.top({...})    - the small bar across the top (name, XP, streak)
   ChampRail.mount({...})  - the rail itself, plus the More sheet
   ============================================================ */
(function () {
  'use strict';
  var CSS = '<style id="gk-rail-css">' +
    '#gk-rail{position:fixed;left:0;top:0;bottom:0;width:88px;background:#fff;border-right:1px solid #e6ebf1;' +
    'display:flex;flex-direction:column;align-items:center;gap:3px;padding:calc(12px + env(safe-area-inset-top)) 6px 14px;z-index:900;overflow-y:auto}' +
    '#gk-rail .gk-rail__brand{font-size:21px;text-decoration:none;margin-bottom:8px;line-height:1}' +
    '.gk-rail__item{display:flex;flex-direction:column;align-items:center;gap:3px;width:100%;padding:9px 4px;border-radius:12px;' +
    'text-decoration:none;color:#64748b;font:700 11.5px/1.15 Nunito,system-ui,-apple-system,sans-serif;background:none;border:none;cursor:pointer;text-align:center}' +
    '.gk-rail__item .gk-rail__ico{font-size:19px;line-height:1}' +
    '.gk-rail__item.on{background:#e8f6f4;color:#0f766e;box-shadow:inset 3px 0 0 #2a9d8f}' +
    '.gk-rail__item:hover{background:#f1f5f9}' +
    'html.gk-rail-on body{padding-left:104px}' +
    '@media (max-width:820px){#gk-rail{width:68px}html.gk-rail-on body{padding-left:84px}.gk-rail__lab{display:none}}' +
    '#gk-rail-sheet{position:fixed;inset:0;background:rgba(15,23,42,.35);display:none;z-index:1200;align-items:center;justify-content:center;padding:20px}' +
    '#gk-rail-sheet.on{display:flex}' +
    '#gk-rail-sheet .gk-rail__box{background:#fff;border-radius:18px;padding:18px;max-width:420px;width:100%;box-shadow:0 24px 60px rgba(15,23,42,.28)}' +
    '#gk-rail-sheet h3{margin:2px 0 10px;font:800 20px/1.2 Nunito,system-ui,sans-serif;color:#0f172a}' +
    '#gk-rail-sheet a{display:flex;gap:12px;align-items:center;padding:12px;border-radius:12px;text-decoration:none;color:#1f2937;font:700 16px Nunito,system-ui,sans-serif}' +
    '#gk-rail-sheet a:hover{background:#f1f5f9}' +
    '#gk-rail-sheet a span:first-child{font-size:19px}' +
    '#gk-rail-sheet p{margin:0 0 8px;color:#64748b;font:600 14.5px/1.5 Nunito,system-ui,sans-serif}' +
    '.gk-rail__close{margin-top:12px;width:100%;padding:13px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;font:800 16px Nunito,system-ui,sans-serif;cursor:pointer;color:#334155}' +
    '#gk-head{position:sticky;top:0;z-index:800;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);border-bottom:1px solid #e6ebf1;' +
    'padding:calc(9px + env(safe-area-inset-top)) 16px 9px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-family:Nunito,system-ui,sans-serif}' +
    '#gk-head .gk-head__title{font-weight:800;font-size:17px;color:#0f172a}' +
    '#gk-head .gk-head__sp{flex:1 1 12px}' +
    '#gk-head .gk-chip{font-weight:700;font-size:14.5px;color:#475569;background:#f1f5f9;border-radius:999px;padding:5px 11px;white-space:nowrap}' +
    '#gk-head .gk-chip.name{background:#e8f6f4;color:#0f766e}' +
    '#gk-head button.gk-chip{cursor:pointer;border:none;font-family:inherit}' +
    '</style>';

  function inject() { if (!document.getElementById('gk-rail-css')) document.head.insertAdjacentHTML('beforeend', CSS); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  window.ChampRail = {
    /* the compact top bar: identity and progress only - no navigation */
    top: function (o) {
      inject();
      o = o || {};
      var host = document.getElementById(o.el || 'gk-head');
      if (!host) return;
      var info = (typeof o.info === 'function') ? (o.info() || {}) : {};
      host.innerHTML =
        '<span class="gk-head__title">' + (o.icon || '') + ' ' + esc(o.title || '') + '</span>' +
        '<span class="gk-head__sp"></span>' +
        (info.name ? '<span class="gk-chip name">' + esc(info.name) + '</span>' : '') +
        (info.level ? '<span class="gk-chip">' + esc(info.level) + '</span>' : '') +
        '<span class="gk-chip">⭐ ' + (info.xp || 0) + ' XP</span>' +
        '<span class="gk-chip">🔥 ' + (info.streak || 0) + ' days</span>' +
        (o.sync ? '<button class="gk-chip" id="gk-head-sync" title="Save to the cloud">☁️ Save</button>' : '') +
        (o.hub ? '<button class="gk-chip" id="gk-head-hub" title="Back to Gurukool">🏠 Home</button>' : '');
      if (o.sync) {
        var b = document.getElementById('gk-head-sync');
        if (b) b.onclick = function () { b.textContent = '☁️ Saving…'; try { o.sync(); } catch (e) {} setTimeout(function () { window.ChampRail.top(o); }, 1400); };
      }
      if (o.hub) {
        var h = document.getElementById('gk-head-hub');
        if (h) h.onclick = function () { location.href = o.hub; };
      }
    },

    /* the rail itself */
    mount: function (o) {
      inject();
      o = o || {};
      document.documentElement.classList.add('gk-rail-on');
      var items = o.items || [];
      var rail = document.createElement('nav');
      rail.id = 'gk-rail';
      rail.setAttribute('aria-label', o.title || 'Sections');
      rail.innerHTML = '<a class="gk-rail__brand" href="' + (o.brandHref || 'index.html') + '" title="' + esc(o.title || '') + '">' + (o.brandIcon || '') + '</a>' +
        items.map(function (it) {
          return '<a class="gk-rail__item' + (it.key === o.active ? ' on' : '') + '" href="' + it.href + '">' +
            '<span class="gk-rail__ico">' + it.icon + '</span><span class="gk-rail__lab">' + esc(it.label) + '</span></a>';
        }).join('') +
        ((o.more && o.more.length) ? '<button class="gk-rail__item" id="gk-rail-more"><span class="gk-rail__ico">⋯</span><span class="gk-rail__lab">More</span></button>' : '');
      document.body.appendChild(rail);

      if (o.more && o.more.length) {
        var sheet = document.createElement('div');
        sheet.id = 'gk-rail-sheet';
        sheet.innerHTML = '<div class="gk-rail__box"><h3>' + esc(o.moreTitle || 'More') + '</h3>' +
          (o.moreNote ? '<p>' + esc(o.moreNote) + '</p>' : '') +
          o.more.map(function (m) { return '<a href="' + m.href + '"><span>' + m.icon + '</span><span>' + esc(m.label) + '</span></a>'; }).join('') +
          '<button class="gk-rail__close">Close</button></div>';
        document.body.appendChild(sheet);
        document.getElementById('gk-rail-more').onclick = function () { sheet.classList.add('on'); };
        sheet.querySelector('.gk-rail__close').onclick = function () { sheet.classList.remove('on'); };
        sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.classList.remove('on'); });
      }
      return rail;
    }
  };
})();

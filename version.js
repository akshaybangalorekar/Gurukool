/* Gurukool version — bump on every push so parents can verify the site is current. */
window.GK_VERSION = { v: 10, date: '30 Sep 2026', time: '4:40 pm IST' };
(function () {
  function add() {
    if (document.getElementById('gk-version')) return;
    var st = document.createElement('style');
    st.textContent = '#gk-version{position:fixed;right:10px;bottom:8px;z-index:60;background:rgba(43,38,32,.80);'
      + 'color:#fffdf7;font:600 11px/1.5 system-ui,sans-serif;padding:3px 11px;border-radius:999px;'
      + 'pointer-events:none;opacity:.9;letter-spacing:.2px}';
    (document.head || document.documentElement).appendChild(st);
    var b = document.createElement('div');
    b.id = 'gk-version';
    b.title = 'Gurukool app version. If this matches the version you were told about, Atharv is up to date.';
    b.textContent = 'Gurukool v' + window.GK_VERSION.v + ' \u00b7 ' + window.GK_VERSION.date + ', ' + window.GK_VERSION.time;
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add);
  else add();
})();

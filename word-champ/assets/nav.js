/* ============================================================
   WORD-CHAMP - one navigation, four boxes, the same shape as maths.

     Today     - a prepared session: warm up, a rule, practice, a check
     Learn     - the rules, taught then practised
     Games     - rapid-fire, and the passage puzzles
     Challenge - the hardest kinds, including comprehension
     Build     - writing something real

   The rail mounts itself from the page's filename.
   ============================================================ */
(function () {
  function savedState() {
    try { return JSON.parse(localStorage.getItem('wc_state') || 'null') || {}; } catch (e) { return {}; }
  }
  function streakOf(s) {
    var x = s && s.streak;
    if (x == null) return 0;
    if (typeof x === 'number') return x;
    if (typeof x === 'object') return x.count || x.n || x.days || 0;
    return 0;
  }
  var GROUPS = [
    { key: 'today', icon: '\u2600\ufe0f', label: 'Today', href: 'session.html' },
    { key: 'learn', icon: '\ud83d\udcd8', label: 'Learn', href: 'learn.html' },
    { key: 'games', icon: '\ud83c\udfae', label: 'Games', href: 'play.html' },
    { key: 'challenge', icon: '\ud83c\udfc5', label: 'Challenge', href: 'challenge.html' },
    { key: 'build', icon: '\ud83d\ude80', label: 'Build', href: 'projects.html' }
  ];
  var MORE = [
    { icon: '\ud83d\udcd6', label: 'Parent guide', href: '../parent-guide.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  var BY_FILE = { 'index.html': 'learn', 'session.html': 'today', 'learn.html': 'learn',
    'play.html': 'games', 'challenge.html': 'challenge', 'projects.html': 'build' };

  window.WordNav = {
    groups: GROUPS, more: MORE,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Word-Champ', brandIcon: '\u270d\ufe0f', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    top: function () {
      if (!window.ChampRail) return;
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Word-Champ', icon: '\u270d\ufe0f', el: 'gk-head',
        hub: home, hubLabel: (here === 'index.html') ? 'Gurukool' : 'Word home',
        info: function () { var s = savedState(); return { name: String(s.name || '').trim(), xp: s.xp || 0, streak: streakOf(s) }; }
      });
    },
    ensureMount: function () {
      if (!document.getElementById('gk-rail')) {
        var r = document.createElement('div'); r.id = 'gk-rail';
        document.body.insertBefore(r, document.body.firstChild);
      }
      if (!document.getElementById('gk-head')) {
        var h = document.createElement('header'); h.id = 'gk-head'; h.className = 'topnav';
        document.body.insertBefore(h, document.getElementById('gk-rail').nextSibling);
      }
    },
    auto: function () {
      window.WordNav.ensureMount();
      var here = (location.pathname.split('/').pop() || 'index.html');
      window.WordNav.mount(BY_FILE[here] !== undefined ? BY_FILE[here] : '');
      window.WordNav.top();
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { window.WordNav.auto(); });
  else window.WordNav.auto();
})();

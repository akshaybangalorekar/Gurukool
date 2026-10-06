/* ============================================================
   MIND-CHAMP (logical reasoning) - one navigation, four boxes.

     Learn     - the thinking techniques, taught then practised:
                 the ten detective cases, plus the exam reasoning ladder
                 (analogies, odd one out, codes, number series, shape
                 patterns, rotations)
     Games     - the puzzles: the Minecraft quests and the Detective Files
     Challenge - the hardest inference cases
     Build     - real logic problems: the timetable clash, the seating plan

   ============================================================ */
(function () {
  /* a streak can be a number or an object, depending on the champ */
  function streakOf(s) {
    var x = s && s.streak;
    if (x == null) return 0;
    if (typeof x === 'number') return x;
    if (typeof x === 'object') return x.count || x.n || x.days || x.len || 0;
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
    { icon: '\ud83c\udfaf', label: 'The ten cases', href: 'index.html' },
    { icon: '\ud83d\udcd6', label: 'Parent guide', href: '../parent-guide.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  var BY_FILE = { 'index.html': 'games', 'session.html': 'today', 'learn.html': 'learn', 'reason.html': 'learn',
    'play.html': 'games', 'challenge.html': 'challenge', 'projects.html': 'build' };

  window.MindNav = {
    groups: GROUPS, more: MORE,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Mind-Champ', brandIcon: '\ud83e\udde0', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    top: function () {
      if (!window.ChampRail) return;
      var s = (window.S || (window.MC && MC.S && MC.S()) || {});
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Mind-Champ', icon: '\ud83e\udde0', el: 'gk-head',
        hub: home, hubLabel: (here === 'index.html') ? 'Gurukool' : 'Mind home',
        sync: (window.syncNow ? function () { try { syncNow(); } catch (e) {} } : null),
        info: function () { return { name: (s.name || '').trim(), xp: s.xp || 0, streak: streakOf(s) }; }
      });
    },

    /* make sure the rail has somewhere to live, on any page */
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
      window.MindNav.ensureMount();
      var here = (location.pathname.split('/').pop() || 'index.html');
      window.MindNav.mount(BY_FILE[here] !== undefined ? BY_FILE[here] : '');
      window.MindNav.top();
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { window.MindNav.auto(); });
  else window.MindNav.auto();
})();

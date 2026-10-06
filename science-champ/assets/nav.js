/* ============================================================
   SCIENCE-CHAMP - one navigation, four boxes, same shape as maths.

     Learn     - the worlds: a lesson to read, then a quiz to earn stars
     Games     - hands-on investigations you do yourself
     Challenge - the hardest worlds and the rapid-fire arena
     Build     - real projects: code it, wire it, research it

   The rail mounts itself from the page's filename, so every science
   page gets it without a line of wiring.
   ============================================================ */
(function () {
  var GROUPS = [
    { key: 'learn', icon: '\ud83d\udd2c', label: 'Learn', href: 'index.html' },
    { key: 'games', icon: '\ud83d\udd0d', label: 'Games', href: 'play.html' },
    { key: 'challenge', icon: '\ud83c\udfc5', label: 'Challenge', href: 'challenge.html' },
    { key: 'build', icon: '\ud83d\ude80', label: 'Build', href: 'projects.html' }
  ];
  var MORE = [
    { icon: '\ud83d\udcca', label: 'Progress dashboard', href: 'dashboard.html' },
    { icon: '\ud83d\udcda', label: 'Science reading list', href: 'index.html' },
    { icon: '\ud83d\udcd6', label: 'Parent guide', href: '../parent-guide.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  var BY_FILE = { 'index.html': 'learn', 'play.html': 'games', 'challenge.html': 'challenge',
    'projects.html': 'build', 'investigations.html': 'games', 'dashboard.html': '' };

  window.ScienceNav = {
    groups: GROUPS, more: MORE,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Science-Champ', brandIcon: '\ud83d\udd2c', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    top: function () {
      if (!window.ChampRail) return;
      var s = (window.state) || {};
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Science-Champ', icon: '\ud83d\udd2c', el: 'gk-head',
        hub: home, hubLabel: (here === 'index.html') ? 'Gurukool' : 'Science home',
        sync: (window.syncNow ? function () { try { syncNow(); } catch (e) {} } : null),
        progress: 'dashboard.html',
        info: function () {
          return { name: (s.name || '').trim(), xp: s.xp || 0, streak: s.streak || 0 };
        }
      });
    },
    /* mount from the filename, so a page needs one call */
    auto: function () {
      var here = (location.pathname.split('/').pop() || 'index.html');
      window.ScienceNav.mount(BY_FILE[here] !== undefined ? BY_FILE[here] : '');
      window.ScienceNav.top();
    }
  };
})();

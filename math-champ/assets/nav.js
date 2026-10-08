/* ============================================================
   MATH-CHAMP - one navigation, used everywhere
   Four boxes, grouped by what the child wants to DO:

     Learn    - learn a new trick: a lesson, then practice that rises
                in level as he gets better. Practice lives INSIDE Learn,
                so he never has to choose between the two.
     Games    - puzzles and timed games. No pressure.
     Challenge- the hard ones: Olympiad problems.
     Build    - real projects, earned by mastering the skills they need.

   Plus Today: one prepared session, for the days he arrives with no
   agenda. Progress lives in the top bar (tap the XP chip).
   ============================================================ */
(function () {
  var GROUPS = [
    { key: 'today', icon: '\u2600\ufe0f', label: 'Today', href: 'session.html' },
    { key: 'learn', icon: '\ud83d\udcd8', label: 'Learn', href: 'learn.html' },
    { key: 'homework', icon: '\ud83d\udcd3', label: 'Homework', href: 'homework.html' },
    { key: 'games', icon: '\ud83c\udfae', label: 'Games', href: 'play.html' },
    { key: 'challenge', icon: '\ud83c\udfc5', label: 'Challenge', href: 'challenge.html' },
    { key: 'build', icon: '\ud83d\ude80', label: 'Build', href: 'projects.html' }
  ];
  var MORE = [
    /* only things that do NOT already live inside one of the four boxes,
       so nothing is ever listed twice */
    { icon: '\ud83d\udcc8', label: 'Progress dashboard', href: 'dashboard.html' },
    { icon: '\ud83e\uddf0', label: 'Toolbox (formulas)', href: 'toolbox.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  /* the old page keys, mapped onto the four boxes */
  var MAP = { home: 'today', teach: 'learn', test: 'learn', word: 'learn', mission: 'learn',
              quests: 'games', speed: 'games', play: 'games',
              oly: 'challenge', challenge: 'challenge',
              build: 'build', projects: 'build',
              dash: '', toolbox: '', hub: '', session: 'today', homework: 'homework' };

  window.MathNav = {
    groups: GROUPS, more: MORE, map: MAP,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Math-Champ', brandIcon: '\u26a1', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    /* the top bar: on the maths home it points at the Gurukool hub;
       on every page inside the champ it points back at the maths home */
    top: function () {
      if (!window.ChampRail) return;
      var S = (window.OC && OC.STATE) || {};
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Math-Champ', icon: '\u26a1', el: 'topnav',
        hub: home,
        hubLabel: (here === 'index.html') ? 'Gurukool' : 'Maths home',
        sync: (window.OC && OC.forceSync),
        progress: 'dashboard.html',
        info: function () {
          return {
            name: (S.name || '').trim(),
            level: (window.OC && OC.levelOf) ? OC.levelOf(S.xp).name : '',
            xp: S.xp || 0,
            streak: (S.streak && S.streak.count) || 0
          };
        }
      });
    }
  };
})();

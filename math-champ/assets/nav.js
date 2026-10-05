/* ============================================================
   MATH-CHAMP - one navigation, used everywhere
   Grouped by what the child wants to DO, not by app feature:

     Today      - one prepared session, about an hour. No thinking needed.
     Learn      - understand a topic, taught step by step.
     Practise   - drill it: word problems, mission, then check yourself.
     Play       - the hands-on games: technique quests, riddle bazaar, speed lab.
     Challenge  - Olympiad problems and the hardest word problems.
     Progress   - how it is going.

   Everything else lives behind More. Nothing is deleted, just grouped.
   ============================================================ */
(function () {
  var GROUPS = [
    { key: 'today', icon: '🏠', label: 'Today', href: 'index.html' },
    { key: 'learn', icon: '📘', label: 'Learn', href: 'teach.html' },
    { key: 'practise', icon: '🔁', label: 'Practise', href: 'practice.html' },
    { key: 'play', icon: '🎮', label: 'Play', href: 'play.html' },
    { key: 'challenge', icon: '🏅', label: 'Challenge', href: 'challenge.html' },
    { key: 'progress', icon: '📈', label: 'Progress', href: 'dashboard.html' }
  ];
  var MORE = [
    { icon: '🎯', label: 'Test me today', href: 'test.html' },
    { icon: '🎯', label: 'Training Mission', href: 'mission.html' },
    { icon: '⛏️', label: 'Technique Quests', href: 'quests.html' },
    { icon: '📝', label: 'Word problems', href: 'word-problems.html' },
    { icon: '⚡', label: 'Speed Lab', href: 'speed-lab.html' },
    { icon: '🏅', label: 'Olympiad ladder', href: 'olympiad.html' },
    { icon: '🧰', label: 'Toolbox', href: 'toolbox.html' },
    { icon: '📈', label: 'Progress dashboard', href: 'dashboard.html' }
  ];
  /* the old page keys, mapped onto the new groups */
  var MAP = { home: 'today', quests: 'play', mission: 'practise', word: 'practise', oly: 'challenge', speed: 'play', toolbox: '', dash: 'progress', hub: '' };

  window.MathNav = {
    groups: GROUPS, more: MORE, map: MAP,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Math-Champ', brandIcon: '⚡', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    top: function () {
      if (!window.ChampRail) return;
      var S = (window.OC && OC.STATE) || {};
      ChampRail.top({
        title: 'Math-Champ', icon: '⚡', el: 'topnav',
        hub: '../index.html',
        sync: (window.OC && OC.forceSync),
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

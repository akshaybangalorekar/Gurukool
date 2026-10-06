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
  /* the champ's own saved profile, read straight from the device */
  function savedState() {
    try {
      var S = JSON.parse(localStorage.getItem('sq_v3') || 'null');
      if (!S) return {};
      var cc = (localStorage.getItem('cc_name') || '').trim();
      if (cc && S.profiles) { for (var id in S.profiles) { if ((S.profiles[id].name || '').toLowerCase() === cc.toLowerCase()) return S.profiles[id]; } }
      return (S.profiles && S.profiles[S.current || 'p1']) || {};
      return S;
    } catch (e) { return {}; }
  }

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
    { icon: '\ud83d\udcca', label: 'Progress dashboard', href: 'dashboard.html' },
    { icon: '\ud83d\udcda', label: 'Science reading list', href: 'index.html' },
    { icon: '\ud83d\udcd6', label: 'Parent guide', href: '../parent-guide.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  var BY_FILE = { 'index.html': 'today', 'session.html': 'today', 'play.html': 'games', 'challenge.html': 'challenge',
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
      var s = window.state || savedState();
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Science-Champ', icon: '\ud83d\udd2c', el: 'gk-head',
        hub: home, hubLabel: (here === 'index.html') ? 'Gurukool' : 'Science home',
        sync: (window.syncNow ? function () { try { syncNow(); } catch (e) {} } : null),
        progress: 'dashboard.html',
        info: function () {
          return { name: (s.name || '').trim(), xp: s.xp || 0, streak: streakOf(s) };
        }
      });
    },
    /* mount from the filename, so a page needs one call */

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
      window.ScienceNav.ensureMount();
      var here = (location.pathname.split('/').pop() || 'index.html');
      window.ScienceNav.mount(BY_FILE[here] !== undefined ? BY_FILE[here] : '');
      window.ScienceNav.top();
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { window.ScienceNav.auto(); });
  else window.ScienceNav.auto();
})();

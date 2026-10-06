/* ============================================================
   SAMSKRITAM-CHAMP - one navigation, four boxes, same shape as maths.

     Today     - a prepared abhyasa: warm up, learn, practise, check
     Learn     - the five conversations with the guru
     Games     - the word treasury and speaking practice
     Challenge - The Thirsty Crow, the story told in full sentences
     Build     - the family missions: two lines to say to each other

   The rail mounts itself from the page's filename, so every page gets
   it without a line of wiring. The top bar reads the child's real name,
   XP and streak straight from the saved progress, so it is right even on
   a page that does not load the whole app.
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
  /* the champ's own saved profile, read straight from the device */
  function savedState() {
    try {
      var S = JSON.parse(localStorage.getItem('sk_state') || 'null');
      if (!S) return {};
      var cc = (localStorage.getItem('cc_name') || '').trim();
      if (cc && S.name && S.name !== cc) {
        var all = JSON.parse(localStorage.getItem('sk_profiles') || 'null');
        if (all) {
          for (var k in all) { if ((all[k].name || '').toLowerCase() === cc.toLowerCase()) return all[k]; }
        }
      }
      return S;
    } catch (e) { return {}; }
  }

  var GROUPS = [
    { key: 'today', icon: '\u2600\ufe0f', label: 'Today', href: 'session.html' },
    { key: 'learn', icon: '\ud83d\udcd8', label: 'Learn', href: 'index.html' },
    { key: 'games', icon: '\ud83c\udfae', label: 'Games', href: 'index.html#treasury' },
    { key: 'challenge', icon: '\ud83c\udfc5', label: 'Challenge', href: 'index.html#s5' },
    { key: 'build', icon: '\ud83d\ude80', label: 'Build', href: 'index.html#mission' }
  ];
  var MORE = [
    { icon: '\ud83d\udcda', label: 'Word treasury', href: 'index.html#treasury' },
    { icon: '\ud83d\udcd6', label: 'Parent guide', href: '../parent-guide.html' },
    { icon: '\ud83c\udfeb', label: 'Gurukool hub', href: '../index.html' }
  ];
  var BY_FILE = { 'index.html': 'learn', 'session.html': 'today' };

  window.SanskritNav = {
    groups: GROUPS, more: MORE,
    mount: function (active) {
      if (!window.ChampRail) return false;
      ChampRail.mount({
        title: 'Samskritam-Champ', brandIcon: '\ud83e\ude94', brandHref: 'index.html', active: active,
        items: GROUPS, moreTitle: 'More', moreNote: 'Everything else, kept out of the way.', more: MORE
      });
      return true;
    },
    top: function () {
      if (!window.ChampRail) return;
      var here = (location.pathname.split('/').pop() || 'index.html');
      var home = (here === 'index.html') ? '../index.html' : 'index.html';
      ChampRail.top({
        title: 'Samskritam-Champ', icon: '\ud83e\ude94', el: 'gk-head',
        hub: home, hubLabel: (here === 'index.html') ? 'Gurukool' : 'Samskritam home',
        info: function () {
          var s = savedState();
          return { name: String(s.name || '').trim(), xp: s.xp || 0, streak: streakOf(s) };
        }
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
      window.SanskritNav.ensureMount();
      var here = (location.pathname.split('/').pop() || 'index.html');
      window.SanskritNav.mount(BY_FILE[here] !== undefined ? BY_FILE[here] : '');
      window.SanskritNav.top();
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { window.SanskritNav.auto(); });
  else window.SanskritNav.auto();
})();

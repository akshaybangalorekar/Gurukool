/* ============================================================
   HOMEWORK SHEETS
   Keeps the teacher's actual sheet - a photo or a PDF - attached to the
   assignment, so the child can open the real thing while he practises.

   Stored in IndexedDB, not localStorage, because a photo of a page is far
   too big for localStorage. Shared by the Parent Console (which puts the
   sheet in) and the Homework Club (which shows it).

   Nothing leaves the device. There is no server, so a sheet is never sent
   anywhere - and no browser can read a photo and invent questions from it,
   which is why the question kinds are chosen by hand.
   ============================================================ */
(function () {
  var DB = 'gurukool', STORE = 'hwsheets', VER = 1;
  var dbp = null;

  function open() {
    if (dbp) return dbp;
    var settle = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('This browser cannot store files.')); return; }
      var req = indexedDB.open(DB, VER);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('Could not open the file store.')); };
      req.onblocked = function () { reject(new Error('The file store is busy in another window.')); };
    });
    /* Some browsers never answer at all (storage switched off, private mode).
       The page must not wait forever for that - the questions come first. */
    dbp = Promise.race([settle, new Promise(function (_, reject) {
      setTimeout(function () { reject(new Error('The file store did not answer.')); }, 2500);
    })]);
    return dbp;
  }

  function tx(mode, fn) {
    return open().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var store = t.objectStore(STORE);
        var out = fn(store);
        t.oncomplete = function () { resolve(out && out.result !== undefined ? out.result : out); };
        t.onerror = function () { reject(t.error || new Error('File store failed.')); };
        t.onabort = function () { reject(t.error || new Error('File store aborted.')); };
      });
    });
  }

  function put(id, file) {
    return tx('readwrite', function (store) {
      return store.put({ id: id, name: file.name || 'sheet', type: file.type || '', blob: file, at: Date.now() });
    });
  }

  function get(id) {
    return tx('readonly', function (store) { return store.get(id); }).then(function (rec) {
      if (!rec || !rec.blob) return null;
      var url = null;
      try { url = URL.createObjectURL(rec.blob); } catch (e) { url = null; }
      return { name: rec.name, type: rec.type || '', url: url, at: rec.at };
    });
  }

  function has(id) {
    return tx('readonly', function (store) { return store.get(id); }).then(function (rec) {
      return !!(rec && rec.blob);
    });
  }

  function del(id) {
    return tx('readwrite', function (store) { return store.delete(id); });
  }

  function all() {
    return tx('readonly', function (store) { return store.getAll(); }).then(function (list) {
      var out = {};
      (list || []).forEach(function (r) { out[r.id] = { name: r.name, type: r.type, at: r.at }; });
      return out;
    });
  }

  /* ---------- sending a sheet to GitHub ----------
     The target is fixed: the "sources" branch of the Gurukool repository, which
     is where the question banks are built from and the one place Gurukool can
     read without being handed anything. It uses the same token the cloud sync
     already has, so the only setup is giving that token this repository. */
  var UP = { owner: 'akshaybangalorekar', repo: 'Gurukool', branch: 'sources', dir: 'sources/sheets' };

  function b64(bytes) {
    var out = '', chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(out);
  }
  function bytesOf(file) {
    if (file.arrayBuffer) return file.arrayBuffer().then(function (b) { return new Uint8Array(b); });
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(new Uint8Array(fr.result)); };
      fr.onerror = function () { reject(new Error('Could not read the file.')); };
      fr.readAsArrayBuffer(file);
    });
  }
  function safeName(name) {
    return String(name || 'sheet').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-80);
  }
  function uploadTarget() {
    var cfg = null;
    try { cfg = JSON.parse(localStorage.getItem('sq_gh')); } catch (e) {}
    if (!cfg || !cfg.token) throw new Error('Save your GitHub details in the Parent Console first \u2014 the sheet upload uses the same token.');
    var url = 'https://api.github.com/repos/' + UP.owner + '/' + UP.repo + '/contents/' +
      UP.dir.split('/').map(encodeURIComponent).join('/') + '/';
    return { url: url, token: cfg.token };
  }
  function uploadSheet(file, name) {
    return Promise.resolve().then(function () {
      var t = uploadTarget();
      var path = safeName(name || file.name);
      var url = t.url + encodeURIComponent(path);
      var H = { 'Authorization': 'Bearer ' + t.token, 'Accept': 'application/vnd.github+json' };
      return fetch(url + '?ref=' + UP.branch, { headers: H }).then(function (r) {
        return r.status === 200 ? r.json() : null;
      }).then(function (j) {
        return bytesOf(file).then(function (bytes) {
          var body = { message: 'homework sheet: ' + path, content: b64(bytes), branch: UP.branch };
          if (j && j.sha) body.sha = j.sha;          /* replace it if it is already there */
          return fetch(url, { method: 'PUT', headers: H, body: JSON.stringify(body) });
        });
      }).then(function (r) {
        if (r.ok) return { ok: true, path: UP.dir + '/' + path };
        if (r.status === 404 || r.status === 403) {
          throw new Error('The token cannot write to ' + UP.owner + '/' + UP.repo + '. Add that repo to the token, with Contents: Read and write.');
        }
        if (r.status === 401) throw new Error('The token was refused (401). It may have expired.');
        throw new Error('GitHub said ' + r.status + ' when uploading the sheet.');
      });
    });
  }

  window.HWSheets = {
    uploadSheet: uploadSheet,
    put: put, get: get, has: has, del: del, all: all,
    available: function () { return !!window.indexedDB; },
    /* a photo can be shown in an <img>; a PDF is handed to the browser */
    isImage: function (t) { return /^image\//.test(String(t || '')); },
    isPdf: function (t) { return /pdf/i.test(String(t || '')); }
  };
})();

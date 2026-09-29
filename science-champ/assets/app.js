const KEY='sq_v3';
const OLD_KEYS=['sq_v2','sq_v1'];
function freshProfile(){return{name:'Champion',av:'🦁',xp:0,lessons:{},quiz:{},practice:{},badges:[],streak:0,lastDay:'',visited:[],doubts:[],recent:[],missionN:0,levels:{}};}
function fresh(){return{v:3,pin:'',mute:false,timed:true,current:'p1',profiles:{p1:freshProfile()}};}
function loadState(){var o=null;var keys=[KEY].concat(OLD_KEYS);for(var i=0;i<keys.length&&!o;i++){try{var s=localStorage.getItem(keys[i]);if(s)o=JSON.parse(s);}catch(e){}}
if(o&&o.profiles&&o.profiles[o.current||'p1']){var st2=fresh();for(var k2 in st2){if(o[k2]!==undefined)st2[k2]=o[k2];}for(var pid in st2.profiles){var pp=st2.profiles[pid];pp.doubts=Array.isArray(pp.doubts)?pp.doubts:[];pp.badges=pp.badges||[];pp.visited=pp.visited||[];pp.lessons=pp.lessons||{};pp.quiz=pp.quiz||{};pp.practice=pp.practice||{};pp.levels=pp.levels||{};for(var qid in pp.quiz){var qq=pp.quiz[qid];if(qq&&qq.t&&qq.s>=qq.t){var ll=pp.levels[qid]=pp.levels[qid]||{c:1,b1:0,b2:0,arena:0};ll.c=Math.max(ll.c,2);ll.b1=Math.max(ll.b1||0,qq.t);}}}return st2;}
if(o&&typeof o.xp==='number'){var S0=fresh();var p0=freshProfile();for(var k3 in p0){if(o[k3]!==undefined)p0[k3]=o[k3];}p0.doubts=Array.isArray(o.doubts)?o.doubts:[];p0.badges=o.badges||[];p0.visited=o.visited||[];S0.pin=o.pin||'';S0.mute=!!o.mute;S0.timed=o.timed!==false;S0.profiles={p1:p0};return S0;}
return fresh();}
let S=loadState();
if(!S.profiles[S.current]){S.current=Object.keys(S.profiles)[0];}
S.profiles[S.current]=S.profiles[S.current]||freshProfile();
let state=S.profiles[S.current];
/* one shared champion name — set once on the Gurukool home page (cc_name) */
try{var ccName=(localStorage.getItem('cc_name')||'').trim();if(ccName&&state&&state.name==='Champion'){state.name=ccName;save();}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}

const LEVELS=[[0,'Rookie'],[120,'Explorer'],[300,'Challenger'],[550,'Bronze Olympian'],[900,'Silver Olympian'],[1350,'Gold Olympian'],[2000,'Gurukool Champion']];
function levelInfo(){let i=0;for(let j=0;j<LEVELS.length;j++){if(state.xp>=LEVELS[j][0])i=j;}const cur=LEVELS[i],nx=LEVELS[i+1]||null;const pct=nx?Math.min(100,Math.round((state.xp-cur[0])/(nx[0]-cur[0])*100)):100;return{i,cur,nx,pct};}
const W=id=>WORLDS.find(x=>x.id===id);
function stars(wid){const q=state.quiz[wid];if(!q||!q.t)return 0;const p=q.s/q.t;return p>=1?3:(p>=0.7?2:(p>=0.5?1:0));}
function starStr(n){n=Math.max(0,Math.min(3,n));return '<span class="gold">'+'★'.repeat(n)+'☆'.repeat(3-n)+'</span>';}
function lessonsDone(wid){return W(wid).lessons.filter((l,i)=>state.lessons[wid+':'+i]).length;}
function pracDone(wid){const w=W(wid);return (w.practice||[]).filter((p,i)=>state.practice[wid+':'+i]).length;}
function wprog(w){if(w.id==='trivia'){const s=stars('trivia');return{pct:Math.round(s/3*100),txt:s+'/3 stars'};}const units=w.lessons.length+3+(w.practice||[]).length;const done=lessonsDone(w.id)+stars(w.id)+pracDone(w.id);return{pct:Math.round(done/units*100),txt:done+'/'+units+' done'};}

function toast(msg){const d=document.getElementById('toasts');if(!d)return;const t=document.createElement('div');t.className='toast';t.textContent=msg;d.appendChild(t);setTimeout(()=>{t.remove();},2900);}
function confetti(){const cv=document.getElementById('confetti'),ctx=cv.getContext('2d');cv.width=window.innerWidth;cv.height=window.innerHeight;const cols=['#ffd54f','#7cf03d','#4fc3f7','#ff8a80','#e1bee7'];const ps=[];for(let i=0;i<80;i++){ps.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*0.6,r:4+Math.random()*6,c:cols[i%cols.length],vy:2+Math.random()*3,vx:-1.5+Math.random()*3,rot:Math.random()*6.3});}let f=0;(function tick(){f++;ctx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=0.1;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6);ctx.restore();});if(f<160)requestAnimationFrame(tick);else ctx.clearRect(0,0,cv.width,cv.height);})();}
function todayStr(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function touchStreak(){const t=todayStr(new Date());if(state.lastDay===t)return;const y=todayStr(new Date(Date.now()-864e5));state.streak=(state.lastDay===y)?state.streak+1:1;state.lastDay=t;}
function award(n){const before=levelInfo().i;state.xp+=n;touchStreak();const after=levelInfo().i;checkBadges();save();if(after>before){toast('🎉 LEVEL UP! You are now a '+LEVELS[after][1]+'!');if(!suppressLevelSfx)SFX.level();}else{toast('+'+n+' XP');}}

const BADGES=[
{id:'first',icon:'🌱',name:'First Steps',desc:'Complete your first lesson',cond:()=>Object.keys(state.lessons).length>=1},
{id:'bullseye',icon:'🎯',name:'Bullseye',desc:'Get 3 stars in any quiz',cond:()=>WORLDS.some(w=>stars(w.id)===3)},
{id:'streak3',icon:'🔥',name:'Streak Spark',desc:'Learn 3 days in a row',cond:()=>state.streak>=3},
{id:'explorer',icon:'🧭',name:'World Explorer',desc:'Visit 8 different worlds',cond:()=>state.visited.length>=8},
{id:'olymp',icon:'🏅',name:'Olympiad Contender',desc:'3 stars in Physics, Electricity AND Logic',cond:()=>stars('physics')===3&&stars('elec')===3&&stars('logic')===3},
{id:'anatomy',icon:'🫀',name:'Body Expert',desc:'Finish all Human Body lessons',cond:()=>W('body')&&lessonsDone('body')===W('body').lessons.length&&W('body').lessons.length>0},
{id:'stargazer',icon:'🔭',name:'Skywatcher',desc:'Finish all Skywatcher lessons',cond:()=>W('sky')&&lessonsDone('sky')===W('sky').lessons.length&&W('sky').lessons.length>0},
{id:'dronepilot',icon:'🛸',name:'Drone Pilot',desc:'Finish all Robots & Drones lessons',cond:()=>lessonsDone('robotics')===W('robotics').lessons.length&&W('robotics').lessons.length>0},
{id:'quantum',icon:'⚛️',name:'Quantum Curious',desc:'Finish all Quantum Realm lessons',cond:()=>lessonsDone('quantum')===W('quantum').lessons.length&&W('quantum').lessons.length>0},
{id:'vedic',icon:'🕉️',name:'Vedic Scholar',desc:'Finish all Vedic Science lessons',cond:()=>lessonsDone('vedic')===W('vedic').lessons.length&&W('vedic').lessons.length>0},
{id:'perfect3',icon:'💯',name:'Perfect Ten',desc:'Score 100% in 3 different quizzes',cond:()=>Object.values(state.quiz).filter(q=>q&&q.t>0&&q.s===q.t).length>=3},
{id:'grand',icon:'🏆',name:'Gurukool Champion',desc:'2+ stars in every world',cond:()=>WORLDS.filter(w=>w.id!=='trivia').every(w=>stars(w.id)>=2)}
];
function checkBadges(){BADGES.forEach(b=>{if(state.badges.indexOf(b.id)<0&&b.cond()){state.badges.push(b.id);SFX.badge();toast(b.icon+' Badge earned: '+b.name+'!');}});}

let view={page:'home',wid:null,tab:'learn',openLesson:null,qz:null,pracVals:{},pracSteps:{}};
function go(page,wid){view={page:page,wid:wid||null,tab:'learn',openLesson:null,qz:null,pracVals:{},pracSteps:{}};stopTimer();hideSelUI();render();window.scrollTo(0,0);}
function openWorld(wid){if(state.visited.indexOf(wid)<0){state.visited.push(wid);checkBadges();save();}go('world',wid);}
function setTab(t){view.tab=t;view.qz=null;render();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t;}}

function homeHTML(){const L=levelInfo();const cards=WORLDS.map(w=>{const p=wprog(w);const s=w.id==='trivia'?'':' '+starStr(stars(w.id));return '<div class="wcard" style="--c:'+w.color+'" onclick="openWorld(\''+w.id+'\')"><div class="ic">'+w.icon+(p.pct>=100?' ✅':'')+'</div><div class="nm">'+w.name+'</div><div class="tg">'+w.tag+'</div><div class="bar"><i style="width:'+p.pct+'%"></i></div><div class="pct">'+p.pct+'% · '+p.txt+s+'</div></div>';}).join('');
return MISSIONBANNER()+'<div class="top"><div class="row"><div class="lvlbadge">Lv '+(L.i+1)+' · '+L.cur[1]+'</div><div class="xpbar"><div class="xpfill" style="width:'+L.pct+'%"></div></div></div><div class="row2"><button class="mini" onclick="showProfiles()">'+S.profiles[S.current].av+' '+esc(S.profiles[S.current].name)+'</button><span class="stat">⭐ '+state.xp+' XP</span><span class="stat">🔥 '+state.streak+'-day streak</span><button class="mini" onclick="showDoubts()">🫙 '+state.doubts.length+'</button><button class="mini" onclick="showBadges()">🏅 '+state.badges.length+'/'+BADGES.length+'</button><button class="mini" onclick="toggleMute()">'+(S.mute?'🔇':'🔊')+'</button><button class="mini" onclick="location.href=\'../parent-guide.html\'" title="Parent guide">📖</button><button class="mini" onclick="location.href=\'dashboard.html\'" title="Dashboard">📊 Dashboard</button></div>'+(L.nx?'<div class="stat">'+(L.nx[0]-state.xp)+' XP to reach '+L.nx[1]+' →</div>':'')+'</div><h1>🔬 Science-Champ</h1><p class="sub">Level up from Rookie to Gurukool Champion — '+WORLDS.length+' worlds of physics, chemistry, biology, earth and space, electricity, light, heat, robotics, drones, coding, quantum computing, genetics, Vedic science, great scientists, kitchen science and rapid-fire trivia!</p><p class="muted" style="margin:0 0 12px">💡 Tip: confused by a word? Press and hold on it (or select it with your mouse), then tap <b>✨ Explain simply</b>. You will also spot Sanskrit twin-words next to English terms — like <i>vega वेग</i> for speed, <i>śakti शक्ति</i> for energy and <i>vidyut विद्युत्</i> for electricity — so the language of ancient Indian science feels natural!</p><div class="grid">'+cards+'</div><div class=\"note\">📱 <b>Moving between devices?</b> Saving is automatic — progress lives in this browser and syncs to your family cloud locker every 10 minutes (set up once per device in the <b>Admin Console</b>, from the Gurukool home page). You can also move progress with the shared <b>Progress Passport</b> or the Admin Console — both from the Gurukool home page. Progress always merges, nothing is lost.</div><p class="muted" style="text-align:center">Made with ❤️ by Gurukool for a future scientist</p>';}

function worldHTML(){const w=W(view.wid);if(!w)return homeHTML();let h='<button class="btn sec" onclick="go(\'home\')">← All worlds</button><div class="whead" style="--c:'+w.color+'"><div class="ic">'+w.icon+'</div><h2>'+w.name+'</h2><p>'+w.tag+'</p></div><div class="art'+(w.id==='sky'?' night':'')+'">'+(WORLD_ART[w.id]||'')+'</div>';
if(w.id==='trivia'){const q=state.quiz.trivia;h+='<div class="note">⚡ Rapid-fire: 10 random questions from EVERY world plus bonus trivia. 7+ correct = ⭐⭐, a perfect 10 = ⭐⭐⭐.<br>Best so far: '+(q?q.s+' / '+q.t:'—')+' '+starStr(stars('trivia'))+'</div><button class="btn" onclick="startQuiz(\'trivia\')">▶ Play Trivia Arena</button>';return h;}
h+=chaosCard(w)+prereqNote(w)+'<div class="tabs">'+'<div class="tab'+(view.tab==='learn'?' on':'')+'" onclick="setTab(\'learn\')">📖 Learn</div><div class="tab'+(view.tab==='quiz'?' on':'')+'" onclick="setTab(\'quiz\')">🎯 Quiz</div><div class="tab'+(view.tab==='prac'?' on':'')+'" onclick="setTab(\'prac\')">💪 Challenge</div></div>';
if(view.tab==='learn'){w.lessons.forEach((l,i)=>{const done=!!state.lessons[w.id+':'+i];const open=view.openLesson===i;var dg=(DIAGRAMS[w.id]&&DIAGRAMS[w.id][i])||null;h+='<div class="lesson" onclick="toggleLesson('+i+')"><h3>'+(done?'✅ ':'')+(i+1)+'. '+esc(l.t)+'<span class="chev">'+(open?'▾':'▸')+'</span></h3>'+(open?(dg?'<div class="dgwrap" onclick="event.stopPropagation();showDiag(this)">'+dg+'</div>':'')+'<p>'+esc(l.b)+'</p>':'')+'</div>';});h+='<div class="note">Tap a card to open it — your first open marks it done and earns 10 XP. '+lessonsDone(w.id)+'/'+w.lessons.length+' lessons complete.</div>';}
else if(view.tab==='quiz'){const l=lvOf(w.id);const n1=pool1(w.id).length,n2=pool2(w.id).length;const nq=state.quiz[w.id];h+='<label class="ttgl"><input type="checkbox" '+(S.timed?'checked':'')+' onchange="S.timed=this.checked;save()"> ⏱ Timed mode for Levels 1–2 — 20 seconds per question (Arena is ALWAYS timed: 15 seconds, one miss ends the run)</label><div class="ladder">';
h+='<div class="lrow"><div><b>🥉 Level 1 — Foundation</b><span>'+n1+' scenario questions · score <b>100%</b> to unlock Level 2</span><span>Best: '+(l.b1||0)+' / '+n1+(nq?' · ⭐ '+starStr(w.id):'')+'</span></div><button class="btn sec" onclick="startQuiz(\''+w.id+'\',1)">▶ Play</button></div>';
h+='<div class="lrow'+(l.c>=2?'':' locked')+'"><div><b>🥈 Level 2 — Olympiad Challenge</b><span>'+(l.c>=2?(n2+' harder multi-step questions · score 100% to open the Arena'):'🔒 Locked — clear Level 1 with a perfect score')+'</span><span>Best: '+(l.c>=2?((l.b2||0)+' / '+n2):'—')+'</span></div>'+(l.c>=2?'<button class="btn sec" onclick="startQuiz(\''+w.id+'\',2)">▶ Play</button>':'<button class="btn sec" disabled>🔒</button>')+'</div>';
h+='<div class="lrow'+(l.c>=3?'':' locked')+'"><div><b>⚔️ Level 3 — Chaos Arena</b><span>'+(l.c>=3?'Endless timed streak · questions never repeat the same order · one miss ends the run':'🔒 Locked — clear Level 2 with a perfect score')+'</span><span>'+(l.c>=3?('Best streak: '+l.arena):'—')+'</span></div>'+(l.c>=3?'<button class="btn sec" onclick="startArena(\''+w.id+'\')">⚔️ Enter</button>':'<button class="btn sec" disabled>🔒</button>')+'</div>';
h+='</div>';}
else{w.practice.forEach((p,i)=>{const done=!!state.practice[w.id+':'+i];const v=view.pracVals[i]||'';const sh=!!view.pracSteps[i];h+='<div class="lesson"><h3>Challenge '+(i+1)+(done?' ✅':'')+'</h3><p>'+esc(p.q)+'</p><input type="text" id="pv'+i+'" value="'+esc(v)+'" placeholder="Type your answer…" onkeydown="if(event.key===\'Enter\')checkPractice('+i+')"><div class="starrow"><button class="btn" onclick="checkPractice('+i+')">Check</button><button class="btn sec" onclick="toggleSteps('+i+')">'+(sh?'Hide steps':'Show steps')+'</button></div>'+(sh?'<ol class="steps">'+p.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>':'')+'<div id="pf'+i+'"></div></div>';});h+='<div class="note">Try answering before you peek — the steps are always there if you need a nudge. 20 XP each!</div>';}
return h;}

function backToWorld(){go('world',view.qz.wid);}
function retryQuiz(){startQuiz(view.qz.wid,view.qz.lv||1);}
function playLevel2(){startQuiz(view.qz.wid,2);}
function retryArena(){startArena(view.qz.wid);}
function quizHTML(){const z=view.qz;if(!z)return'';const w=W(z.wid);
if(z.arenaDone){const l=lvOf(z.wid);return '<div class="backrow"><button class="btn sec" onclick="backToWorld()">← '+w.name+'</button></div><div class="card result"><div class="bigscore">⚔️ Streak '+z.score+'</div><p>'+(z.score>0?'🔥 Chaos is reeling from your streak!':'💪 The Arena is brutal — one more try?')+'</p><p class="muted">Best streak: '+l.arena+' · +5 XP per correct answer · one miss ends the run</p><button class="btn" onclick="retryArena()">🔁 Arena again</button></div>';}
if(z.done){const p=z.total?z.score/z.total:0;const st=p>=1?3:(p>=0.7?2:(p>=0.5?1:0));const msg=p>=1?'🏆 PERFECT! Absolute genius!':(p>=0.7?'🌟 Great job — nearly perfect!':(p>=0.5?'👍 Good effort! Revisit a lesson or two and beat your best.':'🌱 Every scientist starts somewhere. Read the lessons and come back!'));return '<div class="backrow"><button class="btn sec" onclick="backToWorld()">← '+w.name+'</button></div><div class="card result"><div class="bigscore">'+z.score+' / '+z.total+'</div><div class="stars">'+starStr(st)+'</div>'+(z.unlocked==='L2'?'<div class="unlockbox">🔓 LEVEL 2 UNLOCKED — Olympiad Challenge! Professor Chaos is furious.</div>':'')+(z.unlocked==='ARENA'?'<div class="unlockbox">⚔️ CHAOS ARENA UNLOCKED — endless timed streak mode, one miss ends it!</div>':'')+'<p>'+msg+'</p><p class="muted">'+(z.gained>0?'+'+(z.gained*10)+' XP earned this round!':'No new XP this round — beat your best of '+(state.quiz[z.wid]?state.quiz[z.wid].s:0)+' to earn more.')+'</p>'+(z.unlocked==='L2'?'<button class="btn" onclick="playLevel2()">🥈 Play Level 2 →</button> ':'')+(z.unlocked==='ARENA'?'<button class="btn" onclick="retryArena()">⚔️ Enter the Arena →</button> ':'')+'<button class="btn" onclick="retryQuiz()">🔁 Try again</button></div>';}
const q=z.qs[z.i];let h='<div class="backrow"><button class="btn sec" onclick="quitQuiz()">← Quit quiz</button></div><div class="card"><div class="qcount">'+(z.arena?('⚔️ ARENA RUN · Streak '+z.score+' · 15 seconds each!'):((z.lv===2?'🥈 Level 2 — Olympiad Challenge':'🥉 Level 1 — Foundation')+' · Question '+(z.i+1)+' / '+z.qs.length+' · Score '+z.score))+'</div>'+(((S.timed||z.arena)&&z.picked===-1)?'<div class="timerbar"><i id="tfill"></i></div>':'')+(q.s?'<div class="stim">'+esc(q.s)+'</div>':'')+'<h3 class="qq">'+esc(q.q)+'</h3>';
q.o.forEach((o,i)=>{let cls='opt',dis='';if(z.picked>=0){dis='disabled ';cls+=(i===q.a)?' correct':((i===z.picked)?' wrong':'');}h+='<button class="'+cls+'" '+dis+'onclick="pick('+i+')">'+String.fromCharCode(65+i)+'. '+esc(o)+'</button>';});
if(z.picked!==-1){h+='<div class="why">'+(z.picked===q.a?'✅ Correct!':(z.picked===-2?'⏰ Time is up! Answer: '+String.fromCharCode(65+q.a)+'.':'❌ Answer: '+String.fromCharCode(65+q.a)+'.'))+esc(q.w)+'</div>'+(z.taunt?'<div class="mtaunt">'+esc(z.taunt)+'</div>':'')+'<button class="btn" onclick="'+(z.arena?'arenaNext()':'nextQ()')+'">'+(z.arena?'Next → (streak rides on!)':(z.i+1>=z.qs.length?'See my result →':'Next question →'))+'</button>';}
return h+'</div>';}

function render(){const app=document.getElementById('app');if(!app)return;app.innerHTML=view.page==='home'?homeHTML():(view.page==='world'?worldHTML():(view.page==='mission'?missionHTML():(view.page==='journey'?journeyHTML():quizHTML())));}

function hasSel(){try{const s=window.getSelection();return s&&!s.isCollapsed&&String(s).trim().length>0;}catch(e){return false;}}
function toggleLesson(i){if(hasSel())return;const wid=view.wid;if(view.openLesson===i){view.openLesson=null;}else{view.openLesson=i;SFX.open();if(!state.lessons[wid+':'+i]){state.lessons[wid+':'+i]=1;award(10);}}render();}
function toggleSteps(i){if(hasSel())return;view.pracSteps[i]=!view.pracSteps[i];render();}
function checkPractice(i){const w=W(view.wid);if(!w)return;const p=w.practice[i];const el=document.getElementById('pv'+i);const raw=el?el.value:'';view.pracVals[i]=raw;const norm=s=>String(s).toLowerCase().replace(/[\s,₹°]/g,'').replace(/degrees?/g,'');const ok=[p.ans].concat(p.alts||[]).map(norm).indexOf(norm(raw))>=0;const f=document.getElementById('pf'+i);if(!f)return;
if(ok){SFX.correct();if(!state.practice[w.id+':'+i]){state.practice[w.id+':'+i]=1;award(20);confetti();}else{toast('Correct again — still proud of you!');}f.innerHTML='<div class="why good">✅ Correct — brilliant!</div>';}
else{f.innerHTML='<div class="why bad">❌ Not quite — try again, or peek at the steps!</div>';}
save();}

function startQuiz(wid,lv){let qs;const w=W(wid);if(wid==='trivia'){const pool=[];WORLDS.forEach(x=>{(x.quiz||[]).forEach(q=>pool.push(q));});TRIVIA_EXTRA.forEach(q=>pool.push(q));shuffle(pool);qs=pool.slice(0,10);}else{qs=(lv===2?(LV2[wid]||[]).slice():(ICAS[wid]||w.quiz).slice());shuffle(qs);}if(!qs||!qs.length)qs=w.quiz.slice();view.qz={wid:wid,lv:wid==='trivia'?0:(lv||1),qs:qs,i:0,score:0,picked:-1};view.page='quiz';actx();hideSelUI();render();startTimer();window.scrollTo(0,0);}
function pick(i){const z=view.qz;if(!z||z.done||z.picked!==-1)return;stopTimer();z.picked=i;if(i===z.qs[z.i].a){z.score++;SFX.correct();z.taunt='';}else{SFX.wrong();z.taunt=CHAOS.taunts[Math.floor(Math.random()*CHAOS.taunts.length)];}render();}
function nextQ(){const z=view.qz;if(!z)return;z.i++;z.picked=-1;if(z.i>=z.qs.length)finishQuiz();else{render();startTimer();window.scrollTo(0,0);}}
function finishQuiz(){const z=view.qz;const wid=z.wid;if(z.arena){arenaEnd();return;}const lv=z.lv||1;const l=lvOf(wid);const prev=state.quiz[wid]||{s:0,t:z.qs.length};const base=lv===1?prev.s:(l.b2||0);const gained=Math.max(0,z.score-base);stopTimer();touchStreak();if(lv===1){state.quiz[wid]={s:Math.max(prev.s,z.score),t:z.qs.length};l.b1=Math.max(l.b1||0,z.score);}else{l.b2=Math.max(l.b2||0,z.score);}var unlocked='';if(z.score>=z.qs.length){if(lv===1&&l.c<2){l.c=2;unlocked='L2';}else if(lv===2&&l.c<3){l.c=3;unlocked='ARENA';}}suppressLevelSfx=true;if(gained>0)award(gained*10);else save();if(unlocked)award(30);suppressLevelSfx=false;checkBadges();save();const p=z.score/z.qs.length;const stz=p>=1?3:(p>=0.7?2:(p>=0.5?1:0));if(stz===3){SFX.level();}else if(stz>=1){SFX.partial();}else{SFX.wrong();}view.qz={done:true,wid:wid,lv:lv,score:z.score,total:z.qs.length,gained:gained,unlocked:unlocked};view.page='quiz';render();confetti();window.scrollTo(0,0);}
function quitQuiz(){stopTimer();if(confirm('Leave the quiz? This round will not be saved.'))go('world',view.qz.wid);}


/* ---- Mission Mode: Professor Chaos ---- */
var MISSION=null;
function MISSIONBANNER(){var m=MISSION;
 if(!m)return '<div class="mbanner" onclick="startSession()">🌀 Mission Mode — Professor Chaos strikes!<small>Start today’s 1-hour detective session — recap, story, lessons & boss battle</small></div>'+'<div class="jlink" onclick="goJourney()">🗺️ Journey Map — every level, every lock, what’s next →</div>';
 var min=Math.floor((Date.now()-m.t0)/60000);
 return '<div class="mbanner" onclick="view.page=\'mission\';render();window.scrollTo(0,0);">🌀 Mission in progress · '+W(m.wid).name+' · ⏱ '+min+'/60 min<small>Tap to rejoin the case!</small></div>';}
function chaosCard(w){var t=CHAOS.tales[w.id];if(!t)return '';return '<div class="chaosbox">🌀 <b>THE CASE:</b> '+esc(t.h)+'<br><button class="btn sec" style="margin-top:8px" onclick="startMissionAt(\''+w.id+'\')">🕵️ Take this case</button></div>';}
function recentWorlds(){var ks=Object.keys(state.lessons),out=[];ks.slice(-8).forEach(function(k){var p=k.split(':')[0];if(p!=='trivia'&&out.indexOf(p)<0)out.push(p);});return out;}
function icasFor(wid){var p=(ICAS[wid]||((W(wid)||{}).quiz)||[]).slice();shuffle(p);return p;}
function nextMissionWorld(){var best=null;WORLDS.forEach(function(w){if(w.id==='trivia')return;var d=lessonsDone(w.id);if(w.lessons.length-d>0&&(!best||d<best.d))best={id:w.id,d:d};});if(!best){WORLDS.forEach(function(w){if(w.id==='trivia')return;var q=state.quiz[w.id];if((!q||q.s<q.t)&&!best)best={id:w.id,d:99};});}return best?best.id:'physics';}
function startSession(){startMissionAt(nextMissionWorld());}
function startMissionAt(wid){stopTimer();var w=W(wid);if(!w)return;
 var undone=w.lessons.map(function(_,i){return i;}).filter(function(i){return !state.lessons[wid+':'+i];});
 if(!undone.length)undone=[Math.floor(Math.random()*w.lessons.length)];
 var rp=[];recentWorlds().forEach(function(rw){if(rw!==wid)icasFor(rw).forEach(function(q){rp.push(q);});});shuffle(rp);
 MISSION={wid:wid,lx:undone.slice(1),ti:undone[0],phase:'story',qz:null,round:0,right:0,wrong:0,t0:Date.now(),rp:rp.slice(0,3),rpIdx:0};
 if(MISSION.rp.length){MISSION.phase='recap';MISSION.qz={qs:MISSION.rp,i:0,picked:-1,kind:'recap',r:0};}
 view.page='mission';view.wid=wid;actx();hideSelUI();render();window.scrollTo(0,0);}
function mGo(ph){MISSION.phase=ph;MISSION.qz=null;
 if(ph==='quiz'||ph==='boss'||ph==='requiz'){var qs=icasFor(MISSION.wid);var n=(ph==='boss')?4:3;MISSION.qz={qs:qs.slice(0,Math.min(n,qs.length)),i:0,picked:-1,kind:ph,r:0};if(!MISSION.qz.qs.length){mDone();return;}}
 render();window.scrollTo(0,0);}
function mStory(){mGo('teach');}
function mLearn(){var m=MISSION;if(!state.lessons[m.wid+':'+m.ti]){state.lessons[m.wid+':'+m.ti]=1;award(10);}save();mGo('quiz');}
function mPick(i){var m=MISSION,z=m.qz;if(!z||z.picked!==-1)return;z.picked=i;if(i===z.qs[z.i].a){z.r++;m.right++;award(5);}else{m.wrong++;}render();}
function mNext(){var m=MISSION,z=m.qz;if(!z)return;z.i++;z.picked=-1;
 if(z.i>=z.qs.length){
  if(z.kind==='recap'){m.qz=null;m.phase='story';render();window.scrollTo(0,0);return;}
  if(z.kind==='quiz'){
   var acc=z.qs.length?z.r/z.qs.length:1;
   if(acc<0.5){m.round++;mGo('reteach');return;}
   if(m.lx.length>0){m.ti=m.lx.shift();mGo('teach');return;}
   mGo('boss');return;}
  if(z.kind==='requiz'){mGo('boss');return;}
  mDone();return;}
 render();window.scrollTo(0,0);}
function mDone(){var m=MISSION;stopTimer();state.missionN=(state.missionN||0)+1;award(30);checkBadges();save();SFX.level();confetti();m.phase='done';m.qz=null;render();window.scrollTo(0,0);}
function mQHTML(kind){var m=MISSION,z=m.qz,q=z.qs[z.i];
 var head=kind==='recap'?'🌙 Warm-up — yesterday’s case notes':(kind==='boss'?'🔥 BOSS BATTLE — restore the concept!':'🎯 Case questions — show Chaos who’s boss!');
 var h='<div class="card"><div class="qcount">'+head+'</div>'+(q.s?'<div class="stim">'+esc(q.s)+'</div>':'')+'<h3 class="qq">'+esc(q.q)+'</h3>';
 q.o.forEach(function(o,i){var cls='opt',dis='';if(z.picked>=0){dis='disabled ';cls+=(i===q.a)?' correct':((i===z.picked)?' wrong':'');}h+='<button class="'+cls+'" '+dis+'onclick="mPick('+i+')">'+String.fromCharCode(65+i)+'. '+esc(o)+'</button>';});
 if(z.picked!==-1){h+='<div class="why">'+(z.picked===q.a?'✅ Correct!':'❌ Not quite.')+' '+esc(q.w)+'</div>'+(z.picked!==q.a&&kind!=='recap'?'<div class="mtaunt">🌀 '+esc(CHAOS.taunts[(m.right+m.wrong)%CHAOS.taunts.length])+'</div>':'')+'<button class="btn" onclick="mNext()">'+(z.i+1>=z.qs.length?'Continue →':'Next →')+'</button>';}
 return h+'</div>';}
function missionHTML(){var m=MISSION;if(!m){go('home');return homeHTML();}
 var w=W(m.wid),t=CHAOS.tales[m.wid]||{},min=Math.floor((Date.now()-m.t0)/60000);
 var h='<button class="btn sec" onclick="MISSION=null;go(\'home\')">← Base</button>';
 h+='<div class="whead" style="--c:'+w.color+'"><div class="ic">🌀</div><h2>Case: '+w.name+'</h2><p>⏱ '+min+' / 60 minutes of today’s session · Missions completed: '+(state.missionN||0)+'</p></div>';
 if(m.phase==='story'){h+='<div class="chaosbox"><b>🌀 PROFESSOR CHAOS STRIKES!</b><br><br>'+esc(t.h||'A stolen concept awaits restoration!')+'</div><button class="btn" onclick="mStory()">🕵️ Open the case file</button>';}
 else if(m.phase==='recap'){h+=mQHTML('recap');}
 else if(m.phase==='teach'){var l=w.lessons[m.ti],dg=(DIAGRAMS[m.wid]&&DIAGRAMS[m.wid][m.ti])||null;
  h+='<div class="card"><div class="qcount">📘 Learn the concept — then prove it to Chaos!</div><h3>'+esc(l.t)+'</h3>'+(dg?'<div class="dgwrap" onclick="event.stopPropagation();showDiag(this)">'+dg+'</div>':'')+'<p>'+esc(l.b)+'</p><button class="btn" onclick="mLearn()">Got it — quiz me! 🎯</button></div>';}
 else if(m.phase==='reteach'){var l2=w.lessons[m.ti],dg2=(DIAGRAMS[m.wid]&&DIAGRAMS[m.wid][m.ti])||null;
  h+='<div class="card"><div class="mtaunt">'+esc(CHAOS.taunts[m.round%CHAOS.taunts.length])+'</div><div class="qcount">🔁 Re-learn the concept — take your time, detective</div><h3>'+esc(l2.t)+'</h3>'+(dg2?'<div class="dgwrap" onclick="event.stopPropagation();showDiag(this)">'+dg2+'</div>':'')+'<p>'+esc(l2.b)+'</p><button class="btn" onclick="mGo(\'requiz\')">🔁 Try fresh questions</button></div>';}
 else if(m.phase==='quiz'||m.phase==='boss'||m.phase==='requiz'){h+=mQHTML(m.phase);}
 else if(m.phase==='done'){h+='<div class="mwin"><h3>'+CHAOS.restore+'</h3><p>'+esc(t.c||'Another concept whispers for help…')+'</p><div class="bigscore">'+m.right+' solved · '+m.wrong+' missed</div><p class="muted">+30 XP mission bonus · Mission #'+(state.missionN||1)+' complete!</p></div><button class="btn" onclick="startSession()">🌀 Next mission</button> <button class="btn sec" onclick="MISSION=null;go(\'home\')">Return to base</button>';}
 return h;}



/* ---- Level ladder, Chaos Arena & Journey Map ---- */
function lvOf(wid){return state.levels[wid]||(state.levels[wid]={c:1,b1:0,b2:0,arena:0});}
function pool1(wid){var w=W(wid);return (wid==='trivia'?[]:(ICAS[wid]||((w||{}).quiz)||[])).slice();}
function pool2(wid){return (LV2[wid]||[]).slice();}
function levelClear(wid){var l=state.levels[wid];return !!(l&&l.c>=2);}
function recom(wid){return (PREREQ[wid]||[]).filter(function(p){return !levelClear(p);});}
function prereqNote(w){var r=recom(w.id);if(!r.length)return '';return '<div class="prereq">🧭 Suggested first: '+r.map(function(x){return (W(x)||{name:x}).name;}).join(' · ')+'</div>';}
function startArena(wid){stopTimer();var p=pool1(wid).concat(pool2(wid));shuffle(p);if(!p.length){toast('Arena opens once Level 1 is cleared!');return;}view.qz={wid:wid,arena:true,qs:p,i:0,score:0,picked:-1};view.page='quiz';actx();hideSelUI();render();startTimer();window.scrollTo(0,0);}
function arenaEnd(){var z=view.qz;if(!z||!z.arena)return;stopTimer();var l=lvOf(z.wid);if(z.score>(l.arena||0))l.arena=z.score;save();z.arenaDone=true;if(z.score>0&&(l.arena===z.score)){SFX.level();confetti();}render();window.scrollTo(0,0);}
function arenaNext(){var z=view.qz;if(!z||!z.arena||z.arenaDone)return;var q=z.qs[z.i];if(z.picked!==q.a){arenaEnd();return;}award(5);z.i++;z.picked=-1;if(z.i>=z.qs.length){shuffle(z.qs);z.i=0;}render();startTimer();window.scrollTo(0,0);}
function goJourney(){view.page='journey';render();window.scrollTo(0,0);}
function journeyHTML(){var cleared=0,l2done=0,arenas=0;WORLDS.forEach(function(w){if(w.id==='trivia')return;var l=lvOf(w.id);if(l.c>=2)cleared++;if(l.c>=3)l2done++;if(l.arena)arenas++;});
var rows=WORLDS.map(function(w){if(w.id==='trivia')return '';var l=lvOf(w.id);var rec=recom(w.id);
var mid='L1 '+(l.c>=2?'✅':'best '+l.b1)+' · L2 '+(l.c>=3?'✅':(l.c>=2?'unlocked 🔓':'🔒'))+' · Arena '+(l.c>=3?(l.arena?l.arena+' streak':'ready ⚔️'):'🔒');
return '<div class="jrow" onclick="openWorld(\''+w.id+'\')"><div class="jic">'+w.icon+'</div><div class="jmid"><b>'+w.name+'</b><span>'+mid+'</span>'+(rec.length?'<i>🧭 Do first: '+rec.map(function(x){return (W(x)||{name:x}).name;}).join(' · ')+'</i>':'')+'</div><div class="jval">'+(l.c>=3?'⚔️ '+(l.arena||0):(l.c>=2?'🥈':'🥉'))+'</div></div>';}).join('');
return '<button class="btn sec" onclick="go(\'home\')">← Base</button><div class="card"><h2>🗺️ Journey Map</h2><p class="muted">Level 1 cleared: '+cleared+' / 28 sections · Level 2 cleared: '+l2done+' · Arena streaks set: '+arenas+'<br>Score 100% on a level to unlock the next rung — the Arena never runs out of questions.</p></div>'+rows;}


/* ---- Parent PIN ---- */
function ccPinGet(){try{return localStorage.getItem('cc_pin')||'';}catch(e){return '';}}
function ccPinSet(p){try{localStorage.setItem('cc_pin',p);}catch(e){}}
function ensurePin(){var pin=ccPinGet();if(pin)return true;if(S.pin){ccPinSet(S.pin);S.pin='';save();toast('One parent PIN now protects both champs 🔒');return true;}var p=prompt('Set a PARENT PIN (4-6 digits). This ONE PIN protects BOTH champs - Maths and Science - on this device.');if(!p)return false;var c=prompt('Re-enter the PIN to confirm:');if(p===c&&/^\d{4,6}$/.test(p)){ccPinSet(p);toast('Parent PIN saved 🔒 - it works for Maths too!');return true;}toast('PINs did not match or were not 4-6 digits');return false;}
function askPin(){var pin=ccPinGet();if(!pin)return ensurePin();var p=prompt('Enter the parent PIN:');return p===pin;}
/* ---- Doubt Jar ---- */
function showDoubts(){var items=state.doubts.length?state.doubts.map(d=>'<div class="lesson"><p>'+esc(d.t)+'</p><div class="muted">'+esc(d.w)+' · '+esc(d.d)+'</div></div>').join(''):'<p class="muted">No doubts saved — brilliant! Doubts added here appear whenever something is confusing, so a parent or teacher can help.</p>';modal('<h3>🫙 My Doubt Jar ('+state.doubts.length+')</h3><p class="muted">Things that need a guru — a doubt is a saṃśaya संशय! Ask a parent or teacher, then clear them here (clearing needs the parent PIN).</p>'+items+'<div class="starrow"><button class="btn" onclick="closeModal()">Close</button><button class="btn sec" onclick="clearDoubts()">Clear all</button></div>');}
function clearDoubts(){if(state.doubts.length===0){closeModal();return;}if(!askPin()){toast('Wrong PIN 🔒');return;}state.doubts=[];save();closeModal();toast('Doubt Jar emptied 🫙✨');render();}
function addDoubt(){if(selCache.text.length<3){toast('Nothing selected');return;}state.doubts.push({t:selCache.text.slice(0,200),w:view.wid&&W(view.wid)?W(view.wid).name:'General',d:todayStr(new Date())});if(state.doubts.length>60)state.doubts.shift();save();hideSelUI();toast('Saved to your Doubt Jar 🫙 Ask your guru!');render();}

/* ---- Highlight-to-explain ---- */
let selCache={text:'',rect:null};
function norm2(s){return String(s).toLowerCase().replace(/[.,;:!?"'’()]/g,'').replace(/\s+/g,' ').trim();}
function matchGlossary(text){const t=norm2(text);if(!t)return null;if(GLOSSARY[t])return GLOSSARY[t];const keys=Object.keys(GLOSSARY).sort((a,b)=>b.length-a.length);for(let i=0;i<keys.length;i++){if(t.indexOf(keys[i])>=0)return GLOSSARY[keys[i]];}const s=t.replace(/s$/,'');if(GLOSSARY[s])return GLOSSARY[s];for(let i=0;i<keys.length;i++){if(s.indexOf(keys[i])>=0)return GLOSSARY[keys[i]];}return null;}
let selTimer=null;
function scheduleSel(){clearTimeout(selTimer);selTimer=setTimeout(handleSel,350);}
function handleSel(){hideSelBtn();var sel=window.getSelection?window.getSelection():null;if(!sel||sel.isCollapsed)return;var t=String(sel).trim();if(t.length<3||t.length>200)return;var anchor=sel.anchorNode;if(!anchor)return;var eln=anchor.nodeType===3?anchor.parentElement:anchor;if(!eln||!eln.closest||!eln.closest('#app'))return;var rect=null;try{rect=sel.getRangeAt(0).getBoundingClientRect();}catch(e){}selCache={text:t,rect:rect};showSelBtn();}
function showSelBtn(){var b=document.getElementById('selbtn');if(!b){b=document.createElement('button');b.id='selbtn';b.className='selbtn';b.textContent='✨ Explain simply';b.addEventListener('click',openExplain);document.body.appendChild(b);}var r=selCache.rect;var x=r?Math.max(10,Math.min(window.innerWidth-160,r.left+r.width/2-75)):window.innerWidth/2-75;var y=r?Math.max(10,r.bottom+8):window.innerHeight*0.35;b.style.left=x+'px';b.style.top=y+'px';b.style.display='block';}
function hideSelBtn(){var b=document.getElementById('selbtn');if(b)b.style.display='none';}
function hideSelUI(){hideSelBtn();var b=document.getElementById('xbubble');if(b)b.remove();}
function openExplain(){hideSelBtn();var term=matchGlossary(selCache.text);showBubble(term);}
function showBubble(term){var old=document.getElementById('xbubble');if(old)old.remove();var d=document.createElement('div');d.id='xbubble';d.className='bubble';var html='';if(term){html='<button class="bclose" onclick="this.parentElement.remove()">✕</button><div class="bterm">'+esc(norm2(selCache.text).length>40?selCache.text.slice(0,40)+'…':selCache.text)+'</div><div>'+esc(term.s)+'</div>'+(term.sk?'<div class="bsk">📜 संस्कृतम् · '+esc(term.sk)+'</div>':'')+(term.e?'<div class="bex">🧪 For example: '+esc(term.e)+'</div>':'')+'<button class="bdj" onclick="addDoubt()">🫙 Still not clear — add to Doubt Jar</button>';}
else{html='<button class="bclose" onclick="this.parentElement.remove()">✕</button><div class="bterm">Hmm!</div><div>I don\'t have a simpler version of that one in my dictionary yet. Ask your guru (a parent or teacher) — and save it so you remember to ask!</div><button class="bdj" onclick="addDoubt()">🫙 Add to Doubt Jar</button>';}
d.innerHTML=html;document.body.appendChild(d);var r=selCache.rect;var bw=Math.min(340,window.innerWidth-20);d.style.maxWidth=bw+'px';var bh=d.offsetHeight;var x=r?Math.max(10,Math.min(window.innerWidth-bw-10,r.left+r.width/2-bw/2)):(window.innerWidth-bw)/2;var y=r?(r.bottom+12+bh>window.innerHeight-10?Math.max(10,r.top-bh-12):r.bottom+12):(window.innerHeight-bh)/2;d.style.left=x+'px';d.style.top=y+'px';}


/* ---- Bansuri-style flute sounds (Web Audio, no files needed) ---- */
let AC=null;
function actx(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return null;}}if(AC&&AC.state==='suspended'){try{AC.resume();}catch(e){}}return AC;}
function note(f,t0,dur,vol){const c=AC;if(!c||S.mute)return;const o=c.createOscillator();o.type='sine';o.frequency.value=f;const o2=c.createOscillator();o2.type='sine';o2.frequency.value=f*2;const g=c.createGain();const g2=c.createGain();const lfo=c.createOscillator();lfo.frequency.value=5.5;const lg=c.createGain();lg.gain.value=f*0.008;lfo.connect(lg);lg.connect(o.frequency);lfo.start(t0);lfo.stop(t0+dur+0.25);g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+0.05);g.gain.setValueAtTime(vol,t0+Math.max(0.06,dur-0.06));g.gain.linearRampToValueAtTime(0.0001,t0+dur+0.14);g2.gain.setValueAtTime(0,t0);g2.gain.linearRampToValueAtTime(vol*0.2,t0+0.06);g2.gain.linearRampToValueAtTime(0.0001,t0+dur+0.14);o.connect(g);o2.connect(g2);g.connect(c.destination);g2.connect(c.destination);o.start(t0);o.stop(t0+dur+0.25);o2.start(t0);o2.stop(t0+dur+0.25);}
function phrase(list,step,hold,vol){const c=actx();if(!c||S.mute)return;const t=c.currentTime+0.02;for(let i=0;i<list.length;i++){note(list[i],t+i*step,hold,vol||0.28);}}
const N_SA=261.63,N_RE=293.66,N_GA=329.63,N_PA=392.0,N_DHA=440.0,N_SA2=523.25,N_E5=659.25,N_GA3=196.0,N_E3=164.81;
const SFX={correct:function(){phrase([N_GA,N_PA,N_DHA],0.13,0.17,0.3);},wrong:function(){phrase([N_GA3,N_E3],0.24,0.34,0.22);},partial:function(){phrase([N_DHA,N_PA,N_DHA],0.16,0.2,0.26);},timeup:function(){phrase([N_DHA,N_PA,N_GA,N_RE],0.18,0.22,0.24);},level:function(){phrase([N_SA,N_RE,N_GA,N_PA,N_DHA,N_SA2],0.11,0.34,0.32);},badge:function(){phrase([N_SA2,N_E5,N_SA2,N_E5],0.09,0.12,0.24);},open:function(){phrase([N_SA,N_PA],0.11,0.14,0.18);}};
function toggleMute(){S.mute=!S.mute;save();render();}
/* ---- quiz timer (timed mode) ---- */
let qzTimer=null,qzDeadline=0,suppressLevelSfx=false;
function stopTimer(){if(qzTimer){clearInterval(qzTimer);qzTimer=null;}}
function startTimer(){stopTimer();var z=view.qz;if(!z||z.done||z.arenaDone)return;if(!S.timed&&!z.arena)return;var dur=z.arena?15000:20000;qzDeadline=Date.now()+dur;qzTimer=setInterval(function(){var f=document.getElementById('tfill');var left=qzDeadline-Date.now();var pct=Math.max(0,Math.round(left/(dur/100)));if(f){f.style.width=pct+'%';f.style.background=pct<25?'#ff5252':'';}if(left<=0){stopTimer();timeUp();}},100);}
function timeUp(){const z=view.qz;if(!z||z.done||z.picked!==-1)return;z.picked=-2;SFX.timeup();render();}
/* ---- world art (topic animations) ---- */
const WORLD_ART={
physics:'<div class="aball"></div><div class="ashadow"></div>',
flight:'<div class="acloud ac1"></div><div class="acloud ac2"></div><div class="aglide"><div class="aplane">✈️</div></div>',
chem:'<div class="aflask"><div class="aliquid"></div><div class="bub b1"></div><div class="bub b2"></div><div class="bub b3"></div></div>',
bio:'<div class="asun sunpos"></div><div class="astem"></div><div class="aleaf leaf1"></div><div class="aleaf leaf2"></div><div class="ao2 o1"></div><div class="ao2 o2"></div>',
logic:'<svg class="agears" viewBox="0 0 120 90"><g class="g1"><g fill="#b0bec5"><rect x="31" y="17" width="8" height="10" rx="2"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(45 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(90 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(135 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(180 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(225 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(270 35 45)"/><rect x="31" y="17" width="8" height="10" rx="2" transform="rotate(315 35 45)"/></g><circle cx="35" cy="45" r="18" fill="#b0bec5"/><circle cx="35" cy="45" r="7" fill="#263238"/></g><g class="g2"><g fill="#cfd8dc"><rect x="82" y="32" width="6" height="8" rx="2"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(45 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(90 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(135 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(180 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(225 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(270 85 45)"/><rect x="82" y="32" width="6" height="8" rx="2" transform="rotate(315 85 45)"/></g><circle cx="85" cy="45" r="12" fill="#cfd8dc"/><circle cx="85" cy="45" r="5" fill="#263238"/></g></svg>',
elec:'<div class="aterm tl"></div><div class="aterm tr"></div><div class="awire"></div><div class="abulb"></div>',
light:'<div class="ain"></div><div class="aprism"></div><div class="aray rr1"></div><div class="aray rr2"></div><div class="aray rr3"></div><div class="aray rr4"></div><div class="aray rr5"></div><div class="aray rr6"></div>',
heat:'<div class="ahw hh1"></div><div class="ahw hh2"></div><div class="ahw hh3"></div><div class="apot"></div><div class="aflame"></div>',
body:'<div class="aheart"></div>',
earth:'<div class="asun s2"></div><div class="acloud2"></div><div class="arain rn1"></div><div class="arain rn2"></div><div class="arain rn3"></div><div class="arain rn4"></div><div class="apuddle"></div>',
ai:'<svg class="annsvg" viewBox="0 0 140 94"><g stroke="rgba(255,255,255,.18)" stroke-width="2"><line x1="22" y1="18" x2="70" y2="14"/><line x1="22" y1="18" x2="70" y2="47"/><line x1="22" y1="18" x2="70" y2="80"/><line x1="22" y1="47" x2="70" y2="14"/><line x1="22" y1="47" x2="70" y2="47"/><line x1="22" y1="47" x2="70" y2="80"/><line x1="22" y1="76" x2="70" y2="14"/><line x1="22" y1="76" x2="70" y2="47"/><line x1="22" y1="76" x2="70" y2="80"/><line x1="70" y1="14" x2="118" y2="30"/><line x1="70" y1="14" x2="118" y2="64"/><line x1="70" y1="47" x2="118" y2="30"/><line x1="70" y1="47" x2="118" y2="64"/><line x1="70" y1="80" x2="118" y2="30"/><line x1="70" y1="80" x2="118" y2="64"/></g><g fill="#4dd0e1"><circle cx="22" cy="18" r="7" style="animation:annb 1.8s ease-in-out infinite"/><circle cx="22" cy="47" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:.3s"/><circle cx="22" cy="76" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:.6s"/></g><g fill="#26a69a"><circle cx="70" cy="14" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:.9s"/><circle cx="70" cy="47" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:1.2s"/><circle cx="70" cy="80" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:1.5s"/></g><g fill="#80cbc4"><circle cx="118" cy="30" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:1.1s"/><circle cx="118" cy="64" r="7" style="animation:annb 1.8s ease-in-out infinite;animation-delay:1.4s"/></g></svg>',
materials:'<svg class="latsvg" viewBox="0 0 120 90"><g stroke="#90a4ae" stroke-width="2"><line x1="20" y1="16" x2="60" y2="16"/><line x1="60" y1="16" x2="100" y2="16"/><line x1="20" y1="45" x2="60" y2="45"/><line x1="60" y1="45" x2="100" y2="45"/><line x1="20" y1="74" x2="60" y2="74"/><line x1="60" y1="74" x2="100" y2="74"/><line x1="20" y1="16" x2="20" y2="45"/><line x1="20" y1="45" x2="20" y2="74"/><line x1="60" y1="16" x2="60" y2="45"/><line x1="60" y1="45" x2="60" y2="74"/><line x1="100" y1="16" x2="100" y2="45"/><line x1="100" y1="45" x2="100" y2="74"/></g><g><circle cx="20" cy="16" r="6" fill="#ffd54f" class="dotp" style="animation-delay:0s"/><circle cx="60" cy="16" r="6" fill="#4dd0e1" class="dotp" style="animation-delay:.25s"/><circle cx="100" cy="16" r="6" fill="#b388ff" class="dotp" style="animation-delay:.5s"/><circle cx="20" cy="45" r="6" fill="#4dd0e1" class="dotp" style="animation-delay:.75s"/><circle cx="60" cy="45" r="6" fill="#b388ff" class="dotp" style="animation-delay:1s"/><circle cx="100" cy="45" r="6" fill="#ffd54f" class="dotp" style="animation-delay:1.25s"/><circle cx="20" cy="74" r="6" fill="#b388ff" class="dotp" style="animation-delay:1.5s"/><circle cx="60" cy="74" r="6" fill="#ffd54f" class="dotp" style="animation-delay:1.75s"/><circle cx="100" cy="74" r="6" fill="#4dd0e1" class="dotp" style="animation-delay:2s"/></g></svg>',
sky:'<div class="astar" style="left:10%;top:22%"></div><div class="astar" style="left:24%;top:64%;animation-delay:.3s"></div><div class="astar" style="left:38%;top:14%;animation-delay:.6s"></div><div class="astar" style="left:52%;top:72%;animation-delay:.9s"></div><div class="astar" style="left:64%;top:30%;animation-delay:.2s"></div><div class="astar" style="left:78%;top:58%;animation-delay:.5s"></div><div class="astar" style="left:88%;top:16%;animation-delay:.8s"></div><div class="astar" style="left:16%;top:82%;animation-delay:1.1s"></div><div class="shoot"></div>',
scientists:'<div class="aray2 ay1"></div><div class="aray2 ay2"></div><div class="aray2 ay3"></div><div class="abulb2"></div>',
kitchen:'<div class="asteam st1"></div><div class="asteam st2"></div><div class="asteam st3"></div><div class="acooker"></div><div class="aweight"></div>',
coding:'<div class="abin" style="left:18%;animation-duration:2.4s">1</div><div class="abin" style="left:32%;animation-duration:3.1s;animation-delay:.5s">0</div><div class="abin" style="left:47%;animation-duration:2.7s;animation-delay:1.1s">1</div><div class="abin" style="left:61%;animation-duration:3.4s;animation-delay:.2s">0</div><div class="abin" style="left:74%;animation-duration:2.5s;animation-delay:.8s">1</div><div class="abin" style="left:86%;animation-duration:3.2s;animation-delay:1.4s">0</div>',
robotics:'<div class="aradar"><div class="asweep"></div><div class="ablip"></div></div>',
quantum:'<div class="ap3d"><div class="aflip"><div class="aface">0</div><div class="aface f1">1</div></div></div>',
genetics:'<div class="adna"><div class="arung" style="top:6px"></div><div class="arung" style="top:20px;animation-delay:-.4s"></div><div class="arung" style="top:34px;animation-delay:-.8s"></div><div class="arung" style="top:48px;animation-delay:-1.2s"></div><div class="arung" style="top:62px;animation-delay:-1.6s"></div><div class="arung" style="top:76px;animation-delay:-2s"></div></div>',
vedic:'<div class="aglow2"></div><div class="adiya"></div><div class="aflame2"></div>',
trivia:'<div class="atrophy">🏆</div><div class="aspark" style="left:30%;top:30%">✨</div><div class="aspark" style="left:64%;top:20%;animation-delay:.8s">✨</div>'
};


/* ---- lesson concept images (Wikimedia Commons) ---- */
function showDiag(el){var sv=el&&el.querySelector('svg');if(!sv)return;modal('<h3>🔍 Bigger view</h3><div class="diagzoom">'+sv.outerHTML+'</div>');}
/* ---- players (multi-child profiles) ---- */
function showProfiles(){var rows=Object.keys(S.profiles).map(function(id){var p=S.profiles[id];var on=id===S.current;return '<div class="prow'+(on?' on':'')+'"><span class="pav">'+p.av+'</span><span class="pnm">'+esc(p.name)+'</span><span class="pxp">⭐ '+p.xp+' XP</span>'+(on?'<span class="pxp">▶ playing</span>':'<button class="mini" onclick="switchProfile(\''+id+'\')">▶ Play</button>')+'<button class="mini" onclick="renameProfile(\''+id+'\')">✏️</button>'+(Object.keys(S.profiles).length>1?'<button class="mini" onclick="deleteProfile(\''+id+'\')">🗑️</button>':'')+'</div>';}).join('');modal('<h3>👥 Players</h3><p class="muted">Each player keeps their own XP, stars, badges, streak and Doubt Jar.</p>'+rows+'<div class="starrow"><button class="btn" onclick="showAddPlayer()">➕ Add player</button><button class="btn sec" onclick="closeModal()">Close</button></div>');}
function showAddPlayer(){var avs=['🦁','🚀','🦅','🐬','🐉','🐯','🦊','🐼','🦉','⚡'];var grid=avs.map(function(a){return '<button class="mini" style="font-size:22px;padding:8px 12px" onclick="document.getElementById(\'newav\').value=\''+a+'\'">'+a+'</button>';}).join('');modal('<h3>➕ Add a player</h3><p class="muted">Pick an avatar (or type any emoji), then type a name.</p><input type="text" id="newav" value="🦁" style="text-align:center;font-size:20px"><input type="text" id="newnm" placeholder="Player name" style="margin-top:8px"><div class="starrow"><button class="btn" onclick="createPlayer()">Create</button><button class="btn sec" onclick="showProfiles()">Back</button></div>');}
function createPlayer(){var av=((document.getElementById('newav')||{}).value||'🦁').trim()||'🦁';var nm=((document.getElementById('newnm')||{}).value||'').trim().slice(0,16)||('Player '+(Object.keys(S.profiles).length+1));var id='p'+Date.now();S.profiles[id]=freshProfile();S.profiles[id].av=av;S.profiles[id].name=nm;S.current=id;state=S.profiles[id];save();closeModal();toast('Welcome, '+nm+'! 🎉');go('home');}
function switchProfile(id){if(!S.profiles[id])return;S.current=id;state=S.profiles[id];save();closeModal();toast('Hi '+S.profiles[id].name+'! 👋');go('home');}
function renameProfile(id){var p=S.profiles[id];if(!p)return;var nm=prompt('New name for '+p.name+':',p.name);if(nm&&nm.trim()){p.name=nm.trim().slice(0,16);save();}showProfiles();}
function deleteProfile(id){if(!S.profiles[id]||Object.keys(S.profiles).length<=1){toast('At least one player is needed');return;}if(!askPin()){toast('Wrong PIN 🔒');return;}if(!confirm('Remove '+S.profiles[id].name+' and their progress?'))return;delete S.profiles[id];if(S.current===id){S.current=Object.keys(S.profiles)[0];state=S.profiles[S.current];}save();closeModal();go('home');}
/* ---- GitHub cloud sync ---- */
function ghCfg(){try{var c=JSON.parse(localStorage.getItem('sq_gh'));if(c&&c.owner&&c.repo&&c.token)return c;}catch(e){}return null;}
function ghPath(c){return c.path&&c.path.length?c.path:'progress.json';}
function ghUrl(c){return 'https://api.github.com/repos/'+c.owner+'/'+c.repo+'/contents/'+encodeURIComponent(ghPath(c));}
async function cloudSync(silent){
  var res = await ChampSync.sync({
    silent: silent,
    getSq: function(){ return S; },
    onMerged: function(){ checkBadges(); save(); render(); },
    toast: function(m){ toast(m); },
    onNeedSetup: null /* cloud is set up ONLY in the Admin Console */
  });
  return res;
}

/* ============ ChampSync — one-tap cloud sync + local backup (shared engine) ============
   IDENTICAL COPY embedded in Math-Champ (assets/app.js) and ScienceQuest.
   One tap on EITHER champ syncs BOTH to the family's GitHub repo and downloads
   a dated local backup file. Merge rules: progress is never destroyed.
   Cloud file format: { champSync: 2, sq: <ScienceQuest state>, oc: <Math-Champ state> }
   Older formats (science-only {profiles:...}, legacy single-profile {xp:...}) still load. */
window.ChampSync = (function () {
  'use strict';
  var CFG_KEY = 'sq_gh';     /* shared cloud config — set once per device on any champ page */
  var SQ_KEY = 'sq_v3';      /* ScienceQuest state */
  var OC_KEY = 'oc_state';   /* Math-Champ state */

  function ghCfg() {
    try { var c = JSON.parse(localStorage.getItem(CFG_KEY)); if (c && c.owner && c.repo && c.token) return c; } catch (e) {}
    return null;
  }
  function saveGhCfg(c) { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function ghUrl(c) { return 'https://api.github.com/repos/' + c.owner + '/' + c.repo + '/contents/' + encodeURIComponent(c.path && c.path.length ? c.path : 'progress.json'); }
  function readLS(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function writeLS(k, v) { if (v == null) return; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---- science merge: faithful port of ScienceQuest's own mergeProfile/mergeS ---- */
  function mergeProfile(a, b) {
    a.xp = Math.max(a.xp || 0, b.xp || 0);
    ['lessons', 'practice'].forEach(function (k) { var src = b[k] || {}; a[k] = a[k] || {}; for (var key in src) { if (src[key]) a[k][key] = src[key]; } });
    var q = b.quiz || {};
    for (var w in q) { if (q[w] && q[w].t) { a.quiz = a.quiz || {}; if (!a.quiz[w] || !a.quiz[w].t || q[w].s > a.quiz[w].s) a.quiz[w] = q[w]; } }
    var lvB = b.levels || {};
    for (var wL in lvB) { a.levels = a.levels || {}; var mL = a.levels[wL] || { c: 1, b1: 0, b2: 0, arena: 0 }; mL.c = Math.max(mL.c || 1, lvB[wL].c || 1); mL.b1 = Math.max(mL.b1 || 0, lvB[wL].b1 || 0); mL.b2 = Math.max(mL.b2 || 0, lvB[wL].b2 || 0); mL.arena = Math.max(mL.arena || 0, lvB[wL].arena || 0); a.levels[wL] = mL; }
    ['badges', 'visited'].forEach(function (k) { a[k] = a[k] || []; (b[k] || []).forEach(function (x) { if (a[k].indexOf(x) < 0) a[k].push(x); }); });
    if ((b.streak || 0) > (a.streak || 0)) { a.streak = b.streak; a.lastDay = b.lastDay || a.lastDay; }
    (b.doubts || []).forEach(function (x) { a.doubts = a.doubts || []; if (!a.doubts.some(function (y) { return y.t === x.t && y.d === x.d; })) a.doubts.push(x); });
  }
  function mergeSQ(S, o) {
    if (o.pin && !S.pin) S.pin = o.pin;
    for (var k in o.profiles) { if (!S.profiles[k]) S.profiles[k] = o.profiles[k]; else mergeProfile(S.profiles[k], o.profiles[k]); }
    return S;
  }

  /* ---- maths merge: union of attempts/journal/badges, max XP, newest streak ---- */
  function mergeOC(a, b) {
    if (!b || typeof b !== 'object' || !b.attempts) return a;
    if (!a || !a.attempts) return b;
    var out = { name: '', xp: 0, attempts: [], journal: [], streak: { last: null, count: 0 }, badges: {}, pin: '' };
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    var seen = {}, list = [];
    (a.attempts || []).concat(b.attempts || []).forEach(function (t) {
      var k = (t.kind || '') + '|' + (t.id || '') + '|' + (t.ts || '');
      if (!seen[k]) { seen[k] = 1; list.push(t); }
    });
    list.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    out.attempts = list.slice(-400);
    var jseen = {}, jl = [];
    (a.journal || []).concat(b.journal || []).forEach(function (j) {
      var k = (j.ts || 0) + '|' + (j.note || '');
      if (!jseen[k]) { jseen[k] = 1; jl.push(j); }
    });
    jl.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    out.journal = jl.slice(-100);
    [a.badges || {}, b.badges || {}].forEach(function (src) {
      Object.keys(src).forEach(function (id) { if (!out.badges[id] || src[id] < out.badges[id]) out.badges[id] = src[id]; });
    });
    var sa = a.streak || { last: null, count: 0 }, sb = b.streak || { last: null, count: 0 };
    out.streak = { last: (String(sb.last || '') > String(sa.last || '') ? sb.last : sa.last), count: Math.max(sa.count || 0, sb.count || 0) };
    out.pin = a.pin || b.pin || '';
    return out;
  }

  function payload(sq, oc) { return { champSync: 2, sq: sq || null, oc: oc || null }; }

  /* understands the current format plus every older one */
  function parseRemote(txt) {
    var o = JSON.parse(txt);
    if (o && o.champSync === 2) return { sq: (o.sq && o.sq.profiles) ? o.sq : null, oc: (o.oc && o.oc.attempts) ? o.oc : null };
    if (o && o.profiles) return { sq: o, oc: null };
    if (o && typeof o.xp === 'number' && !o.profiles) return { legacy: o, oc: null };
    if (o && o.attempts) return { sq: null, oc: o };
    return null;
  }

  function backupName() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return 'gurukool-progress-' + d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + '.txt';
  }

  function downloadBackup(pl) {
    try {
      var blob = new Blob([JSON.stringify(pl, null, 2)], { type: 'text/plain' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = backupName();
      document.body.appendChild(a); a.click();
      setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 1000);
      return true;
    } catch (e) { return false; }
  }

  function mergeInto(pr, getSq, getOc) {
    var sq = getSq ? getSq() : readLS(SQ_KEY);
    var oc = getOc ? getOc() : readLS(OC_KEY);
    if (pr) {
      if (pr.legacy && sq && sq.profiles) mergeProfile(sq.profiles[sq.current || 'p1'], pr.legacy);
      else if (pr.sq && sq && sq.profiles) mergeSQ(sq, pr.sq);
      else if (pr.sq && !sq) sq = pr.sq;
      if (pr.oc && oc && oc.attempts) oc = mergeOC(oc, pr.oc);
      else if (pr.oc && !oc) oc = pr.oc;
    }
    return { sq: sq, oc: oc };
  }

  /* one tap: pull cloud -> merge -> push merged -> download local backup.
     opts: { silent, getSq, getOc, onMerged(sq,oc), toast(msg), onNeedSetup() }
     returns a Promise resolving to 'setup' | 'ok' | 'error'. */
  function sync(opts) {
    opts = opts || {};
    var c = ghCfg();
    if (!c) { if (!opts.silent && opts.onNeedSetup) opts.onNeedSetup(); return Promise.resolve('setup'); }
    if (!opts.silent && opts.toast) opts.toast('☁️ Syncing…');
    var sha = null, merged = null;
    return fetch(ghUrl(c), { headers: { 'Authorization': 'Bearer ' + c.token, 'Accept': 'application/vnd.github+json' } })
      .then(function (r) {
        if (r.status === 200) return r.json();
        if (r.status !== 404 && r.status !== 451) throw new Error('GitHub says ' + r.status);
        return null;
      })
      .then(function (j) {
        if (!j) return null;
        sha = j.sha;
        try { return decodeURIComponent(escape(atob((j.content || '').replace(/\n/g, '')))); } catch (e) { return null; }
      })
      .then(function (txt) {
        var pr = null;
        if (txt) { try { pr = parseRemote(txt); } catch (e) { pr = null; } }
        merged = mergeInto(pr, opts.getSq, opts.getOc);
        writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc);
        if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc); } catch (e) {} }
        var pl = payload(merged.sq, merged.oc);
        return fetch(ghUrl(c), {
          method: 'PUT',
          headers: { 'Authorization': 'Bearer ' + c.token, 'Accept': 'application/vnd.github+json' },
          body: JSON.stringify(Object.assign({ message: 'Gurukool progress sync', content: btoa(unescape(encodeURIComponent(JSON.stringify(pl)))) }, sha ? { sha: sha } : {}))
        });
      })
      .then(function (r) {
        if (!r.ok) throw new Error('GitHub says ' + r.status);
        if (!opts.silent && opts.toast) opts.toast('✅ Synced — maths + science safe!');
        return 'ok';
      })
      .catch(function (err) {
        if (!opts.silent && opts.toast) opts.toast('⚠️ ' + (err && err.message ? err.message : 'Sync problem'));
        return 'error';
      })
      .then(function (status) {
        if (!opts.silent) downloadBackup(payload(merged ? merged.sq : readLS(SQ_KEY), merged ? merged.oc : readLS(OC_KEY)));
        return status;
      });
  }

  /* restore a local backup file's text (same merge rules, no cloud) */
  function applyBackupText(txt, opts) {
    opts = opts || {};
    var pr = null;
    try { pr = parseRemote(txt); } catch (e) { pr = null; }
    if (!pr) throw new Error('this does not look like a Gurukool backup');
    var merged = mergeInto(pr, opts.getSq, opts.getOc);
    writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc);
    if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc); } catch (e) {} }
    return merged;
  }

  return { ghCfg: ghCfg, saveGhCfg: saveGhCfg, mergeOC: mergeOC, mergeSQ: mergeSQ, parseRemote: parseRemote, payload: payload, backupName: backupName, downloadBackup: downloadBackup, sync: sync, applyBackupText: applyBackupText };
})();


function modal(html){const m=document.getElementById('modal');if(!m)return;m.innerHTML='<div class="mbox">'+html+'</div>';m.classList.remove('hidden');}
function closeModal(){const m=document.getElementById('modal');if(m)m.classList.add('hidden');}
function showBadges(){const rows=BADGES.map(b=>{const got=state.badges.indexOf(b.id)>=0;return '<div class="bchip'+(got?' got':'')+'"><div class="bic">'+(got?b.icon:'🔒')+'</div><b>'+b.name+'</b><span>'+b.desc+'</span></div>';}).join('');modal('<h3>🏅 My Badges ('+state.badges.length+'/'+BADGES.length+')</h3><div class="bgrid">'+rows+'</div><div class="starrow"><button class="btn" onclick="closeModal()">Close</button></div>');}
function exportCode(){return 'SQ3.'+btoa(unescape(encodeURIComponent(JSON.stringify(S))));}
function importCode(c){c=(c||'').trim();var pref=null;if(c.indexOf('SQ3.')===0)pref='SQ3.';else if(c.indexOf('SQ2.')===0)pref='SQ2.';else if(c.indexOf('SQ1.')===0)pref='SQ1.';if(!pref)return false;try{var o=JSON.parse(decodeURIComponent(escape(atob(c.slice(pref.length)))));if(!o)return false;if(pref==='SQ3.'&&o.profiles){mergeS(o);}else if(typeof o.xp==='number'){mergeProfile(S.profiles[S.current],o);}else{return false;}checkBadges();save();return true;}catch(e){return false;}}
function mergeProfile(a,b){a.xp=Math.max(a.xp||0,b.xp||0);['lessons','practice'].forEach(function(k){var src=b[k]||{};a[k]=a[k]||{};for(var key in src){if(src[key])a[k][key]=src[key];}});var q=b.quiz||{};for(var w in q){if(q[w]&&q[w].t){a.quiz=a.quiz||{};if(!a.quiz[w]||!a.quiz[w].t||q[w].s>a.quiz[w].s)a.quiz[w]=q[w];}}var lvB=b.levels||{};for(var wL in lvB){a.levels=a.levels||{};var mL=a.levels[wL]||{c:1,b1:0,b2:0,arena:0};mL.c=Math.max(mL.c||1,lvB[wL].c||1);mL.b1=Math.max(mL.b1||0,lvB[wL].b1||0);mL.b2=Math.max(mL.b2||0,lvB[wL].b2||0);mL.arena=Math.max(mL.arena||0,lvB[wL].arena||0);a.levels[wL]=mL;}['badges','visited'].forEach(function(k){a[k]=a[k]||[];(b[k]||[]).forEach(function(x){if(a[k].indexOf(x)<0)a[k].push(x);});});if((b.streak||0)>(a.streak||0)){a.streak=b.streak;a.lastDay=b.lastDay||a.lastDay;}(b.doubts||[]).forEach(function(x){a.doubts=a.doubts||[];if(!a.doubts.some(function(y){return y.t===x.t&&y.d===x.d;}))a.doubts.push(x);});}
function mergeS(o){if(o.pin&&!S.pin)S.pin=o.pin;for(var k in o.profiles){if(!S.profiles[k]){S.profiles[k]=o.profiles[k];}else{mergeProfile(S.profiles[k],o.profiles[k]);}}}
document.getElementById('modal').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.addEventListener('selectionchange',scheduleSel);
window.addEventListener('scroll',hideSelBtn,true);
document.addEventListener('keydown',function(e){if(e.key==='Escape'){hideSelUI();closeModal();}});
render();
if(ghCfg())setTimeout(function(){cloudSync(true);},1500);
/* AUTO-SAVE — silent cloud sync every 10 minutes. No buttons, no file downloads.
   Cloud settings live ONLY in the Admin Console (admin.html). Local progress
   saves to this browser instantly on every XP, star and badge. */
setInterval(function(){if(ghCfg())cloudSync(true);},600000);


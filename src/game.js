
const LEAGUES={
"England · Premier League":["Arsenal","Aston Villa","Bournemouth","Brentford","Brighton","Burnley","Chelsea","Crystal Palace","Everton","Fulham","Leeds United","Liverpool","Manchester City","Manchester United","Newcastle United","Nottingham Forest","Sunderland","Tottenham Hotspur","West Ham United","Wolverhampton Wanderers"],
"England · Championship":["Birmingham City","Blackburn Rovers","Bristol City","Charlton Athletic","Coventry City","Derby County","Hull City","Ipswich Town","Leicester City","Middlesbrough","Millwall","Norwich City","Oxford United","Portsmouth","Preston North End","Queens Park Rangers","Sheffield United","Sheffield Wednesday","Southampton","Stoke City","Swansea City","Watford","West Bromwich Albion","Wrexham"],
"Spain · La Liga":["Alavés","Athletic Club","Atlético Madrid","Barcelona","Celta Vigo","Elche","Espanyol","Getafe","Girona","Levante","Mallorca","Osasuna","Rayo Vallecano","Real Betis","Real Madrid","Real Oviedo","Real Sociedad","Sevilla","Valencia","Villarreal"],
"Germany · Bundesliga":["Augsburg","Bayer Leverkusen","Bayern Munich","Borussia Dortmund","Borussia Mönchengladbach","Eintracht Frankfurt","Freiburg","Hamburger SV","Heidenheim","Hoffenheim","Mainz 05","RB Leipzig","St. Pauli","Union Berlin","Werder Bremen","Wolfsburg","Schalke 04","Cologne"],
"Italy · Serie A":["Atalanta","Bologna","Cagliari","Como","Cremonese","Fiorentina","Genoa","Inter","Juventus","Lazio","Lecce","AC Milan","Napoli","Parma","Pisa","Roma","Sassuolo","Torino","Udinese","Verona"],
"France · Ligue 1":["Angers","Auxerre","Brest","Le Havre","Lens","Lille","Lorient","Lyon","Marseille","Monaco","Nantes","Nice","Paris FC","Paris Saint-Germain","Rennes","Strasbourg","Toulouse","Metz"],
"Canada · Canadian Premier League":["Atlético Ottawa","Cavalry FC","Forge FC","Halifax Wanderers","Pacific FC","Valour FC","Vancouver FC","York United"],
"USA / Canada · MLS":["Atlanta United","Austin FC","Charlotte FC","Chicago Fire","FC Cincinnati","Colorado Rapids","Columbus Crew","D.C. United","FC Dallas","Houston Dynamo","Inter Miami","LA Galaxy","Los Angeles FC","Minnesota United","CF Montréal","Nashville SC","New England Revolution","New York City FC","New York Red Bulls","Orlando City","Philadelphia Union","Portland Timbers","Real Salt Lake","San Diego FC","San Jose Earthquakes","Seattle Sounders","Sporting Kansas City","St. Louis City SC","Toronto FC","Vancouver Whitecaps"],
"Netherlands · Eredivisie":["Ajax","AZ Alkmaar","Excelsior","FC Groningen","FC Twente","FC Utrecht","Feyenoord","Fortuna Sittard","Go Ahead Eagles","Heracles Almelo","NAC Breda","NEC Nijmegen","PEC Zwolle","PSV","SC Heerenveen","Sparta Rotterdam","Telstar","Willem II"],
"Portugal · Primeira Liga":["Arouca","Benfica","Boavista","Braga","Casa Pia","Estoril","Famalicão","Farense","Gil Vicente","Moreirense","Nacional","Porto","Rio Ave","Santa Clara","Sporting CP","Vitória SC"],
"Brazil · Série A":["Atlético Mineiro","Bahia","Botafogo","Bragantino","Ceará","Corinthians","Cruzeiro","Flamengo","Fluminense","Fortaleza","Grêmio","Internacional","Juventude","Mirassol","Palmeiras","Santos","São Paulo","Sport Recife","Vasco da Gama","Vitória"],
"Saudi Arabia · Pro League":["Al Ahli","Al Ettifaq","Al Fateh","Al Fayha","Al Hazem","Al Hilal","Al Ittihad","Al Khaleej","Al Nassr","Al Okhdood","Al Qadsiah","Al Riyadh","Al Shabab","Al Taawoun","Al Wehda","Damac","NEOM SC"]
};
const COLORS={"Barcelona":["#163a8a","#a51e45"],"Real Madrid":["#eeeeee","#f2a6bf"],"Arsenal":["#d71920","#ffffff"],"Chelsea":["#034694","#f5f5f5"],"Liverpool":["#c8102e","#e9e9e9"],"Manchester City":["#6cabdd","#1c2c5b"],"Manchester United":["#da291c","#f2f2f2"],"Bayern Munich":["#dc052d","#eeeeee"],"Borussia Dortmund":["#fdee00","#111111"],"Inter":["#00529f","#eeeeee"],"Juventus":["#eeeeee","#111111"],"AC Milan":["#c8102e","#111111"],"Paris Saint-Germain":["#004170","#eeeeee"],"Toronto FC":["#b5121b","#eeeeee"],"Vancouver Whitecaps":["#e9eef2","#102b55"],"Inter Miami":["#f7a8b8","#222222"]};
let matchDuration=300;
let league="",homeClub="Barcelona",awayClub="Real Madrid",kits={home:"home",away:"away"},players=[],score=[0,0],seconds=0,clockTimer=null,paused=false,stamina=100,lesson=0,activePlayer=0,ballPos={x:50,y:50},possession="home";
const lessons=[
["Movement","Use W, A, S and D to move your controlled player around the pitch. Hold SHIFT to sprint. Release the keys to slow down."],
["Passing","Press J for a short pass to a nearby teammate. Press L for a forward through pass into space."],
["Shooting","Press K near the opponent's goal. A shot travels toward goal; get closer and face the target for a better chance."],
["Dribbling & skills","Move while keeping the ball close. Press E to perform a skill animation. Change direction to get away from a defender."],
["Defending","When you do not have the ball, move toward the opponent. Press SPACE to attempt a tackle. Time it carefully."],
["Switch player","Press Q to cycle between your team's players and select the best defender or passing option."],
["Set pieces","Corners, goal kicks, throw-ins and free kicks restart play from the appropriate place. Penalties follow a foul in the penalty area."],
["Football rules","Avoid offside: an attacker cannot gain an advantage by being nearer the goal line than both the ball and the second-last opponent when the ball is played. Avoid reckless fouls and respect the referee."]
];
const moveData=[["Dribbling","Close control · sprint dribble · shielding · change of pace"],["Feints","Body feint · step-over · double step-over · scissors · fake shot"],["Turns","Drag-back · roulette · Cruyff turn · spin turn · stop-and-go"],["Passing","Short pass · driven pass · lofted pass · through ball · one-two"],["Shooting","Power shot · finesse/curl · chip · volley · half-volley · header"],["Defending","Jockey · standing tackle · slide tackle · block · interception"],["First touch","Cushioned touch · directional touch · chest control · thigh control"],["Set pieces","Corner · free kick · penalty · throw-in · goal kick"],["Goalkeeping","Catch · parry · dive · rush out · distribute"],["Match rules","Offside · fouls · advantage · handball · cards · added time · substitutions"]];
function show(id){if(id!=="match")clearInterval(clockTimer);document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");if(id==="leagues")renderLeagues();if(id==="moves")renderMoves();if(id==="tutorial")renderLesson();if(id==="lineup")renderLineup()}
function renderLeagues(){leagueGrid.innerHTML="";Object.keys(LEAGUES).forEach(l=>{let b=document.createElement("button");b.className="card";b.innerHTML=`<span class="pill">${LEAGUES[l].length} CLUBS</span><h3>${l}</h3><p>View clubs →</p>`;b.onclick=()=>{league=l;leagueTitle.textContent=l;clubSearch.value="";renderClubs();show("clubs")};leagueGrid.append(b)})}
function renderClubs(){clubGrid.innerHTML="";(LEAGUES[league]||[]).filter(n=>n.toLowerCase().includes(clubSearch.value.toLowerCase())).forEach(n=>{let b=document.createElement("button");b.className="card";b.innerHTML=`<div class="team"><div class="crest">⚽</div><div><b>${n}</b><div class="small muted">${league}</div></div></div><p>Choose as your club →</p>`;b.onclick=()=>{homeClub=n;awayClub=(LEAGUES[league].find(x=>x!==n)||"All-Stars");setupKits();show("kits")};clubGrid.append(b)})}
function setupKits(){homeClubName.textContent=homeClub;awayClubName.textContent=awayClub;updateKitVisual("home");updateKitVisual("away")}
function palette(club,kit){let c=COLORS[club]||["#257c55","#eeeeee"];return club==="Barcelona"?(kit==="home"?["#17449b","#a50044"]:["#15121d","#59378b"]):kit==="home"?c:[c[1],c[0]]}
function setKit(side,kit){kits[side]=kit;updateKitVisual(side)}
function updateKitVisual(side){let club=side==="home"?homeClub:awayClub,c=palette(club,kits[side]);let el=document.getElementById(side+"Shirt");el.style.background=`${kitPattern(club,kits[side],c)}`;document.getElementById(side+"Home").classList.toggle("active",kits[side]==="home");document.getElementById(side+"Away").classList.toggle("active",kits[side]==="away")}
function renderLineup(){let f=formation.value;let positions=f==="4-4-2"?["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"]:f==="3-5-2"?["GK","CB","CB","CB","RM","CM","CM","CM","LM","ST","ST"]:f==="4-2-3-1"?["GK","RB","CB","CB","LB","CDM","CDM","RW","CAM","LW","ST"]:f==="3-4-3"?["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"]:["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"];lineupGrid.innerHTML="";positions.forEach((p,i)=>{let rating=95-i%5*3;let pace=[74,84,89,78,86,81,90,76,88,83,85][i];let c=document.createElement("div");c.className="card";c.innerHTML=`<span class="pill">${p}</span><h3>${["Captain","Playmaker","Defender","Winger","Striker"][i%5]}</h3><b style="color:var(--lime);font-size:25px">${rating}</b><p>Player ${i+1} · Starting XI · PAC ${pace}</p>`;lineupGrid.append(c)})}
function randomLineup(){renderLineup();say("Your lineup has been refreshed. Ready to play!")}
function startMatch(){show("match");resetMatch()}
function createPlayer(i,team,x,y){let div=document.createElement("div");div.className="player still";div.id="p"+i;let c=palette(team==="home"?homeClub:awayClub,kits[team]);div.innerHTML=`<b>${i%11+1}</b><div class="jersey" style="background:${kitPattern(team==="home"?homeClub:awayClub,kits[team],c)}"></div><div class="legs"><i></i><i></i></div>`;div.style.left=x+"%";div.style.top=y+"%";return div}
function resetMatch(){clearInterval(clockTimer);matchStatus.textContent="Match in progress";pauseBtn.textContent="Ⅱ PAUSE";document.getElementById("clock").textContent="00:00";score=[0,0];seconds=0;paused=false;stamina=100;activePlayer=9;ballPos={x:50,y:50};possession="home";players=[];document.getElementById("players").innerHTML="";for(let i=0;i<22;i++){let team=i<11?"home":"away",j=i%11;let x=team==="home"?12+(j%4)*8:88-(j%4)*8,y=12+Math.floor(j/4)*34+(j%2)*5;let p={x,y,team,pace:[74,84,89,78,86,81,90,76,88,83,85][j]};players.push(p);document.getElementById("players").append(createPlayer(i,team,x,y))}scoreHome.textContent=homeClub;scoreAway.textContent=awayClub;updateScore();players[activePlayer].x=48;players[activePlayer].y=50;document.getElementById("p"+activePlayer).style.left="48%";document.getElementById("p"+activePlayer).style.top="50%";moveBall(50,50);say("The referee checks the watch. We're underway!");clockTimer=setInterval(tick,1000)}
function tick(){if(paused)return;seconds++;document.getElementById("clock").textContent=String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");stamina=Math.min(100,stamina+3);document.getElementById("stamina").textContent=stamina+"%";document.getElementById("possession").textContent=possession==="home"?"YOU":"OPPONENT";if(seconds>=matchDuration){clearInterval(clockTimer);paused=true;say("Full time! Thanks for playing O FOOTBALL.");matchStatus.textContent="FULL TIME"}}
function moveBall(x,y){ballPos={x:Math.max(2,Math.min(98,x)),y:Math.max(3,Math.min(97,y))};ball.style.left=ballPos.x+"%";ball.style.top=ballPos.y+"%"}
function movePlayer(dx,dy){let p=players[activePlayer];p.x=Math.max(4,Math.min(96,p.x+dx));p.y=Math.max(5,Math.min(95,p.y+dy));let el=document.getElementById("p"+activePlayer);el.style.left=p.x+"%";el.style.top=p.y+"%";el.classList.remove("still");if(possession==="home"&&Math.hypot(p.x-ballPos.x,p.y-ballPos.y)<7)moveBall(p.x+2,p.y)}
function nearestTeammate(){let p=players[activePlayer],best=-1,dist=999;players.forEach((q,i)=>{if(q.team==="home"&&i!==activePlayer){let d=Math.hypot(q.x-p.x,q.y-p.y);if(d<dist){dist=d;best=i}}});return best}
function pass(through=false){let idx=nearestTeammate();if(idx<0)return;let p=players[idx];moveBall(p.x,p.y);activePlayer=idx;say(through?"A clever through ball splits the space!":"A crisp pass finds a teammate.");possession="home"}
function shoot(){if(possession!=="home"){say("Win the ball before shooting!");return}let p=players[activePlayer];let chance=Math.random();moveBall(96,50+(Math.random()-.5)*30);if(chance<.38){score[0]++;updateScore();say("GOOOOOAL! "+homeClub+" find the net! Cue the celebrations! 🎉")}else say("The shot is away! The goalkeeper makes the save or it flashes wide.");}
function tackle(){let p=players[activePlayer],opp=players.slice(11).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];if(Math.hypot(opp.x-p.x,opp.y-p.y)<18){possession="home";moveBall(p.x,p.y);say("Great challenge! You win the ball cleanly.")}else say("Stay goal-side and close the space.");}
function aiMove(){players.slice(11).forEach((p,i)=>{let targetX=possession==="home"?Math.max(55,p.x-2):Math.min(96,p.x+1);p.x+=(targetX-p.x)*.12;p.y+=(50-p.y)*.025;let el=document.getElementById("p"+(i+11));el.style.left=p.x+"%";el.style.top=p.y+"%"});if(possession==="away"&&Math.random()<.12){possession="home";say("You read the play and recover possession.")}}
function opponentChance(){if(possession==="away"&&Math.random()<.4){score[1]++;updateScore();say("The opposition score. Time to respond!")}else{possession="away";say("The other team builds an attack. Get back and defend!")}}
function updateScore(){document.getElementById("score").textContent=score[0]+" - "+score[1]}
function say(t){document.getElementById("commentary").textContent=t}
function pauseMatch(){paused=!paused;pauseBtn.textContent=paused?"▶ RESUME":"Ⅱ PAUSE";say(paused?"Match paused.":"We're back underway!")}
function lessonStep(d){lesson=Math.max(0,Math.min(lessons.length-1,lesson+d));renderLesson()}
function renderLesson(){let l=lessons[lesson];lessonTitle.textContent=l[0];lessonText.textContent=l[1];lessonCount.textContent=`LESSON ${lesson+1} OF ${lessons.length}`;lessonProgress.style.width=((lesson+1)/lessons.length*100)+"%"}
function renderMoves(){moveGrid.innerHTML="";moveData.forEach(m=>{let d=document.createElement("div");d.className="card";d.innerHTML=`<span class="pill">MOVE GUIDE</span><h3>${m[0]}</h3><p>${m[1]}</p>`;moveGrid.append(d)})}
const keys={arrowup:[0,-2.2],arrowdown:[0,2.2],arrowleft:[-2.2,0],arrowright:[2.2,0],w:[0,-2.2],s:[0,2.2],a:[-2.2,0],d:[2.2,0]};
document.addEventListener("keydown",e=>{if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||(e.repeat&&!keys[e.key.toLowerCase()]))return;let k=actionKey(e);if(keys[k]){e.preventDefault();heldMovement.add(k)}else if(k==="j")pass();else if(k==="l")pass(true);else if(k==="k")shoot();else if(k==="q"){switchNearest()}else if(k==="e"){say("Skill move! A quick feint creates space.");let p=players[activePlayer];p.x=Math.min(95,p.x+3);document.getElementById("p"+activePlayer).style.left=p.x+"%"}else if(k===" "){e.preventDefault();tackle()}});
renderLeagues();renderMoves();renderLesson();

// Day 1: visibly identify the controlled player.
function markControlledPlayer(){document.querySelectorAll("#players .player").forEach((el,i)=>{el.style.outline=i===activePlayer?"2px solid #faff66":"";el.style.borderRadius="5px";});}
const originalResetDay1=resetMatch;resetMatch=function(){originalResetDay1();markControlledPlayer();};
document.addEventListener("keydown",()=>{if(document.getElementById("match").classList.contains("active"))markControlledPlayer();});

 // Day 1 gameplay repair: physical shot travel, possession and pace-aware pursuit.
let flight=null, lastFrame=0, motionUntil=new Map(), awayCarrier=-1;
const resetCore=resetMatch;
resetMatch=function(){flight=null;awayCarrier=-1;motionUntil.clear();resetCore();};
function paintPlayer(i){const p=players[i],el=document.getElementById("p"+i);if(!el)return;el.style.left=p.x+"%";el.style.top=p.y+"%";motionUntil.set(i,performance.now()+180);el.classList.remove("still");}
function distanceToBall(p){return Math.hypot(p.x-ballPos.x,p.y-ballPos.y);}
movePlayer=function(dx,dy){const p=players[activePlayer];if(!p)return;const carrying=possession==="home"&&!flight&&distanceToBall(p)<6;const sprint=heldSprint; if(sprint)stamina=Math.max(0,stamina-Math.hypot(dx,dy)*.35); const speed=p.pace/84*(sprint&&stamina<15?.65:1);p.x=Math.max(4,Math.min(96,p.x+dx*speed));p.y=Math.max(5,Math.min(95,p.y+dy*speed));paintPlayer(activePlayer);if(carrying)moveBall(p.x+2,p.y);};
const oldPass=pass;
pass=function(through=false){if(flight||possession!=="home"||distanceToBall(players[activePlayer])>6){say("Get close to the ball before passing.");return;}oldPass(through);markControlledPlayer();};
shoot=function(){const p=players[activePlayer];if(flight||possession!=="home"||distanceToBall(p)>6){say("Get close to the ball before shooting.");return;}const targetY=50+(Math.random()-.5)*(p.x>70?20:48);flight={x:ballPos.x,y:ballPos.y,targetY,side:"home",awardShooter:activePlayer,elapsed:0,duration:Math.max(.25,(98-ballPos.x)/65)};say("Shot on goal!");};
function restartAfterGoal(side){const i=side==="home"?20:9;players[i].x=side==="home"?52:48;players[i].y=50;paintPlayer(i);possession=side==="home"?"away":"home";awayCarrier=side==="home"?i:-1;if(side==="away")activePlayer=i;moveBall(50,50);markControlledPlayer();}
tackle=function(){const p=players[activePlayer];if(!flight&&possession==="away"&&distanceToBall(p)<5){possession="home";awayCarrier=-1;moveBall(p.x+2,p.y);say("Clean tackle!");}else say("Close down the ball carrier first.");};
function chase(i,x,y,dt){const p=players[i],dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);if(d<.8)return;const step=Math.min(d,dt*13*p.pace/84*(i>=11?difficultyFactor():1));p.x+=dx/d*step;p.y+=dy/d*step;paintPlayer(i);}
function gameplayFrame(now){requestAnimationFrame(gameplayFrame);const dt=Math.min(.05,(now-lastFrame)/1000||0);lastFrame=now;if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||players.length!==22)return;
for(let i=0;i<22;i++){if((motionUntil.get(i)||0)<now)document.getElementById("p"+i)?.classList.add("still");}
if(restartMode){restartFrame(now,dt);return;}
if(kickoffSide){if(kickoffSide==="away"&&now>kickoffAt)releaseKickoff();return;}
if(flight){const f=flight;const ki=f.side==="home"?11:0;chase(ki,f.side==="home"?95:5,Math.max(38,Math.min(62,f.targetY)),dt*2.2);if(Math.abs(players[ki].y-f.targetY)>3)animateMove(ki,"ofDive");f.elapsed+=dt;const t=Math.min(1,f.elapsed/f.duration);moveBall(f.x+((f.side==="home"?98:2)-f.x)*t,f.y+(f.targetY-f.y)*t);if(t===1){flight=null;const keeper=players[f.side==="home"?11:0];if(Math.min(Math.abs(f.targetY-37),Math.abs(f.targetY-63))<1.2){say("Off the post!");rebound(f);return;}if(f.targetY>37&&f.targetY<63&&Math.abs(keeper.y-f.targetY)<2.5){stats.saves++;awardRows[ki].saves++;if(Math.random()<.35){startCorner(f.side,f.targetY);return;}say("Goalkeeper catches the ball!");keeperRestart(f.side);return;}if(f.targetY>37&&f.targetY<63){score[f.side==="home"?0:1]++;const scorer=f.awardShooter;if(Number.isInteger(scorer)&&awardRows[scorer]){awardRows[scorer].goals++;if(f.side==="home"&&awardLastPass&&awardLastPass.to===scorer&&awardLastPass.from!==scorer)awardRows[awardLastPass.from].assists++;}awardLastPass=null;updateScore();say("GOAL! "+(f.side==="home"?homeClub:awayClub));restartAfterGoal(f.side);}else{say("Shot wide — goal kick!");keeperRestart(f.side);}}return;}
updateControl(now);supportAI(dt);if(possession==="home"){let i=12;for(let j=13;j<22;j++)if(distanceToBall(players[j])<distanceToBall(players[i]))i=j;chase(i,ballPos.x,ballPos.y,dt*.72);if(now>controlGrace&&distanceToBall(players[i])<1.35){possession="away";awayCarrier=i;say("The defender wins possession!");}}
else{if(awayCarrier<11)awayCarrier=17;const p=players[awayCarrier],space=q=>Math.min(...players.slice(1,11).map(o=>Math.hypot(o.x-q.x,o.y-q.y)));const pressure=space(p);
if(now>nextAIPass&&p.x>22){let best=-1,value=-Infinity;for(let i=12;i<22;i++){if(i===awayCarrier)continue;const q=players[i],dx=p.x-q.x,d=Math.hypot(q.x-p.x,q.y-p.y);if(d<8||d>40||dx<3||space(q)<4||offsideAt(p,q,"away"))continue;const v=dx*1.3+space(q)-d*.2;if(v>value){value=v;best=i;}}if(best>=0&&(pressure<9||p.x>55)){nextAIPass=now+1800;awardRows[awayCarrier].passes++;awayCarrier=best;moveBall(players[best].x-1,players[best].y);say("Opponent finds an open teammate.");return;}}
let heading=0,bestSpace=-Infinity;for(const h of [-.65,0,.65]){const q={x:Math.max(5,p.x-8),y:Math.max(8,Math.min(92,p.y+h*8))};const v=space(q)-Math.abs(q.y-50)*.15;if(v>bestSpace){bestSpace=v;heading=h;}}chase(awayCarrier,Math.max(5,p.x-8),Math.max(8,Math.min(92,p.y+heading*8)),dt);moveBall(p.x-1,p.y);
if(p.x<22&&Math.abs(p.y-50)<28){const keeper=players[0];flight={x:ballPos.x,y:ballPos.y,targetY:(keeper.y>50?43:57)+(Math.random()-.5)*12,side:"away",awardShooter:awayCarrier,elapsed:0,duration:.4};say("Opponent shoots!");}}
}
requestAnimationFrame(gameplayFrame);

 // Optional Day 1 extras, no audio changes.
const stats={shots:0,passes:0,saves:0,homeTime:0,totalTime:0};
let difficulty="Amateur",training=false,chargeStart=0,aim=[1,0];
try{difficulty=localStorage.getItem("ofDifficulty")||"Amateur";}catch(e){}
function difficultyFactor(){return ({Beginner:.65,Amateur:1,Professional:1.25,"World Class":1.4,Legendary:1.5})[difficulty]||1;}
const extraPanel=document.createElement("div");extraPanel.className="card";extraPanel.innerHTML='<div class="toolbar"><label>Difficulty <select id="ofDifficulty"><option>Beginner</option><option>Amateur</option><option>Professional</option><option>World Class</option><option>Legendary</option></select></label><button id="ofTraining">Training arena</button><button id="ofExitMatch">Exit match</button></div><div>Stamina <progress id="ofEnergy" max="100" value="100"></progress> Shot power <progress id="ofPower" max="100" value="0"></progress></div><canvas id="ofRadar" width="220" height="120" style="max-width:100%;margin-top:10px"></canvas><p id="ofStats"></p>';
document.getElementById("match").append(extraPanel);
const difficultySelect=document.getElementById("ofDifficulty");difficultySelect.value=difficulty;difficultySelect.onchange=()=>{difficulty=difficultySelect.value;try{localStorage.setItem("ofDifficulty",difficulty)}catch(e){}};
document.getElementById("ofExitMatch").onclick=()=>{training=false;show("home")};
document.getElementById("ofTraining").onclick=()=>{resetMatch();training=true;players[activePlayer].x=75;players[activePlayer].y=50;paintPlayer(activePlayer);moveBall(77,50);say("Training: practise shots and passes.");};
const resetExtras=resetMatch;resetMatch=function(){training=false;Object.keys(stats).forEach(k=>stats[k]=0);chargeStart=0;resetExtras();};
const moveExtras=movePlayer;movePlayer=function(dx,dy){aim=[dx,dy];moveExtras(dx,dy);};
nearestTeammate=function(){const p=players[activePlayer];let best=-1,cost=Infinity;players.forEach((q,i)=>{if(q.team!=="home"||i===activePlayer)return;const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy),dot=(dx*aim[0]+dy*aim[1])/(Math.max(.01,d*Math.hypot(...aim)));const c=d-18*dot;if(c<cost){cost=c;best=i;}});return best;};
const passExtras=pass;pass=function(t){const before=activePlayer;passExtras(t);if(before!==activePlayer)stats.passes++;};
const shootExtras=shoot;shoot=function(){if(!chargeStart)chargeStart=performance.now();};
document.addEventListener("keyup",e=>{if(actionKey(e)!=="k"||!chargeStart)return;const power=Math.min(1,(performance.now()-chargeStart)/900);chargeStart=0;if(paused||seconds>=matchDuration||!document.getElementById("match").classList.contains("active"))return;shootExtras();if(flight&&flight.side==="home"){flight.duration*=1.3-.65*power;stats.shots++;}});
window.addEventListener("blur",()=>{chargeStart=0;});
const chaseExtras=chase;chase=function(i,x,y,dt){if(training&&i>=12)return;chaseExtras(i,x,y,dt);};
const radar=document.getElementById("ofRadar"),ctx=radar.getContext("2d");
function extraFrame(){requestAnimationFrame(extraFrame);if(!document.getElementById("match").classList.contains("active")||players.length!==22)return;document.getElementById("ofEnergy").value=stamina;document.getElementById("ofPower").value=chargeStart?Math.min(100,(performance.now()-chargeStart)/9):0;document.getElementById("stamina").textContent=Math.round(stamina)+"%";if(!paused&&seconds<matchDuration){stats.totalTime++;if(possession==="home")stats.homeTime++;}ctx.fillStyle="#176b42";ctx.fillRect(0,0,220,120);ctx.strokeStyle="#fff";ctx.strokeRect(4,4,212,112);ctx.beginPath();ctx.moveTo(110,4);ctx.lineTo(110,116);ctx.stroke();players.forEach((p,i)=>{ctx.fillStyle=i===activePlayer?"#ffff44":p.team==="home"?"#63caff":"#ff6868";ctx.beginPath();ctx.arc(p.x*2.2,p.y*1.2,3,0,Math.PI*2);ctx.fill();});ctx.fillStyle="white";ctx.fillRect(ballPos.x*2.2-2,ballPos.y*1.2-2,4,4);document.getElementById("ofStats").textContent="Shots: "+stats.shots+" · Passes: "+stats.passes+" · Saves: "+stats.saves+" · Possession: "+Math.round(100*stats.homeTime/Math.max(1,stats.totalTime))+"%";}
requestAnimationFrame(extraFrame);

function kitPattern(club,kit,c){if(club==="Barcelona")return kit==="home"?`repeating-linear-gradient(90deg,${c[0]} 0 25%,${c[1]} 25% 50%)`:`radial-gradient(circle at 50% 43%,#f6dc46 0 9%,transparent 10%),linear-gradient(110deg,${c[0]} 35%,${c[1]} 50%,${c[0]} 65%)`;return `linear-gradient(90deg,${c[0]} 0 48%,${c[1]} 48% 55%,${c[0]} 55%)`;}

 // Frame-based keyboard movement independent of keyboard repeat rate.
const heldMovement=new Set();let heldSprint=false, movementTime=0, vx=0,vy=0;
document.addEventListener("keydown",e=>{if(e.key==="Shift")heldSprint=true;});
document.addEventListener("keyup",e=>{heldMovement.delete(e.key.toLowerCase());if(e.key==="Shift")heldSprint=false;});
window.addEventListener("blur",()=>{heldMovement.clear();heldSprint=false;vx=vy=0;});
function smoothMovement(now){requestAnimationFrame(smoothMovement);const dt=Math.min(.04,(now-movementTime)/1000||0);movementTime=now;
if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||players.length!==22){heldMovement.clear();vx=vy=0;return;}
let x=0,y=0;for(const k of heldMovement){x+=keys[k][0];y+=keys[k][1];}const d=Math.hypot(x,y),speed=heldSprint?18:11;const blend=1-Math.exp(-dt*18);vx+=( (d?x/d*speed:0)-vx)*blend;vy+=((d?y/d*speed:0)-vy)*blend;if(Math.hypot(vx,vy)>.35)movePlayer(vx*dt,vy*dt);
}
requestAnimationFrame(smoothMovement);
const smoothStyle=document.createElement("style");smoothStyle.textContent=".player{transition:none}";document.head.append(smoothStyle);

let kickoffSide=null,kickoffAt=0,nextSkill=0,skillUntil=0,skillDirection=1,nextAIPass=0;
const shape=[[5,50],[19,18],[18,39],[18,61],[19,82],[32,25],[32,50],[32,75],[44,18],[48,50],[44,82]];
function place(i,x,y){players[i].x=x;players[i].y=y;paintPlayer(i);motionUntil.set(i,0);}
function setupKickoff(side){kickoffSide=side;kickoffAt=performance.now()+1500;flight=null;possession=side;awayCarrier=side==="away"?20:-1;activePlayer=9;players.forEach((p,i)=>{let [x,y]=shape[i%11];place(i,i<11?x:100-x,y);});moveBall(50,50);vx=vy=0;heldMovement.clear();markControlledPlayer();say(side==="home"?"KICKOFF — press J to start play.":"Opponent kickoff");}
function releaseKickoff(){let side=kickoffSide;kickoffSide=null;if(side==="home"){activePlayer=6;moveBall(players[6].x+2,players[6].y);markControlledPlayer();}else{awayCarrier=17;moveBall(players[17].x-1,players[17].y);}say("Kickoff!");}
const resetKickoff=resetMatch;resetMatch=function(){resetKickoff();setupKickoff("home");};
restartAfterGoal=function(side){setupKickoff(side==="home"?"away":"home");};
const passKickoff=pass;pass=function(t){if(kickoffSide==="home"){releaseKickoff();stats.passes++;return;}if(!kickoffSide)passKickoff(t);};
const moveKickoff=movePlayer;movePlayer=function(dx,dy){if(!kickoffSide||training)moveKickoff(dx,dy);};
function switchNearest(){if(kickoffSide)return;let best=-1,d=Infinity;for(let i=0;i<11;i++){if(i===activePlayer)continue;let n=distanceToBall(players[i]);if(n<d){d=n;best=i;}}if(best>=0){activePlayer=best;markControlledPlayer();say("Player "+(best+1)+" selected.");}}
function keeperRestart(side){let i=side==="home"?11:0;possession=side==="home"?"away":"home";awayCarrier=i===11?11:-1;if(i===0)activePlayer=0;moveBall(players[i].x,players[i].y);markControlledPlayer();}
function supportAI(dt){if(training)return;for(let i=12;i<22;i++){if(i===awayCarrier||distanceToBall(players[i])<12)continue;let [x,y]=shape[i%11];chase(i,Math.max(8,Math.min(92,100-x+(ballPos.x-50)*.45)),y,dt*.45);}if(possession==="away"&&awayCarrier===11){awayCarrier=17;moveBall(players[17].x-1,players[17].y);}}
function animateMove(i,c){let el=document.getElementById("p"+i);if(!el||el.classList.contains(c))return;el.classList.add(c);setTimeout(()=>el.classList.remove(c),500);}
const animStyle=document.createElement("style");animStyle.textContent="@keyframes ofFeint{0%,100%{rotate:0deg}25%{rotate:-22deg}65%{rotate:22deg}}@keyframes ofDive{0%,100%{rotate:0deg}50%{rotate:65deg}}.ofFeint{animation:ofFeint .5s ease}.ofDive{animation:ofDive .5s ease}.ofFeint .legs{animation:ofFeint .25s alternate 2}";document.head.append(animStyle);
const trainingStart=document.getElementById("ofTraining").onclick;document.getElementById("ofTraining").onclick=()=>{trainingStart();kickoffSide=null;};
const switchButton=document.createElement("button");switchButton.textContent="Switch player (Q)";switchButton.onclick=switchNearest;extraPanel.querySelector(".toolbar").append(switchButton);

let restartMode=null,restartTime=0;
const resetSetPieces=resetMatch;resetMatch=function(){restartMode=null;resetSetPieces();};
function rebound(f){let x=f.side==="home"?88:12,y=Math.max(8,Math.min(92,f.targetY+(f.targetY<50?-7:7)));moveBall(x,y);let best=0;for(let i=1;i<22;i++)if(distanceToBall(players[i])<distanceToBall(players[best]))best=i;possession=players[best].team;awayCarrier=best>=11?best:-1;if(best<11)activePlayer=best;moveBall(players[best].x,players[best].y);markControlledPlayer();}
keeperRestart=function(side){let i=side==="home"?11:0;possession=side==="home"?"away":"home";awayCarrier=i===11?11:-1;if(i===0)activePlayer=0;moveBall(players[i].x,players[i].y);restartMode="keeper";restartTime=performance.now()+1800;markControlledPlayer();say(i===0?"Keeper has the ball — J to distribute.":"Opponent keeper prepares to distribute.");};
function startCorner(side,y){possession=side;let i=side==="home"?8:19;place(i,side==="home"?96:4,y<50?4:96);moveBall(players[i].x,players[i].y);if(side==="home")activePlayer=i;else awayCarrier=i;restartMode="corner";restartTime=performance.now()+1800;markControlledPlayer();say(side==="home"?"CORNER KICK — press J to cross.":"Opponent corner kick");}
function restartFrame(now,dt){let home=possession==="home";for(let i=1;i<11;i++){if(i===activePlayer)continue;let [x,y]=shape[i];chase(i,restartMode==="corner"&&home?Math.min(90,x+40):x+8,y,dt*.6);}for(let i=12;i<22;i++){if(i===awayCarrier)continue;let q=players[i-11];chase(i,Math.max(10,Math.min(90,q.x+(home?5:-5))),q.y,dt*.65);}if(!home&&now>restartTime)distributeRestart();}
function distributeRestart(){let home=possession==="home",mode=restartMode,corner=restartMode==="corner";let i=home?(corner?9:6):(corner?20:17);restartMode=null;moveBall(players[i].x,players[i].y);if(home)activePlayer=i;else awayCarrier=i;markControlledPlayer();say(corner?"Corner delivered!":mode==="throw"?"Throw-in taken!":mode==="free"?"Free kick taken!":"Keeper distributes the ball.");}
const setPass=pass;pass=function(t){if(restartMode){if(possession==="home"){distributeRestart();stats.passes++;}return;}setPass(t);};
const setMove=movePlayer;movePlayer=function(dx,dy){if(!restartMode){const p=players[activePlayer];if(!kickoffSide&&possession==="home"&&distanceToBall(p)<6&&(p.y+dy<5||p.y+dy>95)){startThrow("away",p.x,p.y<50?3:97);return;}setMove(dx,dy);}};
const setTackle=tackle;tackle=function(){if(!restartMode)setTackle();};
const setShoot=shoot;shoot=function(){if(!restartMode)setShoot();};
const setSwitch=switchNearest;switchNearest=function(){if(!restartMode)setSwitch();};

function startThrow(side,x,y){possession=side;let i=side==="home"?8:19;place(i,x,y);moveBall(x,y);if(side==="home")activePlayer=i;else awayCarrier=i;restartMode="throw";restartTime=performance.now()+1800;markControlledPlayer();say(side==="home"?"THROW-IN — press J":"Opponent throw-in");}
const OFFSIDE_ENABLED=false;
function offsideAt(p,q,side){if(!OFFSIDE_ENABLED)return false;const defenders=players.filter(z=>z.team!==side).map(z=>z.x).sort((a,b)=>side==="home"?b-a:a-b);return side==="home"?q.x>50&&q.x>Math.max(p.x,defenders[1]):q.x<50&&q.x<Math.min(p.x,defenders[1]);}
const rulesPass=pass;pass=function(t){if(!restartMode&&!kickoffSide&&!flight&&possession==="home"&&distanceToBall(players[activePlayer])<6){let i=nearestTeammate();if(i>=0&&offsideAt(players[activePlayer],players[i],"home")){let q=players[i];possession="away";awayCarrier=17;place(17,q.x,q.y);moveBall(q.x,q.y);restartMode="free";restartTime=performance.now()+1800;say("OFFSIDE — indirect free kick");return;}}rulesPass(t);};

// Home settings and quick opponent selection; session-only preferences.
function randomOpponent(){const pool=(LEAGUES[league]||Object.values(LEAGUES).flat()).filter(n=>n!==homeClub);if(!pool.length)return;awayClub=pool[Math.floor(Math.random()*pool.length)];setupKits();}
function setMatchDuration(value){const n=Number(value);if([180,300,600].includes(n))matchDuration=n;}

let controlGrace=0, lastControlSide=null,lastControlPlayer=-1,lastAutoSwitch=0;
function updateControl(now){
 if(possession==="home"&&(lastControlSide!=="home"||lastControlPlayer!==activePlayer))controlGrace=now+1000;
 if(possession==="away"&&now-lastAutoSwitch>850&&ballPos.x<55){
 let best=1;for(let i=2;i<11;i++)if(distanceToBall(players[i])<distanceToBall(players[best]))best=i;
 if(activePlayer===0||distanceToBall(players[activePlayer])>distanceToBall(players[best])+3){activePlayer=best;markControlledPlayer();lastAutoSwitch=now;}
 }
 lastControlSide=possession;lastControlPlayer=activePlayer;
}
const supportBeforeFix=supportAI;
supportAI=function(dt){
 supportBeforeFix(dt);if(possession==="away"&&!training){for(let i=12;i<22;i++){if(i===awayCarrier)continue;const [x,y]=shape[i%11];const tx=Math.max(7,Math.min(93,100-x+(ballPos.x-50)*.55-((i%11)>=6?9:0)));chase(i,tx,Math.max(7,Math.min(93,y+Math.sin(performance.now()/1600+i)*5)),dt*.55);}}if(training)return;
 const t=performance.now()/1000, attacking=possession==="home";
 const carrier=players[activePlayer];if(!carrier)return;
 for(let i=1;i<11;i++){if(i===activePlayer)continue;
 const [x,y]=shape[i],p=players[i],phase=t*.38+i*2.39;
 let tx=x+(ballPos.x-50)*.35,ty=y+(ballPos.y-50)*.18;
 if(attacking){
 const role=(i+Math.floor(t/12))%4;
 const dx=[-19,17,4,29][role],dy=[5,-9,22,-18][role];
 const blend=i<5?.30:.72;
 tx=tx*(1-blend)+(carrier.x+dx+Math.sin(phase)*9)*blend;
 ty=ty*(1-blend)+(carrier.y+dy+Math.cos(phase*.8)*11)*blend;
 }else{tx+=Math.sin(phase)*7;ty+=Math.cos(phase)*8;}
 for(let j=1;j<11;j++){if(j===i)continue;const q=players[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);if(d<9&&d>.01){tx+=dx/d*(9-d);ty+=dy/d*(9-d);}}
 chase(i,Math.max(7,Math.min(92,tx)),Math.max(7,Math.min(93,ty)),dt*.85);
 }
};
const nearestBeforeFix=nearestTeammate;
let throughIntent=false, autoPassTarget=-1;
let autoRecent=[],autoCarryUntil=0;
nearestTeammate=function(){
 const p=players[activePlayer];if(!p)return nearestBeforeFix();if(autoPassTarget>0&&autoPassTarget!==activePlayer)return autoPassTarget;
 let best=-1,cost=Infinity;
 for(let i=1;i<11;i++){if(i===activePlayer)continue;const q=players[i],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);const space=Math.min(...players.slice(11).map(o=>Math.hypot(o.x-q.x,o.y-q.y)));const direction=(dx*aim[0]+dy*aim[1])/Math.max(1,d*Math.hypot(...aim));const c=d-12*direction-2*Math.min(space,15)-(throughIntent?dx*.7:0);if(c<cost){cost=c;best=i;}}
 return best;
};
const passBeforeFix=pass;
pass=function(t){throughIntent=!!t;try{passBeforeFix(t);}finally{throughIntent=false;}if(possession==="home")controlGrace=performance.now()+1000;};
const resetBeforeFix=resetMatch;
resetMatch=function(){lastControlSide=null;lastControlPlayer=-1;lastAutoSwitch=0;controlGrace=0;resetBeforeFix();};

/* Experimental automatic play; manual input always takes priority. */
let autoPlaying=false,autoLastInput=performance.now(),autoLastFrame=0,autoActionAt=0;
const autoPointers=new Set();
function setAuto(on){if(on&&!autoPlaying){autoRecent=[];autoCarryUntil=performance.now()+900;}autoPlaying=on;if(!on)autoLastInput=performance.now();}
function autoManual(){setAuto(false);}
document.addEventListener("keydown",e=>{if(e.key.toLowerCase() in keys||/^[a-z ]$/i.test(e.key)||e.key==="Shift")autoManual();},true);
document.getElementById("match").addEventListener("pointerdown",e=>{autoPointers.add(e.pointerId);autoManual();},true);
document.addEventListener("pointermove",e=>{if(autoPointers.has(e.pointerId))autoManual();},true);
for(const event of ["pointerup","pointercancel","lostpointercapture"])document.addEventListener(event,e=>{if(autoPointers.delete(e.pointerId))autoManual();},true);
window.addEventListener("blur",()=>{autoPointers.clear();autoManual();});
const autoReset=resetMatch;resetMatch=function(){autoReset();setAuto(false);autoActionAt=0;autoPointers.clear();autoWasEligible=false;};
let autoWasEligible=false;
function autoFrame(now){requestAnimationFrame(autoFrame);const dt=Math.min(.04,(now-autoLastFrame)/1000||0);autoLastFrame=now;
if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||players.length!==22||training||document.hidden){autoWasEligible=false;setAuto(false);return;}
if(!autoWasEligible){autoWasEligible=true;setAuto(false);return;}
if(heldMovement.size||heldSprint||autoPointers.size){autoManual();return;}
if(!autoPlaying&&performance.now()-autoLastInput>=7000)setAuto(true);
if(!autoPlaying||flight)return;
if(kickoffSide||restartMode){if(possession==="home"&&now>autoActionAt){pass(false);autoActionAt=now+900;}return;}
let p=players[activePlayer];if(possession==="away"){autoRecent=[];autoCarryUntil=now+900;let best=1;for(let i=2;i<11;i++)if(distanceToBall(players[i])<distanceToBall(players[best]))best=i;if(activePlayer!==best){activePlayer=best;markControlledPlayer();}p=players[activePlayer];const dx=ballPos.x-p.x,dy=ballPos.y-p.y,d=Math.hypot(dx,dy);if(d>2)movePlayer(dx/d*dt*13,dy/d*dt*13);if(d<4&&now>autoActionAt){tackle();autoActionAt=now+650;}return;}
if(distanceToBall(p)>6){const dx=ballPos.x-p.x,dy=ballPos.y-p.y,d=Math.hypot(dx,dy);movePlayer(dx/d*dt*12,dy/d*dt*12);return;}
const opponents=players.slice(11),space=q=>Math.min(...opponents.map(o=>Math.hypot(o.x-q.x,o.y-q.y)));
const pressure=space(p);
if(p.x>73&&Math.abs(p.y-50)<27&&now>autoActionAt){shootExtras();if(flight)stats.shots++;autoActionAt=now+1500;autoRecent=[];return;}
if(now>autoActionAt&&now>autoCarryUntil&&(pressure<6||p.x<65)){
 let best=-1,bestValue=-Infinity;
 for(let i=1;i<11;i++){if(i===activePlayer||autoRecent.includes(i))continue;const q=players[i],dx=q.x-p.x,d=Math.hypot(dx,q.y-p.y);if(d<8||d>45||dx<5||space(q)<5)continue;const value=dx*1.5+space(q)*1.2-d*.25;if(value>bestValue){bestValue=value;best=i;}}
 if(best>=0){const from=activePlayer;autoPassTarget=best;try{pass(true);}finally{autoPassTarget=-1;}if(activePlayer!==from){autoRecent.push(from);if(autoRecent.length>3)autoRecent.shift();autoCarryUntil=now+1600;autoActionAt=now+1800;return;}}
}
let bestHeading=0,bestClearance=-Infinity;
for(const heading of [-.65,0,.65]){const q={x:Math.min(94,p.x+8),y:Math.max(8,Math.min(92,p.y+heading*8))};const value=space(q)-Math.abs(q.y-50)*.12;if(value>bestClearance){bestClearance=value;bestHeading=heading;}}
movePlayer(dt*12,dt*12*bestHeading);
}
requestAnimationFrame(autoFrame);

/* Individual awards prototype: observed match events only. */
let awardRows=Array.from({length:22},()=>({goals:0,assists:0,passes:0,tackles:0,saves:0})),awardLastPass=null;
const awardPanel=document.createElement("section");awardPanel.hidden=true;awardPanel.style.cssText="padding:12px;border:1px solid #777;border-radius:10px;margin:10px 0";document.getElementById("match").append(awardPanel);
const awardReset=resetMatch;resetMatch=function(){awardRows=Array.from({length:22},()=>({goals:0,assists:0,passes:0,tackles:0,saves:0}));awardLastPass=null;awardPanel.hidden=true;awardReset();};
const awardPass=pass;pass=function(t){const from=activePlayer,was=possession;awardPass(t);if(was==="home"&&possession==="home"&&from!==activePlayer&&awardRows[from]){awardRows[from].passes++;awardLastPass={from,to:activePlayer};}};
const awardTackle=tackle;tackle=function(){const was=possession;awardTackle();if(was==="away"&&possession==="home"&&awardRows[activePlayer]){awardRows[activePlayer].tackles++;awardLastPass=null;}};
const awardTick=tick;tick=function(){awardTick();if(seconds<matchDuration||!awardPanel.hidden)return;const ranked=awardRows.map((a,i)=>({a,i,points:a.goals*5+a.assists*3+a.saves*2+a.tackles*2+a.passes*.25})).sort((a,b)=>b.points-a.points);const best=ranked[0];awardPanel.replaceChildren();const h=document.createElement("h3");h.textContent="PLAYER OF THE MATCH";awardPanel.append(h);const line=document.createElement("p");line.textContent=best.points>0?(best.i<11?homeClub:awayClub)+" • Player "+(best.i%11+1)+" — "+best.a.goals+" goals, "+best.a.assists+" assists, "+best.a.passes+" passes, "+best.a.tackles+" tackles, "+best.a.saves+" saves":"No recorded individual performance yet.";awardPanel.append(line);awardPanel.hidden=false;};

/* Day 2 additional playable previews */
const actionDefaults={j:"j",l:"l",k:"k"," ":" "};
let actionBindings={...actionDefaults};
try{const saved=JSON.parse(localStorage.getItem("ofActionBindings"));if(saved)actionBindings={...actionDefaults,...saved};}catch(e){}
function actionKey(e){const k=e.key.toLowerCase();if(!e.isTrusted)return k;for(const a of Object.keys(actionBindings))if(actionBindings[a]===k)return a;return Object.hasOwn(actionDefaults,k)?"__unused":k;}
(()=>{
const hub=document.getElementById("ofExtras"),grid=hub.querySelector(".grid");
const el=(tag,parent,txt)=>{const n=document.createElement(tag);if(txt)n.textContent=txt;parent.append(n);return n;};
const panel=name=>{const p=el("details",grid);p.className="card";el("summary",p,name);return p;};
const btn=(p,t,f)=>{const b=el("button",p,t);b.type="button";b.onclick=f;return b;};
const select=(p,items)=>{const n=el("select",p);for(const t of items)el("option",n,t);return n;};
const controls=panel("Custom action keys"),inputs={};
for(const [k,name] of Object.entries({j:"Pass",l:"Through pass",k:"Shoot"," ":"Tackle"})){const l=el("label",controls,name+" ");const i=el("input",l);i.size=3;i.maxLength=1;i.value=actionBindings[k];inputs[k]=i;}
const msg=el("p",controls);
btn(controls,"Apply action keys",()=>{const vals=Object.values(inputs).map(i=>i.value.toLowerCase());if(vals.some(k=>!k||k in keys||["q","e"].includes(k))||new Set(vals).size!==4){msg.textContent="Choose four distinct keys, not movement, Q or E.";return;}Object.keys(inputs).forEach((k,i)=>actionBindings[k]=vals[i]);try{localStorage.setItem("ofActionBindings",JSON.stringify(actionBindings));}catch(e){}msg.textContent="Saved. Touch buttons keep their original actions.";});
btn(controls,"Restore defaults",()=>{actionBindings={...actionDefaults};Object.keys(inputs).forEach(k=>inputs[k].value=actionBindings[k]);try{localStorage.removeItem("ofActionBindings");}catch(e){}msg.textContent="Defaults restored.";});
const diff=panel("Match difficulty"),ds=select(diff,["Beginner","Amateur","Professional","World Class","Legendary"]);ds.value=difficulty;ds.onchange=()=>{difficultySelect.value=ds.value;difficultySelect.onchange();};
const statPanel=el("div",document.getElementById("match"));statPanel.className="card";const statText=el("p",statPanel);
let homeShots=0,awayShots=0,lastFlight=null;
const oldReset=resetMatch;resetMatch=function(){homeShots=awayShots=0;lastFlight=null;oldReset();};
function statFrame(){requestAnimationFrame(statFrame);if(!document.getElementById("match").classList.contains("active"))return;if(flight&&flight!==lastFlight){if(flight.side==="home")homeShots++;else awayShots++;}lastFlight=flight;const h=awardRows.slice(0,11),a=awardRows.slice(11),sum=(rows,k)=>rows.reduce((n,p)=>n+p[k],0),pos=stats.totalTime?Math.round(100*stats.homeTime/stats.totalTime):50;statText.textContent="MATCH STATS | Possession "+pos+"% / "+(100-pos)+"% | Shots "+homeShots+" / "+awayShots+" | Saves "+sum(h,"saves")+" / "+sum(a,"saves")+" | Home passes "+stats.passes+" | Home tackles won "+sum(h,"tackles");}requestAnimationFrame(statFrame);
const pen=panel("Penalty shootout");pen.id="ofPenaltyShootout";const shortcut=document.createElement("button");shortcut.textContent="⚽ Penalty Shootout";shortcut.type="button";shortcut.onclick=()=>{hub.open=true;pen.open=true;pen.scrollIntoView({block:"nearest"});};hub.parentNode.insertBefore(shortcut,hub);const penText=el("p",pen,"Start a five-kick shootout."),aims=["Left","Centre","Right"];let kicks=0,ph=0,pa=0,phase="idle";
const renderPen=()=>{penText.textContent="You "+ph+" – "+pa+" Opponent | Round "+Math.min(kicks+1,5)+(kicks>=5?" (sudden death if tied)":"")+" | "+phase;};
btn(pen,"Start shootout",()=>{kicks=ph=pa=0;phase="Shoot";renderPen();});
for(const dir of aims)btn(pen,dir,()=>{if(phase==="Shoot"){if(dir!==aims[Math.floor(Math.random()*3)])ph++;phase="Save";}else if(phase==="Save"){if(dir!==aims[Math.floor(Math.random()*3)])pa++;kicks++;phase=(kicks>=5&&ph!==pa)||(kicks<5&&Math.abs(ph-pa)>5-kicks)?(ph>pa?"You win!":"Opponent wins!"):"Shoot";}renderPen();});
const tour=panel("Custom knockout tournament"),clubs=Object.values(LEAGUES).flat(),picks=Array.from({length:4},(_,i)=>{const n=select(tour,clubs);n.selectedIndex=i;return n;}),tmsg=el("p",tour);let bracket=null;
btn(tour,"Create tournament",()=>{const c=picks.map(n=>n.value);if(new Set(c).size!==4){tmsg.textContent="Select four different clubs.";return;}bracket={home:c[0],opponent:c[1],other:c.slice(2),round:1,playing:false};tmsg.textContent="Semifinal: "+c[0]+" vs "+c[1]+"; "+c[2]+" vs "+c[3];});
btn(tour,"Play next round",()=>{if(!bracket||bracket.playing||bracket.round>2)return;homeClub=bracket.home;awayClub=bracket.opponent;setupKits();startMatch();bracket.playing=true;});
const oldTick=tick;tick=function(){oldTick();if(!bracket||!bracket.playing||seconds<matchDuration)return;bracket.playing=false;if(homeClub!==bracket.home||awayClub!==bracket.opponent)return;if(score[0]===score[1]){tmsg.textContent="Draw: replay this round to decide the winner.";return;}if(score[0]<score[1]){bracket.round=3;tmsg.textContent="Eliminated by "+awayClub;return;}if(bracket.round===1){bracket.round=2;bracket.opponent=bracket.other[Math.floor(Math.random()*2)];tmsg.textContent="Final: "+bracket.home+" vs "+bracket.opponent+" (other semifinal simulated).";}else{bracket.round=3;tmsg.textContent="🏆 Champion: "+bracket.home;}};
const drill=panel("Playable skill drills"),mode=select(drill,["Shooting","Passing","Dribbling"]),canvas=el("canvas",drill);canvas.width=300;canvas.height=180;canvas.style.cssText="width:100%;max-width:300px;touch-action:none";const c=canvas.getContext("2d"),dm=el("p",drill);let points=0,attempts=0,target={x:240,y:90},ball={x:40,y:90},running=false;
function draw(){c.fillStyle="#176b42";c.fillRect(0,0,300,180);c.strokeStyle="white";c.strokeRect(5,5,290,170);c.fillStyle="#ffae38";c.beginPath();c.arc(target.x,target.y,15,0,Math.PI*2);c.fill();c.fillStyle="white";c.beginPath();c.arc(ball.x,ball.y,7,0,Math.PI*2);c.fill();dm.textContent=points+" points / "+attempts+" attempts. "+(running?"Tap the orange target.":"Start a drill.");}
btn(drill,"Start drill",()=>{points=attempts=0;running=true;ball={x:40,y:90};target={x:240,y:90};draw();});
canvas.addEventListener("pointerdown",e=>{if(!running)return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*300/r.width,y=(e.clientY-r.top)*180/r.height;attempts++;if(Math.hypot(x-target.x,y-target.y)<19)points++;ball={x,y};target={x:mode.value==="Shooting"?270:30+Math.random()*240,y:25+Math.random()*130};if(attempts>=10)running=false;draw();});draw();
})();

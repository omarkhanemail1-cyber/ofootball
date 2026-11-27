
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
function movePlayer(dx,dy){let p=players[activePlayer];p.x=Math.max(2,Math.min(98,p.x+dx));p.y=Math.max(3,Math.min(97,p.y+dy));let el=document.getElementById("p"+activePlayer);el.style.left=p.x+"%";el.style.top=p.y+"%";el.classList.remove("still");if(possession==="home"&&Math.hypot(p.x-ballPos.x,p.y-ballPos.y)<7)moveBall(p.x+.55,p.y)}
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
document.addEventListener("keydown",e=>{if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||(e.repeat&&!keys[e.key.toLowerCase()]))return;let k=actionKey(e);if(keys[k]){e.preventDefault();heldMovement.add(k)}else if(k==="j")pass();else if(k==="l")pass(true);else if(k==="k")shoot();else if(k==="q"){switchNearest()}else if(k==="e"){say("Skill move! A quick feint creates space.");if(activePlayer!==0&&possession==="home"&&!flight)animateMove(activePlayer,"ofFeint")}else if(k===" "){e.preventDefault();tackle()}});
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
movePlayer=function(dx,dy){const p=players[activePlayer];if(!p)return;const carrying=possession==="home"&&!flight&&distanceToBall(p)<6;const sprint=heldSprint; if(sprint)stamina=Math.max(0,stamina-Math.hypot(dx,dy)*.35); const speed=p.pace/84*(sprint&&stamina<15?.65:1);p.x=Math.max(2,Math.min(98,p.x+dx*speed));p.y=Math.max(3,Math.min(97,p.y+dy*speed));paintPlayer(activePlayer);if(carrying)moveBall(p.x+.55,p.y);};
const oldPass=pass;
pass=function(through=false){if(flight||possession!=="home"||distanceToBall(players[activePlayer])>6){say("Get close to the ball before passing.");return;}oldPass(through);markControlledPlayer();};
shoot=function(){const p=players[activePlayer];if(flight||possession!=="home"||distanceToBall(p)>6){say("Get close to the ball before shooting.");return;}const targetY=50+(Math.random()-.5)*(p.x>70?20:48);flight={x:ballPos.x,y:ballPos.y,targetY,side:"home",awardShooter:activePlayer,elapsed:0,duration:Math.max(.25,(98-ballPos.x)/65)};say("Shot on goal!");};
function restartAfterGoal(side){const i=side==="home"?20:9;players[i].x=side==="home"?52:48;players[i].y=50;paintPlayer(i);possession=side==="home"?"away":"home";awayCarrier=side==="home"?i:-1;if(side==="away")activePlayer=i;moveBall(50,50);markControlledPlayer();}
tackle=function(){const p=players[activePlayer];if(!flight&&possession==="away"&&distanceToBall(p)<5){possession="home";awayCarrier=-1;moveBall(p.x+.55,p.y);say("Clean tackle!");}else say("Close down the ball carrier first.");};
function chase(i,x,y,dt){const p=players[i],dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);if(d<.8)return;const step=Math.min(d,dt*13*p.pace/84*(i>=11?difficultyFactor():1));p.x+=dx/d*step;p.y+=dy/d*step;paintPlayer(i);}
function gameplayFrame(now){requestAnimationFrame(gameplayFrame);const dt=Math.min(flight && flight.kind!=="pass" ? .15 : .05,(now-lastFrame)/1000||0);lastFrame=now;if(!document.getElementById("match").classList.contains("active")||paused||seconds>=matchDuration||players.length!==22)return;
for(let i=0;i<22;i++){if((motionUntil.get(i)||0)<now)document.getElementById("p"+i)?.classList.add("still");}
if(restartMode){restartFrame(now,dt);return;}
if(kickoffSide){if(kickoffSide==="away"&&now>kickoffAt)releaseKickoff();return;}
if(flight&&flight.kind==="pass"){const f=flight;if(f.targeted){f.elapsed+=dt;const t=Math.min(1,f.elapsed/f.duration);moveBall(f.x+(f.tx-f.x)*t,f.y+(f.ty-f.y)*t);supportAI(dt);chase(f.to,f.tx,f.ty,dt);for(let i=11;i<22;i++){if(t>.15&&distanceToBall(players[i])<1.2){flight=null;possession="away";awayCarrier=i;return;}}if(t>=1){flight=null;possession="home";activePlayer=f.to;moveBall(players[f.to].x,players[f.to].y);controlGrace=now+800;markControlledPlayer();}return;}if(!f.velocity){const duration=Math.max(.2,f.duration);f.velocity={x:2*(f.tx-f.x)/duration,y:2*(f.ty-f.y)/duration};f.drag=2/duration;f.spin=(f.bend||0)*.12;}f.elapsed+=dt;const t=Math.min(1,f.elapsed/f.duration);const v=f.velocity, speed=Math.hypot(v.x,v.y);const decay=Math.max(0,1-dt*f.drag*.65);const turn=f.spin*dt, nx=v.x*Math.cos(turn)-v.y*Math.sin(turn),ny=v.x*Math.sin(turn)+v.y*Math.cos(turn);v.x=nx*decay;v.y=ny*decay;const bx=ballPos.x+v.x*dt,by=ballPos.y+v.y*dt;moveBall(bx,by);if(by<3||by>97){flight=null;startThrow(f.side==="home"?"away":"home",ballPos.x,by<3?3:97);return;}if(speed<.5)f.elapsed=f.duration;supportAI(dt);for(let i=0;i<22;i++){if(i===f.from&&t<.65||t<.12||kickBounceHeight(f,t)>1.4)continue;if(distanceToBall(players[i])<1.6){flight=null;possession=players[i].team;if(i<11){activePlayer=i;controlGrace=now+800}else awayCarrier=i;markControlledPlayer();return;}}if(t===1||f.elapsed>=f.duration){flight=null;let closest=-1,best=2.2;players.forEach((p,i)=>{const d=distanceToBall(p);if(d<best){best=d;closest=i}});if(closest>=0){possession=players[closest].team;if(closest<11)activePlayer=closest;else awayCarrier=closest;markControlledPlayer()}else{possession="loose";}}return;}if(flight){const f=flight;const ki=f.side==="home"?11:0;chase(ki,f.side==="home"?95:5,Math.max(38,Math.min(62,f.targetY)),dt*2.2);if(Math.abs(players[ki].y-f.targetY)>3)animateMove(ki,"ofDive");f.elapsed+=dt;const t=Math.min(1,f.elapsed/f.duration);moveBall(f.x+((f.side==="home"?98:2)-f.x)*t,f.y+(f.targetY-f.y)*t+(f.curve||0)*Math.sin(Math.PI*t));if(t===1){flight=null;const keeper=players[f.side==="home"?11:0];if(Math.min(Math.abs(f.targetY-37),Math.abs(f.targetY-63))<1.2){say("Off the post!");rebound(f);return;}if(f.targetY>37&&f.targetY<63&&(f.height||0)<2.44&&Math.abs(keeper.y-f.targetY)<1.8 && Math.random()<.65){stats.saves++;awardRows[ki].saves++;if(Math.random()<.35){startCorner(f.side,f.targetY);return;}say("Goalkeeper catches the ball!");keeperRestart(f.side);return;}if(f.targetY>37&&f.targetY<63&&(f.height||0)<2.44){score[f.side==="home"?0:1]++;const scorer=f.awardShooter;if(Number.isInteger(scorer)&&awardRows[scorer]){awardRows[scorer].goals++;if(f.side==="home"&&awardLastPass&&awardLastPass.to===scorer&&awardLastPass.from!==scorer)awardRows[awardLastPass.from].assists++;}awardLastPass=null;updateScore();say("GOAL! "+(f.side==="home"?homeClub:awayClub));restartAfterGoal(f.side);}else{say("Shot wide — goal kick!");keeperRestart(f.side);}}return;}
if(possession==="loose"){supportAI(dt);let i=0;for(let j=1;j<22;j++)if(distanceToBall(players[j])<distanceToBall(players[i]))i=j;if(i>=11)chase(i,ballPos.x,ballPos.y,dt);else if(i!==activePlayer)chase(i,ballPos.x,ballPos.y,dt*.8);if(distanceToBall(players[i])<2.2){possession=players[i].team;if(i<11)activePlayer=i;else awayCarrier=i;markControlledPlayer()}return;}updateControl(now);supportAI(dt);if(possession==="home"){let i=12;for(let j=13;j<22;j++)if(distanceToBall(players[j])<distanceToBall(players[i]))i=j;chase(i,ballPos.x,ballPos.y,dt*((chargeStart||finesseStart)?.24:.58));if(now>controlGrace&&distanceToBall(players[i])<((chargeStart||finesseStart)?.65:1.05+.55*opponentQuality())){possession="away";awayCarrier=i;updateControl(now);say("The defender wins possession!");}}
else{if(awayCarrier<11)awayCarrier=17;const p=players[awayCarrier],space=q=>Math.min(...players.slice(1,11).map(o=>Math.hypot(o.x-q.x,o.y-q.y)));const pressure=space(p);
if(now>nextAIPass&&(p.x>22||Math.abs(p.y-50)>28)){let best=-1,value=-Infinity;for(let i=12;i<22;i++){if(i===awayCarrier)continue;const q=players[i],dx=p.x-q.x,d=Math.hypot(q.x-p.x,q.y-p.y);if(d<8||d>40||dx<3||space(q)<4||offsideAt(p,q,"away"))continue;const v=dx*1.3+space(q)-d*.2;if(v>value){value=v;best=i;}}if(best>=0&&(pressure<9||p.x>55)){nextAIPass=now+Math.round(2500-1200*opponentQuality());awardRows[awayCarrier].passes++;awayCarrier=best;flight={kind:"pass",side:"away",from:awayCarrier,x:ballPos.x,y:ballPos.y,tx:players[best].x,ty:players[best].y,elapsed:0,duration:Math.max(.45,Math.hypot(players[best].x-ballPos.x,players[best].y-ballPos.y)/25)};say("Opponent finds an open teammate.");return;}}
let heading=0,bestSpace=-Infinity;for(const h of [-.65,0,.65]){const q={x:Math.max(5,p.x-8),y:Math.max(8,Math.min(92,p.y+h*8))};const v=space(q)-Math.abs(q.y-50)*.15;if(v>bestSpace){bestSpace=v;heading=h;}}chase(awayCarrier,Math.max(5,p.x-8),p.x<24?50:Math.max(8,Math.min(92,p.y+heading*8)),dt);moveBall(p.x-.55,p.y);
if(p.x<22&&Math.abs(p.y-50)<28){const keeper=players[0];flight={x:ballPos.x,y:ballPos.y,targetY:(keeper.y>50?43:57)+(Math.random()-.5)*(34-24*opponentQuality()),side:"away",awardShooter:awayCarrier,elapsed:0,duration:.4};say("Opponent shoots!");}}
}
requestAnimationFrame(gameplayFrame);

 // Optional Day 1 extras, no audio changes.
const stats={shots:0,passes:0,saves:0,homeTime:0,totalTime:0};
let difficulty="Amateur",training=false,chargeStart=0,aim=[1,0];
try{difficulty=localStorage.getItem("ofDifficulty")||"Amateur";}catch(e){}
// Provisional gameplay ratings, not live real-world rankings.
const clubStrengthRatings={"Barcelona":91,"Real Madrid":92,"Manchester City":91,"Liverpool":90,"Arsenal":89,"Bayern Munich":90,"Paris Saint-Germain":91,"Inter":88,"Atlético Madrid":86,"Bayer Leverkusen":85,"Borussia Dortmund":84,"Freiburg":76,"Chelsea":85,"Manchester United":82,"Napoli":85,"Juventus":84,"AC Milan":83,"Newcastle United":83,"Benfica":82,"Porto":81,"Sporting CP":82,"PSV":81,"Ajax":79};
function clubStrength(name){if(Object.hasOwn(clubStrengthRatings,name))return clubStrengthRatings[name];const entry=Object.entries(LEAGUES).find(([k,v])=>v.includes(name));const key=entry?.[0]||"";return key.includes("Canadian Premier")?65:key.includes("Championship")?72:key.includes("MLS")?73:key.includes("Saudi")?74:key.includes("Brazil")?76:78;}
function difficultyFactor(){return (({Beginner:.65,Amateur:1,Professional:1.25,"World Class":1.4,Legendary:1.5})[difficulty]||1)*(0.85+(clubStrength(awayClub)-65)/70);}
function opponentQuality(){return Math.max(.15,Math.min(.95,.45+(clubStrength(awayClub)-78)/65+(difficultyFactor()-1)*.3));}
const extraPanel=document.createElement("div");extraPanel.className="card";extraPanel.innerHTML='<div class="toolbar"><label>Difficulty <select id="ofDifficulty"><option>Beginner</option><option>Amateur</option><option>Professional</option><option>World Class</option><option>Legendary</option></select></label><button id="ofTraining">Training arena</button><button id="ofExitMatch">Exit match</button></div><div>Stamina <progress id="ofEnergy" max="100" value="100"></progress> Shot power <progress id="ofPower" max="100" value="0"></progress></div><canvas id="ofRadar" width="220" height="120" style="max-width:100%;margin-top:10px"></canvas><p id="ofStats"></p>';
document.getElementById("match").append(extraPanel);
const difficultySelect=document.getElementById("ofDifficulty");difficultySelect.value=difficulty;difficultySelect.onchange=()=>{difficulty=difficultySelect.value;try{localStorage.setItem("ofDifficulty",difficulty)}catch(e){}};
document.getElementById("ofExitMatch").onclick=()=>{training=false;show("home")};
document.getElementById("ofTraining").onclick=()=>{resetMatch();training=true;players[activePlayer].x=75;players[activePlayer].y=50;paintPlayer(activePlayer);moveBall(77,50);say("Training: practise shots and passes.");};
const resetExtras=resetMatch;resetMatch=function(){training=false;Object.keys(stats).forEach(k=>stats[k]=0);chargeStart=0;resetExtras();};
const moveExtras=movePlayer;movePlayer=function(dx,dy){if(Math.hypot(dx,dy)>.001&&!mouseAimActive)aim=[dx,dy];moveExtras(dx,dy);};
nearestTeammate=function(){const p=players[activePlayer];let best=-1,cost=Infinity;players.forEach((q,i)=>{if(q.team!=="home"||i===activePlayer)return;const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy),dot=(dx*aim[0]+dy*aim[1])/(Math.max(.01,d*Math.hypot(...aim)));const c=d-18*dot;if(c<cost){cost=c;best=i;}});return best;};
const passExtras=pass;pass=function(t){const before=activePlayer;passExtras(t);if(before!==activePlayer)stats.passes++;};
const shootExtras=shoot;shoot=function(){if(!chargeStart)chargeStart=performance.now();};
document.addEventListener("keyup",e=>{if(actionKey(e)!=="k"||!chargeStart)return;const power=Math.min(1,(performance.now()-chargeStart)/900);chargeStart=0;if(paused||seconds>=matchDuration||!document.getElementById("match").classList.contains("active"))return;shootExtras();if(flight&&flight.side==="home"){flight.duration*=1.65-.85*power;flight.height=Math.max(0,(power-.9)*12);flight.arc=power*5;stats.shots++;}});
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
function releaseKickoff(){let side=kickoffSide;kickoffSide=null;if(side==="home"){activePlayer=6;moveBall(players[6].x+.55,players[6].y);markControlledPlayer();}else{awayCarrier=17;moveBall(players[17].x-.55,players[17].y);}say("Kickoff!");}
const resetKickoff=resetMatch;resetMatch=function(){resetKickoff();setupKickoff("home");};
restartAfterGoal=function(side){setupKickoff(side==="home"?"away":"home");};
const passKickoff=pass;pass=function(t){if(kickoffSide==="home"){releaseKickoff();stats.passes++;return;}if(!kickoffSide)passKickoff(t);};
const moveKickoff=movePlayer;movePlayer=function(dx,dy){if(!kickoffSide||training)moveKickoff(dx,dy);};
function switchNearest(){if(kickoffSide)return;let best=-1,d=Infinity;for(let i=0;i<11;i++){if(i===activePlayer)continue;let n=distanceToBall(players[i]);if(n<d){d=n;best=i;}}if(best>=0){activePlayer=best;markControlledPlayer();say("Player "+(best+1)+" selected.");}}
function keeperRestart(side){let i=side==="home"?11:0;possession=side==="home"?"away":"home";awayCarrier=i===11?11:-1;if(i===0)activePlayer=0;moveBall(players[i].x,players[i].y);markControlledPlayer();}
function supportAI(dt){
if(training)return;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let press=12;for(let i=13;i<22;i++)if(distanceToBall(players[i])<distanceToBall(players[press]))press=i;
for(let i=1;i<22;i++){
if(i===11||i===activePlayer||i===awayCarrier&&possession==="away"||i===press&&possession==="home")continue;
const home=i<11,j=i%11,dir=home?1:-1,attack=possession===(home?"home":"away");
let [baseX,baseY]=shape[j],x=(home?baseX:100-baseX)+(ballPos.x-50)*.35,y=baseY+(ballPos.y-50)*.16;
if(attack){x+=dir*(j>=8?19:j>=5?10:3);if(j>=8){const line=players.filter(p=>p.team!==(home?"home":"away")).map(p=>p.x).sort((a,b)=>dir*(b-a));x=home?Math.min(x,Math.max(50,ballPos.x,line[1])-2):Math.max(x,Math.min(50,ballPos.x,line[1])+2);}}
else if(j<=7){const q=players[home?j+11:j];x=x*.65+(q.x-dir*5)*.35;y=y*.65+q.y*.35;}
if(attack&&j>=5&&!flight){const opponents=players.filter(q=>q.team!==players[i].team),mates=players.filter(q=>q!==players[i]&&q.team===players[i].team);let best=-Infinity,bx=x,by=y;for(const dx of [-5,0,5])for(const dy of [-12,0,12]){let tx=clamp(x+dir*dx,5,95),ty=clamp(y+dy,5,95);const line=opponents.map(q=>q.x).sort((a,b)=>dir*(b-a));if(line.length>1){const limit=home?Math.max(50,ballPos.x,line[1])-1:Math.min(50,ballPos.x,line[1])+1;tx=home?Math.min(tx,limit):Math.max(tx,limit);}const space=Math.min(...opponents.map(q=>Math.hypot(q.x-tx,q.y-ty))),spacing=Math.min(...mates.map(q=>Math.hypot(q.x-tx,q.y-ty)));const value=Math.min(space,18)+Math.min(spacing,12)*.6-Math.hypot(tx-x,ty-y)*.18-Math.hypot(tx-players[i].x,ty-players[i].y)*.08;if(value>best){best=value;bx=tx;by=ty;}}x=bx;y=by;}
chase(i,clamp(x,5,95),clamp(y,5,95),dt*(attack?.95:.65));
}}
function animateMove(i,c){let el=document.getElementById("p"+i);if(!el||el.classList.contains(c))return;el.classList.add(c);setTimeout(()=>el.classList.remove(c),500);}
const animStyle=document.createElement("style");animStyle.textContent="@keyframes ofFeint{0%,100%{rotate:0deg}25%{rotate:-22deg}65%{rotate:22deg}}@keyframes ofDive{0%,100%{rotate:0deg}50%{rotate:65deg}}.ofFeint{animation:ofFeint .5s ease}.ofDive{animation:ofDive .5s ease}.ofFeint .legs{animation:ofFeint .25s alternate 2}";document.head.append(animStyle);
const trainingStart=document.getElementById("ofTraining").onclick;document.getElementById("ofTraining").onclick=()=>{trainingStart();kickoffSide=null;};
const switchButton=document.createElement("button");switchButton.textContent="Switch player (Q)";switchButton.onclick=switchNearest;extraPanel.querySelector(".toolbar").append(switchButton);

let restartMode=null,restartTime=0;
const resetSetPieces=resetMatch;resetMatch=function(){restartMode=null;resetSetPieces();};
function rebound(f){flight={kind:"pass",side:f.side,from:-1,x:ballPos.x,y:ballPos.y,tx:f.side==="home"?83:17,ty:Math.max(8,Math.min(92,f.targetY+(f.targetY<50?-12:12))),elapsed:0,duration:.9,arc:1};possession="loose";}
keeperRestart=function(side){let i=side==="home"?11:0;possession=side==="home"?"away":"home";awayCarrier=i===11?11:-1;if(i===0)activePlayer=0;moveBall(players[i].x,players[i].y);restartMode="keeper";restartTime=performance.now()+1800;markControlledPlayer();say(i===0?"Keeper has the ball — J to distribute.":"Opponent keeper prepares to distribute.");};
function startCorner(side,y){possession=side;let i=side==="home"?8:19;place(i,side==="home"?96:4,y<50?4:96);moveBall(players[i].x,players[i].y);if(side==="home")activePlayer=i;else awayCarrier=i;restartMode="corner";restartTime=performance.now()+1800;markControlledPlayer();say(side==="home"?"CORNER KICK — press J to cross.":"Opponent corner kick");}
function restartFrame(now,dt){let home=possession==="home";for(let i=1;i<11;i++){if(i===activePlayer)continue;let [x,y]=shape[i];chase(i,restartMode==="corner"&&home?Math.min(90,x+40):x+8,y,dt*.6);}for(let i=12;i<22;i++){if(i===awayCarrier)continue;let q=players[i-11];chase(i,Math.max(10,Math.min(90,q.x+(home?5:-5))),q.y,dt*.65);}if(!home&&now>restartTime)distributeRestart();}
function distributeRestart(){let home=possession==="home",mode=restartMode,corner=restartMode==="corner";let i=home?(corner?9:6):(corner?20:17);restartMode=null;const from=home?activePlayer:awayCarrier,q=players[i];flight={kind:"pass",side:home?"home":"away",from,to:i,x:ballPos.x,y:ballPos.y,tx:q.x,ty:q.y,elapsed:0,duration:Math.max(.5,Math.hypot(q.x-ballPos.x,q.y-ballPos.y)/25),arc:corner?4:0};say(corner?"Corner delivered!":mode==="throw"?"Throw-in taken!":mode==="free"?"Free kick taken!":"Keeper distributes the ball.");}
const setPass=pass;pass=function(t){if(restartMode){if(possession==="home"){distributeRestart();stats.passes++;}return;}setPass(t);};
const setMove=movePlayer;movePlayer=function(dx,dy){if(restartMode&&possession==='home'){return;}if(!restartMode){const p=players[activePlayer];if(!kickoffSide&&possession==="home"&&distanceToBall(p)<6&&(p.y+dy<5||p.y+dy>95)){startThrow("away",p.x,p.y<50?3:97);return;}setMove(dx,dy);}};
const setTackle=tackle;tackle=function(){if(!restartMode)setTackle();};
const setShoot=shoot;shoot=function(){if(!restartMode)setShoot();};
const setSwitch=switchNearest;switchNearest=function(){if(!restartMode&&possession==="away")updateControl(performance.now());};

function startThrow(side,x,y){possession=side;let i=side==="home"?8:19;place(i,x,y);moveBall(x,y);if(side==="home")activePlayer=i;else awayCarrier=i;restartMode="throw";restartTime=performance.now()+1800;markControlledPlayer();say(side==="home"?"THROW-IN — press J":"Opponent throw-in");}
const OFFSIDE_ENABLED=false;
function offsideAt(p,q,side){if(!OFFSIDE_ENABLED)return false;const defenders=players.filter(z=>z.team!==side).map(z=>z.x).sort((a,b)=>side==="home"?b-a:a-b);return side==="home"?q.x>50&&q.x>Math.max(p.x,defenders[1]):q.x<50&&q.x<Math.min(p.x,defenders[1]);}
const rulesPass=pass;pass=function(t){if(!restartMode&&!kickoffSide&&!flight&&possession==="home"&&distanceToBall(players[activePlayer])<6){let i=nearestTeammate();if(i>=0&&offsideAt(players[activePlayer],players[i],"home")){let q=players[i];possession="away";awayCarrier=17;place(17,q.x,q.y);moveBall(q.x,q.y);restartMode="free";restartTime=performance.now()+1800;say("OFFSIDE — indirect free kick");return;}}rulesPass(t);};

// Home settings and quick opponent selection; session-only preferences.
function randomOpponent(){const pool=(LEAGUES[league]||Object.values(LEAGUES).flat()).filter(n=>n!==homeClub);if(!pool.length)return;awayClub=pool[Math.floor(Math.random()*pool.length)];setupKits();}
function setMatchDuration(value){const n=Number(value);if([180,300,600].includes(n))matchDuration=n;}

let controlGrace=0, lastControlSide=null,lastControlPlayer=-1,lastAutoSwitch=0;
function closestHomePlayer(){let best=0;for(let i=1;i<11;i++)if(distanceToBall(players[i])<distanceToBall(players[best]))best=i;return best;}
function updateControl(now){
 if(possession==="home"&&(lastControlSide!=="home"||lastControlPlayer!==activePlayer))controlGrace=now+1000;
 if(possession==="away"){const best=closestHomePlayer();if(best!==activePlayer&&(lastControlSide!=="away"||(now-lastAutoSwitch>550&&distanceToBall(players[best])+1.5<distanceToBall(players[activePlayer])))){activePlayer=best;markControlledPlayer();lastAutoSwitch=now;}}
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
 for(let i=0;i<11;i++){if(i===activePlayer)continue;const q=players[i],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);const space=Math.min(...players.slice(11).map(o=>Math.hypot(o.x-q.x,o.y-q.y)));const direction=(dx*aim[0]+dy*aim[1])/Math.max(1,d*Math.hypot(...aim));const c=d-12*direction-2*Math.min(space,15)-(throughIntent?dx*.7:0);if(c<cost){cost=c;best=i;}}
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
// Manual play stays manual; no automatic takeover.
if(!autoPlaying||flight)return;
if(kickoffSide||restartMode){if(possession==="home"&&now>autoActionAt){pass(false);autoActionAt=now+900;}return;}
let p=players[activePlayer];if(possession==="away"){autoRecent=[];autoCarryUntil=now+900;updateControl(now);p=players[activePlayer];const dx=ballPos.x-p.x,dy=ballPos.y-p.y,d=Math.hypot(dx,dy);if(d>2)movePlayer(dx/d*dt*13,dy/d*dt*13);if(d<4&&now>autoActionAt){tackle();autoActionAt=now+650;}return;}
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

/* Charged distribution and rolling passes */
let distributionCharge=null;
const previousPassPhysics=pass;
pass=function(through=false){if(restartMode||kickoffSide){previousPassPhysics(through);return;}if(flight||possession!=="home"||distanceToBall(players[activePlayer])>6)return;const from=activePlayer;let to=nearestTeammate();if(through){let best=-Infinity;for(let i=1;i<11;i++){if(i===from)continue;const q=players[i],x=Math.min(94,q.x+10),y=q.y;if(x<ballPos.x+3||offsideAt(players[from],q,"home"))continue;const gap=Math.min(...players.slice(11).map(o=>Math.hypot(o.x-x,o.y-y)));const value=gap*2-Math.hypot(x-ballPos.x,y-ballPos.y)*.2;if(value>best){best=value;to=i;}}}if(to<0)return;const q=players[to],tx=Math.max(2,Math.min(94,q.x+(through?10:0))),ty=q.y;flight={kind:"pass",side:"home",from,to,x:ballPos.x,y:ballPos.y,tx,ty,elapsed:0,duration:Math.max(.25,Math.hypot(tx-ballPos.x,ty-ballPos.y)/42),targeted:true};stats.passes++;awardRows[from].passes++;awardLastPass={from,to};say(through?"Through ball into space!":"Rolling pass — chase the ball!");};
function chargeDistribution(k){if(!restartMode||possession!=="home"||paused)return false;if(!distributionCharge)distributionCharge={k,start:performance.now()};return true;}
document.addEventListener("keydown",e=>{const k=actionKey(e);if(!document.getElementById("match").classList.contains("active"))return;if(restartMode==="keeper"&&possession==="home"&&k==="j"){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)distributeRestart();return;}if(restartMode==="keeper"&&["q","g","w","a","s","d"].includes(k))return;if(["q","w","k","j","l"].includes(k)&&chargeDistribution(k)){e.preventDefault();e.stopImmediatePropagation();}},true);
document.addEventListener("keyup",e=>{if(!distributionCharge||actionKey(e)!==distributionCharge.k)return;const p=Math.min(1,(performance.now()-distributionCharge.start)/1000);distributionCharge=null;if(!restartMode||paused||possession!=="home")return;const from=activePlayer,n=Math.hypot(...aim)||1,range=8+65*p;restartMode=null;flight={kind:"pass",side:"home",from,x:ballPos.x,y:ballPos.y,tx:ballPos.x+aim[0]/n*range,ty:ballPos.y+aim[1]/n*range,elapsed:0,duration:Math.max(.5,range/(12+25*p)),arc:Math.max(0,p-.25)*7};say("Distribution — "+Math.round(p*100)+"% power");},true);
window.addEventListener("blur",()=>distributionCharge=null);
const powerStyle=document.createElement("style");powerStyle.textContent="#ofPower{accent-color:#32d65d}#ofPower::-webkit-progress-value{background:var(--kick-color,#32d65d)}#ofPower::-moz-progress-bar{background:var(--kick-color,#32d65d)}";document.head.append(powerStyle);
function chargeVisual(){requestAnimationFrame(chargeVisual);const bar=document.getElementById("ofPower");if(!bar)return;if(distributionCharge)bar.value=Math.min(100,(performance.now()-distributionCharge.start)/10);bar.style.setProperty("--kick-color",bar.value<35?"#32d65d":bar.value<76?"#f4ce38":"#f34b4b");}requestAnimationFrame(chargeVisual);

/* Directional striking preview: O charges a finesse shot. */
let finesseStart=0,mouseAimActive=false;
function strikeDirectional(power,curve=false){
 if(paused||flight||kickoffSide||restartMode||possession!=="home"||!players[activePlayer]||distanceToBall(players[activePlayer])>6)return;
 const targetY=50+Math.max(-1,Math.min(1,aim[1]/Math.max(1,Math.hypot(...aim))))*10;
 const distance=Math.hypot(98-ballPos.x,targetY-ballPos.y);
 flight={x:ballPos.x,y:ballPos.y,targetY,side:"home",awardShooter:activePlayer,elapsed:0,duration:Math.max(.22,distance/(35+power*65)),arc:Math.max(0,power-.25)*2,height:0,curve:curve?(ballPos.y<50?1:-1)*5:0};
 stats.shots++;say(curve?"Finesse strike!":"Directional strike!");
}
document.addEventListener("keydown",e=>{if(!document.getElementById("match").classList.contains("active")||paused||restartMode||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(actionKey(e)==="o"){e.preventDefault();if(!finesseStart)finesseStart=performance.now();}},true);
document.addEventListener("keyup",e=>{if(actionKey(e)==="o"&&finesseStart){const power=Math.min(1,(performance.now()-finesseStart)/900);finesseStart=0;if(document.getElementById("match").classList.contains("active"))strikeDirectional(power,true);}},true);
document.addEventListener("keyup",e=>{if(actionKey(e)==="k"&&chargeStart&&!restartMode&&document.getElementById("match").classList.contains("active")){const power=Math.min(1,(performance.now()-chargeStart)/900);chargeStart=0;strikeDirectional(power);}},true);
window.addEventListener("blur",()=>{finesseStart=0;});
const controlHint=document.createElement("p");extraPanel.prepend(controlHint);
const fullButton=document.createElement("button");fullButton.textContent="Fullscreen";fullButton.onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();extraPanel.querySelector(".toolbar").append(fullButton);
function liveHints(){requestAnimationFrame(liveHints);if(!document.getElementById("match").classList.contains("active"))return;controlHint.textContent=restartMode==="keeper"&&possession==="home"?"Keeper: Q drop kick / G goal kick / WASD dribble":"WASD Move · J Pass · L Through ball · K Shoot · O Curl · Space Tackle · Q Switch";if(finesseStart)document.getElementById("ofPower").value=Math.min(100,(performance.now()-finesseStart)/9);}
requestAnimationFrame(liveHints);

// Power marker follows the active player during charging.
const kickMarker=document.createElement("div");kickMarker.style.cssText="position:fixed;z-index:9999;pointer-events:none;width:100px;height:9px;background:linear-gradient(90deg,#32d65d,#f4ce38,#f34b4b);border:1px solid white;border-radius:4px;display:none";const kickArrow=document.createElement("span");kickArrow.style.cssText="position:absolute;top:-9px;transform:translateX(-50%);color:white;font-size:12px";kickArrow.textContent="▼";kickMarker.append(kickArrow);document.body.append(kickMarker);function markerFrame(){requestAnimationFrame(markerFrame);const start=finesseStart||chargeStart||distributionCharge?.start;const p=document.getElementById("p"+activePlayer);if(!start||!p||paused||!document.getElementById("match").classList.contains("active")){kickMarker.style.display="none";return;}const r=p.getBoundingClientRect();kickMarker.style.display="block";kickMarker.style.left=(r.left+r.width/2-50)+"px";kickMarker.style.top=(r.top-24)+"px";kickArrow.style.left=Math.min(100,(performance.now()-start)/9)+"%";}requestAnimationFrame(markerFrame);

// Mouse direction is measured relative to the visible controlled player.
document.getElementById("match").addEventListener("pointermove",e=>{if(e.pointerType!=="mouse"||paused)return;const p=document.getElementById("p"+activePlayer);if(!p)return;const r=p.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;if(Math.hypot(dx,dy)>8){mouseAimActive=true;aim=[dx,dy];}});document.addEventListener("keydown",e=>{if(keys[e.key.toLowerCase()])mouseAimActive=false;},true);window.addEventListener("blur",()=>{mouseAimActive=false;chargeStart=0;});

function kickBounceHeight(f,t){const a=f.arc||0;if(!a)return 0;if(t<.55)return a*Math.sin(Math.PI*t/.55);if(t<.82)return a*.32*Math.sin(Math.PI*(t-.55)/.27);if(t<.94)return a*.10*Math.sin(Math.PI*(t-.82)/.12);return 0;}

// Day 4 Academy: tactical lessons and direct practice entry.
lessons.push(["Off-ball runs","Watch your wingers move into space. Aim a through pass ahead of the runner with L."],["Defensive shape","Stay goal-side, switch with Q and tackle with Space when close enough."],["Shot power","Hold K to charge, aim toward goal, then release. Low power keeps the ball closer to the grass."]);
const academyPractice=document.createElement("button");academyPractice.textContent="Start pitch practice";academyPractice.onclick=()=>document.getElementById("ofTraining").click();(document.querySelector("#tutorial .actions")||document.querySelector("#tutorial")||extraPanel).append(academyPractice);renderLesson();

// Day 4: select any starting XI player as captain before kickoff.
const day4LineupRender=renderLineup;
renderLineup=function(){day4LineupRender();const captain=document.getElementById("ofCaptain");if(!captain)return;const cards=Array.from(lineupGrid.children);function refresh(){cards.forEach((card,i)=>{const b=card.querySelector(".ofCaptainPick");if(!b)return;const selected=Number(captain.value)===i+1;b.textContent=selected?"© Captain selected":"Make captain";b.setAttribute("aria-pressed",String(selected));b.classList.toggle("active",selected);});}cards.forEach((card,i)=>{const b=document.createElement("button");b.type="button";b.className="ofCaptainPick";b.style.marginTop="8px";b.setAttribute("aria-label","Select player "+(i+1)+" as captain");b.onclick=()=>{captain.value=String(i+1);captain.dispatchEvent(new Event("change",{bubbles:true}));refresh();};card.append(b);});refresh();};

/* Day 4 fixes: shared squad UI, provisional data explicitly labelled. */
const fixPalette=palette;
palette=function(club,kit){const c=fixPalette(club,kit);if(kit!=="away"||club==="Barcelona")return c;let h=0;for(const ch of club)h=(h*31+ch.charCodeAt(0))>>>0;return ["hsl("+h%360+",72%,46%)","hsl("+(h+145)%360+",85%,75%)"];};
const fixPattern=kitPattern;
kitPattern=function(club,kit,c){return club==="Barcelona"&&kit==="away"?"radial-gradient(circle at 50% 45%,#f6dc46 0 9%,transparent 10%),linear-gradient(to bottom,#15121d 15%,#59378b 100%)":fixPattern(club,kit,c);};
const fixLineup=renderLineup;
renderLineup=function(){fixLineup();const captain=document.getElementById("ofCaptain");Array.from(lineupGrid.children).forEach((card,i)=>{const rating=Math.max(33,Math.min(99,ofTeamRating(homeClub)+[0,-3,1,-2,-4,2,-1,0,3,4,1][i]));const jersey=document.createElement("button");jersey.type="button";jersey.style.cssText="display:block;width:110px;height:100px;margin:8px auto;color:white;text-shadow:0 1px 4px black;background:"+kitPattern(homeClub,kits.home,palette(homeClub,kits.home))+";clip-path:polygon(25% 0,40% 0,50% 10%,60% 0,75% 0,100% 25%,82% 45%,76% 35%,76% 100%,24% 100%,24% 35%,18% 45%,0 25%);border:0";jersey.innerHTML="<small>PLAYER "+(i+1)+"</small><br><strong style='font-size:28px'>"+(i+1)+"</strong>";jersey.onclick=()=>{if(captain){captain.value=String(i+1);renderLineup();}};card.querySelector("h3")?.remove();const b=card.querySelector("b");if(b)b.textContent=rating;card.prepend(jersey);const note=document.createElement("small");note.textContent="Prototype roster / estimated rating";card.append(note);});};
const fixSetKit=setKit;setKit=function(side,kit){fixSetKit(side,kit);if(side==="home")renderLineup();};
const fixSupport=supportAI;supportAI=function(dt){if(training||possession!=="home"){fixSupport(dt);return;}const p=players[activePlayer];if(!p)return;for(let i=1;i<11;i++){if(i===activePlayer)continue;const q=players[i],lane=shape[i][1];let best=null,score=-Infinity;for(const dx of (i>=5?[10,20,30,-8]:[-18,-8,8]))for(const dy of [-15,0,15]){const x=Math.max(5,Math.min(94,p.x+dx)),y=Math.max(7,Math.min(93,lane+dy));const clearance=Math.min(...players.slice(11).map(o=>Math.hypot(o.x-x,o.y-y)));const spacing=Math.min(...players.slice(0,11).filter(o=>o!==q).map(o=>Math.hypot(o.x-x,o.y-y)));const value=clearance*1.6+Math.min(18,spacing)-Math.hypot(q.x-x,q.y-y)*.3-Math.abs(y-lane)*.25;if(value>score){score=value;best=[x,y];}}if(best)chase(i,best[0],best[1],dt*.95);}};
renderLineup();

// Keeper can leave a restart to dribble; normal backpasses stay at feet.
const keeperMoveFix=movePlayer;movePlayer=function(dx,dy){if(restartMode==="keeper"&&possession==="home"&&activePlayer===0){restartMode=null;moveBall(players[0].x,players[0].y);}keeperMoveFix(dx,dy);};
const keeperPassFix=distributeRestart;distributeRestart=function(){if(restartMode==="keeper"&&possession==="home"){restartMode=null;const p=players[0],q=players[9];flight={kind:"pass",side:"home",from:0,to:9,x:p.x,y:p.y,tx:Math.min(92,q.x+12),ty:q.y,elapsed:0,duration:1.8,arc:4,power:85};say("Keeper sends a long ball forward.");return;}keeperPassFix();};

/* Explicit keeper controls and restart ball supply. */
const restartSupply={readyAt:0,slot:-1,side:1,stock:[true,true,true,true],x:50,y:97};
const throwOriginal=startThrow;
startThrow=function(side,x,y){throwOriginal(side,x,y);restartSupply.side=y<50?-1:1;restartSupply.x=Math.max(2,Math.min(98,x));restartSupply.y=y<50?3:97;const slots=[14,38,62,86];let best=-1;for(let i=0;i<4;i++)if(restartSupply.stock[i]&&(best<0||Math.abs(slots[i]-x)<Math.abs(slots[best]-x)))best=i;restartSupply.slot=best;restartSupply.readyAt=performance.now()+(best<0?1600:650);if(best>=0)restartSupply.stock[best]=false;restartTime=restartSupply.readyAt+900;say(best<0?"Ball attendant delivers a replacement.":"Player collects a nearby spare ball.");};
const supplyDistribute=distributeRestart;
distributeRestart=function(){if(restartMode==="throw"&&performance.now()<restartSupply.readyAt){say("Wait for the replacement ball.");return;}const wasThrow=restartMode==="throw";supplyDistribute();if(wasThrow){restartSupply.slot=-1;restartSupply.readyAt=0;}};
const supplyReset=resetMatch;resetMatch=function(){restartSupply.stock.fill(true);restartSupply.slot=-1;restartSupply.readyAt=0;supplyReset();};
function keeperKick(drop){if(restartMode!=="keeper"||possession!=="home"||activePlayer!==0||flight)return;const p=players[0],direction=aim[0]<.2?[1,aim[1]]:aim;const len=Math.hypot(...direction)||1;const range=drop?72:55;restartMode=null;flight={kind:"pass",side:"home",from:0,to:9,x:p.x,y:p.y,tx:Math.min(97,Math.max(3,p.x+direction[0]/len*range)),ty:Math.min(96,Math.max(4,p.y+direction[1]/len*range)),elapsed:0,duration:drop?2.1:1.7,arc:drop?6:3,power:drop?90:75};say(drop?"Goalkeeper drop kick!":"Goal kick launched!");}
for(const [label,drop] of [["Drop kick (Q)",true],["Goal kick (G)",false]]){const b=document.createElement("button");b.textContent=label;b.onclick=()=>keeperKick(drop);extraPanel.querySelector(".toolbar").append(b);}
document.addEventListener("keydown",e=>{if(restartMode==="keeper"&&possession==="home"&&["q","g"].includes(e.key.toLowerCase())){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)keeperKick(e.key.toLowerCase()==="q");}},true);

function ofTeamRating(team){const offsets=[0,-3,1,-2,-4,2,-1,0,3,4,1];const base=clubStrength(team);return Math.round(offsets.reduce((sum,v)=>sum+Math.max(33,Math.min(99,base+v)),0)/11);}
function ofRatingBadge(r){const badge=document.createElement("span");badge.textContent=r;badge.title="O-Football estimated overall";badge.style.cssText="display:inline-grid;place-items:center;width:52px;height:52px;font-weight:900;color:#171717;clip-path:polygon(0 0,100% 0,100% 60%,50% 100%,0 60%);background:"+(r>=90?"#ef4444":r>=80?"#facc15":r>=70?"#a78bfa":r>=60?"#cbd5e1":"#bc8755");return badge;}
const ratingLineup=renderLineup;renderLineup=function(){ratingLineup();const header=document.createElement("div");header.className="card";header.append(document.createTextNode(homeClub+" · Team overall "),ofRatingBadge(ofTeamRating(homeClub)));lineupGrid.prepend(header);Array.from(lineupGrid.children).slice(1).forEach(card=>{const old=card.querySelector("b");if(old)old.replaceWith(ofRatingBadge(Number(old.textContent)));});};renderLineup();

// National team color approximations, not verified 2026 kit artwork.
const ofNationalColors={"Mexico":["166b43","b51e36","f5f1e4","166b43"],"South Africa":["e8bd22","187b43","187b43","e8bd22"],"Korea Republic":["e83850","17263c","f4f4f4","17263c"],"Czechia":["c92338","174b92","ffffff","174b92"],"Canada":["d71920","ffffff","ffffff","d71920"],"Switzerland":["d71920","ffffff","ffffff","d71920"],"Qatar":["791c40","ffffff","ffffff","791c40"],"Bosnia and Herzegovina":["174caa","e8c331","ffffff","174caa"],"Brazil":["f9d616","16834b","1746a2","ffffff"],"Morocco":["c92338","147745","ffffff","147745"],"Scotland":["17294c","ffffff","ffffff","17294c"],"Haiti":["1746a2","d71920","ffffff","1746a2"],"USA":["ffffff","18315b","18315b","d71920"],"Australia":["f4ca24","175c43","175c43","f4ca24"],"Paraguay":["d71920","ffffff","1746a2","ffffff"],"Türkiye":["d71920","ffffff","ffffff","d71920"],"Germany":["ffffff","171717","171717","e34c38"],"Ecuador":["f5d023","1746a2","1746a2","f5d023"],"Côte d'Ivoire":["ef8121","ffffff","ffffff","16834b"],"Curaçao":["1746a2","f4ca24","ffffff","1746a2"],"Netherlands":["f58220","171717","1746a2","f58220"],"Japan":["1746a2","ffffff","ffffff","1746a2"],"Sweden":["f4ca24","1746a2","1746a2","f4ca24"],"Tunisia":["ffffff","d71920","d71920","ffffff"],"Belgium":["a71930","e4b82c","e8eef5","a71930"],"IR Iran":["ffffff","16834b","d71920","ffffff"],"Egypt":["d71920","171717","ffffff","d71920"],"New Zealand":["ffffff","171717","171717","ffffff"],"Spain":["c91e35","e4b82c","f5e7b0","c91e35"],"Uruguay":["77c4eb","171717","ffffff","77c4eb"],"Saudi Arabia":["16834b","ffffff","ffffff","16834b"],"Cabo Verde":["1746a2","ffffff","ffffff","1746a2"],"France":["17294c","ffffff","ffffff","17294c"],"Senegal":["ffffff","16834b","16834b","e4b82c"],"Norway":["d71920","17294c","ffffff","17294c"],"Iraq":["ffffff","16834b","16834b","ffffff"],"Argentina":["83c9ed","ffffff","17294c","83c9ed"],"Austria":["d71920","ffffff","ffffff","171717"],"Algeria":["ffffff","16834b","16834b","ffffff"],"Jordan":["ffffff","d71920","d71920","171717"],"Portugal":["c92338","16834b","ffffff","16834b"],"Colombia":["f4ca24","1746a2","171717","f4ca24"],"Uzbekistan":["ffffff","1746a2","1746a2","ffffff"],"Congo DR":["1746a2","d71920","ffffff","1746a2"],"England":["ffffff","17294c","d71920","ffffff"],"Croatia":["d71920","ffffff","17294c","d71920"],"Ghana":["ffffff","171717","f4ca24","16834b"],"Panama":["d71920","ffffff","ffffff","1746a2"]};
const nationalPalette=palette;palette=function(club,kit){const c=ofNationalColors[club];return c?c.slice(kit==="away"?2:0,kit==="away"?4:2).map(x=>"#"+x):nationalPalette(club,kit);};

const ofRosterRaw={"Argentina":"GK MUSSO|DF SENESI|DF TAGLIAFICO|DF MONTIEL|MF PAREDES|DF MARTÍNEZ|MF DE PAUL|MF BARCO|FW J. ALVAREZ|FW MESSI|MF LO CELSO|GK RULLI|DF ROMERO|MF PALACIOS|MF N. GONZALEZ|FW ALMADA|FW SIMEONE|FW NICO PAZ|DF OTAMENDI|MF MAC ALLISTER|FW LOPEZ|FW L. MARTINEZ|GK E. MARTINEZ|MF E. FERNANDEZ|DF MEDINA|DF MOLINA","Algeria":"GK MASTIL|DF MANDI|DF ABADA|DF TOUGAI|DF BELAID|MF ZERROUKI|FW MAHREZ|MF AOUAR|FW GOUIRI|MF CHAIBI|FW HADJ MOUSSA|FW BENBOUALI|DF HADJAM|MF BOUDAOUI|DF AIT NOURI|GK BENBOT|DF BELGHALI|FW AMOURA|MF BENTALEB|FW BOULBINA|DF BENSEBAINI|MF MAZA|GK ZIDANE|MF TITRAOUI|FW GHEDJEMIS|DF CHERGUI"};
function ofRoster(team){return (ofRosterRaw[team]||"").split("|").filter(Boolean).map((v,i)=>({number:i+1,position:v.slice(0,2),name:v.slice(3)}));}
const rosterLineup=renderLineup;renderLineup=function(){rosterLineup();const squad=ofRoster(homeClub);if(!squad.length)return;const starters=["GK","DF","DF","DF","DF","MF","MF","MF","FW","FW","FW"].map((pos)=>{const index=squad.findIndex(p=>p.position===pos&&!p.used);if(index<0)return null;squad[index].used=true;return squad[index];});Array.from(lineupGrid.children).slice(1).forEach((card,i)=>{const p=starters[i];if(!p)return;const jersey=Array.from(card.querySelectorAll("button")).find(b=>b.querySelector("strong"));if(jersey){const name=jersey.querySelector("small"),num=jersey.querySelector("strong");if(name)name.textContent=p.name;if(num)num.textContent=p.number;}const label=card.lastElementChild;if(label&&label.tagName==="SMALL")label.textContent=p.position+" · estimated rating";});const bench=document.createElement("div");bench.className="card";const title=document.createElement("h3");title.textContent="Full registered squad";bench.append(title);for(const p of squad){const line=document.createElement("div");line.textContent=p.number+" · "+p.name+" · "+p.position;bench.append(line);}lineupGrid.append(bench);};

const tacticalSupport=supportAI;supportAI=function(dt){if(training)return;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));for(const i of [0,11]){if(i===activePlayer&&possession==="home"||i===awayCarrier&&possession==="away")continue;chase(i,i===0?5:95,clamp(50+(ballPos.y-50)*.35,44,56),dt*.8);}for(let i=1;i<22;i++){if(i===11||i===activePlayer||i===awayCarrier&&possession==="away"||i===flight?.to)continue;const home=i<11,j=i%11,dir=home?1:-1,attack=possession===(home?"home":"away");let [x,y]=shape[j];x=(home?x:100-x)+(ballPos.x-50)*.32+(attack?dir*(j>=8?15:j>=5?8:2):0);y+=(ballPos.y-50)*.12;chase(i,clamp(x,6,94),clamp(y,6,94),dt*(attack?.85:.72));}};

// Prevent browser scrolling while manipulating match touch controls.
const matchTouchStyle=document.createElement("style");matchTouchStyle.textContent="#match.active canvas,#match.active button,#match.active [class*=joystick]{touch-action:none;overscroll-behavior:contain}";document.head.append(matchTouchStyle);

// 2026 World Cup registered squad numbers (FIFA / DFB).
ofRosterRaw.Brazil="GK ALISSON|MF EDERSON SILVA|DF GABRIEL|DF MARQUINHOS|MF CASEMIRO|DF ALEX SANDRO|FW VINI JR.|MF BRUNO GUIMARÃES|FW MATHEUS CUNHA|FW NEYMAR|FW RAPHINHA|GK WEVERTON|DF DANILO|DF BREMER|DF LEO PEREIRA|DF DOUGLAS SANTOS|MF FABINHO|MF DANILO SANTOS|FW ENDRICK|MF LUCAS PAQUETÁ|FW LUIZ HENRIQUE|FW MARTINELLI|GK EDERSON|DF IBAÑEZ|FW IGOR THIAGO|FW RAYAN";
ofRosterRaw.Spain="GK DAVID RAYA|DF MARC PUBILL|DF GRIMALDO|DF ERIC GARCÍA|DF MARCOS LLORENTE|MF MIKEL MERINO|FW FERRAN TORRES|MF FABIÁN RUIZ|MF GAVI|FW DANI OLMO|FW YEREMY PINO|DF PEDRO PORRO|GK JOAN GARCÍA|DF LAPORTE|MF ÁLEX BAENA|MF RODRI|FW NICO WILLIAMS|MF ZUBIMENDI|FW LAMINE YAMAL|MF PEDRI|FW OYARZABAL|DF PAU CUBARSÍ|GK UNAI SIMÓN|DF CUCURELLA|FW VÍCTOR MUÑOZ|FW BORJA IGLESIAS";

const nationalRatings={Brazil:[89,78,87,87,82,76,92,88,84,85,91,78,78,85,79,80,80,79,81,83,82,85,88,81,80,79],Spain:[86,78,85,81,84,84,85,86,85,87,81,83,84,84,83,91,88,86,93,91,85,86,87,85,77,80]};
const nationalXI={home:[],away:[]};
function nationalSquad(club){return nationalRatings[club]?ofRoster(club).map((p,i)=>({...p,rating:nationalRatings[club][i]})):[];}
function chooseNationalXI(club){const pool=nationalSquad(club);return ["GK","DF","DF","DF","DF","MF","MF","MF","FW","FW","FW"].map(pos=>{const p=pool.filter(q=>q.position===pos&&!q.used).sort((a,b)=>b.rating-a.rating)[0];if(p)p.used=true;return p;}).filter(Boolean);}
const nationalKitPattern=kitPattern;
kitPattern=function(club,kit,c){if(!nationalRatings[club])return nationalKitPattern(club,kit,c);return "linear-gradient(90deg,"+c[1]+" 0 9%,"+c[0]+" 9% 91%,"+c[1]+" 91%)";};
function paintNationalPlayer(i){const side=i<11?"home":"away",club=side==="home"?homeClub:awayClub,p=nationalXI[side][i%11],el=document.getElementById("p"+i);if(!p||!el)return;const c=palette(club,kits[side]);el.querySelector("b").textContent=p.number;el.title=p.name+" · "+p.rating;const jersey=el.querySelector(".jersey");jersey.style.background=i%11===0?"#23a78b":kitPattern(club,kits[side],c);let label=el.querySelector(".national-name");if(!label){label=document.createElement("small");label.className="national-name";el.append(label);}label.textContent=p.name;Object.assign(players[i],{name:p.name,number:p.number,rating:p.rating});}
let nationalSubs=0;
const nationalReset=resetMatch;resetMatch=function(){nationalXI.home=chooseNationalXI(homeClub);nationalXI.away=chooseNationalXI(awayClub);nationalReset();for(let i=0;i<22;i++)paintNationalPlayer(i);nationalSubs=0;};
const subPanel=document.createElement("div");subPanel.style.cssText="padding:8px;display:none";document.getElementById("match").append(subPanel);
const subToggle=document.createElement("button");subToggle.textContent="Substitutions";subPanel.before(subToggle);subToggle.onclick=()=>{if(!nationalXI.home.length)return;if(!paused)pauseMatch();subPanel.style.display="block";subPanel.replaceChildren();const out=document.createElement("select"),incoming=document.createElement("select");nationalXI.home.forEach((p,i)=>out.add(new Option(p.name,i)));nationalSquad(homeClub).filter(p=>!nationalXI.home.some(q=>q.number===p.number)).forEach(p=>incoming.add(new Option(p.name+" · "+p.rating,p.number)));const confirm=document.createElement("button");confirm.textContent="Confirm substitution";confirm.onclick=()=>{if(nationalSubs>=5)return;const p=nationalSquad(homeClub).find(p=>p.number===Number(incoming.value));if(!p||nationalXI.home.some(q=>q.number===p.number))return;nationalXI.home[Number(out.value)]=p;paintNationalPlayer(Number(out.value));nationalSubs++;subPanel.style.display="none";say("Substitution: "+p.name+" comes on.");};subPanel.append(out,incoming,confirm);};
const nationalStyle=document.createElement("style");nationalStyle.textContent=".national-name{position:absolute;top:100%;left:50%;transform:translateX(-50%);white-space:nowrap;color:white;font-size:9px;text-shadow:0 1px 3px black;pointer-events:none}";document.head.append(nationalStyle);

 // Prototype club kit graphics; season-specific references still need review.
 const clubKitDetails={
 "Barcelona":{sponsor:"Spotify",brand:"✓",crest:"FCB",home:["#17449b","#a50044","#f4d34b"],away:["#15121d","#59378b","#f4d34b"],stripe:true},
 "Real Madrid":{sponsor:"Emirates FLY BETTER",brand:"///",crest:"RM",home:["#fafafa","#d9d9df","#222"],away:["#17203e","#435477","#fff"]},
 "Bayern Munich":{sponsor:"· T ·",brand:"///",crest:"FCB",home:["#dc052d","#a90022","#fff"],away:["#f4f4f4","#dddddd","#222"]},
 "Paris Saint-Germain":{sponsor:"QATAR AIRWAYS",brand:"✓",crest:"PSG",home:["#004170","#d71920","#fff"],away:["#f4f4f4","#004170","#18283c"],stripe:true},
 "Liverpool":{sponsor:"standard chartered",brand:"///",crest:"LFC",home:["#c8102e","#a90d25","#fff"],away:["#f4f1e7","#222","#222"]},
 "Manchester City":{sponsor:"ETIHAD AIRWAYS",brand:"PUMA",crest:"MC",home:["#6cabdd","#ffffff","#18283c"],away:["#222","#555","#fff"]},
 "Arsenal":{sponsor:"Emirates FLY BETTER",brand:"///",crest:"AFC",home:["#d71920","#fff","#fff"],away:["#18283c","#45698c","#fff"]},
 "Inter":{sponsor:"BETSSON SPORT",brand:"✓",crest:"IM",home:["#00529f","#111","#fff"],away:["#fff","#00529f","#111"],stripe:true},
 "Atlético Madrid":{sponsor:"RIYADH AIR",brand:"✓",crest:"ATM",home:["#d71920","#fff","#17294c"],away:["#17294c","#45698c","#fff"],stripe:true}
 };
 function clubKitGraphic(club,kit){const d=clubKitDetails[club];if(!d)return null;const [a,b,ink]=d[kit==="away"?"away":"home"];const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");const stripe=d.stripe&&kit!=="away"?[20,44,68].map(x=>'<rect x="'+x+'" width="12" height="100" fill="'+b+'"/>').join(""):"";const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="'+a+'"/>'+stripe+'<path d="M0 0H100V12H0Z M0 0V100H8V0 M92 0V100H100V0" fill="'+b+'"/><path d="M37 0 Q50 25 63 0" fill="none" stroke="'+ink+'" stroke-width="3"/><g fill="'+ink+'" font-family="Arial" text-anchor="middle" font-weight="bold"><text x="28" y="30" font-size="10">'+esc(d.brand)+'</text><path d="M65 19H83V33L74 40L65 33Z" fill="'+ink+'"/><text x="74" y="31" font-size="6" fill="'+a+'">'+d.crest+'</text><text x="50" y="56" font-size="'+(d.sponsor.length>13?7:12)+'">'+esc(d.sponsor)+'</text></g></svg>';return 'url("data:image/svg+xml,'+encodeURIComponent(svg)+'") center/100% 100% no-repeat';}
 const priorClubPattern=kitPattern;kitPattern=function(club,kit,c){return clubKitGraphic(club,kit)||priorClubPattern(club,kit,c);};
 const priorClubPlayer=createPlayer;createPlayer=function(i,team,x,y){const el=priorClubPlayer(i,team,x,y),club=team==="home"?homeClub:awayClub,d=clubKitDetails[club];if(d){const c=d[kits[team]==="away"?"away":"home"];el.querySelectorAll(".legs i").forEach(leg=>leg.style.background="linear-gradient("+c[1]+" 0 48%,"+c[0]+" 48% 88%,#222 88%)");if(i%11===0)el.querySelector(".jersey").style.background="#23a78b";}return el;};

 // Club roster engine: provisional seed data, not verified 2026/27 registrations.
 const clubRosterData={
 Barcelona:"19,FW,Lamine Yamal,94|11,FW,Raphinha,92|8,MF,Pedri,92|6,MF,Gavi,85|21,MF,Frenkie de Jong,88|20,MF,Dani Olmo,87|7,FW,Ferran Torres,85|23,DF,Jules Koundé,88|2,DF,Pau Cubarsí,87|3,DF,Alejandro Balde,86|4,DF,Ronald Araújo,87|24,DF,Eric García,82|13,GK,Joan García,85|25,GK,Wojciech Szczęsny,83|16,MF,Fermín López,85|17,MF,Marc Casadó,82",
 "Real Madrid":"7,FW,Vinícius Júnior,93|5,MF,Jude Bellingham,93|10,FW,Kylian Mbappé,95|8,MF,Federico Valverde,91|14,MF,Aurélien Tchouaméni,87|6,MF,Eduardo Camavinga,86|1,GK,Thibaut Courtois,91|13,GK,Andriy Lunin,83|3,DF,Éder Militão,86|22,DF,Antonio Rüdiger,88|12,DF,Trent Alexander-Arnold,88|20,DF,Fran García,81|11,FW,Rodrygo,88|15,MF,Arda Güler,85",
 "Bayern Munich":"1,GK,Manuel Neuer,87|40,GK,Jonas Urbig,79|9,FW,Harry Kane,93|17,FW,Michael Olise,90|42,MF,Jamal Musiala,92|6,MF,Joshua Kimmich,90|8,MF,Leon Goretzka,84|45,MF,Aleksandar Pavlović,84|2,DF,Dayot Upamecano,87|3,DF,Kim Min-jae,86|19,DF,Alphonso Davies,88|27,DF,Konrad Laimer,85|7,FW,Serge Gnabry,84|14,FW,Luis Díaz,89",
 "Paris Saint-Germain":"10,FW,Ousmane Dembélé,94|7,FW,Khvicha Kvaratskhelia,90|14,FW,Désiré Doué,89|29,FW,Bradley Barcola,87|17,MF,Vitinha,92|87,MF,João Neves,89|8,MF,Fabián Ruiz,87|2,DF,Achraf Hakimi,92|25,DF,Nuno Mendes,91|5,DF,Marquinhos,88|51,DF,Willian Pacho,87|21,DF,Lucas Hernández,84|30,GK,Lucas Chevalier,86|39,GK,Matvey Safonov,81",
 Liverpool:"1,GK,Alisson,90|25,GK,Giorgi Mamardashvili,85|4,DF,Virgil van Dijk,91|5,DF,Ibrahima Konaté,87|12,DF,Conor Bradley,82|6,DF,Milos Kerkez,84|8,MF,Dominik Szoboszlai,88|10,MF,Alexis Mac Allister,89|38,MF,Ryan Gravenberch,88|7,MF,Florian Wirtz,91|11,FW,Mohamed Salah,93|18,FW,Cody Gakpo,87|9,FW,Alexander Isak,90|22,FW,Hugo Ekitike,85",
 "Manchester City":"25,GK,Gianluigi Donnarumma,91|1,GK,James Trafford,82|3,DF,Rúben Dias,89|24,DF,Joško Gvardiol,89|5,DF,John Stones,85|6,DF,Nathan Aké,85|16,MF,Rodri,93|20,MF,Bernardo Silva,88|47,MF,Phil Foden,90|4,MF,Tijjani Reijnders,87|9,FW,Erling Haaland,94|11,FW,Jérémy Doku,86|26,FW,Savinho,85|7,FW,Omar Marmoush,87",
 Arsenal:"1,GK,David Raya,88|2,DF,William Saliba,90|6,DF,Gabriel Magalhães,90|4,DF,Ben White,85|12,DF,Jurrien Timber,87|41,MF,Declan Rice,91|8,MF,Martin Ødegaard,90|36,MF,Martín Zubimendi,87|7,FW,Bukayo Saka,92|11,FW,Gabriel Martinelli,86|14,FW,Viktor Gyökeres,89|29,FW,Kai Havertz,85|19,FW,Leandro Trossard,84|13,GK,Kepa Arrizabalaga,80",
 Inter:"1,GK,Yann Sommer,86|13,GK,Josep Martínez,80|95,DF,Alessandro Bastoni,90|6,DF,Stefan de Vrij,84|28,DF,Benjamin Pavard,86|32,DF,Federico Dimarco,88|23,MF,Nicolò Barella,90|20,MF,Hakan Çalhanoğlu,88|22,MF,Henrikh Mkhitaryan,84|16,MF,Davide Frattesi,84|10,FW,Lautaro Martínez,91|9,FW,Marcus Thuram,89|14,FW,Ange-Yoan Bonny,81|30,DF,Carlos Augusto,84",
 "Atlético Madrid":"13,GK,Jan Oblak,90|1,GK,Juan Musso,81|2,DF,José María Giménez,85|24,DF,Robin Le Normand,86|15,DF,Clément Lenglet,82|21,DF,Javi Galán,80|6,MF,Koke,85|8,MF,Pablo Barrios,86|14,MF,Marcos Llorente,87|5,MF,Rodrigo De Paul,86|7,FW,Antoine Griezmann,89|19,FW,Julián Álvarez,91|9,FW,Alexander Sørloth,85|20,FW,Giuliano Simeone,84"
 };
 const priorSquadLookup=nationalSquad;
 nationalSquad=function(club){const key=club==="Atletico Madrid"?"Atlético Madrid":club==="Inter Milan"?"Inter":club==="PSG"?"Paris Saint-Germain":club;return clubRosterData[key]?clubRosterData[key].split("|").map(row=>{const [number,position,name,rating]=row.split(",");return {number:+number,position,name,rating:+rating};}):priorSquadLookup(club);};
 const priorLineupRender=renderLineup;renderLineup=function(){priorLineupRender();const xi=chooseNationalXI(homeClub);if(xi.length!==11)return;lineupGrid.querySelectorAll(".card").forEach((card,i)=>{const p=xi[i];if(!p)return;card.querySelector("h3").textContent=p.name;card.querySelector("b").textContent=p.rating;card.querySelector("p").textContent="#"+p.number+" · "+p.position;});};

 function clubOverall(club,xi=chooseNationalXI(club)){const avg=arr=>arr.length?Math.round(arr.reduce((n,p)=>n+p.rating,0)/arr.length):0;return {overall:avg(xi),attack:avg(xi.filter(p=>p.position==="FW")),midfield:avg(xi.filter(p=>p.position==="MF")),defense:avg(xi.filter(p=>p.position==="DF"||p.position==="GK"))};}
 function ratingColor(n){return n>=90?"#e43b45":n>=80?"#eac53d":n>=70?"#9859cf":n>=60?"#bfc5ce":"#b47c4d";}
 function refreshClubRatings(){let panel=document.getElementById("club-overall-ratings");if(!panel){panel=document.createElement("div");panel.id="club-overall-ratings";lineupGrid.before(panel);}panel.replaceChildren();for(const club of [homeClub,awayClub]){const v=clubOverall(club);if(!v.overall)continue;const row=document.createElement("div");row.style.cssText="display:flex;align-items:center;gap:12px;padding:8px";const badge=document.createElement("strong");badge.style.cssText="display:grid;place-items:center;width:48px;height:52px;color:#111;clip-path:polygon(0 0,100% 0,100% 65%,50% 100%,0 65%);background:"+ratingColor(v.overall);badge.textContent=v.overall;const label=document.createElement("span");label.textContent=club+" · ATT "+v.attack+" · MID "+v.midfield+" · DEF "+v.defense;row.append(badge,label);panel.append(row);}}
 const rosterRatingRender=renderLineup;renderLineup=function(){rosterRatingRender();refreshClubRatings();};
 refreshClubRatings();

 // Independent away kit palettes and textile patterns, based on 2026/27 references.
 const awayKitStyles={
 Barcelona:["#14121b","#683b91","#e8d269","fade"],
 Liverpool:["#fafafa","#d84355","#bb354a","grey"],
 Arsenal:["#f1d53d","#202735","#202735","zigzag"],
 "Manchester City":["#151515","#f6d637","#f6d637","bee"],
 "Real Madrid":["#17392d","#e9e5d8","#e9e5d8","tonal"],
 "Bayern Munich":["#ffffff","#b51b32","#182b45","polo"],
 Inter:["#fafafa","#1959a2","#1959a2","pinstripe"]
 };
 for(const [club,style] of Object.entries(awayKitStyles))clubKitDetails[club].away=style.slice(0,3);
 const priorAwayPalette=palette;palette=function(club,kit){return kit==="away"&&awayKitStyles[club]?awayKitStyles[club].slice(0,2):priorAwayPalette(club,kit);};
 const baseAwayGraphic=clubKitGraphic;clubKitGraphic=function(club,kit){const d=awayKitStyles[club];const base=baseAwayGraphic(club,kit);if(kit!=="away"||!d||!base)return base;const [a,b,ink,style]=d;let svg=decodeURIComponent(base.split('data:image/svg+xml,')[1].split('"')[0]);let pattern="";if(style==="fade")pattern='<defs><linearGradient id="fade" x2="0" y2="1"><stop stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="100" height="100" fill="url(#fade)"/>';if(style==="pinstripe")for(let x=12;x<95;x+=8)pattern+='<path d="M'+x+' 0V100" stroke="'+b+'" stroke-width="0.8"/>';if(style==="zigzag")for(let y=5;y<100;y+=18)pattern+='<path d="M0 '+y+'l12 8 12 -8 12 8 12 -8 12 8 12 -8 12 8 12 -8" fill="none" stroke="'+b+'" stroke-width="4" opacity=".55"/>';if(style==="grey")pattern='<path d="M0 70L100 90M0 80L100 100" stroke="#c4c6ca" stroke-width="4" opacity=".65"/>';if(style==="bee")for(let y=12;y<100;y+=16)for(let x=10;x<100;x+=18)pattern+='<ellipse cx="'+x+'" cy="'+y+'" rx="3" ry="5" fill="'+b+'" opacity=".3"/>';if(style==="tonal")for(let x=0;x<100;x+=12)pattern+='<path d="M'+x+' 0l20 50 -20 50" fill="none" stroke="#285042" stroke-width="2"/>';if(style==="polo")pattern='<path d="M32 0L42 16 50 8 58 16 68 0" fill="#182b45" stroke="'+b+'" stroke-width="2"/>';svg=svg.replace(/(<rect width="100" height="100"[^>]*\/>)/,'$1'+pattern);return 'url("data:image/svg+xml,'+encodeURIComponent(svg)+'") center/100% 100% no-repeat';};
 updateKitVisual("home");updateKitVisual("away");

 // Active goalkeepers track the ball and narrow shooting angles.
 const keeperTrackingSupport=supportAI;
 supportAI=function(dt){keeperTrackingSupport(dt);if(training||restartMode||paused)return;for(const i of [0,11]){const p=players[i];if(!p||(i===0&&possession==="home"&&activePlayer===0)||(i===11&&possession==="away"&&awayCarrier===11))continue;const home=i===0,dist=home?ballPos.x:100-ballPos.x;const threat=possession===(home?"away":"home");const advance=threat?Math.max(0,Math.min(7,(32-dist)*.3)):0;const x=home?4+advance:96-advance;const y=Math.max(39,Math.min(61,50+(ballPos.y-50)*.55+Math.sin(performance.now()/700+i)*1.2));chase(i,x,y,dt*1.5);}};

 const pressureSupport=supportAI;supportAI=function(dt){pressureSupport(dt);if(training||paused||restartMode||flight||possession!=="home"||ballPos.x<73)return;const defenders=players.map((p,i)=>({p,i,d:Math.hypot(p.x-ballPos.x,p.y-ballPos.y)})).filter(o=>o.i>=12).sort((a,b)=>a.d-b.d).slice(0,3);defenders.forEach((o,j)=>{const y=Math.max(5,Math.min(95,ballPos.y+(j===1?-3:j===2?3:0)));chase(o.i,Math.min(96,ballPos.x+(j?2:0)),y,dt*(j?.85:1.1)*((chargeStart||finesseStart)?.35:1));});};
 const closeRangeStrike=strikeDirectional;strikeDirectional=function(power,curve){const result=closeRangeStrike(power,curve);if(flight&&flight.side==="home"&&flight.kind!=="pass"&&ballPos.x>72){flight.targetY=Math.max(40,Math.min(60,flight.targetY));flight.height=Math.min(1.8,flight.height||0);flight.duration=Math.min(flight.duration,.45);}return result;};

 // Movement input must never drag an in-flight shot back to the shooter.
 const flightSafeMove=movePlayer;movePlayer=function(dx,dy){if(!flight)return flightSafeMove(dx,dy);const saved=ballPos;try{return flightSafeMove(dx,dy);}finally{if(ballPos!==saved)moveBall(saved.x,saved.y);}};

 const closeControlMove=movePlayer;movePlayer=function(dx,dy){const p=players[activePlayer],carry=p&&possession==="home"&&!flight&&!restartMode&&!kickoffSide&&distanceToBall(p)<6;const result=closeControlMove(dx,dy);if(carry&&!flight&&possession==="home"){const d=Math.hypot(dx,dy)||1;moveBall(p.x+.55*dx/d,p.y+.8*dy/d);}return result;};

 // Keep opposing outfield players clear of a stationary set-piece ball.
 const clearSetPieceFrame=restartFrame;restartFrame=function(now,dt){clearSetPieceFrame(now,dt);if(!restartMode||restartMode==="keeper")return;const home=possession==="home";const start=home?12:1,end=home?22:11;for(let i=start;i<end;i++){const p=players[i],dx=p.x-ballPos.x,dy=p.y-ballPos.y;const d=Math.hypot(dx*1.05,dy*.68);if(d<9.15){const a=d>.01?Math.atan2(dy*.68,dx*1.05):(home?Math.PI:0);const x=Math.max(3,Math.min(97,ballPos.x+Math.cos(a)*9.3/1.05)),y=Math.max(4,Math.min(96,ballPos.y+Math.sin(a)*9.3/.68));place(i,x,y);}}};

 // A CPU keeper carrying the ball steps forward and finds a nearby outlet.
 const mobileKeeperRestart=restartFrame;restartFrame=function(now,dt){if(restartMode==="keeper"&&possession==="away"&&awayCarrier===11){const p=players[11];chase(11,88,Math.max(40,Math.min(60,p.y)),dt*.8);moveBall(p.x-.55,p.y);if(now>restartTime){const options=players.slice(12,22).map((q,j)=>({q,i:j+12,d:Math.hypot(q.x-p.x,q.y-p.y),space:Math.min(...players.slice(0,11).map(o=>Math.hypot(o.x-q.x,o.y-q.y)))})).sort((a,b)=>(b.space-b.d*.25)-(a.space-a.d*.25));const target=options[0];restartMode=null;flight={kind:"pass",side:"away",from:11,to:target.i,x:ballPos.x,y:ballPos.y,tx:target.q.x,ty:target.q.y,elapsed:0,duration:Math.max(.5,target.d/28),arc:1};say("Keeper distributes to a teammate.");}return;}mobileKeeperRestart(now,dt);};

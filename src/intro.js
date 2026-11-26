
(()=>{
const $=id=>document.getElementById(id), overlay=$('ofWelcome');
const logo='<svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="38" fill="none" stroke="white" stroke-width="12"/><ellipse cx="75" cy="75" rx="66" ry="16" transform="rotate(-30 75 75)" fill="none" stroke="#b7ff45" stroke-width="5"/></svg>';
const slides=[['WELCOME TO O-FOOTBALL','Your team. Your tactics. Your game.'],['FEEL THE GAME','Discover football matches and the planned 3D experience.'],['MASTER YOUR CONTROLS','Pass, sprint, shoot and defend. Learn the controls in the academy.'],['BUILD YOUR DREAM TEAM','Choose your club, kits and lineup.'],['MAKE FOOTBALL HISTORY','Choose a competition and take the field.'],['YOUR JOURNEY STARTS NOW','The stadium is waiting.']];
let step=-2, device='PC / Laptop', age='', audio, enabled=true;
function tone(f=660,d=.1,v=.035){if(!enabled)return;try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();audio.resume();let o=audio.createOscillator(),g=audio.createGain();o.frequency.value=f;g.gain.setValueAtTime(v,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+d)}catch(e){}}

document.addEventListener('click',e=>{if(e.target.closest('button')){tone()}});
function close(){overlay.hidden=true;try{localStorage.setItem('ofIntroDone','1')}catch(e){}}
function render(){overlay.hidden=false;$('ofArt').innerHTML=logo;$('ofExtra').innerHTML='';$('ofBack').hidden=step===-2;$('ofSkip').hidden=step<0;$('ofNext').textContent=step===5?'Play':'Next';$('ofProgress').textContent=step<0?'O-FOOTBALL':`${step+1} / 6`;
if(step===-2){$('ofTitle').textContent='O-FOOTBALL';$('ofText').textContent='Your club. Your game.'}
else if(step===-1){$('ofTitle').textContent='PLAYER SETUP';$('ofText').textContent='Choose your birth date and device. This is local setup, not identity verification.';$('ofExtra').innerHTML='<select id="ofDay" aria-label="Birth day"><option value="">Day</option>'+Array.from({length:31},(_,i)=>`<option>${i+1}</option>`).join('')+'</select> <select id="ofYear" aria-label="Birth year"><option value="">Year</option>'+Array.from({length:new Date().getFullYear()-1949},(_,i)=>`<option>${1950+i}</option>`).join('')+'</select> <select id="ofMonth" aria-label="Birth month"><option value="">Month</option>'+Array.from({length:12},(_,i)=>`<option value="${i+1}">${new Date(2000,i,1).toLocaleString("en",{month:"long"})}</option>`).join('')+'</select> <select id="ofDevice">'+['PC / Laptop','Mac','Phone','Tablet / iPad','PlayStation controller','Xbox controller','Switch controller'].map(x=>`<option>${x}</option>`).join('')+'</select>';$('ofDevice').value=device;}
else{ $('ofTitle').textContent=slides[step][0];$('ofText').textContent=slides[step][1];}}
$('ofNext').onclick=()=>{if(step===-1){const y=Number($('ofYear').value),m=Number($('ofMonth').value),d=Number($('ofDay').value),birth=new Date(y,m-1,d),today=new Date();device=$('ofDevice').value;if(!y||!m||!d||birth.getFullYear()!==y||birth.getMonth()!==m-1||birth.getDate()!==d||birth>today){$('ofText').textContent='Please choose a valid birth date that is not in the future.';return}age=today.getFullYear()-y-((today.getMonth()<m-1||(today.getMonth()===m-1&&today.getDate()<d))?1:0);}if(step===5)close();else{step++;render()}};
$('ofBack').onclick=()=>{step=Math.max(-2,step-1);render()};$('ofSkip').onclick=close;
const home=document.querySelector('#home .actions');const replay=document.createElement('button');replay.textContent='Replay introduction';replay.onclick=()=>{step=-2;render()};home.append(replay);
const mute=document.createElement('button');mute.textContent='Button sounds: On';mute.onclick=()=>{enabled=!enabled;mute.textContent='Button sounds: '+(enabled?'On':'Off')};home.append(mute);
let seen=false;try{seen=localStorage.getItem('ofIntroDone')==='1'}catch(e){}if(!seen)render();
})();

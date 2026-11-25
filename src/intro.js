
(()=>{
const $=id=>document.getElementById(id), overlay=$('ofWelcome');
const logo='<svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="38" fill="none" stroke="white" stroke-width="12"/><ellipse cx="75" cy="75" rx="66" ry="16" transform="rotate(-30 75 75)" fill="none" stroke="#b7ff45" stroke-width="5"/></svg>';
const slides=[['WELCOME TO O-FOOTBALL','Your team. Your tactics. Your game.'],['FEEL THE GAME','Discover football matches and the planned 3D experience.'],['MASTER YOUR CONTROLS','Pass, sprint, shoot and defend. Learn the controls in the academy.'],['BUILD YOUR DREAM TEAM','Choose your club, kits and lineup.'],['MAKE FOOTBALL HISTORY','Choose a competition and take the field.'],['YOUR JOURNEY STARTS NOW','The stadium is waiting.']];
let step=-2, device='PC / Laptop', age='', audio, music=null, enabled=true;
function tone(f=660,d=.1,v=.035){if(!enabled)return;try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();audio.resume();let o=audio.createOscillator(),g=audio.createGain();o.frequency.value=f;g.gain.setValueAtTime(v,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+d)}catch(e){}}
let beat=0;function startMusic(){if(music)return;music=setInterval(()=>{if(!document.getElementById('home').classList.contains('active')||!overlay.hidden)return;const notes=[220,330,440,330,196,294,392,294];tone(notes[beat++%8],.27,.012)},340)}
document.addEventListener('click',e=>{if(e.target.closest('button')){tone();startMusic()}});
function close(){overlay.hidden=true;try{localStorage.setItem('ofIntroDone','1')}catch(e){}}
function render(){overlay.hidden=false;$('ofArt').innerHTML=logo;$('ofExtra').innerHTML='';$('ofBack').hidden=step===-2;$('ofSkip').hidden=step<0;$('ofNext').textContent=step===5?'Play':'Next';$('ofProgress').textContent=step<0?'O-FOOTBALL':`${step+1} / 6`;
if(step===-2){$('ofTitle').textContent='O-FOOTBALL';$('ofText').textContent='Your club. Your game.'}
else if(step===-1){$('ofTitle').textContent='PLAYER SETUP';$('ofText').textContent='Choose an age group and device. This is local setup, not identity verification.';$('ofExtra').innerHTML='<select id="ofAge"><option value="">Age group</option><option>Under 13</option><option>13–17</option><option>18+</option></select> <select id="ofDevice">'+['PC / Laptop','Mac','Phone','Tablet / iPad','PlayStation controller','Xbox controller','Switch controller'].map(x=>`<option>${x}</option>`).join('')+'</select>';$('ofAge').value=age;$('ofDevice').value=device;}
else{ $('ofTitle').textContent=slides[step][0];$('ofText').textContent=slides[step][1];}}
$('ofNext').onclick=()=>{if(step===-1){age=$('ofAge').value;device=$('ofDevice').value;if(!age){$('ofText').textContent='Please choose an age group.';return}}if(step===5)close();else{step++;render()}};
$('ofBack').onclick=()=>{step=Math.max(-2,step-1);render()};$('ofSkip').onclick=close;
const home=document.querySelector('#home .actions');const replay=document.createElement('button');replay.textContent='Replay introduction';replay.onclick=()=>{step=0;render()};home.append(replay);
const mute=document.createElement('button');mute.textContent='Audio: On';mute.onclick=()=>{enabled=!enabled;mute.textContent='Audio: '+(enabled?'On':'Off')};home.append(mute);
let seen=false;try{seen=localStorage.getItem('ofIntroDone')==='1'}catch(e){}if(!seen)render();
})();

// Day 2 optional hub features. Session-only; no account or external storage.
(()=>{
const $=id=>document.getElementById(id);
const clubs=Object.entries(LEAGUES).flatMap(([league,names])=>names.map(name=>({league,name})));
const favorites=new Set(), history=[];
const hub=$('ofExtras');
const make=(tag,text,parent)=>{const el=document.createElement(tag);el.textContent=text;parent.append(el);return el};
const button=(text,parent,fn)=>{const b=make('button',text,parent);b.type='button';b.onclick=fn;return b};
function choose(c,opponent){show('leagues');league=c.league;homeClub=c.name;awayClub=opponent||LEAGUES[league].find(n=>n!==homeClub)||'All-Stars';setupKits();show('kits')}
const search=$('ofGlobalSearch'),results=$('ofSearchResults'),fav=$('ofFavorites');
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function clubRow(c,parent){const row=make('div','',parent);row.className='toolbar';button(c.name+' · '+c.league,row,()=>choose(c));const key=c.league+'|'+c.name;const star=button(favorites.has(key)?'★ Remove':'☆ Favourite',row,()=>{favorites.has(key)?favorites.delete(key):favorites.add(key);renderClubsHub()});star.setAttribute('aria-pressed',String(favorites.has(key)))}
function renderClubsHub(){results.replaceChildren();fav.replaceChildren();const q=normalize(search.value.trim());if(q){const matches=clubs.filter(c=>normalize(c.name+' '+c.league).includes(q));make('p',matches.length+' matches · showing up to 20',results);matches.slice(0,20).forEach(c=>clubRow(c,results))}else make('p','Search any club or league in the current database.',results);const saved=clubs.filter(c=>favorites.has(c.league+'|'+c.name));if(!saved.length)make('p','No favourites yet.',fav);saved.forEach(c=>clubRow(c,fav))}
search.addEventListener('input',renderClubsHub);renderClubsHub();
$('ofClasico').onclick=()=>choose({league:'Spain · La Liga',name:'Barcelona'},'Real Madrid');
let recorded=false,streak=0,best=0,total=0,wins=0,draws=0,losses=0;
function renderHistory(){const el=$('ofHistory');el.replaceChildren();make('p',total+' played · '+wins+' wins · '+draws+' draws · '+losses+' losses',el);make('p','Winning streak: '+streak+' · Best: '+best,el);if(!history.length)make('p','Finish a match to see your result here.',el);history.slice().reverse().forEach(r=>make('p',r,el))}
const reset=resetMatch;resetMatch=function(){recorded=false;return reset.apply(this,arguments)};
const observer=new MutationObserver(()=>{if(recorded||training||seconds<matchDuration||$('matchStatus').textContent!=='FULL TIME')return;recorded=true;total++;if(score[0]>score[1]){wins++;streak++;best=Math.max(best,streak)}else{streak=0;if(score[0]===score[1])draws++;else losses++}history.push(homeClub+' '+score.join(' – ')+' '+awayClub);if(history.length>50)history.shift();renderHistory();make('p','Full time: '+history[history.length-1],$('ofNotices'));while($('ofNotices').children.length>10)$('ofNotices').firstElementChild.remove()});
observer.observe($('matchStatus'),{childList:true,characterData:true,subtree:true});renderHistory();
$('ofClearNotices').onclick=()=>$('ofNotices').replaceChildren();
})();

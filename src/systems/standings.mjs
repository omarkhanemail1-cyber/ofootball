// Prototype standings; official tournament-specific tie breakers remain future work.
export function standings(teams,matches) {
 const rows=new Map(teams.map(team=>[team,{team,played:0,points:0,gf:0,ga:0}]));
 if(rows.size!==teams.length) throw new Error('Duplicate team');
 for(const {home,away,homeGoals,awayGoals} of matches){
 const a=rows.get(home),b=rows.get(away);
 if(!a||!b||a===b||![homeGoals,awayGoals].every(n=>Number.isInteger(n)&&n>=0)) throw new Error('Invalid match');
 a.played++;b.played++;a.gf+=homeGoals;a.ga+=awayGoals;b.gf+=awayGoals;b.ga+=homeGoals;
 a.points+=homeGoals>awayGoals?3:homeGoals===awayGoals?1:0;
 b.points+=awayGoals>homeGoals?3:homeGoals===awayGoals?1:0;
 }
 return [...rows.values()].map(r=>({...r,gd:r.gf-r.ga})).sort((a,b)=>b.points-a.points||b.gd-a.gd||b.gf-a.gf||a.team.localeCompare(b.team));
}

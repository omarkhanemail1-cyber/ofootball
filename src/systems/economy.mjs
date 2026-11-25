export const MATCH_REWARDS = Object.freeze({win:500,draw:200,loss:0});
export const BIG_FIVE = Object.freeze(['Barcelona','Real Madrid','Bayern Munich','Manchester City','Arsenal']);
export const JACKPOT = Object.freeze({coins:2000000,tokens:1000000,gems:30000});
const tiers = [[60,69,25000,1500],[70,79,100000,6000],[80,84,500000,30000],[85,89,1000000,60000],[90,94,5000000,300000],[95,99,10000000,600000]];
export function transferPrice(rating) {
 if (!Number.isInteger(rating)) throw new RangeError('Integer rating required');
 const tier=tiers.find(([lo,hi])=>rating>=lo&&rating<=hi);
 if(!tier) throw new RangeError('Rating must be 60–99');
 return {coins:tier[2],tokens:tier[3]};
}
export function matchReward(result) {
 if(!Object.hasOwn(MATCH_REWARDS,result)) throw new RangeError('Invalid result');
 return MATCH_REWARDS[result];
}
export function canClaimJackpot(collected,claimed=false) {
 return !claimed && BIG_FIVE.every(club=>collected.includes(club));
}

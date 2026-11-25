import test from 'node:test';
import assert from 'node:assert/strict';
import {matchReward,transferPrice,canClaimJackpot,BIG_FIVE} from '../src/systems/economy.mjs';
import {standings} from '../src/systems/standings.mjs';
test('match rewards',()=>{assert.equal(matchReward('win'),500);assert.equal(matchReward('draw'),200);assert.equal(matchReward('loss'),0);});
test('transfer tiers',()=>{assert.deepEqual(transferPrice(99),{coins:10000000,tokens:600000});assert.deepEqual(transferPrice(60),{coins:25000,tokens:1500});assert.throws(()=>transferPrice(100));});
test('jackpot eligibility',()=>{assert.equal(canClaimJackpot(BIG_FIVE),true);assert.equal(canClaimJackpot(BIG_FIVE,true),false);assert.equal(canClaimJackpot(BIG_FIVE.slice(1)),false);});
test('group standings',()=>{const r=standings(['A','B'],[{home:'A',away:'B',homeGoals:2,awayGoals:0}]);assert.equal(r[0].points,3);assert.equal(r[0].gd,2);});

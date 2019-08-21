let visual = require('util.visual');
module.exports = {
    sourceJudge: function (creep, goal, resourceType) {
        return goal.energy > 0;
    },
    mineralJudge: function (creep, goal, resourceType) {
        return goal.mineralAmount > 0;
    },
    containerJudgeI: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && goal.store[resourceType] > 0) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy > 0));
    },
    containerJudgeII: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && _.sum(goal.store) < goal.storeCapacity) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy < goal.energyCapacity));
    },
    containerJudgeIII: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && goal.storeCapacity - goal.store[RESOURCE_ENERGY] >= creep.carryCapacity) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energyCapacity - goal.energy >= creep.carryCapacity));
    },
    containerJudgeIV: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && goal.store[resourceType]/goal.storeCapacity >= 0.1) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy/goal.storeCapacity >= 0.1));
    },
    containerJudgeV: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && (goal.store[resourceType]/goal.storeCapacity < 0.5) || !goal.store[resourceType]) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy/goal.storeCapacity < 0.5));
    },
    containerJudgeVI: function (creep, goal, resourceType) {
        return goal && ((goal.storeCapacity && goal.store[resourceType] >= creep.carryCapacity) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy >= creep.carryCapacity));
    },
    powerSpawnJudge:function (creep, goal, resourceType) {
        return goal && ((resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy / goal.energyCapacity < 0.5) || (resourceType == RESOURCE_POWER && goal.powerCapacity && goal.power / goal.powerCapacity < 0.5));
    },
    repairJudge: function (creep, goal, resourceType) {
        return goal && goal.hits < goal.hitsMax;
    },
    buildJudge: function (creep, goal, resourceType) {
        return goal && goal.progress < goal.progressTotal;
    },
    controllerJudge: function (creep, goal, resourceType) {
        return goal && goal.progress + 1;
    },
    dropJudge:function (creep, goal, resourceType) {
        return goal && (goal.amount > 100 || (goal.storeCapacity && goal.store[resourceType] > 50));
    },

    harvestSourceOrMineral: function (creep, src, tgt, resourceType) {
        creep.say('⛏');
        let result = creep.harvest(src);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(src,{
                reusePath:20
            });
        }
        return result;
    },
    withdraw: function (creep, src, tgt, resourceType) {
        creep.say('🚚');
        let result = creep.withdraw(src, resourceType)
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(src,{
                reusePath:20
            });
        } else if (result == OK){
            creep.memory.work = false;
        }
        return result;
    },
    withdrawNear: function (creep, src, tgt, resourceType) {
        creep.say('🚚↔');
        let result = creep.withdraw(src, resourceType);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(src);
        } else if (result == OK){
            creep.memory.work = false;
        }
        return result;
    },
    transfer: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨');
        let result = creep.transfer(tgt, resourceType);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt,{
                reusePath:20
            });
        } else if (result == OK){
            creep.memory.work = true;
        }
        return result;
    },
    transferNear: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨↔');
        let result = creep.transfer(tgt, resourceType);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt);
        }
        return result;
    },
    repair: function (creep, src, tgt, resourceType) {
        creep.say('🔧');
        let result =creep.repair(tgt);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt,{
                reusePath:20
            });
        }
        return result;
    },
    build: function (creep, src, tgt, resourceType) {
        creep.say('🛠');
        visual.showProgress(tgt);
        let result = creep.build(tgt);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt,{
                reusePath:20
            });
        }
        return result;
    },
    upgrade: function (creep, src, tgt, resourceType) {
        creep.say('⚙');
        let result = creep.upgradeController(tgt);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt,{
                reusePath:20
            });
        }
        return result;
    },
    getDrop:function (creep, src, tgt, resourceType) {
        creep.say('s')
        if (src.amount) {
            let result = creep.pickup(src);
        } else {
            let result = creep.withdraw(src, resourceType);
        }
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(src,{
                reusePath:20
            });
        } else if (result == OK) {
            creep.memory.work = false;
        }
    },

    findResource:function (creep,l) {
        l.src = creep.room.find(FIND_DROPPED_RESOURCES).map(s=>s.id);
        l.src = l.src.concat(creep.room.find(FIND_TOMBSTONES).map(s=>s.id));
    }
};

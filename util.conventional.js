module.exports = {
    sourceJudge: function (goal, resourceType) {
        return goal.energy > 0;
    },
    mineralJudge: function (goal, resourceType) {
        return goal.mineralAmount > 0;
    },
    containerJudgeI: function (goal, resourceType) {
        return goal && (goal.storeCapacity && goal.store[resourceType] > 0) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy > 0);
    },
    containerJudgeII: function (goal, resourceType) {
        return goal && (goal.storeCapacity && _.sum(goal.store) < goal.storeCapacity) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy < goal.energyCapacity);
    },
    containerJudgeIII: function (goal, resourceType) {
        return goal && (goal.storeCapacity && goal.storeCapacity - goal.store[RESOURCE_ENERGY] >= 1200) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energyCapacity - goal.energy >= 1200);
    },
    containerJudgeIV: function (goal, resourceType) {
        return goal && (goal.storeCapacity && goal.store[resourceType] >= 100000) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy >= 100000);
    },
    containerJudgeV: function (goal, resourceType) {
        return goal && (goal.storeCapacity && goal.store[resourceType] < 150000) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy < 150000);
    },
    containerJudgeVI: function (goal, resourceType) {
        return goal && (goal.storeCapacity && goal.store[resourceType] >= 1200) || (resourceType == RESOURCE_ENERGY && goal.energyCapacity && goal.energy >= 1200);
    },
    repairJudge: function (goal, resourceType) {
        return goal && goal.hits < goal.hitsMax;
    },
    buildJudge: function (goal, resourceType) {
        return goal && goal.progress < goal.progressTotal;
    },
    controllerJudge: function (goal, resourceType) {
        return goal && goal.progress + 1;
    },

    harvestSourceOrMineral: function (creep, src, tgt, resourceType) {
        creep.say('⛏');
        if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
    },
    withdraw: function (creep, src, tgt, resourceType) {
        creep.say('🚚');
        if (creep.withdraw(src, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
        creep.memory.work = false;
    },
    withdrawNear: function (creep, src, tgt, resourceType) {
        creep.say('🚚↔');
        if (creep.withdraw(src, resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(src);
        }
        creep.memory.work = false;
    },
    withdrawWithUpgrade: function (creep, src, tgt, resourceType) {
        creep.say('🚚+⚙');
        if (creep.withdraw(src, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
        creep.upgradeController(tgt);
    },
    transfer: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨');
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
    },
    transferNear: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨↔');
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tgt);
        }
    },
    transferWithWithdraw: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨+🚚');
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
        creep.withdraw(src, resourceType);
    },
    transferWithHarvest: function (creep, src, tgt, resourceType) {
        creep.say('🚚💨+⛏');
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
        creep.harvest(src);
    },
    repair: function (creep, src, tgt, resourceType) {
        creep.say('🔧');
        if (creep.repair(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt, {
                ignoreRoads: true,
                ignoreCreeps: false
            });
        }
    },
    build: function (creep, src, tgt, resourceType) {
        creep.say('🛠');
        if (creep.build(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt, {
                ignoreRoads: true,
                ignoreCreeps: false
            });
        }
    },
    upgrade: function (creep, src, tgt, resourceType) {
        creep.say('⚙');
        if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
    },
    upgradeWithWithdraw: function (creep, src, tgt, resourceType) {
        creep.say('⚙+🚚');
        if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
        creep.withdraw(src, resourceType);
    },
};

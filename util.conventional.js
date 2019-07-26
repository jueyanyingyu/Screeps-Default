module.exports = {
    sourceJudge:function (id, resourceType) {
        let src = Game.getObjectById(id);
        return src.energy > 0;
    },
    mineralJudge:function (id, resourceType) {
        let src = Game.getObjectById(id);
        return src.mineralAmount > 0;
    },
    containerJudgeI:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return (tgt.storeCapacity && tgt.store[resourceType] > 0 )|| (resourceType == RESOURCE_ENERGY && tgt.energyCapacity && tgt.energy > 0);
    },
    containerJudgeII:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return (tgt.storeCapacity && _.sum(tgt.store) < tgt.storeCapacity) || (resourceType == RESOURCE_ENERGY && tgt.energyCapacity &&  tgt.energy < tgt.energyCapacity);
    },
    containerJudgeIII:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return (tgt.storeCapacity && tgt.storeCapacity - tgt.store[RESOURCE_ENERGY] >= 1200)  || (resourceType == RESOURCE_ENERGY && tgt.energyCapacity &&  tgt.energyCapacity - tgt.energy >= 1200);
    },
    containerJudgeIV:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return (tgt.storeCapacity && tgt.store[resourceType] >= 50000)  || (resourceType == RESOURCE_ENERGY && tgt.energyCapacity &&  tgt.energy >= 50000);
    },
    repairJudge:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return tgt.hits < tgt.hitsMax;
    },
    buildJudge:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return tgt.progress < tgt.progressTotal;
    },
    controllerJudge:function (id ,resourceType) {
        let tgt = Game.getObjectById(id);
        return tgt.progress < tgt.progressTotal;
    },

    harvestSourceOrMineral:function (creep ,srcId, tgtId ,resourceType) {
        let src = Game.getObjectById(srcId);
        if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
    },
    withdraw:function (creep ,srcId, tgtId ,resourceType) {
        let src = Game.getObjectById(srcId);
        if (creep.withdraw(src,resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
        creep.memory.work = false;
    },
    withdrawWithUpgrade:function (creep ,srcId, tgtId ,resourceType) {
        let src = Game.getObjectById(srcId);
        let tgt = Game.getObjectById(tgtId);
        if (creep.withdraw(src,resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(src);
        }
        creep.upgradeController(tgt);
    },
    transfer:function (creep ,srcId, tgtId ,resourceType) {
        let tgt = Game.getObjectById(tgtId);
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
    },
    transferWithHarvest:function (creep ,srcId, tgtId ,resourceType) {
        let src = Game.getObjectById(srcId);
        let tgt = Game.getObjectById(tgtId);
        if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
        creep.harvest(src);
    },
    repair:function (creep ,srcId, tgtId ,resourceType) {
        let tgt = Game.getObjectById(tgtId);
        if (creep.repair(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt,{
                ignoreRoads:true,
                ignoreCreeps: false
            });
        }
    },
    build:function (creep ,srcId, tgtId ,resourceType) {
        let tgt = Game.getObjectById(tgtId);
        if (creep.build(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt,{
                ignoreRoads:true,
                ignoreCreeps: false
            });
        }
    },
    upgrade:function (creep ,srcId, tgtId ,resourceType) {
        let tgt = Game.getObjectById(tgtId);
        if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
    },
    upgradeWithWithdraw:function (creep ,srcId, tgtId ,resourceType) {
        let src = Game.getObjectById(srcId)
        let tgt = Game.getObjectById(tgtId);
        if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
            creep.travelTo(tgt);
        }
        creep.withdraw(src,resourceType);
    },
};

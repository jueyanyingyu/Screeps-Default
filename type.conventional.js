const UC = require('util.conventional');
const replenish = require('type.replenish');
function getNewTask(list,creep) {
    try {
        //temp
        //list.map(l => l.resourceList = [l.resourceType]);
        let srcId, tgtId, resourceType;
        let index = list.findIndex(l =>
            resourceType = l.resourceList.find(
                r =>
                    ((srcId = l.src.find(
                        s => Game.getObjectById(s)
                            && (UC[l.srcJudge](creep, Game.getObjectById(s), r))))
                        && (tgtId = l.tgt.find(
                            t => Game.getObjectById(t)
                                && (UC[l.tgtJudge](creep, Game.getObjectById(t), r)))))));
        return {
            srcId:srcId,
            tgtId:tgtId,
            resourceType:resourceType,
            index:index
        };
    } catch (e) {

    }
}
function setCreep(creep) {
    try {
        let list = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName];
        let task = getNewTask(list,creep);
        if (task) {
            let index = task.index;
            let srcId = task.srcId;
            let tgtId = task.tgtId;
            let resourceType =task.resourceType;
            if (index != -1) {
                creep.memory.task = {};
                creep.memory.task.src = srcId;
                creep.memory.task.srcJudge = list[index].srcJudge;
                creep.memory.task.doSrc = list[index].doSrc;
                creep.memory.task.tgt = tgtId;
                creep.memory.task.tgtJudge = list[index].tgtJudge;
                creep.memory.task.doTgt = list[index].doTgt;
                creep.memory.task.resourceType = resourceType;
                return true;
            }
        }
    } catch (e) {
        console.log(creep);
        console.log(e);
        creep.say('‼');
    }
}

function doCreep(creep, ifRcs) {
    try {
        if (creep.memory.task) {
            let src = Game.getObjectById(creep.memory.task.src);
            let srcJudge = creep.memory.task.srcJudge;
            let doSrc = creep.memory.task.doSrc;
            let tgt = Game.getObjectById(creep.memory.task.tgt);
            let tgtJudge = creep.memory.task.tgtJudge;
            let doTgt = creep.memory.task.doTgt;
            let resourceType = creep.memory.task.resourceType;
            if ( creep.ticksToLive > 20 && (!creep.carry[resourceType] || creep.carry[resourceType] == 0)) {
                creep.memory.work = true;
            }
            if (_.sum(creep.carry) == creep.carryCapacity) {
                creep.memory.work = false;
            }
            if (creep.memory.work == true) {
                if (UC[srcJudge](creep, src, resourceType)) {
                    UC[doSrc](creep, src, tgt, resourceType);
                    return;
                }
            } else {
                if (UC[tgtJudge](creep, tgt, resourceType)) {
                    UC[doTgt](creep, src, tgt, resourceType);
                    return;
                }
            }
            let list = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName];
            if (_.sum(creep.carry) > 0 && _.sum(src.store) < src.storeCapacity && getNewTask(list,creep).resourceType != resourceType) {
                let result = creep.transfer(src, resourceType);
                if (ERR_NOT_IN_RANGE == result) {
                    creep.moveTo(src);
                }
                if (OK == result) {
                    creep.memory.task = undefined;
                }
                return;
            } else {
                creep.moveTo(src);
            }
        }
        try {
            if (ifRcs == true && setCreep(creep) == true) {
                doCreep(creep, false);
            } else {
                creep.say('❔');
            }
        } catch (e) {
            console.log(creep);
            console.log(e);
        }
    } catch (e) {
        creep.say('❗');
        console.log(creep);
        console.log(e);
    }

}

module.exports = {
    run: function () {
        let conventionalCreeps = _.filter(Game.creeps, (creep) => creep.memory.type == 'conventional');
        let cpuBefore = Game.cpu.getUsed();
        for (let name in conventionalCreeps) {
            let creep = conventionalCreeps[name];
            replenish.run(creep);
            doCreep(creep, true);
        }
        let cpuAfter = Game.cpu.getUsed();
    }
};

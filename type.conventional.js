const UC = require('util.conventional');
const replenish = require('replenish');
function setCreep(creep) {
    const UC = require('util.conventional');
    try {
        let list = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName];
        let srcId, tgtId;
        let index = list.findIndex(l => (srcId = l.src.find(s => UC[l.srcJudge](s, l.resourceType))) && (tgtId = l.tgt.find(t => UC[l.tgtJudge](t, l.resourceType))));
        if (index != -1) {
            creep.memory.task = {};
            creep.memory.task.src = srcId;
            creep.memory.task.srcJudge = list[index].srcJudge;
            creep.memory.task.doSrc = list[index].doSrc;
            creep.memory.task.tgt = tgtId;
            creep.memory.task.tgtJudge = list[index].tgtJudge;
            creep.memory.task.doTgt = list[index].doTgt;
            creep.memory.task.resourceType = list[index].resourceType;
            return true;
        }
    } catch (e) {
        creep.say('cannot set');
    }
}

function doCreep(creep, ifRcs) {
    try {
        let srcId = creep.memory.task.src;
        let srcJudge = creep.memory.task.srcJudge;
        let doSrc = creep.memory.task.doSrc;
        let tgtId = creep.memory.task.tgt;
        let tgtJudge = creep.memory.task.tgtJudge;
        let doTgt = creep.memory.task.doTgt;
        let resourceType = creep.memory.task.resourceType;
        if (creep.memory.work == true) {
            if (UC[srcJudge](srcId, resourceType)) {
                UC[doSrc](creep, srcId, tgtId, resourceType);
                return;
            }
        } else {
            if (UC[tgtJudge](tgtId, resourceType)) {
                UC[doTgt](creep, srcId, tgtId, resourceType);
                return;
            }
        }
    } catch (e) {
        creep.say('cannot work');
    }
    if (ifRcs == true && setCreep(creep) == true) {
        doCreep(creep, false);
    }
}

module.exports = {
    run: function (creep) {
        replenish.run(creep);
        if (_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.work = false;
        } else if (creep.carry[RESOURCE_ENERGY] == 0) {
            creep.memory.work = true;
            setCreep(creep);
        }
        doCreep(creep,true);
    }
};

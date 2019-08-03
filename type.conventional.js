const UC = require('util.conventional');
const replenish = require('type.replenish');
function setCreep(creep) {
    try {
        let list = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName];
        let srcId, tgtId;
        let index = list.findIndex(l => (srcId = l.src.find(s => UC[l.srcJudge](Game.getObjectById(s), l.resourceType))) && (tgtId = l.tgt.find(t => UC[l.tgtJudge](Game.getObjectById(t), l.resourceType))));
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
        console.log(creep);
        console.log(e);
        creep.say('‼');
    }
}

function doCreep(creep, ifRcs) {
    try {
        let src = Game.getObjectById(creep.memory.task.src);
        let srcJudge = creep.memory.task.srcJudge;
        let doSrc = creep.memory.task.doSrc;
        let tgt = Game.getObjectById(creep.memory.task.tgt);
        let tgtJudge = creep.memory.task.tgtJudge;
        let doTgt = creep.memory.task.doTgt;
        let resourceType = creep.memory.task.resourceType;
        if (creep.memory.work == true) {
            if (UC[srcJudge](src, resourceType)) {
                UC[doSrc](creep, src, tgt, resourceType);
                return;
            }
        } else {
            if (UC[tgtJudge](tgt, resourceType)) {
                UC[doTgt](creep, src, tgt, resourceType);
                return;
            }
        }
    } catch (e) {
        creep.say('❗');
    }
    creep.say('❔');
    if (ifRcs == true && setCreep(creep) == true) {
        doCreep(creep, false);
    } else {
        try {
            if (creep.memory.work == true) {
                creep.moveTo(Game.getObjectById(creep.memory.task.src));
            } else {
                creep.moveTo(Game.getObjectById(creep.memory.task.tgt));
            }
        } catch (e) {
        }
        //creep.move(_.random(0,7));
    }
}

module.exports = {
    run: function (creep) {
        replenish.run(creep);
        if (_.sum(creep.carry) == creep.carryCapacity) {
            if (creep.memory.work == true) {
                setCreep(creep);
            }
            creep.memory.work = false;
        } else if (_.sum(creep.carry) == 0) {
            if (creep.memory.work == false) {
                setCreep(creep);
            }
            creep.memory.work = true;

        }
        doCreep(creep,true);
    }
};

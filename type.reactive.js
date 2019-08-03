const replenish = require('type.replenish');
const UC = require('util.reactive');
function setCreep(creep) {
    try {
        let event;
        let reactiveList = Memory['reactiveList'][creep.memory.typeInfo.reactiveName];
        for (let roomName of reactiveList['roomCoverage']) {
            if (event = Memory['eventList'][roomName].find(e=>UC[reactiveList['eventJudge']](e))) {
                creep.memory.reactive = {};
                creep.memory.reactive.eventRoom = roomName;
                creep.memory.reactive.eventJudge = reactiveList['eventJudge'];
                creep.memory.reactive.event = event;
                creep.memory.reactive.doEvent = reactiveList['doEvent'];
                creep.memory.typeInfo.busy = true;
                return;
            }
        }
    } catch (e) {
        console.log(creep);
        console.log(e);
    }
}

function doCreep(creep) {
    try {
        if (UC[creep.memory.reactive.eventJudge](creep.memory.reactive.event)) {
            UC[creep.memory.reactive.doEvent](creep);
            return;
        }
    } catch (e) {
        console.log(e);
        creep.say('❔');
    }
    creep.memory.typeInfo.busy = false;
}

module.exports = {
    run: function (creep) {
        replenish.run(creep);
        if (creep.memory.typeInfo.busy) {
            doCreep(creep);
        } else {
            setCreep(creep);
        }
    }
};

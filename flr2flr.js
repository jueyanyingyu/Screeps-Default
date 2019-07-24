let Traveler = require('Traveler');

function doTransfer(creep) {
    let list = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'];
    if (list) {
        let src, tgt;
        let resourceType = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_resourceType'];
        if (resourceType) {
            for (let i = 0; i < list.src.length; i++) {
                let srcList = list.src[i];
                let tgtList = list.tgt[i];
                let srcTemp,tgtTemp;
                if (srcList && tgtList) {
                    for (let srcId of srcList) {
                        srcTemp = Game.getObjectById(srcId);
                        if (srcTemp && srcTemp.storeCapacity && srcTemp.store[resourceType] > 0) {
                            src = srcTemp;
                            break;
                        } else if (srcTemp && srcTemp.energyCapacity && srcTemp.energy > 0) {
                            src = srcTemp;
                            break;
                        }
                    }
                    for (let tgtId of tgtList) {
                        tgtTemp = Game.getObjectById(tgtId);
                        if (tgtTemp && tgtTemp.storeCapacity && tgtTemp.store[resourceType] < tgtTemp.storeCapacity) {
                            tgt = tgtTemp;
                            break;
                        } else if (tgtTemp && tgtTemp.energyCapacity && tgtTemp.energy < tgtTemp.energyCapacity) {
                            tgt = tgtTemp;
                            break;
                        }
                    }
                    if (src && tgt) {
                        break;
                    }
                }
            }
            if (src && tgt) {
                if (creep.memory.work == true) {
                    let returned = creep.withdraw(src, resourceType);
                    if (returned == ERR_NOT_IN_RANGE) {
                        creep.travelTo(src, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                    if (returned == OK) {
                        creep.memory.work = false;
                    }
                } else {
                    if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(tgt, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
        }
    }
}


let flr2flr = {
    run: function (creep) {
        if (_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.work = false;
        } else if (_.sum(creep.carry) == 0) {
            creep.memory.work = true;
        }
        doTransfer(creep);
    }
}
module.exports = flr2flr;
/*
Memory.sim_transporter_1_list = {
    src:[['b21cb6541cc6f7ff0f52ca15','e925f832f828c463335405fe'],['c3f113b4da1dd6f6b344002c'],['c3f113b4da1dd6f6b344002c']],
    tgt:[['25aefd6c158aa3f7e2a78de6'],['25aefd6c158aa3f7e2a78de6'],['b21cb6541cc6f7ff0f52ca15','e925f832f828c463335405fe']]
}

 */
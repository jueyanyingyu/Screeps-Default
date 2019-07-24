module.exports = {
    run: function (creep) {
        let renew = require('renew');
        if (renew.run(creep) == -1) {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.work = false;
            } else if (creep.carry.energy == 0) {
                creep.memory.work = true;
            }
            if (creep.memory.work == true) {
                let srcList = Memory.toDemolish;
                for (let srcID of srcList) {
                    let src = Game.getObjectById(srcID);
                    if (src) {
                        if (creep.dismantle(src) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(src, {
                                visualizePathStyle: {
                                    stroke: '#0000ff'
                                }
                            });
                        } else {
                            break;
                        }
                    } else {
                        console.log('delete : '+srcID);
                    }
                }
            } else {
                let tgt = Game.getObjectById('5d09c972dc14d7111c5a0379');
                if (creep.transfer(tgt,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tgt, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
        }
    }
};
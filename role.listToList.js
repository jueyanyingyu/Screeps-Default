let Traveler = require('Traveler');

function doHarvest(creep) {
    if (creep.memory.work == true) {
        let src;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
            for (let srcID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
                let aSrc = Game.getObjectById(srcID);
                if (aSrc && aSrc.energyCapacity) {
                    if (aSrc.energy > 0) {
                        src = aSrc;
                        break;
                    }
                }
            }
        }
        if (src) {
            if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        }
    } else {
        let tgt;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_tgt']) {
            for (let tgtID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_tgt']) {
                let aTgt = Game.getObjectById(tgtID);
                if (aTgt && aTgt.storeCapacity) {
                    if (aTgt.store[RESOURCE_ENERGY] < aTgt.storeCapacity) {
                        tgt = aTgt;
                        break;
                    }
                } else if (aTgt && aTgt.energyCapacity) {
                    if (aTgt.energy < aTgt.energyCapacity) {
                        tgt = aTgt;
                        break;
                    }
                }
            }
        }
        if (tgt) {
            if (creep.transfer(tgt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        }
    }
}

function doBuild(creep) {
    if (creep.memory.work == true) {
        let src;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
            for (let srcID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
                let aSrc = Game.getObjectById(srcID);
                if (aSrc && aSrc.storeCapacity) {
                    if (aSrc.store[RESOURCE_ENERGY] >= creep.carryCapacity) {
                        src = aSrc;
                        break;
                    }
                } else if (aSrc && aSrc.energyCapacity) {
                    if (aSrc.energy > creep.carryCapacity) {
                        src = aSrc;
                        break;
                    }
                }
            }
        }
        if (src) {
            let r = creep.withdraw(src, RESOURCE_ENERGY);
            if (r == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if (r == ERR_INVALID_TARGET) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(src, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }

            }
        }
    } else {
        let tgt;
        if (Memory['needEM_' + creep.memory.room] == true) {
            for (let tgtID of Memory['EM_tgt_' + creep.memory.room]) {
                let aTgt = Game.getObjectById(tgtID);
                if (aTgt && aTgt.hitsMax) {
                    if (aTgt.hits < aTgt.hitsMax) {
                        tgt = aTgt;
                        break;
                    }
                }
            }
            if (tgt) {
                creep.say('EM');
                if (creep.repair(tgt) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(tgt, {
                        visualizePathStyle: {
                            stroke: '#ff0000'
                        }
                    });
                }
                return;
            }
        }
        if (Memory['needBuild_' + creep.memory.room] == true) {
            for (let tgtID of Memory[creep.memory.role + '_' + creep.memory.room + '_tgt']) {
                let aTgt = Game.getObjectById(tgtID);
                if (aTgt && aTgt.progressTotal) {
                    if (aTgt.progress < aTgt.progressTotal) {
                        tgt = aTgt;
                        break;
                    }
                }
            }
            if (tgt) {
                if (creep.build(tgt) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(tgt, {
                        visualizePathStyle: {
                            stroke: '#ffee00'
                        }
                    });
                }
                return;
            }
        }
        if (Memory['needRepair_' + creep.memory.room] == true) {
            for (let tgtID of Memory['repair_tgt_' + creep.memory.room]) {
                let aTgt = Game.getObjectById(tgtID);
                if (aTgt && aTgt.hitsMax) {
                    if (aTgt.hits < aTgt.hitsMax) {
                        tgt = aTgt;
                        break;
                    }
                }
            }
            if (tgt) {
                if (creep.repair(tgt) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(tgt, {
                        visualizePathStyle: {
                            stroke: '#00ff00'
                        }
                    });
                }
                return;
            }
        }
    }
}

function doUpgrade(creep) {
    if (creep.memory.work == true) {
        let src;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
            for (let srcID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
                let aSrc = Game.getObjectById(srcID);
                if (aSrc && aSrc.storeCapacity) {
                    if (aSrc.store[RESOURCE_ENERGY] >= creep.carryCapacity) {
                        src = aSrc;
                        break;
                    }
                }
            }
        }
        if (src) {
            let r = creep.withdraw(src, RESOURCE_ENERGY);
            if (r == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if (r == ERR_INVALID_TARGET) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(src, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }

            }
        }
    } else {
        let tgt;
        if (Memory['needUpgrade_' + creep.memory.room] == true) {
            tgt = creep.room.controller;
            if (tgt) {
                if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(tgt, {
                        visualizePathStyle: {
                            stroke: '#0000ff'
                        }
                    });
                }
            }
        }
    }
}

function doTransfer(creep) {
    if (creep.memory.work == true) {
        let src;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
            for (let srcID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_src']) {
                let aSrc = Game.getObjectById(srcID);
                if (aSrc && aSrc.storeCapacity) {
                    if (aSrc.store[Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_resourceType']] > 0) {
                        src = aSrc;
                        break;
                    }
                } else if (aSrc && aSrc.energyCapacity) {
                    if (aSrc.energy > 0) {
                        src = aSrc;
                        break;
                    }
                }
            }
        } else {
            creep.say('!!!');
        }
        if (src) {
            let returned = creep.withdraw(src, Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_resourceType']);
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
            let flagTgt = _.filter(Game.flags, (flag) => flag.color == COLOR_BLUE)[0];
            if (flagTgt) {
                let src = flagTgt.room.find(FIND_HOSTILE_STRUCTURES)[0];
                let returned = creep.withdraw(src, RESOURCE_UTRIUM_HYDRIDE);
                if (returned == ERR_NOT_IN_RANGE) {
                    creep.travelTo(src);
                }
                if (returned == OK) {
                    creep.memory.work = false;
                }
            }
        }
    } else {
        let tgt;
        if (Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_tgt']) {
            for (let tgtID of Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_tgt']) {
                let aTgt = Game.getObjectById(tgtID);
                if (aTgt && aTgt.storeCapacity) {
                    if (aTgt.store[Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_resourceType']]) {
                        if (aTgt.store[Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_resourceType']] < aTgt.storeCapacity) {
                            tgt = aTgt;
                            break;
                        }
                    } else {
                        tgt = aTgt;
                        break;
                    }

                } else if (aTgt && aTgt.energyCapacity) {
                    if (aTgt.energy < aTgt.energyCapacity) {
                        tgt = aTgt;
                        break;
                    }
                }
            }
        }
        if (tgt) {
            if (creep.transfer(tgt, Memory[creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.groupNum + '_resourceType']) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if (tgt.structureType == 'tower') {
                creep.memory.work = true;
            }
        }
    }
}

function doDefend(creep) {
    if(creep.room.name != creep.memory.room) {
        creep.moveTo(new RoomPosition(25,25,creep.memory.room));
    } else {
        let noHealHostile = creep.room.find(FIND_HOSTILE_CREEPS,{filter:h=>h.body.map(b=>b.type).indexOf(HEAL) == -1})[0];
        let hostile;
        if (!noHealHostile) {
            hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        } else {
            hostile = noHealHostile;
        }
        if (hostile) {
            creep.heal(creep);
            if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                creep.travelTo(hostile);
            }
            if (creep.rangedAttack(hostile) == ERR_NOT_IN_RANGE) {
                creep.travelTo(hostile);
            }
        } else {
            let closestInjuredCreep = creep.room.find(FIND_MY_CREEPS,{filter:c=>c.hits<c.hitsMax})[0];
            if (closestInjuredCreep) {
                if (creep.heal(closestInjuredCreep) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestInjuredCreep);
                }
            } else {
                let creepList = creep.room.find(FIND_MY_CREEPS);
                let length =creepList.length;
                creep.moveTo(creepList[Math.floor(Math.random() * (length - 0) )],{reusePath:20});
            }
        }
    }
}

let listToList = {
    run: function (creep) {
        let replenish = require('replenish');
        replenish.run(creep);
        if (_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.work = false;
        } else if (_.sum(creep.carry) == 0) {
            creep.memory.work = true;
        }
        switch (creep.memory.role) {
            case "harvester": {
                doHarvest(creep);
                break;
            }
            case "builder": {
                doBuild(creep);
                break;
            }
            case "upgrader": {
                doUpgrade(creep);
                break;
            }
            case "transmitter": {
                doTransfer(creep);
                break;
            }
            case "defender": {
                doDefend(creep);
                break;
            }
        }
    }
}
module.exports = listToList;
function setHarvest(creep) {
    let list = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'];
    if (!list) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' does not exist');
        return -1;
    }
    let src, tgt, resourceType;
    if (list.src.length != list.tgt.length || list.src.length != list.resource.length) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' is unmatched!');
        return -1;
    }
    for (let i = 0; i < list.src.length; i++) {
        let srcList = list.src[i];
        let tgtList = list.tgt[i];
        let ListResourceType = list.resource[i];
        if (!srcList || !tgtList || !ListResourceType) {
            console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + ' _list' + ' does not available');
        }
        let srcTemp;
        for (let srcId of srcList) {
            srcTemp = Game.getObjectById(srcId);
            if (srcTemp && srcTemp.energyCapacity && srcTemp.energy > 0) {
                break;
            } else if (srcTemp && srcTemp.mineralAmount && srcTemp.mineralAmount > 0) {
                break;
            }
            srcTemp = undefined;
        }
        let tgtTemp;
        for (let tgtId of tgtList) {
            tgtTemp = Game.getObjectById(tgtId);
            if (tgtTemp && tgtTemp.storeCapacity && _.sum(tgtTemp.store) < tgtTemp.storeCapacity) {
                break;
            } else if (tgtTemp && tgtTemp.energyCapacity && tgtTemp.energy < tgtTemp.energyCapacity) {
                break;
            }
            tgtTemp = undefined;
        }
        if (srcTemp && tgtTemp) {
            src = srcTemp;
            tgt = tgtTemp;
            resourceType = ListResourceType;
            break;
        }
    }
    if (!src || !tgt || !resourceType) {
        creep.say('unworkable!');
        if (Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'].default) {
            creep.moveTo(Game.getObjectById(Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'].default));
        }
        return -1;
    }
    creep.memory.src = src.id;
    creep.memory.tgt = tgt.id;
    creep.memory.resourceType = resourceType;
    return 0;
}

function doHarvest(creep,ifRcs) {
    let src = Game.getObjectById(creep.memory.src);
    let tgt = Game.getObjectById(creep.memory.tgt);
    let resourceType = creep.memory.resourceType;
    if (creep.memory.work == true) {
        if (src && src.energyCapacity && src.energy > 0) {
            if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        } else if (src && src.mineralAmount && src.mineralAmount > 0) {
            if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        }
        if (ifRcs == true && 0 == setHarvest(creep) ) {
            doHarvest(creep,false);
        }
    } else {
        if (tgt && tgt.storeCapacity && _.sum(tgt.store) < tgt.storeCapacity) {
            if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            creep.harvest(src);
            return;
        } else if (tgt && tgt.energyCapacity && tgt.energy < tgt.energyCapacity) {
            if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            creep.harvest(src);
            return;
        }
    }
}

function setBuild(creep) {
    let list = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'];
    if (!list) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' does not exist');
        return -1;
    }
    let src, tgt;
    for (let i = 0; i < list.src.length; i++) {
        let srcList = list.src[i];
        if (!srcList) {
            console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + ' _list' + ' does not available');
        }
        let srcTemp;
        for (let srcId of srcList) {
            srcTemp = Game.getObjectById(srcId);
            if (srcTemp && srcTemp.energyCapacity && srcTemp.energy > 0) {
                break;
            } else if (srcTemp && srcTemp.storeCapacity && srcTemp.store[RESOURCE_ENERGY] > creep.carryCapacity) {
                break;
            }
            srcTemp = undefined;
        }
        let tgtTemp;
        if (Memory[creep.memory.room + '_needEM']) {
            for (let tgtId of Memory[creep.memory.room + '_needEM']) {
                tgtTemp = Game.getObjectById(tgtId);
                if (tgtTemp && tgtTemp.hitsMax && tgtTemp.hits < tgtTemp.hitsMax) {
                    break;
                }
                tgtTemp = undefined;
            }
        }
        if (!tgtTemp && Memory[creep.memory.room + '_needBuild']) {
            for (let tgtId of Memory[creep.memory.room + '_needBuild']) {
                tgtTemp = Game.getObjectById(tgtId);
                if (tgtTemp && tgtTemp.progressTotal && tgtTemp.progress < tgtTemp.progressTotal) {
                    break;
                }
                tgtTemp = undefined;
            }
        }
        if (!tgtTemp && Memory[creep.memory.room + '_needRepair']) {
            for (let tgtId of Memory[creep.memory.room + '_needRepair']) {
                tgtTemp = Game.getObjectById(tgtId);
                if (tgtTemp && tgtTemp.hitsMax && tgtTemp.hits < tgtTemp.hitsMax) {
                    break;
                }
                tgtTemp = undefined;
            }
        }
        if (srcTemp && tgtTemp) {
            src = srcTemp;
            tgt = tgtTemp;
            break;
        }
    }
    if (!src || !tgt) {
        creep.say('unworkable!');
        return -1;
    }
    creep.memory.src = src.id;
    creep.memory.tgt = tgt.id;
    return 0;
}

function doBuild(creep,ifRcs) {
    let src = Game.getObjectById(creep.memory.src);
    let tgt = Game.getObjectById(creep.memory.tgt);
    if (creep.memory.work == true) {
        if (src && src.energyCapacity && src.energy > 0) {
            if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        } else if (src && src.storeCapacity && src.store[RESOURCE_ENERGY] && src.store[RESOURCE_ENERGY] > creep.carryCapacity) {
            if (creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return;
        }
    } else {
        if (tgt && tgt.hitsMax && tgt.hits < tgt.hitsMax) {
            if (creep.repair(tgt) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        } else if (tgt && tgt.progressTotal && tgt.progress < tgt.progressTotal) {
            if (creep.build(tgt) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        }
    }
    if (ifRcs == true && 0 == setBuild(creep)) {
        doBuild(creep,false);
    }
}

function setUpgrade(creep) {
    let list = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'];
    if (!list) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' does not exist');
        return -1;
    }
    let src, tgt;
    for (let i = 0; i < list.src.length; i++) {
        let srcList = list.src[i];
        if (!srcList) {
            console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + ' _list' + ' does not available');
        }
        let srcTemp;
        for (let srcId of srcList) {
            srcTemp = Game.getObjectById(srcId);
            if (srcTemp && srcTemp.energyCapacity && srcTemp.energy > 0) {
                break;
            } else if (srcTemp && srcTemp.storeCapacity && srcTemp.store[RESOURCE_ENERGY] > creep.carryCapacity) {
                break;
            }
            srcTemp = undefined;
        }
        let tgtTemp = Game.rooms[creep.memory.room].controller;
        if (srcTemp && tgtTemp) {
            src = srcTemp;
            tgt = tgtTemp;
            break;
        }
    }
    if (!src || !tgt) {
        creep.say('unworkable!');
        return -1;
    }
    creep.memory.src = src.id;
    creep.memory.tgt = tgt.id;
    return 0;
}

function doUpgrade(creep,ifRcs) {
    let src = Game.getObjectById(creep.memory.src);
    let tgt = Game.getObjectById(creep.memory.tgt);
    if (creep.memory.work == true) {
        if (src && src.energyCapacity && src.energy > 0) {
            if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        } else if (src && src.store && src.storeCapacity && src.store[RESOURCE_ENERGY] > creep.carryCapacity) {
            if (creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return;
        }
    } else {
        if (tgt) {
            if (creep.upgradeController(tgt) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return;
        }
    }
    if (ifRcs == true && 0 == setUpgrade(creep)) {
        doUpgrade(creep,false);
    }
}

function setTransport(creep) {
    let list = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'];
    if (!list) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' does not exist');
        return -1;
    }
    let src, tgt, resourceType;
    if (list.src.length != list.tgt.length || list.src.length != list.resource.length) {
        console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list' + ' is unmatched!');
        return -1;
    }
    for (let i = 0; i < list.src.length; i++) {
        let srcList = list.src[i];
        let tgtList = list.tgt[i];
        let ListResourceType = list.resource[i];
        if (!srcList || !tgtList || !ListResourceType) {
            console.log('The ' + creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + ' _list' + ' does not available');
        }
        let srcTemp;
        for (let srcId of srcList) {
            srcTemp = Game.getObjectById(srcId);
            if (srcTemp && srcTemp.storeCapacity && srcTemp.store[ListResourceType] > 0) {
                break;
            } else if (srcTemp && ListResourceType == RESOURCE_ENERGY && srcTemp.energyCapacity && srcTemp.energy > 0) {
                break;
            }
            srcTemp = undefined;
        }
        let tgtTemp;
        for (let tgtId of tgtList) {
            tgtTemp = Game.getObjectById(tgtId);
            if (tgtTemp && tgtTemp.storeCapacity && _.sum(tgtTemp.store) < tgtTemp.storeCapacity) {
                break;
            } else if (tgtTemp && ListResourceType == RESOURCE_ENERGY && tgtTemp.energyCapacity && tgtTemp.energy < tgtTemp.energyCapacity) {
                break;
            }
            tgtTemp = undefined;
        }
        if (srcTemp && tgtTemp) {
            src = srcTemp;
            tgt = tgtTemp;
            resourceType = ListResourceType;
            break;
        }
    }
    if (!src || !tgt || !resourceType) {
        creep.say('unworkable!');
        return -1;
    }
    creep.memory.src = src.id;
    creep.memory.tgt = tgt.id;
    creep.memory.resourceType = resourceType;
    return 0;
}

function doTransport(creep,ifRcs) {
    let src = Game.getObjectById(creep.memory.src);
    let tgt = Game.getObjectById(creep.memory.tgt);
    let resourceType = creep.memory.resourceType;
    if (creep.memory.work == true) {
        if (src && src.storeCapacity && src.store[resourceType] > 0) {
            let result = creep.withdraw(src, resourceType);
            if (result == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if (result == OK) {
                creep.memory.work = false;
            }
            return;
        } else if (src && resourceType == RESOURCE_ENERGY && src.energyCapacity && src.energy > 0) {
            let result = creep.withdraw(src, resourceType);
            if (result == ERR_NOT_IN_RANGE) {
                creep.travelTo(src, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if (result == OK) {
                creep.memory.work = false;
            }
            return;
        }
    } else {
        if (tgt && tgt.storeCapacity && _.sum(tgt.store) < tgt.storeCapacity) {
            if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return;
        } else if (tgt && resourceType == RESOURCE_ENERGY && tgt.energyCapacity && tgt.energy < tgt.energyCapacity) {
            if (creep.transfer(tgt, resourceType) == ERR_NOT_IN_RANGE) {
                creep.travelTo(tgt, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return;
        }
    }
    if (ifRcs == true && 0 == setTransport(creep)) {
        doTransport(creep,false);
    }
}

module.exports = {
    run: function (creep) {
        let replenish = require('replenish');
        replenish.run(creep);
        if (_.sum(creep.carry) == creep.carryCapacity) {
            if (creep.memory.work == true) {
                switch (creep.memory.role) {
                    case "harvester": {
                        setHarvest(creep);
                        break;
                    }
                    case "builder": {
                        setBuild(creep);
                        break;
                    }
                    case "upgrader": {
                        setUpgrade(creep);
                        break;
                    }
                    case "transporter": {
                        setTransport(creep);
                        break;
                    }
                }
            }
            creep.memory.work = false;
        } else if ((creep.memory.resourceType && !creep.carry[creep.memory.resourceType]) || creep.carry[RESOURCE_ENERGY] == 0) {
            if (creep.memory.work == false) {
                switch (creep.memory.role) {
                    case "harvester": {
                        setHarvest(creep);
                        break;
                    }
                    case "builder": {
                        setBuild(creep);
                        break;
                    }
                    case "upgrader": {
                        setUpgrade(creep);
                        break;
                    }
                    case "transporter": {
                        setTransport(creep);
                        break;
                    }
                }
            }
            creep.memory.work = true;
        }
        switch (creep.memory.role) {
            case "harvester": {
                doHarvest(creep,true);
                break;
            }
            case "builder": {
                doBuild(creep,true);
                break;
            }
            case "upgrader": {
                doUpgrade(creep,true);
                break;
            }
            case "transporter": {
                doTransport(creep,true);
                break;
            }
        }
    }
};
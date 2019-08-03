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
            if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                creep.heal(creep);
                creep.travelTo(hostile,{
                    maxRooms:1
                });
            }
            if (creep.rangedAttack(hostile) == ERR_NOT_IN_RANGE) {
                creep.heal(creep);
                creep.travelTo(hostile,{
                    maxRooms:1
                });
            }
        } else {
            let closestInjuredCreep = creep.room.find(FIND_MY_CREEPS,{filter:c=>c.hits<c.hitsMax})[0];
            if (closestInjuredCreep) {
                if (creep.heal(closestInjuredCreep) == ERR_NOT_IN_RANGE) {
                    creep.rangedHeal(closestInjuredCreep);
                    creep.travelTo(closestInjuredCreep,{
                        maxRooms:1
                    });
                }
            } else {
                let creepList = creep.room.find(FIND_MY_CREEPS);
                let length =creepList.length;
                creep.travelTo(creep.room.find(FIND_MY_CREEPS)[_.random(0,creep.room.find(FIND_MY_CREEPS).length-1)],{
                    maxRooms:1,
                    ignoreRoads:true
                })
                //creep.moveTo(new RoomPosition(25,25,creep.memory.room));
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
module.exports = {
    defendJudge:function (event) {
        return event.event == EVENT_ATTACK;
    },
    doDefend:function (creep) {
        if (creep.room.name != creep.memory.reactive.eventRoom) {
            creep.travelTo(new RoomPosition(25,25,creep.memory.reactive.eventRoom));
        } else {
            let healHostile = creep.room.find(FIND_HOSTILE_CREEPS,{filter:h=>h.body.map(b=>b.type).indexOf(HEAL) != -1})[0];
            let hostile;
            if (!healHostile) {
                hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            } else {
                hostile = healHostile;
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
                    creep.memory.typeInfo.busy = false;
                }


            }
        }
    }
};
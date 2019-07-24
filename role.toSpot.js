function doAttack(creep) {
    let tgtFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && flag.secondaryColor == COLOR_RED && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    if (tgtFlag) {
        if (tgtFlag.room) {
            let attackTgt = tgtFlag.room.find(FIND_HOSTILE_STRUCTURES, {filter: s => s.pos.isEqualTo(tgtFlag.pos) == true})[0];
            if (attackTgt) {
                if (creep.attack(attackTgt) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(attackTgt);
                }
            }
        } else {
            creep.travelTo(tgtFlag);
        }
    } else {
        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.travelTo(closestHostile);
            }
        }
    }
}

function doRangedAttack(creep) {
    let tgtFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && flag.secondaryColor == COLOR_PURPLE && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    let status = _.filter(Game.flags, (flag) => flag.color == COLOR_PURPLE && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    if (tgtFlag) {
        if (tgtFlag.room) {
            let attackTgt = tgtFlag.room.find(FIND_HOSTILE_STRUCTURES, {filter: s => s.pos.isEqualTo(tgtFlag.pos) == true})[0];
            if (attackTgt) {
                if (status) {
                    if (creep.rangedMassAttack(attackTgt) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(attackTgt);
                    }
                } else {
                    if (creep.rangedAttack(attackTgt) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(attackTgt);
                    }
                }
            }
        } else {
            creep.travelTo(tgtFlag);
        }
    } else {
        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            if (status) {
                if (creep.rangedMassAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestHostile);
                }
            } else {
                if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestHostile);
                }
            }
        }
    }
}

function doAsTank(creep) {
    let moveFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && flag.secondaryColor == COLOR_BLUE && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    if (moveFlag) {
        creep.travelTo(moveFlag);
    }
}

function doHeal(creep) {
    let moveFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && flag.secondaryColor == COLOR_CYAN && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    let status = _.filter(Game.flags, (flag) => flag.color == COLOR_CYAN && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    if (moveFlag) {
        creep.travelTo(moveFlag);
    } else {
        let groupList = _.filter(Game.creeps, c => c.memory.typeRole == 'toSpot' && c.memory.groupNum == creep.memory.groupNum);
        for (let groupCreep of groupList) {
            if (groupCreep.hits < groupCreep.hitsMax) {
                if (status) {
                    if (creep.rangedHeal(groupCreep) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(groupCreep);
                    }
                } else {
                    if (creep.heal(groupCreep) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(groupCreep);
                    }
                }
                break;
            }
        }
    }
}

function doClaim(creep) {
    let moveFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && flag.secondaryColor == COLOR_GREEN && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    let status1 = _.filter(Game.flags, (flag) => flag.color == COLOR_GREEN && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    let status2 = _.filter(Game.flags, (flag) => flag.color == COLOR_YELLOW && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
    if (moveFlag) {
        creep.travelTo(moveFlag);
    } else {
        if (status1) {
            if (status1.room != creep.room) {
                creep.travelTo(status1);
            } else {
                let controller = status1.room.controller;
                if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(controller);
                }
            }
        } else if (status2) {
            if (status2.room != creep.room) {
                creep.travelTo(status2);
            } else {
                let controller = status2.room.controller;
                if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(controller);
                }
            }
        } else {
            let controller = creep.room.controller;
            if (controller) {
                if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(controller);
                }
            }
        }
    }

}

let toSpot = {
    run: function (creep) {
        let moveFlag = _.filter(Game.flags, (flag) => flag.color == COLOR_WHITE && flag.name.indexOf('_' + creep.memory.groupNum) != -1)[0];
        if (moveFlag) {
            creep.travelTo(moveFlag);
        } else {
            let replenish = require('replenish');
            replenish.run(creep);
            switch (creep.memory.role) {
                case 'attacker': {
                    doAttack(creep);
                    break;
                }
                case 'rangedAttacker': {
                    doRangedAttack(creep);
                    break;
                }
                case 'tank' : {
                    doAsTank(creep);
                    break;
                }
                case 'healer': {
                    doHeal(creep);
                    break;
                }
                case 'claimer': {
                    doClaim(creep);
                    break;
                }
            }
        }

    }
}
module.exports = toSpot;
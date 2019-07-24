module.exports = {
    run: function (tower) {
        if (tower) {
            let flagTgt = _.filter(Game.flags, (flag) => flag.color == COLOR_ORANGE)[0];
            let closestHostile;
            if (flagTgt) {
                closestHostile = flagTgt.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            } else {
                closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            }
            if (closestHostile) {
                if (Memory.allies.indexOf(closestHostile.owner.username) == -1) {
                    tower.attack(closestHostile);
                }
            } else if (tower.energy / tower.energyCapacity > 0.8) {

                let closestDamagedCreep = tower.room.find(FIND_CREEPS,{
                    filter:c=>c.hits < c.hitsMax
                })[0];
                if (closestDamagedCreep) {
                    tower.heal(closestDamagedCreep);
                } else {
                    let closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits / structure.hitsMax < 0.05 && structure.structureType != 'constructedWall' && structure.structureType != STRUCTURE_RAMPART
                    })[0];
                    if (closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }
                }

            }
        }
    }
};
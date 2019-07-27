let renew = {
    run: function (creep) {
        if (Game.rooms[creep.memory.renewRoom].energyAvailable >= 300) {
            Memory['roomInfo'][creep.memory.renewRoom]['canRenew'] = true;
        }
        if (Game.rooms[creep.memory.renewRoom].energyAvailable <= 30) {
            Memory['roomInfo'][creep.memory.renewRoom]['canRenew'] = false;
        }
        if (creep.ticksToLive / 1500 < 0.1) {
            creep.memory.goRenew = true;
        }
        if (creep.ticksToLive / 1500 > 0.90) {
            creep.memory.goRenew = false;
        }
        if (Memory['roomInfo'][creep.memory.renewRoom]['canRenew'] == true && creep.memory.goRenew == true) {
            let spawn = _.filter(Game.spawns, s => s.room.name == creep.memory.renewRoom && !s.spawning)[0];
            if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
            return true;
        }
        return false;
    }
}

module.exports = renew;

let renew = {
    run: function (creep) {
        if (creep.memory.renew == true && Memory['canRenew_'+creep.memory.room] == true) {
            creep.say('renew');
            let spawn = Game.getObjectById(creep.memory.renewSpawn);
            if (spawn) {
                let result = spawn.renewCreep(creep);
                if (result == -6) {
                    Memory['canRenew_'+creep.memory.room] = false;
                } else if (result == -8) {
                    creep.memory.renew = false;
                } else {
                    creep.moveTo(spawn);
                }
                return 0;
            } else {
                creep.say('no spawn');
            }

        } else {
            return -1;
        }
    }
}

module.exports = renew;

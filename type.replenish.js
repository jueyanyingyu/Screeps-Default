let replenish = {
    run: function (creep) {
        try {
            if (creep.memory.typeInfo.taskName == 'keyTransporter') {
                if (creep.memory.needReplenish == true && creep.ticksToLive < (_.sum(Memory['roomInfo'][creep.memory.replenishRoom]['keySpawnList'].filter(c => eval(c.condition) == true), c => JSON.parse(c.body).length) + creep.body.length + 8) / Object.keys(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom)).length * 3 + _.sum(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom),s=>s.spawning && s.spawning.remainingTime)) {
                    let newCreepInf = {
                        body: JSON.stringify(creep.body.map(s => s.type)),
                        name: creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName,
                        memory: JSON.stringify(creep.memory),
                    };
                    newCreepInf.condition = 'true';
                    Memory['roomInfo'][creep.memory.replenishRoom]['keySpawnList'].push(newCreepInf);
                    creep.memory.needReplenish = false;
                }
            } else {
                if (creep.memory.needReplenish == true && creep.ticksToLive < (_.sum(Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].filter(c => eval(c.condition) == true), c => JSON.parse(c.body).length) + creep.body.length + 8) / Object.keys(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom)).length * 3 + _.sum(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom),s=>s.spawning && s.spawning.remainingTime)) {
                    let newCreepInf = {
                        body: JSON.stringify(creep.body.map(s => s.type)),
                        name: creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName,
                        memory: JSON.stringify(creep.memory),
                    };
                    newCreepInf.condition = 'true';
                    Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].push(newCreepInf);
                    creep.memory.needReplenish = false;
                }
            }
            if (creep.memory.needReplenish == true && creep.hits / creep.hitsMax < 0.2) {
                let newCreepInf = {
                    body: JSON.stringify(creep.body.map(s => s.type)),
                    name: creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName,
                    memory: JSON.stringify(creep.memory),
                };
                newCreepInf.condition = 'true';
                Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].push(newCreepInf);
                creep.memory.needReplenish = false;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = replenish;
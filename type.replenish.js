let replenish = {
    run: function (creep) {
        try {
            if (creep.memory.typeInfo.taskName && creep.memory.typeInfo.taskName.indexOf('key') != -1) {
                if (creep.memory.needReplenish == true && creep.ticksToLive < (_.sum(Memory['roomInfo'][creep.memory.replenishRoom]['keySpawnList'].filter(c => eval(c.condition) == true), c => JSON.parse(c.body).length) + creep.body.length + 15) / Object.keys(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom)).length * 3 + _.sum(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom),s=>s.spawning && s.spawning.remainingTime)) {
                    let name;
                    if (creep.memory.type == 'conventional') {
                        name = creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName;
                    } else if (creep.memory.type == 'reactive') {
                        name = creep.memory.typeInfo.reactiveName;
                    }
                    let newCreepInf = {
                        body: JSON.stringify(creep.body.map(s => s.type)),
                        name: name,
                        memory: JSON.stringify(creep.memory),
                    };
                    if (Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName]['replenishCondition']) {
                        newCreepInf.condition = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName]['replenishCondition'];
                    } else {
                        newCreepInf.condition = 'true';
                    }
                    Memory['roomInfo'][creep.memory.replenishRoom]['keySpawnList'].push(newCreepInf);
                    creep.memory.needReplenish = false;
                }
            } else {
                if (creep.memory.needReplenish == true && creep.ticksToLive < (_.sum(Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].filter(c => eval(c.condition) == true), c => JSON.parse(c.body).length) + creep.body.length + 15) / Object.keys(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom)).length * 3 + _.sum(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom),s=>s.spawning && s.spawning.remainingTime)) {
                    let name;
                    if (creep.memory.type == 'conventional') {
                        name = creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName;
                    } else if (creep.memory.type == 'reactive') {
                        name = creep.memory.typeInfo.reactiveName;
                    }
                    let newCreepInf = {
                        body: JSON.stringify(creep.body.map(s => s.type)),
                        name: name,
                        memory: JSON.stringify(creep.memory),
                    };
                    if (creep.memory.type == 'conventional' && Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName][0]['replenishCondition']) {
                        newCreepInf.condition = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName][0]['replenishCondition'];
                    } else {
                        newCreepInf.condition = 'true';
                    }
                    Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].push(newCreepInf);
                    creep.memory.needReplenish = false;
                }
            }

            if (creep.memory.needReplenish == true && creep.hits / creep.hitsMax < 0.1) {
                let name;
                if (creep.memory.type == 'conventional') {
                    name = creep.memory.typeInfo.taskRoom + '_' + creep.memory.typeInfo.taskName;
                } else if (creep.memory.type == 'reactive') {
                    name = creep.memory.typeInfo.reactiveName;
                }
                let newCreepInf = {
                    body: JSON.stringify(creep.body.map(s => s.type)),
                    name: name,
                    memory: JSON.stringify(creep.memory),
                };
                if (creep.memory.type == 'conventional' && Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName][0]['replenishCondition']) {
                    newCreepInf.condition = Memory['taskList'][creep.memory.typeInfo.taskRoom][creep.memory.typeInfo.taskName][0]['replenishCondition'];
                } else {
                    newCreepInf.condition = 'true';
                }
                Memory['roomInfo'][creep.memory.replenishRoom]['spawnList'].push(newCreepInf);
                creep.memory.needReplenish = false;
            }

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = replenish;
let replenish = {
    run: function (creep) {
        if (creep.memory.needReplenish && creep.memory.replenishRoom && Memory[creep.memory.replenishRoom + '_spawnList']) {
            if (creep.memory.needReplenish == true && creep.ticksToLive < (_.sum(Memory[creep.memory.replenishRoom + '_spawnList'].filter(c => eval(c.condition) == true), c => JSON.parse(c.body).length) + creep.body.length + 5) / Object.keys(_.filter(Game.spawns, s => s.room.name == creep.memory.replenishRoom)).length * 3) {
                let newCreepInf = {
                    body: JSON.stringify(creep.body.map(s => s.type)),
                    name: creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.grpNum + '_',
                    memory: JSON.stringify(creep.memory)
                };
                if (Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list']) {
                    let condition = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'].replenishCondition;
                    newCreepInf.condition = condition;
                } else {
                    newCreepInf.condition = 'true';
                }
                Memory[creep.memory.replenishRoom + '_spawnList'].push(newCreepInf);
                creep.memory.needReplenish = false;
            }
            if (creep.memory.needReplenish == true && creep.hits / creep.hitsMax < 0.2) {
                let newCreepInf = {
                    body: JSON.stringify(creep.body.map(s => s.type)),
                    name: creep.memory.role + '_' + creep.memory.room + '_' + creep.memory.grpNum + '_',
                    memory: JSON.stringify(creep.memory)
                };
                if (Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list']) {
                    let condition = Memory[creep.memory.room + '_' + creep.memory.role + '_' + creep.memory.grpNum + '_list'].replenishCondition;
                    newCreepInf.condition = condition;
                } else {
                    newCreepInf.condition = 'true';
                }
                Memory[creep.memory.replenishRoom + '_spawnList'].push(newCreepInf);
                creep.memory.needReplenish = false;
            }
        }
    }
}

module.exports = replenish;
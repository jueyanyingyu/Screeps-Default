let replenish = {
    run: function (creep) {
        if (creep.memory.needReplenish && creep.memory.replenishRoom && Memory[creep.memory.replenishRoom + '_spawnList']) {
            if (creep.memory.needReplenish == true && creep.ticksToLive < (Memory[creep.memory.replenishRoom + '_spawnList'].length + 1) * 50) {
                let newCreepInf = {
                    body:JSON.stringify(creep.body.map(s=>s.type)),
                    name:creep.memory.role+'_' + creep.memory.room + '_' + creep.memory.grpNum + '_',
                    memory:JSON.stringify(creep.memory)
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
                    body:JSON.stringify(creep.body.map(s=>s.type)),
                    name:creep.memory.role+'_' + creep.memory.room + '_' + creep.memory.grpNum + '_',
                    memory:JSON.stringify(creep.memory)
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
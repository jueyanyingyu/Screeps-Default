module.exports = {
    updateEM: function (roomName) {
        let EMName = roomName + '_needEM';
        if (Memory[EMName]) {
            let newEM_tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.1 && structure.structureType != 'constructedWall' && structure.structureType != STRUCTURE_RAMPART
            }).map(s => s.id).filter(s => Memory[EMName].indexOf(s) == -1);
            Memory[EMName] = Memory[EMName].filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits / Game.getObjectById(s).hitsMax < 0.3);
            for (let newTgt of newEM_tgt) {
                Memory[EMName].push(newTgt);
            }
        } else {
            Memory[EMName] = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.1 && structure.structureType != 'constructedWall'
            }).map(s => s.id);
        }
    },
    updateBuild:function (roomName) {
        let buildName = roomName + '_needBuild';
        Memory[buildName] = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).map(s => s.id);
    },
    updateRepair:function (roomName) {
        let repairName = roomName + '_needRepair';
        if (Memory[repairName]) {
            let newRepair_tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.75 && structure.structureType != 'constructedWall' && structure.structureType != 'rampart'
            }).map(s => s.id).filter(s => Memory[repairName].indexOf(s) == -1);
            Memory[repairName] = Memory[repairName].filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits < Game.getObjectById(s).hitsMax);
            for (let newTgt of newRepair_tgt) {
                Memory[repairName].push(newTgt);
            }
        } else {
            Memory[repairName] = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.75 && structure.structureType != 'constructedWall' && structure.structureType != 'rampart'
            }).map(s => s.id);

        }
    },
    updateEMList:function (roomName) {
        if (Memory['taskList'][roomName]['maintain'][0].tgt.length) {
            let newEM_tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.1 && structure.structureType != 'constructedWall' && structure.structureType != STRUCTURE_RAMPART
            }).map(s => s.id).filter(s => Memory['taskList'][roomName]['maintain'][0].tgt.indexOf(s) == -1);
            Memory['taskList'][roomName]['maintain'][0].tgt = Memory['taskList'][roomName]['maintain'][0].tgt.filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits / Game.getObjectById(s).hitsMax < 0.3);
            for (let newTgt of newEM_tgt) {
                Memory['taskList'][roomName]['maintain'][0].tgt.push(newTgt);
            }
        } else {
            Memory['taskList'][roomName]['maintain'][0].tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.1 && structure.structureType != 'constructedWall' && structure.structureType != STRUCTURE_RAMPART
            }).sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax).map(s => s.id);
        }
    },
    updateBuildList:function (roomName) {
        Memory['taskList'][roomName]['maintain'][1].tgt = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).map(s => s.id);
    },
    updateRepairList:function (roomName) {
        if (Memory['taskList'][roomName]['maintain'][2].tgt.length) {
            let newRepair_tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.75 && structure.structureType != 'constructedWall' && structure.structureType != 'rampart'
            }).map(s => s.id).filter(s => Memory['taskList'][roomName]['maintain'][2].tgt.indexOf(s) == -1);
            Memory['taskList'][roomName]['maintain'][2].tgt = Memory['taskList'][roomName]['maintain'][2].tgt.filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits < Game.getObjectById(s).hitsMax);
            for (let newTgt of newRepair_tgt) {
                Memory['taskList'][roomName]['maintain'][2].tgt.push(newTgt);
            }
        } else {
            Memory['taskList'][roomName]['maintain'][2].tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.75 && structure.structureType != 'constructedWall'  && structure.structureType != 'rampart'
            }).sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax).map(s => s.id);
        }
    },
    updateFortList:function (roomName) {
        if (Memory['taskList'][roomName]['maintain'][3].tgt.length) {
            let newRepair_tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.005 && (structure.structureType == 'rampart'|| structure.structureType == 'constructedWall'  )
            }).map(s => s.id).filter(s => Memory['taskList'][roomName]['maintain'][3].tgt.indexOf(s) == -1);
            Memory['taskList'][roomName]['maintain'][3].tgt = Memory['taskList'][roomName]['maintain'][3].tgt.filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits / Game.getObjectById(s).hitsMax < 0.005);
            for (let newTgt of newRepair_tgt) {
                Memory['taskList'][roomName]['maintain'][3].tgt.push(newTgt);
            }
        } else {
            Memory['taskList'][roomName]['maintain'][3].tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.005 && (structure.structureType == 'rampart'|| structure.structureType == 'constructedWall'  )
            }).sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax).map(s => s.id);
        }
    },
    spawn:function (roomName) {
        let toSpawn;
        if (Memory['roomInfo'][roomName]['keySpawnList'].length > 0) {
            toSpawn = Memory['roomInfo'][roomName]['keySpawnList'][0];
        } else {
            toSpawn = Memory['roomInfo'][roomName]['spawnList'].filter(c => eval(c.condition) == true)[0];
        }
        if (toSpawn) {
            let spawns = _.filter(Game.spawns, s => s.room.name == roomName && !s.spawning);
            for (let spawn of spawns) {
                if (spawn) {
                    let r;
                    r = spawn.spawnCreep(JSON.parse(toSpawn.body), toSpawn.name + '_' + Game.time, {memory: JSON.parse(toSpawn.memory)});
                    if (r == OK) {
                        Memory['roomInfo'][roomName]['keySpawnList'] = Memory['roomInfo'][roomName]['keySpawnList'].filter(c => c != toSpawn);
                        Memory['roomInfo'][roomName]['spawnList'] = Memory['roomInfo'][roomName]['spawnList'].filter(c => c != toSpawn);
                        break;
                    } else if (r == -6 && roomName == 'E19N25' && _.filter(Game.creeps, c => c.memory.typeInfo && c.memory.typeInfo.taskRoom == roomName && c.memory.typeInfo.taskName == 'keyTransporter').length == 0) {
                        spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'transmitter' + Game.time, {
                            memory: {
                                type: 'conventional',
                                typeInfo: {
                                    taskRoom: roomName,
                                    taskName: 'keyTransporter'
                                },
                                work: true,
                                needReplenish: false,
                                replenishRoom: roomName
                            }
                        });
                        //console.log(roomName + ':' + r);
                    }
                }
            }
        }
    },
    addInSpawnList:function (roomName,body,name,memory) {
        let newCreepInf = {
            body:JSON.stringify(body),
            name:name,
            memory:JSON.stringify(memory),
            condition:'true'
        };
        Memory['roomInfo'][roomName]['spawnList'].push(newCreepInf);
    }
};
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
                filter: structure => structure.hits / structure.hitsMax < 0.1 && structure.structureType != 'constructedWall'
            }).map(s => s.id);
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
            }).map(s => s.id);
        }
    },
    addInSpawnList:function (roomName,body,name,memory) {
        let newCreepInf = {
            body:JSON.stringify(body),
            name:name,
            memory:JSON.stringify(memory),
            condition:'true'
        };
        Memory[roomName + '_spawnList'].push(newCreepInf);
    }
};
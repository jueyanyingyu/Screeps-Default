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
                filter: structure => structure.hits / structure.hitsMax < 0.01 && (structure.structureType == 'rampart'|| structure.structureType == 'constructedWall'  )
            }).map(s => s.id).filter(s => Memory['taskList'][roomName]['maintain'][3].tgt.indexOf(s) == -1);
            Memory['taskList'][roomName]['maintain'][3].tgt = Memory['taskList'][roomName]['maintain'][3].tgt.filter(s => Game.getObjectById(s) != null && Game.getObjectById(s).hits / Game.getObjectById(s).hitsMax < 0.05);
            for (let newTgt of newRepair_tgt) {
                Memory['taskList'][roomName]['maintain'][3].tgt.push(newTgt);
            }
        } else {
            Memory['taskList'][roomName]['maintain'][3].tgt = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: structure => structure.hits / structure.hitsMax < 0.01 && (structure.structureType == 'rampart'|| structure.structureType == 'constructedWall'  )
            }).sort((a,b)=>a.hits/a.hitsMax - b.hits/b.hitsMax).map(s => s.id);
        }
    },
    spawn:function (roomName) {
        let toSpawn;
        if (!Memory['roomInfo'][roomName]) {
            Memory['roomInfo'][roomName] = {};
            Memory['roomInfo'][roomName]['keySpawnList'] = [];
            Memory['roomInfo'][roomName]['spawnList'] = [];
            return;
        }
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
                    } else if (r == -6 && _.filter(Game.creeps, c => c.memory.typeInfo && c.memory.typeInfo.taskRoom == roomName && c.memory.typeInfo.taskName == 'keyTransporter').length == 0) {
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
    },
    copyInSpawnList:function (roomName,creep) {
        let newCreepInf = {
            body: JSON.stringify(creep.body.map(s => s.type)),
            name: creep.name,
            memory: JSON.stringify(creep.memory),
            condition:'true'
        };
        Memory['roomInfo'][roomName]['spawnList'].push(newCreepInf);
    },
    sell:function(sellRoom,sellResource,threshold) {
        if (sellRoom.terminal.store[RESOURCE_ENERGY] >= 100000 && sellRoom.terminal.store[sellResource] > 1000) {
            let order =Game.market.getAllOrders({type: ORDER_BUY, resourceType: sellResource}).sort((a,b)=>(a.price-Game.market.calcTransactionCost(100, sellRoom.name, a.roomName)*0.00015)<(b.price-Game.market.calcTransactionCost(100, sellRoom.name, b.roomName)*0.00015))[0];
            if (order.price > threshold) {
                Game.market.deal(order.id,1000,sellRoom.name);
                let price = order.price - Game.market.calcTransactionCost(100, sellRoom.name, order.roomName)*0.00015;
                console.log(sellRoom.name +':deal '+sellResource+' with '+order.roomName + ' in ' + price);
            }
        }
    },
    buy:function (buyRoom,buyResource,threshold) {
        if (buyRoom.terminal.store[RESOURCE_ENERGY] >= 100000 && buyRoom.terminal.store[buyResource] < 1000) {
            let order =Game.market.getAllOrders({type: ORDER_SELL, resourceType: buyResource}).sort((a,b)=>(a.price+Game.market.calcTransactionCost(100, buyRoom.name, a.roomName)*0.00015)>(b.price+Game.market.calcTransactionCost(100, buyRoom.name, b.roomName)*0.00015))[0];
            if (order.price < threshold) {
                Game.market.deal(order.id,1000,buyRoom.name);
                let price = order.price + Game.market.calcTransactionCost(100, buyRoom.name, order.roomName)*0.00015;
                console.log(buyRoom.name+':deal '+buyResource+' with '+order.roomName + ' in ' + price);
            }
        }
    }
};
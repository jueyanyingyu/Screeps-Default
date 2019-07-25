let tool = require('util');
const profiler = require('screeps-profiler');
let typeListToList = require('type.listToList');
let roleTower = require('role.tower');
let roleToSpot = require('role.toSpot');
let roleListToList = require('role.listToList');
let roleLink = require('role.link');
//let roleDemolisher = require('role.demolisher');
//let roleClaimer = require('role.claimer');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function () {
        if (Game.time % 2 == 0) {
            for (let roomName in Game.rooms) {
                if (Memory[roomName + '_spawnList']) {
                    let toSpawn = Memory[roomName + '_spawnList'].filter(c => eval(c.condition) == true)[0];
                    if (toSpawn) {
                        let spawns = _.filter(Game.spawns, s => s.room.name == roomName && !s.spawning);
                        for (let spawn of spawns) {
                            if (spawn) {
                                let r;
                                if (Memory[roomName + '_extension_list']) {
                                    let exList = Memory[roomName + '_extension_list'].map(e => Game.getObjectById(e));
                                    r = spawn.spawnCreep(JSON.parse(toSpawn.body), toSpawn.name + spawn.name + '_' + Game.time, {
                                        memory: JSON.parse(toSpawn.memory),
                                        energyStructures: exList
                                    });
                                    console.log(spawn + ':' + r);
                                } else {
                                    r = spawn.spawnCreep(JSON.parse(toSpawn.body), toSpawn.name + spawn.name + '_' + Game.time, {memory: JSON.parse(toSpawn.memory)});
                                    console.log(spawn + ':' + r);
                                }
                                if (r == OK) {
                                    Memory[roomName + '_spawnList'] = Memory[roomName + '_spawnList'].filter(c => c != toSpawn)
                                    break;
                                } else if (r == -6 && !_.filter(Game.creeps, c => c.memory.room == roomName && c.memory.role == 'transporter' && c.memory.grpNum == '1')[0]) {
                                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'transmitter' + Game.time, {
                                        memory: {
                                            type: 'listToList',
                                            room: roomName,
                                            grpNum: '1',
                                            role: 'transporter',
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
                }
            }
        }
        if (Game.time % 20 == 0) {
            if (Game.getObjectById('5d27ec31496c4017073f8939').store[RESOURCE_ENERGY] == 0) {
                Game.getObjectById('5d1386bb1bd51d1fd82e33f3').send(RESOURCE_ENERGY, 200000, 'E19N25');
            }
            //builder维护
            for (let roomName in Game.rooms) {
                if (Memory.roomList.indexOf(roomName) != -1) {
                    tool.updateEM(roomName);
                    tool.updateBuild(roomName);
                    tool.updateRepair(roomName);
                }
            }

            for (let name in Memory.creeps) {
                if (!Game.creeps[name]) {
                    console.log('delete:' + name);
                    delete Memory.creeps[name];
                }
            }
        }

        let listCreeps = _.filter(Game.creeps, (creep) => creep.memory.type == 'listToList');
        for (let name in listCreeps) {
            let creep = listCreeps[name];
            typeListToList.run(creep);
        }

        let listToListCreeps = _.filter(Game.creeps, (creep) => creep.memory.typeRole == 'listToList');
        for (let name in listToListCreeps) {
            let creep = listToListCreeps[name];
            roleListToList.run(creep);
        }
        let obeyLinks = _.filter(Game.structures, s => s.structureType == 'link');
        for (let link of obeyLinks) {
            if (roleLink.run(link) == OK) {
                break;
            }
        }

        for (let name in Game.rooms) {
            let renewName = 'canRenew_' + name;
            if (Memory[renewName] == false && Game.rooms[name].energyAvailable >= 300) {
                Memory[renewName] = true;
            }
        }

        let towers = _.filter(Game.structures, s => s.structureType == 'tower');
        for (let tower of towers) {
            roleTower.run(tower);
        }

        if (Memory.isWar == true) {
            let toSpots = _.filter(Game.creeps, c => c.memory.roleType == 'toSpot');
            for (let toSpot of toSpots) {
                roleToSpot.run(toSpot);
            }
        }
        //let claimer = _.filter(Game.creeps,c=>c.memory.role == 'claimer')[0];
        //roleClaimer.run(claimer);
        /*
            let demolishers = _.filter(Game.creeps, (creep) => creep.memory.role == 'demolisher');
            for (let demolisher of demolishers) {
                roleDemolisher.run(demolisher);
            }
        */
    });
}

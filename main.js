let Traveler = require('Traveler');
let tool = require('util');
const profiler = require('screeps-profiler');
let typeListToList = require('type.listToList');
let roleTower = require('role.tower');
let roleToSpot = require('role.toSpot');
let roleListToList = require('role.listToList');
let roleLink = require('role.link');
const conventional = require('type.conventional');
const  reactive = require('type.reactive');
//let roleDemolisher = require('role.demolisher');
//let roleClaimer = require('role.claimer');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function () {
        for (let roomName in Game.rooms) {
            if (Game.rooms[roomName].find(FIND_MY_SPAWNS).filter(s => s.isActive() == true).length > 0) {
                try {
                    tool.spawn(roomName);
                } catch (e) {
                    console.log(roomName);
                    console.log(e);
                }
            }
        }
        for (let roomName of Memory['roomList']) {
            try {
                Memory['eventList'][roomName] = Game.rooms[roomName].getEventLog(false);
            } catch (e) {

            }
        }
        if (Game.time % 20 == 0) {

            if (Game.getObjectById('5d27ec31496c4017073f8939').store[RESOURCE_ENERGY] > 0) {
                let order =Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ZYNTHIUM}).sort((a,b)=>b.price-Game.market.calcTransactionCost(100, 'E19N25', b.roomName)*0.00015-a.price+Game.market.calcTransactionCost(100, 'E19N25', a.roomName)*0.00015)[0];
                if (order.price > 0.04) {
                    Game.market.deal(order.id,1000,'E19N25');
                    let price = order.price - Game.market.calcTransactionCost(100, 'E19N25', order.roomName)*0.00015;
                    console.log("deal with " + order.roomName + ' at the price of ' + price);
                }
            }
            /*
            if (Game.getObjectById('5d27ec31496c4017073f8939').store[RESOURCE_ENERGY] < 100000) {
                let order =Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_ENERGY}).sort((b,a)=>b.price-Game.market.calcTransactionCost(100, 'E19N25', b.roomName)*0.00015-a.price+Game.market.calcTransactionCost(100, 'E19N25', a.roomName)*0.00015)[0];
                if (order.price  < 0.03) {
                    Game.market.deal(order.id,1000,'E19N25');
                }
                let price = order.price + Game.market.calcTransactionCost(100, 'E19N25', order.roomName)*0.00015;
                console.log("deal with " + order.roomName + ' at the price of ' + price);
            }
             */
            //builder维护
            for (let roomName of Memory['roomList']) {
                if (Memory.roomList.indexOf(roomName) != -1) {
                    try {
                        tool.updateEMList(roomName);
                        tool.updateBuildList(roomName);
                        tool.updateRepairList(roomName);
                        tool.updateFortList(roomName);
                    } catch (e) {
                    }
                }
            }

            for (let name in Memory.creeps) {
                if (!Game.creeps[name]) {
                    console.log('delete:' + name);
                    delete Memory.creeps[name];
                }
            }
        }

        let reactiveCreeps = _.filter(Game.creeps, (creep) => creep.memory.type == 'reactive');
        for (let name in reactiveCreeps) {
            let creep = reactiveCreeps[name];
            reactive.run(creep);
        }

        let conventionalCreeps = _.filter(Game.creeps, (creep) => creep.memory.type == 'conventional');
        for (let name in conventionalCreeps) {
            let creep = conventionalCreeps[name];
            conventional.run(creep);
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

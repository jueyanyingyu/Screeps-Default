let Traveler = require('Traveler');
let tool = require('util');
let visual = require('util.visual');
const profiler = require('screeps-profiler');
let typeListToList = require('type.listToList');
let roleTower = require('role.tower');
let roleToSpot = require('role.toSpot');
let roleListToList = require('role.listToList');
let roleLink = require('role.link');


const conventional = require('type.conventional');
const  reactive = require('type.reactive');
const  combatSquad = require('type.combatSquad');
//let roleDemolisher = require('role.demolisher');
//let roleClaimer = require('role.claimer');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function () {
        if (Game.time%3 == 0) {
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
        }
        if (Game.time % 20 == 0) {
            tool.sell(Game.rooms['E19N25'],RESOURCE_ZYNTHIUM,0.04);
            tool.sell(Game.rooms['E21N23'],RESOURCE_KEANIUM,0.04);
            tool.buy(Game.rooms['E19N25'],RESOURCE_POWER,0.4);
            /*
            if (Game.getObjectById('5d27ec31496c4017073f8939').store[RESOURCE_ENERGY] > 0) {
                let buyorder =Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_POWER}).sort((a,b)=>(a.price-Game.market.calcTransactionCost(100, 'E19N25', a.roomName)*0.00015)<(b.price-Game.market.calcTransactionCost(100, 'E19N25', b.roomName)*0.00015))[0];
                let sellorder = Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_POWER}).sort((a,b)=>(a.price+Game.market.calcTransactionCost(100, 'E19N25', a.roomName)*0.00015)>(b.price+Game.market.calcTransactionCost(100, 'E19N25', b.roomName)*0.00015))[0];
                let income = buyorder.price-sellorder.price-Game.market.calcTransactionCost(100, 'E19N25', sellorder.roomName)*0.00015-Game.market.calcTransactionCost(100, 'E19N25', buyorder.roomName)*0.00015;
                if (Memory['hasSold'] == true && income > 0) {
                    Game.market.deal(sellorder.id,1000,'E19N25');
                    console.log('buyin ' + (sellorder.price*1000));
                    console.log('fare '+ Game.market.calcTransactionCost(1000, 'E19N25', sellorder.roomName)*0.015);
                    Memory['hasSold'] = false;
                } else if (Memory['hasSold'] == false && income > 0) {
                    Game.market.deal(buyorder.id,1000,'E19N25');
                    console.log('sellout ' + (buyorder.price*1000));
                    console.log('fare ' + Game.market.calcTransactionCost(1000, 'E19N25', buyorder.roomName)*0.015);
                    Memory['hasSold'] = true;
                } else {
                    console.log('no sell');
                }

            }
             */

/*
            if (_.sum(Game.getObjectById('5d1bc1dab5c99a37435cd260').store) >= 980000) {
                Game.getObjectById('5d27ec31496c4017073f8939').send(RESOURCE_ENERGY,10000,'E21N23');
                let order =Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY}).sort((a,b)=>b.price-Game.market.calcTransactionCost(100, 'E19N25', b.roomName)*0.00015-a.price+Game.market.calcTransactionCost(100,'E19N25', a.roomName)*0.00015)[0];
                if (order.price > 0.004) {
                    console.log(Game.market.deal(order.id,1000,'E19N25'));
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
        if (Game.time%1 == 0) {
            conventional.run();
            reactive.run();
            //combatSquad.run();
            Game.getObjectById('5d4960b9636d162b669fbf2f').processPower();

            let obeyLinks = _.filter(Game.structures, s => s.structureType == 'link');
            for (let link of obeyLinks) {
                if (roleLink.run(link) == OK) {
                    break;
                }
            }
            let towers = _.filter(Game.structures, s => s.structureType == 'tower');
            for (let tower of towers) {
                roleTower.run(tower);
            }
        }
        //combatSquad.run();

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

const UC = require('util.combatSquad');
function updateMember() {
    for (let combatSquadName in  Memory['combatSquadList']) {
        let combatSquad = Memory['combatSquadList'][combatSquadName];
        combatSquad.tank =combatSquad.attacker.filter(m=>Game.getObjectById(m));
        combatSquad.attacker = combatSquad.attacker.filter(m=>Game.getObjectById(m));
        combatSquad.rangedAttacker = combatSquad.rangedAttacker.filter(m=>Game.getObjectById(m));
        combatSquad.healer = combatSquad.healer.filter(m=>Game.getObjectById(m));
        combatSquad.carrier = combatSquad.carrier.filter(m=>Game.getObjectById(m));
    }
}
function doBattle() {
    for (let combatSquadName in  Memory['combatSquadList']) {
        let combatSquad = Memory['combatSquadList'][combatSquadName];
        UC[combatSquad.do](combatSquad);
    }
}
function registerCreep() {
    let combatSquadCreeps = _.filter(Game.creeps, (creep) => creep.memory.type == 'combatSquad');
    for (let creep of combatSquadCreeps) {
        if (Memory['combatSquadList'][creep.memory.typeInfo.combatSquadName][creep.memory.typeInfo.role].findIndex(id=>id == creep.id) == -1) {
            Memory['combatSquadList'][creep.memory.typeInfo.combatSquadName][creep.memory.typeInfo.role].push(creep.id);
        }
    }
}
module.exports = {
    run: function () {
        registerCreep();
        updateMember();
        doBattle();
    }
}
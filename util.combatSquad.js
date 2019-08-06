module.exports = {
    getPowerBank:function (combatSquad) {
        combatSquad.attacker
            .map(a=>Game.getObjectById(a))
            .map(a=>a.say('attack'));
    }
};
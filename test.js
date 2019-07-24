Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Harvester' + Game.time, {
    memory: {
        typeRole: 'listToList',
        room: 'E18N24',
        groupNum: '1',
        role: 'harvester',
        work: true,
        needReplenish: true,
        replenishRoom: 'E18N25'
    }
})
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Builder' + Game.time, {
    memory: {
        typeRole: 'listToList',
        room: 'E19N25',
        groupNum: '1',
        role: 'builder',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})

Game.spawns['Spawn_E18N25_1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Upgrader' + Game.time, {
    memory: {
        typeRole: 'listToList',
        room: 'E17N26',
        groupNum: '1',
        role: 'upgrader',
        work: true,
        needReplenish: true,
        replenishRoom: 'E17N26'
    }
})
Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Transmitter' + Game.time, {
    memory: {
        typeRole: 'listToList',
        room: 'E19N25',
        groupNum: '1',
        role: 'transmitter',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Demolisher' + Game.time, {
    memory: {
        role: 'demolisher',
        work: true,
        renew: false
    }
})
Game.spawns['Spawn_E19N25_1'].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], 'Claimer' + Game.time, {
    memory: {
        roleType: 'toSpot',
        role: 'claimer',
        groupNum: '1',
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Memory.transmitter_E17N26_1_tgt = Game.rooms['E17N26'].find(FIND_STRUCTURES).filter(s => s.structureType == 'spawn' || s.structureType == 'extension').map(s => s.id)
    ['5d10dd28d2af1167d038261c', '5d10e2d9b1cc0467dc188e87', '5d10e1bbea6f1d59cbdea2ee', '5d10e25765176e03bc5b35cc', '5d10e3659f005a1799f4723a']
Game.getObjectById('5d0dec5090528371b51e812a').room.find(FIND_CONSTRUCTION_SITES).map(s => s.d
Game.spawns['Spawn3'].spawnCreep([ATTACK, MOVE, MOVE], 'Attacker' + Game.time, {
    memory: {
        roleType: 'toSpot',
        role: 'attacker',
        groupNum: '1'
    }
})
Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, MOVE], 'RangedAttacker' + Game.time, {
    memory: {
        roleType: 'toSpot',
        role: 'rangedAttacker',
        groupNum: '1'
    }
})
Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, MOVE], 'Tester' + Game.time, {
    memory: {
        roleType: 'toSpot',
        role: 'rangedAttacker',
        groupNum: '1'
    }
});
Game.spawns['Spawn_E19N25_1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL], 'Defender' + Game.time, {
    memory: {
        typeRole: 'listToList',
        role: 'defender',
        room: 'E19N24',
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
});

/*
new listToList
 */
Memory.roomName_role_grpNum_list = {
    src: [
        []
    ],
    tgt: [
        []
    ],
    resource: [RESOURCE_ENERGY]
};
Game.spawns['Spawn_E19N25_1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Harvester' + Game.time, {
    memory: {
        type: 'listToList',
        room: 'E19N25',
        grpNum: '3',
        role: 'harvester',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Transmitter' + Game.time, {
    memory: {
        type: 'listToList',
        room: 'E19N25',
        grpNum: '3',
        role: 'transporter',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Game.spawns['Spawn_E19N25_1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Upgrader' + Game.time, {
    memory: {
        type: 'listToList',
        room: 'E19N25',
        grpNum: '1',
        role: 'upgrader',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Game.spawns['Spawn_E19N25_1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Builder' + Game.time, {
    memory: {
        type: 'listToList',
        room: 'E19N24',
        grpNum: '1',
        role: 'builder',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})
Memory.E19N25_transporter_1_list = {
    src: [
        ['5d29de79cf631126af361678'],
        ['5d29e139446ab516d8d00d6b']
    ],
    tgt: [
        ['5d1e0ed51526c4373756cb3b', '5d1e100b64842a72e7dfdfa6', '5d1e116171b41e2a5c8541c6', '5d1e12a79cbef5644c067683', '5d270ba7bc30c0733832cd7c', '5d270af0b9b7421b3a5b41e4'],
        ['5d272437a2af7f5bfb4509f4', '5d272571e30bfa480f825a94', '5d2722e3e5c9335c10ad9d48', '5d2726afaa0f0f4ad63993f3', '5d2728a3e7517a1b456eadb2', '5d2727c4be08965d1f5c4c42']
    ],
    resource: [RESOURCE_ENERGY, RESOURCE_ENERGY]
}
Game.spawns['Spawn_E19N25_1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Harvester' + Game.time, {
    memory: {
        type: 'listToList',
        room: 'E19N25',
        grpNum: '3',
        role: 'harvester',
        work: true,
        needReplenish: true,
        replenishRoom: 'E19N25'
    }
})

for (let m in Memory) {
    if (m.indexOf('_list') == -1 && m.indexOf('E') != -1 ) {
        let arr = m.split('_');
        let base = Memory.roomInfo;
        base[arr[0]]['otherInfo'][arr[1]] = Memory[m];
    }
}




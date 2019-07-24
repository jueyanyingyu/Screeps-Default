module.exports = {
    addPart:function(array,part,num) {
        for (let i = 0;i<num;i++) {
            array.push(part);
        }
        return array;
    },
    Attacker:{
        body:this.addPart,
        name:'attacker',
        memory: {
            roleType:'toSpot',
            role: 'attacker'
        }
    },
    spawnFighterGroupTask:function (spawnName,groupNum) {
        if (!Memory[spawnName+'_spawnList']) {
            Memory[spawnName+'_spawnList'] = [];
        }
        Memory[spawnName+'_spawnList'].push();
    }
};

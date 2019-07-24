module.exports = {
    run: function (link) {
        if (link.energy == link.energyCapacity) {
            let tgt = Game.getObjectById(Memory[link.room.name+'_masterLink']);
            if (tgt) {
               if (tgt.energy == 0)
                return link.transferEnergy(tgt);
            }
            
        }
    }
};
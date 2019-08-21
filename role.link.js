module.exports = {
    run: function (link) {
        if (link.energy == link.energyCapacity) {
            let tgt = Game.getObjectById(Memory['roomInfo'][link.room.name]['masterLink']);
            if (tgt) {
               if (tgt.energy == 0)
                return link.transferEnergy(tgt);
            }
            
        }
    }
};
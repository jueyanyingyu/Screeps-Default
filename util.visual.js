module.exports = {
    showHits:function(object) {
        if (object.hits < object.hitsMax) {
            let percentage = object.hits/object.hitsMax;
            object.room.visual.line(object.pos.x-0.5,object.pos.y-0.6,object.pos.x-0.5+1*percentage,object.pos.y-0.6,{color:'#'+('00'+(Math.floor(255*(1-percentage))).toString(16)).substr(-2)+('00'+(Math.floor(255*percentage)).toString(16)).substr(-2)+'00',opacity:1});
        }
    },
    showProgress:function (structure) {
        structure.room.visual.text((structure.progress/structure.progressTotal*100).toFixed(2)+'%',structure.pos,{font:0.25});
    }
};
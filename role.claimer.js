
module.exports = {
  run:function (creep) {
      let tgt = Game.getObjectById('5bbcadeb9099fc012e63823d');
      if (tgt) {
          if (creep.reserveController(tgt) == ERR_NOT_IN_RANGE) {
              creep.moveTo(tgt);
          }
      } else {
          let flagTgt = _.filter(Game.flags, (flag) => flag.color == COLOR_GREEN)[0];
          if (flagTgt) {
              creep.moveTo(flagTgt.pos);
          }
      }
  }
};
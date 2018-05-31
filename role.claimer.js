module.exports = {
    run: function(creep){
        if (!creep.memory.explored) {
            creep.pos.findClosestByRange(FIND_EXIT);
            if(target) {
                creep.moveTo(target);
                creep.memory.explored = true;
            }
        } else {
            let r = creep.claimController(creep.room.controller);
            if (r === ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            } else if (r === ERR_GCL_NOT_ENOUGH){
                const reserve = creep.claimController(creep.room.controller);
                if (reserve !== 0) {
                    console.log('Claimer reserving error: ' + re);
                    creep.moveTo(creep.room.controller);
                }
            } else if (r !== 0) {
                console.log('Claimer error: ' + r);
            }
        }
    }
}
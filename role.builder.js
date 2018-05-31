module.exports = {
    run: function(creep){

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🚧harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧build');
        }

        if(Room.energyCapacityAvailable == Room.energyAvailable) {
            const extensions = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });

            const notBuiltExtensions = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            })

            if((notBuiltExtensions.length + extensions.length) < 5) {
                creep.room.createConstructionSite(STRUCTURE_EXTENSION)
            }
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.say('🚧idle⁉️');
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
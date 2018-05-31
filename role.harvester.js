var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(!creep.memory.harvesting && creep.carry.energy < creep.carryCapacity) {
            creep.memory.harvesting = true
            creep.say('🔄 harvest');
        }
        if(creep.memory.harvesting && creep.carry.energy >= creep.carryCapacity) {
            creep.memory.harvesting = false
            creep.say('🔄 full');
        }


	    if(creep.memory.harvesting) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.say('⁉️ no target');
            }
        }
	}
};

module.exports = roleHarvester;
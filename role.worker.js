function buildConstructionSite() {
    console.log(JSON.stringify(currentSpawn[0]))
    console.log(JSON.stringify(currentSpawn[0].pos))
    var currentRoomPosition = currentSpawn[0].pos
    var xPosition = currentRoomPosition.x
    var yPosition = currentRoomPosition.y
    var shouldContinue = true
    var counter = 0

    while(shouldContinue && counter < 50) {
        var xDelta = Math.floor(Math.random() * 10) - 5
        var yDelta = Math.floor(Math.random() * 10) - 5

        var viablePosition = creep.room.getPositionAt(xPosition + xDelta, yPosition + yDelta)
        console.log(JSON.stringify(viablePosition))
        if(viablePosition) {
            var objects = viablePosition.look()
            console.log(JSON.stringify(objects))
            if(objects.length == 1 && objects[0].type == "terrain" && objects[0].terrain == "plain") {
                console.log("Creating extension...")
                creep.room.visual.circle(xPosition + xDelta, yPosition + yDelta)
                var value = creep.room.createConstructionSite(xPosition + xDelta, yPosition + yDelta, STRUCTURE_EXTENSION)
                console.log(value)
                shouldContinue = false
            }
        }

        counter++
    }
}


module.exports = {
    run: function(creep){

        if (creep.carry.energy < creep.carryCapacity) {
            creep.say('🔄 harvest');
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            const extensions = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });
    
            const notBuiltExtensions = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            })
    
            if((notBuiltExtensions.length + extensions.length) < 1) {
                buildConstructionSite();
            }

            if (extensions.length < 1) {
                creep.say('🚧 build');
                var targets = creep.room.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                creep.say('🔄 return');
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    buildConstructionSite();
                    //creep.say('⁉️ Nowhere to return resources and nothing to build');
                }
            }
        }
    }
}
module.exports = {
    run: function(creep){

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        const extensions = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        const notBuiltExtensions = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        })


        const currentSpawn = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_SPAWN }
        })

        if((notBuiltExtensions.length + extensions.length) < 2) {
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

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
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
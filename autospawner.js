const countByRole = function() {

}

const autoSpawner = function autoSpawner () {
    const desiredRoles = {
        harvester: 3,
        upgrader: 6,
        builder: 1
    }
    
    let spawn = false;
    for(let role in desiredRoles) {
        roleCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if (roleCreeps.length < desiredRoles[role]) {
            nextRole = role;
            spawn = true;
            break;
        }
    }

    if (spawn) {
        for(let name in Game.spawns) {
            const newName = nextRole + Game.time;
            const result = Game.spawns[name].spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: {role: nextRole}
            })
            if (result >= 0) {
                console.log('Succesfully Spawning Creep:' + newName)
            }
        }
    }
}

module.exports = autoSpawner;
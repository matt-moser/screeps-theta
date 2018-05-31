const roleSpecs = {
    worker: [WORK, CARRY, MOVE],
    upgrader: [WORK, CARRY, MOVE],
    claimer: [MOVE, CLAIM]
}

const autoSpawner = function autoSpawner () {
    const desiredRoles = {
        worker: 12,
        upgrader: 6,
        claimer: 3
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
            const result = Game.spawns[name].spawnCreep(roleSpecs[nextRole], newName, {
                memory: {role: nextRole}
            })
            if (result >= 0) {
                console.log('Succesfully Spawning Creep:' + newName)
            }
            else (
                console.log('Failed to spawn ' + nextRole + '.  Code ' + result)
            )
        }
    }
}

module.exports = autoSpawner;
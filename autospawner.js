const autoSpawner = function autoSpawner () {
    const desiredRoles = {
        harvester: 3,
        upgrader: 3,
        builder: 3
    }

    const roleMap = {};
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        roleMap[creep.memory.role] = roleMap[creep.memory.role] ? roleMap[creep.memory.role] + 1 : 1;
    }

    let nextRole = 'harvester';
    for(let role in desiredRoles) {
        if (roleMap[role] < desiredRoles[role]) {
            nextRole = role;
            break;
        }
    }

    for(let name in Game.spawns) {
        const newName = nextRole + (roleMap[nextRole] + 1);
        const result = Game.spawns[name].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {role: nextRole}
        })
        if (result >= 0) {
            console.log('Succesfully Spawning Creep:' + newName)
        }
    }
}

module.exports = autoSpawner;
import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class ExecutionTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    name: string = 'execution'
    description: string = 'There is a chance to reduce armor and pierce rating of enemies around the killed target'
    chance: number = 15

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return
        
        player.level.getAliveEnemyInRadius(player, 12).forEach(elem => {
            elem.pierce -= 10
            elem.armour_rate -= 10
        })
    }
}
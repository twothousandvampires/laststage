import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Enemy from '../Objects/src/Enemy/Enemy'

export default class InnerFireTrigger implements ITrigger {

    cd: number = 5000
    last_trigger_time: number = 0
    chance: number = 50
    name: string = 'inner fire'
    description: string = 'There is a chance to incinerate the enemies around'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        player.level.createEffect(player, 'burning ring')

        let targets: Enemy[] = player.level.getAliveEnemyInRadius(player, 12)
        
        targets.forEach(element => {
            element.takeDamage(player, {
                burn: true
            })
        });
    }
}
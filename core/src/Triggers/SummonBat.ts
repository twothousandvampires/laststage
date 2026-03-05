import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Bat from '../Objects/src/Enemy/Bat'

export default class SummonBat implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 5
    name: string = 'bat caller'
    description: string = 'There is a chance to summon bat'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let b = new Bat(player.level)
        b.setPoint(player.x, player.y)
        player.level.enemies.push(b)
    }
}

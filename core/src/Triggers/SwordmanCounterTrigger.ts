import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import SwordmanCounter from '../Status/SwordmanCounter'

export default class SwordmanCounterTrigger implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'counter attack'
    description: string = 'gives you 20 critical chance and pierce for 3 seconds'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let s = new SwordmanCounter(player.level.time)
        s.setDuration(3000)

        player.level.setStatus(player, s,  true)
    }
}
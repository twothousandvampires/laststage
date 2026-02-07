import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class GoodMoment implements ITrigger {
    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 15
    name: string = 'good moment'
    description: string = 'There is a chance to get courage'

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addCourage(1)
    }
}
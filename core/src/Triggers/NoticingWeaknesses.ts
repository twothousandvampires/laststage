import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class NoticingWeaknesses implements ITrigger {

    cd: number = 5000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'noticing weaknesses'
    description: string = 'There is a chance to say phrase'
    chance: number = 30

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        player.sayPhrase(true)
    }
}
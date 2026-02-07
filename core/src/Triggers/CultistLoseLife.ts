import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Cultist from '../Objects/src/PlayerClasses/Cultist'

export default class CultistLoseLife implements ITrigger {

    cd: number = 0
    last_trigger_time: number = 0
    name: string = 'crystilizing hits'
    description: string = 'Provides a chance to inflict fragility on enemies in a small radius on hit'

    constructor(public chance: number = 100) {}

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Cultist) {
        player.setParryWindow()
    }
}
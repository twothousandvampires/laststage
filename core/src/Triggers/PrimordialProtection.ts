import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class PrimordialProtection implements ITrigger {

    cd: number = 2500
    last_trigger_time: number = 0
    name: string = 'primordial protection'
    description: string = 'There is a chance to gain ward'
    chance: number = 25

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addWard(1)
    }
}
import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class Rite implements ITrigger {

    cd: number = 3000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'rite'
    description: string = 'You life becomes 1, can not regenerate life, regenerate ward instead'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addWard(1)
    }
}
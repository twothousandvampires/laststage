import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import LethalStrikes from '../Status/LethalStrikes'

export default class LethalStrikesOnCritical implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 20
    name: string = 'letchal strikes'
    description: string = 'When you land a critical strike, there is a chance to gain lethal strikes buff'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let s = new LethalStrikes(player.level.time)
        s.setDuration(5000)

        player.level.setStatus(player, s, true)
    }   
}
import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import FaithStatus from '../Status/FaithStatus'

export default class FaithTrigger implements ITrigger {

    cd: number = 6000
    last_trigger_time: number = 0
    chance: number = 75
    name: string = 'faith'
    description: string = 'There is a chance to increase spirit by 20 for 5 seconds'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        let s = new FaithStatus(player.getTime())
        s.setDuration(5000)

        player.level.setStatus(player, s, true)
    }
}
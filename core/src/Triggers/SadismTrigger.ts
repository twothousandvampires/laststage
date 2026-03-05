import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import SadismStatus from '../Status/SadismStatus'

export default class SadismTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    name: string = 'sadism'
    description: string = 'Increase move speed and pierce rating up to 15 for 7 seconds'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let s = new SadismStatus(player.getTime())
        s.setDuration(15000)

        player.level.setStatus(player, s, true)
    }
}
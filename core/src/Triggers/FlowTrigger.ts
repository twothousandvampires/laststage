import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Flow from '../Status/Flow'

export default class FlowTrigger implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'flow'
    description: string = 'You have a chance to increase your attack and cast speed'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        let s = new Flow(player.level.time)
        s.setPower(80)
        s.setDuration(3000)

        player.level.setStatus(player, s, true)
    }
}

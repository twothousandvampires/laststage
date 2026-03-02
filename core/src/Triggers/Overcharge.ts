import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Overcharged from '../Status/Overcharged'

export default class Overcharge implements ITrigger {

    cd: number = 5000
    last_trigger_time: number = 0
    name: string = 'overcharge'
    description: string = 'Your critical strike chance increases to 100% for 3 seconds'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, value: number = 0) {
        if(!value) return
        if(player.resource < player.maximum_resources) return

        let s = new Overcharged(player.getTime())
        s.setDuration(4000)

        player.level.setStatus(player, s, true)
    }
}
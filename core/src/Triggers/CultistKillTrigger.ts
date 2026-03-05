import ITrigger from '../Interfaces/ITrigger'
import Soul from '../Objects/Effects/Soul'
import Character from '../Objects/src/Character'
import Cultist from '../Objects/src/PlayerClasses/Cultist'
import Unit from '../Objects/src/Unit'
import SoulHarvester from '../Status/SoulHarvester'

export default class CultistKillTrigger implements ITrigger {

    cd: number = 500
    last_trigger_time: number = 0
    name: string = 'soul harvester'
    description: string = 'Gives a chance to get soul shed when kill enemy'

    constructor(public chance: number = 100) {}

    getTriggerChance(player: Cultist): number {
        return player.soul_on_kill_chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        let soul = new Soul(player.level)
        soul.setPoint(target.x, target.y)

        player.level.addEffect(soul)

        let s = new SoulHarvester(player.level.time)
        s.setDuration(5000)
        player.level.setStatus(player, s, true)
    }
}
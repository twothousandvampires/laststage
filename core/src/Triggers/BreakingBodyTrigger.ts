import ITrigger from '../Interfaces/ITrigger'
import BloodyVinesEffect from '../Objects/Effects/BloodyVinesEffect'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class BreakingBodyTrigger implements ITrigger {

    cd: number = 500
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'breaking body'
    description: string = 'Blood spreads and deals damage'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        let e = new BloodyVinesEffect(player.level)
        e.setOwner(player)
        e.setPoint(target.x, target.y)

        player.level.binded_effects.push(e)
    }
}
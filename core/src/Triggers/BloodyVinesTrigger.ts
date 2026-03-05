import ITrigger from '../Interfaces/ITrigger'
import BloodyVinesEffect from '../Objects/Effects/BloodyVinesEffect'
import Character from '../Objects/src/Character'

export default class BloodyVinesTrigger implements ITrigger {

    cd: number = 3000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'bloody spell'
    description: string = 'There is a chance to create 4 blood vines from their body that will damage enemies'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
    
        let e = new BloodyVinesEffect(player.level)
        e.setOwner(player)
        e.setPoint(player.x, player.y)

        player.level.binded_effects.push(e)
    }
}
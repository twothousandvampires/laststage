import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class Horcrux implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'horcrux'
    description: string = 'When you get lethal damage, avoid it and estroy random item'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        if(player.item.length === 0) return

        player.can_be_lethaled = false
        player.deleteRandomItem()
    }
}
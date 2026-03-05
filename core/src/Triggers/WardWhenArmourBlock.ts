import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class WardWhenArmourBlock implements ITrigger {
    cd: number = 1500
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'enchanted armour'
    description: string = 'Gives a chance to gain a ward when you block a hit with armour'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addWard(1)
    }
}
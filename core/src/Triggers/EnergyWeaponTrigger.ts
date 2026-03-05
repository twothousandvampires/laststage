import ITrigger from '../Interfaces/ITrigger'
import ChargedSphere from '../Objects/Effects/ChargedSphere'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class EnergyWeaponTrigger implements ITrigger {

    cd: number = 4000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'energy weapon'
    description: string = 'When you deal a critical strike, there is a chance to create an energy sphere'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if (!target) return

        let c = new ChargedSphere(player.level)

        c.setPoint(target.x, target.y)
        player.level.binded_effects.push(c)
    }
}
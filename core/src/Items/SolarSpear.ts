import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import Heal from '../Objects/Effects/Heal'
import LightNova from '../Objects/Effects/LightNova'
import Character from '../Objects/src/Character'
import Enemy from '../Objects/src/Enemy/Enemy'
import Item from './Item'

export default class SolarSpear extends Item implements ITrigger {

    cd: number = 4000
    last_trigger_time: number = 0
    chance: number = 100

    constructor() {
        super()
        this.name = 'solar spear'
        this.type = 1
        this.description = 'when you pierce enemy you create light nova which heals allies'
    }

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    getSpecialForgings(): string[] {
        return ['frequency']
    }

    equip(character: Character): void {
        character.triggers_on_pierce.push(this)
    }

    trigger(player: Character, enemy: Enemy) {
        if (this.disabled) return
        if (!enemy) return

        let e = new LightNova(player.level)
        e.setPoint(enemy.x, enemy.y)
        player.level.effects.push(e)

        player.level.players.forEach(elem => {
            if (Func.distance(elem, enemy) <= 12) {
                player.level.addSound('heal', elem.x, elem.y)

                let e = new Heal(player.level)
                e.setPoint(elem.x, elem.y)
                e.z += 8

                player.level.effects.push(e)

                elem.addLife()
            }
        })     
    }
}

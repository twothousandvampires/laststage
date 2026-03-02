import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import BloodBonesExplode from '../Objects/Effects/BloodBonesExplode'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'
import Item from './Item'

export default class LizasRing extends Item implements ITrigger{

    last_trigger_time: number = 0

    constructor() {
        super()
        this.name = 'lizas ring'
        this.type = 3
        this.chance = 35
        this.cd = 1000
        this.distance = 12
        this.description = 'Get a courage when you find gold'
    }

    equip(character: Character): void {
        character.triggers_on_kill.push(this)
    }

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    getSpecialForgings(): string[] {
        return ['chance']
    }

    trigger(character: Character, target: Unit) {
        if (this.disabled) return
        if (!target) return
        if (target.crushing <= 0) return

        let e = new BloodBonesExplode(character.level)
        e.setPoint(target.x, target.y)
        character.level.effects.push(e)
        target.exploded = true

        character.level.enemies.forEach(elem => {
            if (!elem.is_dead && Func.distance(elem, target) <= this.distance) {
                elem.takeDamage(character, {})
            }
        })     
    }
}
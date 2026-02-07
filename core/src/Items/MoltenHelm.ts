import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import FireExplosionSmall from '../Objects/Effects/FireExplosionSmall'
import Character from '../Objects/src/Character'
import Item from './Item'

export default class MoltenHelm extends Item implements ITrigger {
    cd: number = 12000
    last_trigger_time: number = 0
    chance: number = 100

    constructor() {
        super()
        this.name = 'molten helm'
        this.type = 2
        this.description = 'When the block starts, it creates explosions around you; the number depends on your armour'
    }

    getTriggerChance(): number {
        return this.chance
    }

    equip(character: Character): void {
        character.triggers_on_start_block.push(this)
    }

    trigger(character: Character) {
        if (this.disabled) return

        let count = Math.floor(character.getTotalArmour() / 25) + 1
        
  
        for (let i = 1; i <= count; i++) {
          
            let a = Math.random() * 6.28

            let l = 1 - Math.abs(0.5 * Math.cos(a))

            let n_x = Math.sin(a) * l * Func.random(4, 10)
            let n_y = Math.cos(a) * l * Func.random(4, 10)

            let flame = new FireExplosionSmall(character.level)

            flame.setPoint(character.x + n_x, character.y + n_y)

            character.level.effects.push(flame)

            character.level.enemies.forEach(elem => {
                if(!elem.is_dead && Func.distance(elem, flame) <= 5){
                    elem.takeDamage(character, {
                        burn: true
                    })
                }
            })
        }
    }
}

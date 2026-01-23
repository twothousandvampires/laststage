import Func from '../../Func'
import ITrigger from '../../Interfaces/Itrigger'
import { Bone } from '../../Objects/Projectiles/Bone'
import Character from '../../Objects/src/Character'
import Unit from '../../Objects/src/Unit'
import Item from '../Item'
import Forging from './Forging'

export default class BonesWhenBlock extends Forging implements ITrigger {
    value: number = 0
    last_trigger_time: number = 0
    chance: number = 10
    cd: number = 1000

    constructor(item: Item) {
        super(item)
        this.max_value = 80
        this.name = 'bones when block'
        this.description = 'gives a chance to realise bones when you block which hurts enemies'
        this.gold_cost = 10
    }

    getTriggerChance(): number {
        return this.chance
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            if (!player.triggers_on_block.some(elem => elem instanceof BonesWhenBlock)) {
                player.triggers_on_block.push(this)
            }

            this.payCost()
            this.value += 10
            this.chance += 10
        }
    }

    getValue() {
        return this.value
    }

    trigger(player: Character, target: Unit) {
        if (this.item.disabled) return
        if(!target) return

        let angle = Func.angle(player.x, player.y, target.x, target.y)
        
        let u = 0
        let d = 0
        let count = Math.round(player.chance_to_block / 15)

        for (let i = 0; i < count; i++) {
            let proj = new Bone(player.level)
  
            if (i === 0) {
                proj.setAngle(angle)
            } else if (i % 2 === 0) {
                u += 0.5
                proj.setAngle(angle - u)
            } else {
                d += 0.5
                proj.setAngle(angle + d)
            }

            proj.setPoint(player.x, player.y)
            proj.setOwner(player)
            player.level.projectiles.push(proj)
        }
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}

import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import { Bone } from '../Objects/Projectiles/Bone'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class BreakingBonesTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'breaking bones'
    description: string = 'Bones are knocked out of him, wounding the enemy'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        let angle = Func.angle(player.x, player.y, target.x, target.y)
        
        let u = 0
        let d = 0
        let count = 3

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

            proj.setPoint(target.x, target.y)
            proj.setOwner(player)
            player.level.projectiles.push(proj)
        }
    }
}
import ITrigger from '../Interfaces/ITrigger'
import { BloodShard } from '../Objects/Projectiles/BloodShard'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class BloodCollector implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'breaking bones'
    description: string = 'Bones are knocked out of him, wounding the enemy'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        if(this.times >= 5){

            let count = 5
            
            let zones = 6.28 / count
    
            for (let i = 1; i <= count; i++) {
                let min_a = (i - 1) * zones
                let max_a = i * zones
    
                let angle = Math.random() * (max_a - min_a) + min_a
                let proj = new BloodShard(player.level)
                proj.setAngle(angle)
                proj.setPoint(target.x, target.y)
    
                target.level.projectiles.push(proj)
            }
            this.times = 0
        }
        else{
            this.times ++
        }
    }
}
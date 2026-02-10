import HarvestedSoulsEffect from '../Objects/Effects/HarvestedSoulsEffect'
import { SoulShatterProj } from '../Objects/Projectiles/SoulShatterProj'
import Character from '../Objects/src/Character'
import Status from './Status'

export default class SoulHarvester extends Status {
    
    last_checked: number
    count: number = 1
    effect: any

    constructor(public time: number) {
        super(time)
        this.last_checked = time
        this.need_to_check_resist = false
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.addCourage(1)
            this.unit.newStatus({
                name: 'harvested souls',
                duration: this.duration,
                desc: 'soul harvested ' + this.count,
            })

            this.effect = new HarvestedSoulsEffect(this.unit.level)
            this.effect.setOwner(this.unit)

            this.unit.level.binded_effects.push(this.effect)
        }
    }

    clear() {
        for(let i = 0; i < this.count; i++){
            this.unit.addResourse(1)
        }
        

        if(this.effect){
            this.effect.delete()
        }

        let count = this.count

        let zones = 6.28 / count
        
        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let angle = Math.random() * (max_a - min_a) + min_a
            let proj = new SoulShatterProj(this.unit.level)
            proj.setStart(this.unit.level.time)
            proj.setAngle(angle)
            proj.setPoint(this.unit.x, this.unit.y)
            proj.setOwner(this.unit)

            this.unit.level.projectiles.push(proj)
        }
    }

    update(status: any) {
        this.time = Date.now()
        this.count ++
        this.unit.addCourage(1)
        this.unit.newStatus({
            name: 'harvested souls',
            duration: this.duration,
            desc: 'soul harvested ' + this.count,
        })
    }
}
import Func from '../../Func'
import Level from '../../Level'
import { Bone } from '../Projectiles/Bone'
import ChallangeGold from '../Projectiles/ChallangeGold'
import Unit from '../src/Unit'
import Effect from './Effects'
import UltimatumArena from './UltimatumArena'

export default class UltimatumText4 extends Effect {
    timer = Date.now()
    monster: Unit | undefined = undefined

    activated: boolean = false
    activated_players = []
    failed = false
    challenge_radius = 25
    effect: any
    gold_count: number = 15
    last_fire: number = 0
    missed: number = 0

    constructor(
        level: Level,
        public start_power: number = 0
    ) {
        super(level)
        this.name = 'ultimatum4'
        this.box_r = 2.2
    }

    activate() {
        this.level.addMessedge('catch a gold.')
        this.level.addSound('challenge start', this.x, this.y)

        this.activated = true
        this.timer = this.level.time

        this.effect = new UltimatumArena(this.level)
        this.effect.setPoint(this.x, this.y)

        this.level.binded_effects.push(this.effect)
    }

    success() {
        this.level.addSound('gold spending', this.x, this.y)
        this.level.addMessedge('take it more.')
        
        let count = 20
        
        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let a = Math.random() * (max_a - min_a) + min_a

            let l = 1 - Math.abs(0.5 * Math.cos(a))

            let n_x = Math.sin(a) * l * 12
            let n_y = Math.cos(a) * l * 12

            let flame = new ChallangeGold(this.level, false, this)

            flame.setPoint(this.x + n_x, this.y + n_y)
            flame.setAngle(a)

            this.level.projectiles.push(flame)
        }
       
        if (this.effect) {
            this.effect.delete()
        }

        this.delete()
    }

    fail() {
        this.level.addSound('challenge failed', this.x, this.y)
        this.level.addMessedge('bones are gold for death')

         let count = 20
        
        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let a = Math.random() * (max_a - min_a) + min_a

            let l = 1 - Math.abs(0.5 * Math.cos(a))

            let n_x = Math.sin(a) * l * 12
            let n_y = Math.cos(a) * l * 12

            let flame = new Bone(this.level)

            flame.setPoint(this.x + n_x, this.y + n_y)
            flame.setAngle(a)

            this.level.projectiles.push(flame)
        }


        if (this.effect) {
            this.effect.delete()
        }

        this.delete()
    }

    act(time: number) {
        if (this.activated && this.gold_count <= 0) {
            if (this.missed <= 5) {
                this.success()
            } else {
                this.fail()
            }
        }
        else if(time - this.last_fire >= 1400 && this.activated && this.gold_count > 0){
            this.last_fire = time + 1400
            let target = Func.getRandomFromArray(this.level.players)
            this.gold_count --

            if(target){
                let proj = new ChallangeGold(this.level, false, this)
                let a = Func.angle(this.x, this.y, target.x, target.y)
                let d = Math.random() * 0.7
                a += Func.chance(50) ? -d : d

                proj.setPoint(this.x + Math.sin(a) * 4, this.y + Math.cos(a) * 4)
                proj.setAngle(a)

                this.level.projectiles.push(proj)
            }
            
        }
        else if (!this.activated) {
            this.level.players.forEach(elem => {
                if (
                    !this.activated_players.includes(elem.id) &&
                    Func.elipseCollision(elem.getBoxElipse(), this.getBoxElipse())
                ) {
                    this.activated_players.push(elem.id)
                    if (this.activated_players.length === this.level.players.length) {
                        this.activate()
                    }
                }
            })
        } else {
            this.level.players.forEach(elem => {
                if (Func.distance(this, elem) > this.challenge_radius) {
                    this.fail()
                }
            })
        }
    }
}

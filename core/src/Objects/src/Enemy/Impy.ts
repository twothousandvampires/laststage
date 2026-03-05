import Func from '../../../Func'
import Level from '../../../Level'
import EnemyMelleAttackState from '../../../State/EnemyMelleAttackState'
import Bleed from '../../../Status/Bleed'
import Enemy from './Enemy'

export default class Impy extends Enemy {
    constructor(level: Level) {
        super(level)
        this.name = 'impy'
        this.box_r = 2
        this.move_speed = 0.26
        this.attack_radius = 4.3
        this.attack_speed = 1400
        this.cooldown_attack = 1800
        this.spawn_time = 1000
        this.say_z = 8
        this.weapon_angle = 0.7
        this.attack_ms_penalty = 60      
    }

    getAttackState() {
        return new EnemyMelleAttackState()
    }

    getHitSound(){
        if (Func.chance(30)) {
            this.level.sounds.push({
                x: this.x,
                y: this.y,
                name: 'impy',
            })
        }
    }

    addHitEffects(options: any) {
        if(Func.chance(10)){
            let s = new Bleed(this.level.time)
            s.setDuration(3000)
            
            options.hit_effects.push(s)
        }

        return options
    }
}

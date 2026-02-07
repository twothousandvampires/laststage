import EnemyBuilder from '../../../Classes/EnemyBuilder'
import Func from '../../../Func'
import Level from '../../../Level'
import EnemyDashState from '../../../State/EnemyDashState'
import EnemyMelleAttackState from '../../../State/EnemyMelleAttackState'
import Poison from '../../../Status/Poison'
import Undead from './Undead'

export default class Bones extends Undead {
    constructor(level: Level) {
        super(level)
        this.name = 'bones'
        this.box_r = 2.2
        this.move_speed = 0.15
        this.attack_radius = 5.2
        this.attack_speed = 1500
        this.cooldown_attack = 2200
        this.life_status = 1
        this.spawn_time = 1600
        this.ressurect_chance = 60
        this.armour_rate = 5
        this.gold_revard = 2
        this.weapon_angle = 0.8
    }

    whenDead(): void {
        let skull = EnemyBuilder.createEnemy('skull', this.level)
        skull.setPoint(this.x, this.y)

        this.level.enemies.push(skull)
    }


    getAttackState() {
        return new EnemyMelleAttackState()
    }

    getHitSound(){
        this.level.sounds.push({
            x: this.x,
            y: this.y,
            name: 'short sword swing',
        })

    }

    addHitEffects(options: any) {
        if(Func.chance(40)){
            let s = new Poison(this.level.time)
            s.setDuration(7000)
            
            options.hit_effects.push(s)
        }
        
        return options
    }
}

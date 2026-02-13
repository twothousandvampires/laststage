import EnemyBuilder from '../../../Classes/EnemyBuilder'
import Func from '../../../Func'
import Level from '../../../Level'
import EnemyMelleDashState from '../../../State/EnemyMelleDashState'
import Poison from '../../../Status/Poison'
import Undead from './Undead'

export default class BonesSpear extends Undead {
    constructor(level: Level) {
        super(level)
        this.name = 'bones spear'
        this.box_r = 2.3
        this.move_speed = 0.12
        this.attack_radius = 6
        this.attack_speed = 2000
        this.cooldown_attack = 2200
        this.life_status = 2
        this.spawn_time = 1600
        this.ressurect_chance = 60
        this.armour_rate = 15
        this.gold_revard = 4
        this.weapon_angle = 0.7
        this.impact_time = 50
        this.dash_radius = 12
        this.dash_ms = 0.6
    }

    whenDead(): void {
        let skull = EnemyBuilder.createEnemy('skull', this.level)
        skull.setPoint(this.x, this.y)

        this.level.enemies.push(skull)
    }


    getAttackState() {
        return new EnemyMelleDashState()
    }

    getHitSound(){
        // this.level.sounds.push({
        //     x: this.x,
        //     y: this.y,
        //     name: 'short sword swing',
        // })

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
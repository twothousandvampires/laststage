import FlyingMucusAbility from '../../../EnemyAbilities/FlyingMucusAbility'
import Func from '../../../Func'
import Level from '../../../Level'
import EnemyMelleAttackState from '../../../State/EnemyMelleAttackState'
import Corrosion from '../../../Status/Corrosion'
import PuddleOfPoison from '../../Effects/PuddleOfPoison'
import Enemy from './Enemy'

export default class Slime extends Enemy {
    weapon_angle: number
    last_mucus_time: number = 0
    mucus: boolean = false

    constructor(level: Level) {
        super(level)
        this.name = 'slime'
        this.box_r = 3
        this.move_speed = 0.2
        this.attack_radius = 6.3
        this.attack_speed = 1800
        this.spawn_time = 1400
        this.say_z = 8
        this.weapon_angle = 1
        this.abilities = [new FlyingMucusAbility()]
        this.has_boby = false
        this.attack_ms_penalty = 65
    }

    createHitEffect(){
    
    }

    afterDead(): void {
        let e = new PuddleOfPoison(this.level)
        e.setPoint(this.x, this.y)

        this.level.binded_effects.push(e)
    }

    getAttackState() {
        return new EnemyMelleAttackState()
    }

    addHitEffects(options: any) {
        if(Func.chance(50)){
            let s = new Corrosion(this.level.time)
            s.setDuration(5000)
            
            options.hit_effects.push(s)
        }

        return options
    }

    getHitSound(){
        this.level.addSound('goo', this.x, this.y)
    }

    getWeaponHitedSound() {
        return {
            name: 'goo',
            x: this.x,
            y: this.y,
        }
    }
}

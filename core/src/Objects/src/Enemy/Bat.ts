import Level from '../../../Level'
import BatIdleState from '../../../State/BatIdleState'
import Enemy from './Enemy'

export default class Bat extends Enemy {
    constructor(level: Level) {
        super(level)
        this.name = 'bat'
        this.box_r = 1
        this.move_speed = 0.2
        this.attack_radius = 3
        this.attack_speed = 1200
        this.cooldown_attack = 1600
        this.spawn_time = 1000
        this.say_z = 8
        this.weapon_angle = 0.7
        this.attack_ms_penalty = 60
        this.is_spawning = false
        this.count_as_killed = false
        this.create_chance = 0
    }

    getHitSound(){
        
    }

    getIdleStateInstance() {
        return new BatIdleState()
    }

    addHitEffects(options: any) {
        return options
    }
}

import Func from '../Func'
import IUnitState from '../Interfaces/IUnitState'
import Character from '../Objects/src/Character'
import { Enemy } from '../Objects/src/Enemy/Enemy'
import Unit from '../Objects/src/Unit'

export default class EnemyMelleAttackState implements IUnitState<Enemy> {
    dodged: boolean = false
    dodge_time_until: number = 0

    enter(enemy: Enemy) {
        enemy.state = 'attack'
        enemy.is_attacking = true
        enemy.action_time = enemy.attack_speed

        enemy.hit_x = enemy.target.x
        enemy.hit_y = enemy.target.y

        enemy.setImpactTime(enemy.impact_time)
        enemy.move_speed_penalty -= enemy.attack_ms_penalty

        enemy.attack_angle = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
    }

    update(enemy: Enemy) {
        if(!enemy.hit && enemy.target && enemy.attack_angle){
            let e = enemy.getBoxElipse()
            e.r = enemy.attack_radius

            let is_coll = Func.elipseCollision(e, enemy.target.getBoxElipse())

            // if attack frames
            if (enemy.attack_frames && enemy.target.z < 5 && is_coll && Func.checkAngle(enemy, enemy.target, enemy.attack_angle, enemy.weapon_angle)) {
                enemy.hit = true
                
                let options = Unit.getHitOptions()
                enemy.addHitEffects(options)
                enemy.target.takeDamage(enemy, options)
            }
            else if(!is_coll){
                enemy.moveByAngle(enemy.attack_angle)
                if(!this.dodged){
                    this.dodge_time_until = enemy.level.time + 450
                    this.dodged = true
                }
            } 
        }

        if (enemy.action) {
            let e = enemy.getBoxElipse()
            e.r = enemy.attack_radius
            
            if(enemy.target){
                enemy.attack_angle = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
            }
            enemy.attack_frames = true
            enemy.getHitSound()
            
            let attack_coll = Func.elipseCollision(e, enemy.target.getBoxElipse())
            e.r += 1.5
            let is_dodge_coll = Func.elipseCollision(e, enemy.target.getBoxElipse())
        
            if(this.dodged && enemy.level.time <= this.dodge_time_until && enemy.target instanceof Character && enemy.target.z < 5 && !attack_coll && is_dodge_coll){
                enemy.target.dodge(enemy)
            }
        }

        else if (enemy.action_is_end) {
            enemy.getState()
        }
    }

    exit(enemy: Enemy) {
        enemy.action = false
        enemy.hit = false
        enemy.is_attacking = false
        enemy.attack_angle = undefined
        enemy.attack_frames = false
        enemy.move_speed_penalty += enemy.attack_ms_penalty
    }
}
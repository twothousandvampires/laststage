import Func from '../Func'
import IUnitState from '../Interfaces/IUnitState'
import { Enemy } from '../Objects/src/Enemy/Enemy'
import Unit from '../Objects/src/Unit'

export default class EnemyMelleAttackState implements IUnitState<Enemy> {
    enter(enemy: Enemy) {
        console.log(0)
        enemy.state = 'attack'
        enemy.is_attacking = true
        enemy.action_time = enemy.attack_speed

        enemy.hit_x = enemy.target.x
        enemy.hit_y = enemy.target.y

        enemy.setImpactTime(enemy.impact_time)
        enemy.move_speed_penalty -= 50

        enemy.attack_angle = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
    }

    update(enemy: Enemy) {
        if(!enemy.hit){
            if (!enemy.target || !enemy.attack_angle) return

            let e = enemy.getBoxElipse()
            e.r = enemy.attack_radius

            let is_coll = Func.elipseCollision(e, enemy.target.getBoxElipse())

            if (enemy.attack_frames && enemy.target.z < 5 && is_coll && Func.checkAngle(enemy, enemy.target, enemy.attack_angle, enemy.weapon_angle)) {
                enemy.hit = true
                
                let options = Unit.getHitOptions()
                enemy.addHitEffects(options)
                enemy.target.takeDamage(enemy, options)
            }
            else if(!is_coll){
                enemy.moveByAngle(enemy.attack_angle)
            } 
        }
        if (enemy.action) {
            enemy.attack_angle = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
            enemy.attack_frames = true
            enemy.getHitSound()          
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
        enemy.move_speed_penalty += 50
        enemy.removeTarget(1000)
    }
}
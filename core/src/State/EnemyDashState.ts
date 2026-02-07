import Func from '../Func'
import IUnitState from '../Interfaces/IUnitState'
import { Enemy } from '../Objects/src/Enemy/Enemy'

export default class EnemyDashState implements IUnitState<Enemy> {
    ms: number = 0
    enter(enemy: Enemy) {
        console.log('state')
        enemy.state = 'attack'
        enemy.is_attacking = true
        enemy.attack_angle = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
        enemy.move_speed_penalty += 25
    }

    update(enemy: Enemy) {
        if (enemy.action_is_end) {
            enemy.getState()
        }
        else if(!enemy.hit){
            let e = enemy.getBoxElipse()
            e.r = enemy.attack_radius

            if (enemy.target.z < 5 && Func.elipseCollision(e, enemy.target.getBoxElipse()) && Func.checkAngle(enemy, enemy.target, enemy.attack_angle, enemy.weapon_angle)) {
                enemy.target.takeDamage(this, {})
                enemy.hit = true      
                enemy.hitPlayer()
            }
            else{
                enemy.move_speed_penalty -= 5
                this.ms += 5
                enemy.moveByAngle(enemy.attack_angle)
            }
        }
    }

    exit(enemy: Enemy) {
        enemy.action = false
        enemy.hit = false
        enemy.is_attacking = false
        enemy.attack_angle = undefined
        enemy.move_speed_penalty -= 25
        enemy.move_speed_penalty += this.ms
        enemy.removeTarget(1000)
    }
}
import Func from '../Func'
import IUnitState from '../Interfaces/IUnitState'
import Enemy from '../Objects/src/Enemy/Enemy'

export default class BatIdleState implements IUnitState<Enemy> {
    check_timer: number = 2000
    last_check: number = Date.now()

    enter(enemy: Enemy) {
        enemy.state = 'idle'
    }

    update(enemy: Enemy) {
        if(enemy.level.time - this.last_check >= this.check_timer){
            this.last_check = enemy.level.time + this.check_timer
            
            if(!enemy.target || enemy.target.is_dead){
                enemy.target = enemy.level.enemies.filter(elem => elem != enemy && !elem.is_dead && Func.distance(elem, enemy, 20) <= 20)[0]
            }
        }

        if (!enemy.target) {
            return
        }

        let a_e = enemy.getBoxElipse()
       
        let is_collision = Func.elipseCollision(a_e, enemy.target.getBoxElipse())

        if (enemy.enemyCanAtack() && is_collision) {
            enemy.target.takeDamage(enemy, {})
        } else if (!is_collision) {
            let a = Func.angle(enemy.x, enemy.y, enemy.target.x, enemy.target.y)
            enemy.moveByAngle(a)
        }
    }

    exit(player: Enemy) {}
}
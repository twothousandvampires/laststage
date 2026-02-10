import Func from '../Func'
import IUnitState from '../Interfaces/IUnitState'
import Enemy from '../Objects/src/Enemy/Enemy'
import EnemyCastState from './EnemyCastState'
import EnemyMoveAct from './EnemyMoveState'

export default class EnemyMeleeIdleState implements IUnitState<Enemy> {
    enter(enemy: Enemy) {
        enemy.state = 'idle'
    }

    update(enemy: Enemy) {
        enemy.checkPlayer()

        if (!enemy.target) {
            return
        }

        let test = enemy.level.enemies.some(elem => elem.level.time - elem.action_start <= 300 && Func.distance(enemy, elem) <= 8)
       
        if(test){
            enemy.setCheckUntil(250)
            return
        }

        let a_e = enemy.getBoxElipse()
        a_e.r = enemy.attack_radius + enemy.dash_radius

        let is_collision = Func.elipseCollision(a_e, enemy.target.getBoxElipse())

        if (enemy.enemyCanAtack() && is_collision) {
            enemy.setState(enemy.getAttackState())
        } else if (enemy.enemyCanAtack() && enemy.isAbilityToUse()) {
            enemy.setState(new EnemyCastState())
        } else if (!is_collision) {
            enemy.setState(new EnemyMoveAct())
        }
    }

    exit(player: Enemy) {}
}

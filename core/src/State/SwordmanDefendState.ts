import IUnitState from '../Interfaces/IUnitState'
import Character from '../Objects/src/Character'

export default class SwordmanDefendState implements IUnitState<Character> {
    move_reduce_value = 0
   
    enter(player: Character) {
        player.state = 'defend'
        player.startDefend()
        player.defended = true
        player.setParryWindow()

        this.move_reduce_value = player.getMoveSpeedReduceWhenBlock()
        if (this.move_reduce_value < 0) {
            this.move_reduce_value = 0
        }
        player.addMoveSpeedPenalty(-this.move_reduce_value)
    }

    update(player: Character) {
        if (!player.pressed[32]) {
            player.getState()
        }
    }

    exit(player: Character) {
         player.defended = false
        player.addMoveSpeedPenalty(this.move_reduce_value)
    }
}

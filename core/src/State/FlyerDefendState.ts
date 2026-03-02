import IUnitState from '../Interfaces/IUnitState'
import Flyer from '../Objects/src/PlayerClasses/Flyer'

export default class FlyerDefendState implements IUnitState<Flyer> {
    move_reduce_value = 0

    enter(player: Flyer) {
        player.startDefend()
        player.state = 'defend'
        player.defended = true
        player.setParryWindow()
        
        player.can_regen_resource = player.allow_mana_regen_while_def
    }

    update(player: Flyer) {
        if (!player.pressed[32]) {
            player.getState()
        }
    }

    exit(player: Flyer) {
        player.defended = false
        player.can_regen_resource = true
    }
}

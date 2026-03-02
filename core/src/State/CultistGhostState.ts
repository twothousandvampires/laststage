import IUnitState from '../Interfaces/IUnitState'
import Character from '../Objects/src/Character'
import Cultist from '../Objects/src/PlayerClasses/Cultist'

export default class CultistGhostState implements IUnitState<Character> {
    move_reduce_value = 0
    start: number = 0
   
    enter(player: Character) {
        player.state = 'ghost'
        player.defended = true
        player.phasing ++
        this.start = player.level.time
    }

    update(player: Character) {
        if (player.level.time - this.start >= 600) {
            player.getState()
        }
    }

    exit(player: Cultist) {
        player.defended = false
        player.ghost_time_until = 0
        player.phasing --
    }
}
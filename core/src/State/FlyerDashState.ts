import Character from "../Objects/src/Character"

export default class FlyerDashState implements IUnitState<Swordman> {
    start = 0
    total_jump_time: number  = 800
    distance: number | undefined
    move_per_tick: number | undefined

    impact: boolean = false
    dash_time: number = 350

    enter(player: Character) {
        player.prepareToAction()
        player.setActionWindow()
     
        player.state = 'idle'
        player.can_be_controlled_by_player = false
        this.start = player.level.time
    }

    exit(player: Character) {
        this.start = 0
        player.can_be_controlled_by_player = true
    }

    update(player: Character) {
        if (player.level.time - this.start >= this.dash_time) {
            player.getState()
            return
        } else {
            let next_step_x = Math.sin(player.attack_angle) * 1
            let next_step_y = Math.cos(player.attack_angle) * 1
   
            if (!player.isOutOfMap(player.x + next_step_x, player.y + next_step_y)) {
                player.level.createEffect(player, 'ftrail')
                player.addToPoint(next_step_x, next_step_y)
            }       
        }
    }
}
import Character from "../Objects/src/Character"

export default class SwordmanJumpState implements IUnitState<Swordman> {
    start = 0
    total_jump_time: number  = 800
    distance: number | undefined
    move_per_tick: number | undefined
    z_add = 0.8
    impact: boolean = false

    enter(player: Character) {
        player.prepareToAction()
        player.setActionWindow()
        this.distance = Math.sqrt((player.x - player.c_x) ** 2 + (player.y - player.c_y) ** 2)
        
        if (this.distance > 15) this.distance = 15
        if (this.distance < 10) this.distance = 10

        this.move_per_tick = this.distance / Math.floor(this.total_jump_time / 30)

        player.state = 'jump'
        player.can_be_controlled_by_player = false
        player.chance_to_avoid_damage_state += 100

        this.start = player.level.time
    }

    exit(player: Character) {
        player.z = 0
        player.chance_to_avoid_damage_state -= 100

        this.start = 0
        player.can_be_controlled_by_player = true
        this.z_add = 0.7
    }

    update(player: Character) {
        if (this.impact || !player.attack_angle) {
            player.getState()
            return
        } else {
            let delta = player.level.time - this.start
            if (delta >= this.total_jump_time) {
                this.impact = true
                return
            }
            if (delta >= this.total_jump_time / 2) {
                player.z -= this.z_add
                this.z_add += 0.02
            } else {
                player.z += this.z_add
                this.z_add -= 0.02
            }

            if (this.z_add < 0) this.z_add = 0

            let next_step_x = Math.sin(player.attack_angle) * this.move_per_tick
            let next_step_y = Math.cos(player.attack_angle) * this.move_per_tick

            if (!player.isOutOfMap(player.x + next_step_x, player.y + next_step_y)) {
                player.addToPoint(next_step_x, next_step_y)
            }
        }
    }
}
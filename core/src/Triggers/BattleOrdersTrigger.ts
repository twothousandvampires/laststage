import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import BattleOrdersStatus from '../Status/BattleOrdersStatus'

export default class BattleOrdersTrigger implements ITrigger {
    chance: number = 50
    name: string = 'battle orders'
    description: string = 'Gives you and your allies armour and pierce rating based on enemies near you'
    cd: number = 2000
    last_trigger_time: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let box = player.getBoxElipse()
        box.r = player.voice_radius
        let enemies = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem, 16) <= 16).length
        if(enemies){
            player.level.players.forEach(elem => {
                let s = new BattleOrdersStatus(player.level.time)
                s.setPower(enemies * 3)
                s.setDuration(7000)

                player.level.setStatus(elem, s)
            })
        }       
    }
}

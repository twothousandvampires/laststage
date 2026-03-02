import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class CallOfTheShield implements ITrigger {
    chance: number = 100
    name: string = 'call of the shield'
    description: string = 'Trigger all you on block triggers'
    cd: number = 20000
    last_trigger_time: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        let enemy = player.level.getRandomAliveEnemy(player, 12)

        player.succesefulBlock(enemy)
    }
}
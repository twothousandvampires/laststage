import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class SwordmanEnlightment implements ITrigger {

    cd: number = 30000
    last_trigger_time: number = 0
    chance: number = 7
    name: string = 'enlightenment'
    description: string = 'restores 2 life'

    getTriggerChance(): number {
        return 100
    }

    trigger(player: Character) {
        player.addLife(2)
        player.sayPhrase(true)
    }
}
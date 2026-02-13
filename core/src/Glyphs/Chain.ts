import Ability from '../Abilities/Ability'
import ChainManager from '../Objects/Managers/ChainManager'
import Character from '../Objects/src/Character'
import Mastery from './Mastery'

export default class Chain extends Mastery {
    constructor() {
        super()
        this.name = 'chain'
        this.description = ''
    }

    trigger(player: Character, ability: Ability) {
        let m = new ChainManager(player.level, player)
        player.level.binded_effects.push(m)
    }
}
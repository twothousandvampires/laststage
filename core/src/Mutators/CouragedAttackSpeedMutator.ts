import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CouragedAttackSpeedMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        if(player.isCouraged()){
            return base - 250
        }
        else{
             return base
        } 
    }
}
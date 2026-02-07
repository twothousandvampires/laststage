import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CouragedMoveSpeedMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        if(player.isCouraged()){
            return base + 20
        }
        else{
             return base
        }      
    }
}
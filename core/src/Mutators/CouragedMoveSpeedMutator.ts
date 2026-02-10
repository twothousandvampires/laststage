import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CouragedMoveSpeedMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        let s = player.getSecondResource()

        if(player.isCouraged()){
            return base + (s * 2)
        }
        else{
            return base + s
        }      
    }
}
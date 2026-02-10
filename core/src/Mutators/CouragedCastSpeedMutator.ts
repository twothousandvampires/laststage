import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CouragedCastSpeedMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        let s = player.getSecondResource() * 10

        if(player.isCouraged()){
            return base - (s * 2)
        }
        else{
             return base - s
        } 
    }
}
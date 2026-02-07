import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CourageAvoidDamage extends Mutator {
    mutate(base: number,  player: Character): number {
        if(player.isCouraged()){
            return base + player.getSecondResource()
        }
        else{
            return base + Math.round(player.getSecondResource() / 2)
        }
    }
}
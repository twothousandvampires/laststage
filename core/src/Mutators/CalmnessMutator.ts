import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class CalmnessMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        return player.ward > 0 ? base + 10 : base
    }
}
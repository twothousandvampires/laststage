import Character from "../Objects/src/Character";
import Mutator from "./Mutator";

export default class FirmGripMutator extends Mutator {
    mutate(base: number,  player: Character): number {
        return base + player.power
    }
}
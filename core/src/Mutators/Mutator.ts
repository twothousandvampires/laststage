import Character from "../Objects/src/Character";

export default abstract class Mutator{
   abstract mutate(base: number, player: Character): number
}
import Character from "../Objects/src/Character"

export interface IDatabase {
    saveData(player: Character, game_type: string): void
    addRecord(): void
}
import type { IDatabase } from 'core'

export default class DatabaseAdapter implements IDatabase{
    constructor(private connection: any){
        
    }

    saveData(player: any, game_type: string){
        this.connection
        .promise()
        .execute(
            'INSERT INTO game_stats (name, kills, waves, time, class, socket, game_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            ['unknown', player.kills, player.waves, player.level.time - player.level.started, player.name, player.id, game_type]
        )
    }

    addRecord(){
        
    }
}
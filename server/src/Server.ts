import { Server as SocketServer } from 'socket.io'
const mysql = require('mysql2')

let pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser',
    password: 'secure_password123',
    database: 'last_stage',
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

export default class MasterServer {
    private io: SocketServer
    private lobbies: Map<number, any> = new Map()
    private db

    constructor(io: SocketServer, public port: number) {
        this.io = io
        this.db = pool
    }

    async initialize(): Promise<void> {
        this.startGameServers()
        
        this.io.on('connection', async (socket: Socket) => {
    
            socket.on('get_lobbies', async () => {
                socket.emit('lobbies_list', Array.from(this.lobbies.values()))
            })

            socket.on('get_records', async () => {
                try {
                    const [results] = await this.db
                        .promise()
                        .query(
                            `SELECT * FROM (SELECT * FROM game_stats WHERE class = 'swordman' and game_type = 'solo' ORDER BY kills DESC LIMIT 3) AS swordman_top UNION ALL SELECT * FROM (SELECT * FROM game_stats WHERE class = 'flyer' and game_type = 'solo' ORDER BY kills DESC LIMIT 3) AS flyer_top UNION ALL SELECT * FROM (SELECT * FROM game_stats WHERE class = 'cultist' and game_type = 'solo' ORDER BY kills DESC LIMIT 3) AS cultist_top;`
                        )

                    socket.emit('records', JSON.stringify(results))
                } catch (err) {
                    socket.emit('records', [])
                }
            })
        })
    }

    private startGameServers(): void {
        let count = require('os').cpus().length * 2

        if (count > 10) {
            count = 10
        }

        for (let i = 0; i < count; i++) {
            let port = this.port + 1 + i

            let { spawn } = require('child_process')
            let path = require('path')

            const gameProcess = spawn(
                'node',
                [path.join(__dirname, 'GameServer.js'), port.toString()],
                {
                    stdio: ['inherit', 'inherit', 'inherit', 'ipc'], // ВКЛЮЧАЕМ IPC
                }
            )

            gameProcess.on('message', message => {
                this.lobbies.set(port, message.data)
                this.io.emit('lobbies_list', Array.from(this.lobbies.values()))
            })

            gameProcess.on('exit', code => {
                this.lobbies.delete(port)
            })
        }
    }
}

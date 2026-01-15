import { Room }  from 'core'
import { SocketTransport } from './adapters/SocketTransport';
import DatabaseAdapter from './adapters/DatabaseAdapter';
import { Server, Server as SocketServer } from 'socket.io'
import { createServer } from 'http'
import { NodeLooper } from './adapters/NodeLooper';
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

let port = process.argv[2]
let httpServer = createServer()

let socket = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: false
    },
    transports: ['websocket'],
    pingTimeout: 5000,
    pingInterval: 5000,
    connectTimeout: 15000
});

httpServer.listen(+port, '127.0.0.1')

class GameServer {
    room: Room
    
    constructor(private port: number, private io: any) {

        const transport = new SocketTransport(io);
        const db = new DatabaseAdapter(pool)

        this.room = new Room(transport, db, new NodeLooper());

        this.io.on('connection', (socket) => {
              
            this.room.handleAction(socket.id, 'connect', undefined)

            this.updateData()

            socket.onAny((event, data) => {
                this.room.handleAction(socket.id, event, data);
            });

            socket.on('disconnect', (reason) => {
                this.room.handleAction(socket.id, 'disconnect', reason);
                 this.updateData()
            });
        });

        setInterval(() => {
            this.updateData()
        }, 10000)
    }

    updateData(){

        let lobbyInfo = {
            port: this.port.toString(),
            players: this.room.clients.size.toString(),
            maxPlayers: Room.MAX_PLAYERS.toString(),
            name: this.room.name.toString(),
            started: this.room.game_started.toString(),
        }

        if (process.send) {
            process.send({
                type: 'register_lobby',
                data: lobbyInfo,
            })
        }
    }
}

let game = new GameServer(+port, socket)
game.updateData()
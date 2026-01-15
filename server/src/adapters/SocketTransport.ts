import { ITransport }  from 'core'

export  class SocketTransport implements ITransport{
    constructor(private io: any){

    }

    send(playerId: string | number, event: string, data?: any){
        this.io.to(playerId).emit(event, data)
    }

    broadcast(event: string, data?: any){
        this.io.emit(event, data)
    }
}
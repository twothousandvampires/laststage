// client/adapters/LocalTransport.ts
import type { ITransport } from 'core'

export class LocalTransport implements ITransport {
    // Сюда мы передадим колбэк, который имитирует socket.on
    public onMessage: (event: string, data: any) => void = () => {};

    send(playerId: string, event: string, data?: any) {
        this.onMessage(event, data);
    }

    broadcast(event: string, data?: any) {
        this.onMessage(event, data);
    }
}
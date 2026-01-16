import { Room } from 'core'
import { LocalTransport } from '../adapters/LocalTransport'
import { WebLooper } from '../adapters/WebLooper'
import LocalStorageDB from '~/adapters/LocalStorageDB';

export class LocalSocketMock {
    private handlers: Map<string, Function[]> = new Map();
    private room: Room;
    private transport: LocalTransport;
    public id = 'local_player'

    constructor() {
        this.transport = new LocalTransport();
    
        this.transport.onMessage = (event: string, data: any) => {
            const callbacks = this.handlers.get(event);
            if (callbacks) {
                callbacks.forEach(cb => cb(data));
            }
        };

        this.room = new Room(this.transport, new LocalStorageDB(undefined), new WebLooper());
        
        setTimeout(() => {
            this.room.handleAction('local_player', 'connect', undefined);
        }, 50);
    }

    on(event: string, callback: Function) {
        if (!this.handlers.has(event)){
            this.handlers.set(event, [])
        }
        this.handlers.get(event).push(callback)
    }

    emit(event: string, data: any) {
        this.room.handleAction('local_player', event, data)
    }

    disconnect(){
        this.transport.onMessage = () => {}
    }
}

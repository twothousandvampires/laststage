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
        // 1. Создаем транспорт
        this.transport = new LocalTransport();
        
        // 2. СВЯЗЫВАЕМ ТРАНСПОРТ С МОКОМ
        // Когда транспорт получает данные от Room, он просто дергает обработчики мока
        this.transport.onMessage = (event: string, data: any) => {
            const callbacks = this.handlers.get(event);
            if (callbacks) {
                callbacks.forEach(cb => cb(data));
            }
        };

        // 3. Инициализируем Room
        // Мы прокидываем транспорт, который УЖЕ умеет говорить с нашими обработчиками
        this.room = new Room(this.transport, new LocalStorageDB(undefined), new WebLooper());

        // 4. Эмулируем коннект
        setTimeout(() => {
            // Мы просто шлем в комнату событие 'connect'
            // Room внутри себя выполнит: this.transport.send(id, 'connect_to_lobby')
            // И благодаря связи в пункте 2, это событие само прилетит во Vue!
            this.room.handleAction('local_player', 'connect', undefined);
        }, 50);
    }

    // Имитация socket.on
    on(event: string, callback: Function) {
        if (!this.handlers.has(event)){
            this.handlers.set(event, [])
        }
        this.handlers.get(event).push(callback)
    }

    // Имитация socket.emit
    emit(event: string, data: any) {
        this.room.handleAction('local_player', event, data)
    }
}

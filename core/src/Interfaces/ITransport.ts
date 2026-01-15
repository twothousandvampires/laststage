export interface ITransport {
    send(playerId: string | number, event: string, data?: any): void;
    broadcast(event: string, data?: any): void;
}
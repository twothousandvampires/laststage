export interface ILooper {
    start(tickCallback: () => void): void;
    stop(): void;
}
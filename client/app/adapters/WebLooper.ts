import type { ILooper } from 'core';

export class WebLooper implements ILooper {
    start(tickCallback: () => void): void {
        const loop = () => {
            tickCallback();
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    stop(): void {
       
    }
}
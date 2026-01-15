import { ILooper } from "core";

export class NodeLooper implements ILooper {
    private timer: NodeJS.Immediate | null = null;

    start(tickCallback: () => void) {
        this.stop();

        const tick = () => {
            tickCallback();
            this.timer = setImmediate(tick);
        };

        this.timer = setImmediate(tick);
    }

    stop() {
        if (this.timer) {
            clearImmediate(this.timer);
            this.timer = null;
        }
    }
}
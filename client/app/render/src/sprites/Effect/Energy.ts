import Sprite from "../Sprite";

export default class Energy extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 5;
        this.max_frame_tick = 4;
        this.sprite_h = 30;
        this.sprite_w = 30;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 30
        this.z = 12
    }
}
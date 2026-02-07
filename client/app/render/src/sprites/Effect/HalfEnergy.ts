import Sprite from "../Sprite";

export default class HalfEnergy extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 6;
        this.max_frame_tick = 4;
        this.sprite_h = 30;
        this.sprite_w = 30;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 0
        this.z = 12
    }
}
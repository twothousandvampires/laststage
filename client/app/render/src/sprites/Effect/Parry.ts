import Sprite from "../Sprite";

export default class Parry extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 9;
        this.max_frame_tick = 1;
        this.sprite_h = 40;
        this.sprite_w = 40;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 220
        this.removable = true
    }
}
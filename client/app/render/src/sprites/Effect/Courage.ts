import Sprite from "../Sprite";

export default class Courage extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 25;
        this.max_frame_tick = 2;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 60
        this.is_bottom = true
        this.by_centr = true
    }
}
import Sprite from "../Sprite";

export default class NarureEnvirenmentWithLight extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 3;
        this.max_frame_tick = 25;
        this.sprite_h = 300;
        this.sprite_w = 300;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 50
        this.is_bottom = true
        this.by_centr = true
    }
}
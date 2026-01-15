import Sprite from "../Sprite";

export default class EarthSpikesBig extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 9;
        this.max_frame_tick = 3;
        this.sprite_h = 150;
        this.sprite_w = 150;
        this.sprite_name = 'pack10'
        this.y_frame_offset = 100
        this.removable = true

        this.is_bottom = true
        this.by_centr = true
    }
}
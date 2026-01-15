import Sprite from "../Sprite";

export default class BloodBonesExplode extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 5;
        this.max_frame_tick = 2;
        this.sprite_h = 100;
        this.sprite_w = 100;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 1200
        this.removable = true
    }
}
import Sprite from "../Sprite";

export default class FlyerTrail extends Sprite {

    constructor(id: string){
        super(id);

        this.max_frame = 10
        this.max_frame_tick = 1
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 905
        this.removable = true
    }
}
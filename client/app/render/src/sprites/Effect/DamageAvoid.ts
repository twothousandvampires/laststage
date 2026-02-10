import Sprite from "../Sprite";

export default class DamageAvoid extends Sprite {

    constructor(id: string){
        super(id);

        this.max_frame = 5
        this.max_frame_tick = 2
        this.sprite_h = 90;
        this.sprite_w = 45;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 815
        this.removable = true
        this.z_forced = true
        this.z = 10
    }
}
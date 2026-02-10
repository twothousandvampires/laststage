import Sprite from "../Sprite";

export default class DeathAura extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 12
        this.max_frame_tick = 2
        this.sprite_h = 100;
        this.sprite_w = 100;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 565
        this.removable = true
        this.is_bottom = true
        this.by_centr = true
    }
}
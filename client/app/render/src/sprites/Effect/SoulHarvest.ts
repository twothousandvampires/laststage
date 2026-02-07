import Sprite from "../Sprite";

export default class SoulHarvest extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 12
        this.max_frame_tick = 3
        this.sprite_h = 60;
        this.sprite_w = 60;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 445
    }
}
import Sprite from "../Sprite";

export default class Regen extends Sprite{
    name: string
    state: number = 1
    ended: boolean = false
    constructor(id: string){
        super(id);

        this.max_frame = 14;
        this.max_frame_tick = Math.round( (3000 / this.max_frame) / 30);
        this.sprite_h = 50;
        this.sprite_w = 50;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 260
    }
}
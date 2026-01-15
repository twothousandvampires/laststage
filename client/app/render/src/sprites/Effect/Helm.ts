import Sprite from "../Sprite";

export default class Helm extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 3
        this.sprite_h = 45
        this.sprite_w = 45
        this.sprite_name = 'pack1'
        this.y_frame_offset = 1020
    }
}
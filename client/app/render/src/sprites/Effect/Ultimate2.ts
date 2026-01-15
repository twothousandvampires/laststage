import Sprite from "../Sprite";

export default class Ultimate2 extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = 5
        this.sprite_w = 100
        this.sprite_h = 100
        this.sprite_name = 'pack7'
        this.y_frame_offset = 100
    }
}
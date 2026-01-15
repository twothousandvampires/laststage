import Sprite from "../Sprite";

export default class SingleTornado extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 4
        this.max_frame_tick = 3
        this.sprite_w = 100
        this.sprite_h = 100
        this.sprite_name = 'pack8'
        this.y_frame_offset = 850
        this.removable = true
    }
}
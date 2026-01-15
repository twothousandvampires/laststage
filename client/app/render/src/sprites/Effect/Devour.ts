import Sprite from "../Sprite";

export default class Devour extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 7
        this.max_frame_tick = 1
        this.sprite_h = 60
        this.sprite_w = 60
        this.sprite_name = 'pack1'
        this.y_frame_offset = 1065
        this.removable = true
    }
}
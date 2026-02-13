import Sprite from "../Sprite";

export default class FloorBlood extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 200
        this.sprite_h = 25
        this.sprite_w = 25
        this.sprite_name = 'pack12'
        this.y_frame_offset = 50

        this.removable = true
        this.is_bottom = true
        this.set()
    }

    set(){
        let random = Math.floor(Math.random() * 3)
        if(random === 1){
             this.y_frame_offset = 75
        }
        else if(random === 2){
            this.y_frame_offset = 100
        }
    }
}
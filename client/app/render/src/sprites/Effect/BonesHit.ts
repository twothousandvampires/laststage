import Sprite from "../Sprite";

export default class BonesHit extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 3
        this.max_frame_tick = Math.floor(Math.random() * 3) + 1
        this.sprite_h = 25
        this.sprite_w = 25
        this.sprite_name = 'pack12'
        this.by_centr = true
        this.removable = true
        this.set()
    }

    set(){
        let random = Math.floor(Math.random() * 3)
        if(random === 1){
            this.y_frame_offset = 150
        }
        else if(random === 2){
            this.y_frame_offset = 125
        }
        else{
            this.y_frame_offset = 175
        }
    }
}
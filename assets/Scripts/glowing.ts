import { _decorator, Component,Animation, Node, SpriteFrame, Sprite, UITransform, Vec3, Prefab, instantiate, spriteAssembler, animation, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('glowing')
export class glowing extends Component {
    @property({type : Node})
    getMask : Node = null!
    audio:any=null;

    start(){}

    blink = (img : any) =>{
       
        this.getMask.getComponent(Sprite).spriteFrame = img
        this.node.getChildByName('Item_cat').getComponent(Sprite).spriteFrame = img;
    }   
    update(){}
}


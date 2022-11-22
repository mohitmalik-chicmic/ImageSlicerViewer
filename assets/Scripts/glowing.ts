import { _decorator, Component,Animation, Node, SpriteFrame, Sprite, UITransform, Vec3, Prefab, instantiate, spriteAssembler, animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('glowing')
export class glowing extends Component {
    // @property({type : Node})
    // sibling : Node = null!

    // @property({type : SpriteFrame})
    // Imageschange: SpriteFrame = null;

   

    // buttonClick = (imageSprite : SpriteFrame) =>{
    //     this.node.getComponent(Sprite).spriteFrame = imageSprite
    // }
    blink= (img : any) =>{
        console.log("hiiiiiiii")
      //  this.node.getComponent(Sprite).spriteFrame = img
    }
    start(){

    }
   
     update(){

     }

    }


import { _decorator, Component,Animation, Node, SpriteFrame, Sprite, UITransform, Vec3, Prefab, instantiate, spriteAssembler, animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('glowing')
export class glowing extends Component {
    @property({type : Node})
    sibling : Node = null!

    @property({type : SpriteFrame})
    Imageschnge: SpriteFrame = null;

   

    ButtonClick (){
        this.node.getComponent(Sprite).spriteFrame = this.Imageschnge;
        this.sibling.getComponent(Sprite).spriteFrame =  this.Imageschnge;
    }

    start(){
        
        this.node.getComponent(Sprite).spriteFrame = this.sibling.getComponent(Sprite).spriteFrame

    }
   
     update(){

     }

    }

//     @property({type:Node})
//     bheem:Node;
//     // @property({type:Node})
//     // background:Node;
//     // width:number=0;
//     // height:number=0;
//     @property({type : SpriteFrame})
//     mask : SpriteFrame= null;

//     start(): void {
//         const x=this.bheem.getComponent(Sprite).spriteFrame;
//         // const y=this.background.getComponent(Sprite).spriteFrame;
//         //Something in code changed
        
//         this.mask=this.getComponent(Sprite).spriteFrame;
//         this.mask = x;

//     }
//     images(event,data): void {
//         // this.node.getComponent(Sprite).scale=this.character
//          this.node.getComponent(Sprite).spriteFrame = this.mask[Math.floor(Math.random() * 5)];
//      }
 

//     update(deltaTime: number): void {

      
//     }
// }


import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, math, Sprite, macro, Prefab, instantiate, Label, Enum, CCInteger } from 'cc';

import { photoSlice2 } from './photoSlice2';

const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {

    @property({type:ImageAsset})
    imageAssert:ImageAsset=null;
    
    @property({type : Prefab})
    photo : Prefab = null;
    
    @property({type: CCInteger})
    spilt : any = 0;

   

    start() {
        // let image=new SpriteFrame();
        // let texture=new Texture2D();
        // texture.image=this.imageAssert;
        // image.texture=texture;
        // let rect=math.rect(0,0,image.width,200);
        // image.setRect(rect);
        // this.node.getComponent(Sprite).spriteFrame=image;
        var a= this.node.getComponent(GamePlay).spilt
        console.log(typeof(this.node.getComponent(GamePlay).spilt));
        
        let image=new SpriteFrame();
        let texture=new Texture2D();
        texture.image=this.imageAssert;
        image.texture=texture;
        // var h=518/a;
        var b=0;
        while(b<a){
            let smallSlice=instantiate(this.photo);
            let smallSliceClass=smallSlice.getComponent(photoSlice2);
            // let rect=math.rect(0+image.height/this.num,0+image.height/this.num,image.width,image.height/this.num);
            smallSliceClass.setSlice(a,b);
            this.node.addChild(smallSlice);
            // Node.EventType.TOUCH_MOVE();
            // smallSlice.on(Node.EventType.TOUCH_MOVE, this.onTouchStartCallback, this, true);
            let pos = smallSlice.getPosition();
            pos.y+=259-b*(10+(image.height/a));
            console.log(pos.x,pos.y);
            smallSlice.setPosition(pos);
            b++;
        } 
        

    }
    // onTouchStartCallback (event){
    //     console.log(event);

    // }

    update(deltaTime: number) {
        
    }
}


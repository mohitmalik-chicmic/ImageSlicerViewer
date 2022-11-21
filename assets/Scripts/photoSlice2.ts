import { _decorator, Component, Node, SpriteFrame, Texture2D, math, Sprite, ImageAsset, Label, EventTouch, UITransform, Vec3, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('photoSlice2')
export class photoSlice2 extends Component {
    @property({type:ImageAsset})
    imageAssert:ImageAsset=null;
    yAxis : number =0
    start() {
        
    }
    /**
     * asdasdasdad
     * @param splitCount ad
     * @param Index 
     * @param imageAsset 
     */
    setSlice(splitCount : number ,Index :number,imageAsset : ImageAsset){

        console.log("Set slice called");
        console.log(Image)
        let sprite = SpriteFrame.createWithImage(imageAsset);
        let rect=math.rect(0,Index*(sprite.height/splitCount),sprite.width,sprite.height/splitCount);
        console.log(rect);
        sprite.setRect(rect);
        this.node.getComponent(Sprite).spriteFrame = sprite;
       
        //this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        

    }

    // onTouchStartCallback (event){

    //     console.log( this.node.name,event);

    // }

    onTouchMove(event: EventTouch) {
        // var x1=0;
        // this.node.on(Node.EventType.MOUSE_DOWN,(event:EventMouse)=>{
        //     console.log(event);
        //     x1=event.getUILocationX();
        // )};
        console.log("Id " + event.getID())
        console.log(event.getUILocation);
        console.log(event.getLocation());  // location on screen space
        console.log(event.getUILocation());  // location on UI space
        // var    e= e|| window.event; 
        // onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)}
        var pos=this.node.getPosition();

        event.target.position =  this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
    }

    
    update(deltaTime: number) {
        
    }
}


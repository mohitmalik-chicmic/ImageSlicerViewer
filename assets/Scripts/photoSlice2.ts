import { _decorator, Component, Node, SpriteFrame, Texture2D, math, Sprite, ImageAsset, Label, EventTouch, UITransform, Vec3, EventMouse, Prefab, instantiate, JsonAsset, Intersection2D, tween } from 'cc';
import { glowing } from './glowing';
const { ccclass, property } = _decorator;
import { SingletonClass } from './SingleTon';
@ccclass('photoSlice2')
export class photoSlice2 extends Component {

    MouseposX:Number=0;
    MouseposY:Number=0;
    imageSprite :SpriteFrame = null;
    rect:Vec3=null;
    flag : boolean=true;
    puzzleResult : Boolean = false;
    GnumOfSlice:number=0;
    imageCallback : any = null;
    selectImgPos : Vec3 = null;
    pos:Vec3=null;
    NegativePoint:number=0;
    start() {
        
        
    }
    /**
     * asdasdasdad
     * @param splitCount ad
     * @param Index 
     * @param imageAsset 
     */
    setSlice(splitCount : number ,Index :number,imageAsset : ImageAsset, callback){
       
        this.GnumOfSlice=splitCount
        this.imageCallback = callback
        let sprite = SpriteFrame.createWithImage(imageAsset); 
       
        if(this.flag = true){
            this.imageSprite = sprite
            this.flag = false
        }
        this.NegativePoint=(imageAsset.height/2)-(imageAsset.height/this.GnumOfSlice)-(this.GnumOfSlice-1)*(2+(imageAsset.height/this.GnumOfSlice))
        console.log(this.imageSprite.height,this.imageSprite.height/this.GnumOfSlice);
         console.log( ((this.imageSprite.height)/2-(this.imageSprite.height/this.GnumOfSlice )));
         console.log((this.imageSprite.height)/2-((this.imageSprite.height/this.GnumOfSlice )));
         console.log(this.NegativePoint);
        let rect=math.rect(0,Index*(sprite.height/splitCount),sprite.width,sprite.height/splitCount);
        this.node.on(Node.EventType.TOUCH_START,this.touchStart,this,true);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        this.node.on(Node.EventType.TOUCH_END,this.checkOrder2,this,true);
        sprite.setRect(rect);
        this.node.getComponent(Sprite).spriteFrame = sprite;
       this.node.name = `${Index}`
       let json : JsonAsset
    }


    touchStart(event:EventTouch){
        
        this.rect = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0)); 
        this.pos=this.node.getPosition();
        console.log(this.pos);
        this.rect.x=this.rect.x-this.pos.x;
        this.rect.y=this.rect.y-this.pos.y;  
       
        this.selectImgPos = this.node.getPosition();
    }

    onTouchMove(event: EventTouch) {

         if(this.rect.x<0&&this.rect.y<0){
            event.target.position =  this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x-this.rect.x,event.getUILocation().y-this.rect.y,0)); 
        }else if(this.rect.x>=0&&this.rect.y<0){
            event.target.position =  this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x-this.rect.x,event.getUILocation().y-this.rect.y,0));
        }else if(this.rect.x<0&&this.rect.y>0){
            event.target.position =  this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x-this.rect.x,event.getUILocation().y+this.rect.y,0));
        }else{
            event.target.position =  this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x-this.rect.x,event.getUILocation().y-this.rect.y,0));
        }
        var pos=this.node.getPosition();
        pos.z=0;
        
        this.node.setPosition(pos);
        pos.x=0;
        this.node.setPosition(pos);
    }

    checkOrder2(event:EventTouch){
        var Nodepos=this.node.getPosition();
       
            this.node.setPosition(Nodepos);
            var nodeName=parseInt(this.node.name);
            if(Nodepos.y  >= ((this.imageSprite.height)/2-((this.imageSprite.height/this.GnumOfSlice )))){
                this.node.setPosition(this.selectImgPos);
            }else if (Nodepos.y < this.NegativePoint-(2*this.GnumOfSlice)){
                this.node.setPosition(this.selectImgPos);
            }
            for(var i=0;i<this.GnumOfSlice;i++){
                let AnotherNode=this.node.parent.getChildByName(`${i}`);
                if(nodeName!=i){ 

            
                    // let collide=Intersection2D.rectRect(this.node.getComponent(UITransform).getBoundingBoxToWorld(),AnotherNode.getComponent(UITransform).getBoundingBoxToWorld());
                    var lowerDistance=Vec3.distance(AnotherNode.getPosition(),Nodepos);
                    // if(collide ){
                        if(lowerDistance<(this.imageSprite.height/this.GnumOfSlice)){
                        let newPos = AnotherNode.getPosition();
                        let pos=newPos;
                        this.node.setPosition(pos);
                        newPos.y = this.selectImgPos.y
                        newPos.z=0;
                       
                        if(this.selectImgPos.y<newPos.y){
                            tween(AnotherNode)
                        .to(0.2,{position : new Vec3(newPos.x,-newPos.y,newPos.z), })
                        .call(() => {
                            this.checkPuzzle();
                        })
                        .start();
                        }else{
                            tween(AnotherNode)
                            .to(0.2,{position : new Vec3(newPos.x,newPos.y,newPos.z), })
                            .call(() => {
                                this.checkPuzzle();
                            })
                            .start();
                        }
                       

                        break;
                    }
                }
            }
        

    }

    checkPuzzle(){
        var FirstNode=this.node.parent.getChildByName('0');
        var FirstNodePos=FirstNode.getPosition();
        var check=1;
        for(var i=1;i<this.GnumOfSlice;i++){
            var remaingNode=this.node.parent.getChildByName(`${i}`);
            var distance=Vec3.distance(remaingNode.getPosition(),FirstNodePos);
            if( distance+30 >= i*(this.imageSprite.height/this.GnumOfSlice) && distance-30 <= i *(this.imageSprite.height/this.GnumOfSlice)){
            }else{
                check=0;
            }
        }
        if(check){
            console.log("Puzzle solved");
            let mid = Math.ceil(this.GnumOfSlice/2);
            console.log(mid)
            let c = this.node.parent.getChildByName(`${mid}`)
            this.puzzleResult = true;
            this.imageCallback(this.puzzleResult, c.getPosition())
   
        }
    }
    update(deltaTime: number) {
    }
}


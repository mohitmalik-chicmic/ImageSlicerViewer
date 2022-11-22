import { _decorator, Component, Node, SpriteFrame, Texture2D, math, Sprite, ImageAsset, Label, EventTouch, UITransform, Vec3, EventMouse, Prefab, instantiate } from 'cc';
import { glowing } from './glowing';
const { ccclass, property } = _decorator;

@ccclass('photoSlice2')
export class photoSlice2 extends Component {

   
    MouseposX:Number=0;
    MouseposY:Number=0;
    imageSprite :SpriteFrame = null;
    rect:Vec3=null;
    flag : boolean=true;

    puzzleResult : Boolean = false;

    GnumOfSlice:number=0;

    get PuzzleResult(){
        return this.puzzleResult;
    }
    imageCallback : any = null;


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
        let rect=math.rect(0,Index*(sprite.height/splitCount),sprite.width,sprite.height/splitCount);
        this.node.on(Node.EventType.TOUCH_START,this.touchStart,this,true);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        this.node.on(Node.EventType.TOUCH_END,this.checkOrder2,this,true);
        sprite.setRect(rect);
        this.node.getComponent(Sprite).spriteFrame = sprite;
       this.node.name = `${Index}`
    
    }

    touchStart(event:EventTouch){
       
        this.rect = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0)); 
        var pos=this.node.getPosition();
        this.rect.x=this.rect.x-pos.x;
        this.rect.y=this.rect.y-pos.y;
       
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
    }

    checkOrder2(event:EventTouch){
        
        var Index=(this.node.name);
        if(Index == '0' || Index == `${this.GnumOfSlice-1}`){
            if(Index == '0'){
                var LowerSibling = this.node.parent.getChildByName('1')
                var Spos=LowerSibling.getPosition();
                var Nodepos=this.node.getPosition();
                var lowerDistance=Vec3.distance(Nodepos,Spos);
                if(lowerDistance<(this.imageSprite.height/this.GnumOfSlice)+10){
                //console.log(lowerDistance);
                    Nodepos.y-=lowerDistance-(this.imageSprite.height/ this.GnumOfSlice);
                    Nodepos.x=0;
                    Spos.x=0;
                    LowerSibling.setPosition(Spos);
                    this.node.setPosition(Nodepos);
                }
            }else{

                var UpperSibling = this.node.parent.getChildByName(`${this.GnumOfSlice-2}`);
                var UpperSiblingpos=UpperSibling.getPosition();
                var nodePos=this.node.getPosition();
               
                var UpperDistance=Vec3.distance(nodePos,UpperSiblingpos);
                if(UpperDistance<(this.imageSprite.height/this.GnumOfSlice)+10){
                    var Spos=UpperSibling.getPosition();
                    Spos.x=0;
                    var Nodepos=this.node.getPosition();
                    Nodepos.x=0;
                    //console.log(UpperDistance-(this.imageSprite.height/ this.GnumOfSlice));
                    Nodepos.y+=UpperDistance-(this.imageSprite.height/ this.GnumOfSlice);
                    this.node.setPosition(Nodepos);
                    UpperSibling.setPosition(Spos);
                }
            }

        }else{

        var Uindex=(parseInt(Index))-1;
        var UpperPhotoIndex=Uindex.toString();
        var UpperSibling = this.node.parent.getChildByName(`${UpperPhotoIndex}`);
  
        var Lowerindex=(parseInt(Index)+1);
        var lowerPhotoIndex=Lowerindex.toString();
        var LowerSibling = this.node.parent.getChildByName(`${lowerPhotoIndex}`)
            var UpperPhotoPos=UpperSibling.getPosition();
            var lowerPhotoPos=LowerSibling.getPosition();
            var nodePos=this.node.getPosition();
            var UpperDistance=Vec3.distance(UpperPhotoPos,nodePos);
            var lowerDistance=Vec3.distance(nodePos,lowerPhotoPos);

            if(UpperDistance<(this.imageSprite.height/this.GnumOfSlice)+10){
                var pos=UpperSibling.getPosition();
                // pos.y-=Distance-(this.imageSprite.height/ this.GnumOfSlice);
                pos.x=0;
                var pos2=this.node.getPosition();
                pos2.x=0;
                pos2.y+=UpperDistance-(this.imageSprite.height/ this.GnumOfSlice);
                this.node.setPosition(pos2);
                UpperSibling.setPosition(pos);

            }
            else if(lowerDistance<(this.imageSprite.height/this.GnumOfSlice)+10){
                
                var Spos=LowerSibling.getPosition();
                var Nodepos=this.node.getPosition();
                Nodepos.y-=lowerDistance-(this.imageSprite.height/ this.GnumOfSlice);
                Nodepos.x=0;
                   Spos.x=0;
                   LowerSibling.setPosition(Spos);
                   this.node.setPosition(Nodepos);

            }
        
        }
        this.checkPuzzle();
    }
    checkPuzzle(){

        var FirstNode=this.node.parent.getChildByName('0');
        var FirstNodePos=FirstNode.getPosition();
        var check=1;
        for(var i=1;i<this.GnumOfSlice;i++){
            var remaingNode=this.node.parent.getChildByName(`${i}`);
            var distance=Vec3.distance(remaingNode.getPosition(),FirstNodePos);
            if( distance+2 >= i*(this.imageSprite.height/this.GnumOfSlice) && distance-2 <= i *(this.imageSprite.height/this.GnumOfSlice)){
            }else{
                check=0;
            }
        }
        if(check){
            console.log("Puzzle solved");
            this.puzzleResult = true;
            this.imageCallback(this.puzzleResult)
        //     this.node.parent.active = false;

        //     // this.node.parent.removeAllChildren()
        //    // this.node.removeAllChildren();
            
        //     //this.node.active = false
        //     console.log(this.imageSprite)
   
        }
    }
        
    
    
    update(deltaTime: number) {
        
    }
}


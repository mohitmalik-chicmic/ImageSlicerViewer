import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, math, Sprite, macro, Prefab, instantiate, Label, Enum, CCInteger, UITransform, Vec3 } from 'cc';

import { photoSlice2 } from './photoSlice2';

const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {

    @property({type:ImageAsset})
    imageAssert:ImageAsset=null;
    
    @property({type : Prefab})
    slicePrefab : Prefab = null;
    
    @property({type: CCInteger})
    spilt : any = 0;


    selectedImage  : SpriteFrame = null;
    


    setImageforSlice( sliceCount : number, imageAsset: any){
        this.spilt = 3;
        for(var i=0;i<this.spilt;i++)
        { 

            let smallSlice = instantiate(this.slicePrefab);
            smallSlice.getComponent(photoSlice2).setSlice(this.spilt,i,imageAsset) ;
            smallSlice.setPosition(new Vec3(0,i*smallSlice.getComponent(UITransform).height,0));
            this.node.addChild(smallSlice);
            


        }




    }

    start() {

        // var a= this.node.getComponent(GamePlay).spilt
        // console.log(typeof(this.node.getComponent(GamePlay).spilt));
        
        // let image=new SpriteFrame();
        // let texture=new Texture2D();
        // texture.image=this.imageAssert;
        // image.texture=texture;
        // // var h=518/a;
        // var b=0;
        // while(b<a){
        //     let smallSlice=instantiate(this.photo);
        //     let smallSliceClass=smallSlice.getComponent(photoSlice2);
            // let rect=math.rect(0+image.height/this.num,0+image.height/this.num,image.width,image.height/this.num);
            //let mainHeight = this.node.getComponent(UITransform).height;
            // smallSliceClass.setSlice(a,b);
            // this.node.addChild(smallSlice);
            // console.log("Id of each node" ,smallSlice.name)
           
            // Node.EventType.TOUCH_MOVE();
            // smallSlice.on(Node.EventType.TOUCH_MOVE, this.onTouchStartCallback, this, true);
            // let pos = smallSlice.getPosition();
                //math.rect(x,y, height, width)


            // pos.y+= 259-b*(10+(image.height/a));
            // console.log(pos.x,pos.y);
            // smallSlice.setPosition(pos);
            // b++;
            // for(let i =0;i<a;i++){
            //     if()
            // }

            // let imagePos = Math.floor(Math.random()*(mainHeight/2 - (-mainHeight/2))+ (-mainHeight/2))+image.height/a
            // if(imagePos>mainHeight/2 || imagePos<-mainHeight/2){
            //     imagePos -=image.height/a
            //     pos.y+= imagePos
            // console.log(pos.x,pos.y);
            // smallSlice.setPosition(pos);
            // b++;
            // }
            // else{
            //     console.log(imagePos);
            // console.log(image.height/a)
            // pos.y+= imagePos
            // console.log(pos.x,pos.y);
            // smallSlice.setPosition(pos);
            // b++;
            // }
            
        } 
        

    }
    // onTouchStartCallback (event){
    //     console.log(event);

    // }



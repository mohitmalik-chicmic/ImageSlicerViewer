import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, math, Sprite, macro, Prefab, instantiate, Label, Enum, CCInteger, UITransform, Vec3 } from 'cc';

import { photoSlice2 } from './photoSlice2';
import { SingletonClass } from './SingleTon';
const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {

    @property({type:ImageAsset})
    imageAssert:ImageAsset=null;
    
    @property({type : Prefab})
    slicePrefab : Prefab = null;
    
    @property({type: Prefab})
    imageGlow : Prefab = null;
    
    @property({type: CCInteger})
    spilt : any = 0;
    
    @property({type: CCInteger})
    sliceNumber : any = 0;

    imgCallback : any = null;

    smallSlice : Node = null;

    selectedImage  : SpriteFrame = null;
    
    puzzleResult : Boolean = false;

    start() {
      
    }
    setImageforSlice(imageAsset: any, inc:number,callback){
        this.imgCallback = callback
        var a=new Array();
        var loopNum=0;
        let frame = this.node.getChildByName('Frame');
        let frameCh = frame.getChildByName('frameChild')
        frameCh.removeAllChildren();
        for(var i=0;i<this.spilt;i++)
        { 
            this.smallSlice = instantiate(this.slicePrefab);
            this.smallSlice.getComponent(photoSlice2).setSlice(this.spilt,i,imageAsset,this.imageComplete) ;
            this.smallSlice.setPosition(new Vec3(0,i*this.smallSlice.getComponent(UITransform).height,0));
            
            
            frameCh.addChild(this.smallSlice);
            let pos = this.smallSlice.getPosition();
            let radomH=this.fgetRandom(a,0,this.spilt);
            this.smallSlice.setSiblingIndex(radomH);
            if(a[radomH]!=undefined){
            for(let i=0;i<this.spilt;i++){
                if(a[i]==undefined){
                    radomH=i;
                    a[i]=1;
                    break;
                }
            }
            }else{
                a[radomH]=1;
                
            }
          
            pos.y=(imageAsset.height/2)-(imageAsset.height/this.spilt)-radomH*((imageAsset.height/this.spilt));
            pos.y+= (imageAsset.height/this.spilt)/2
            this.smallSlice.setPosition(pos);
            loopNum++;
        }
 
    }
    
    fgetRandom(a,min, max) {
        var flag =true;
        let value=Math.floor(Math.random() * (max - min) + min); 
        return value;
        
      }
    imageComplete = (result, pos : Vec3) =>{
        this.puzzleResult = result;
        this.imgCallback(this.puzzleResult, pos);
        }

    update(deltaTime: number) {
    }


    
}
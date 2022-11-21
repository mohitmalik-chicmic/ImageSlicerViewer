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
    
    @property({type: CCInteger})
    sliceNumber : any = 0;

    selectedImage  : SpriteFrame = null;
    


    setImageforSlice(imageAsset: any){
        //this.spilt = 3;
        var a=new Array();
        var loopNum=0;
        for(var i=0;i<this.spilt;i++)
        { 

            let smallSlice = instantiate(this.slicePrefab);
            smallSlice.getComponent(photoSlice2).setSlice(this.spilt,i,imageAsset) ;
            smallSlice.setPosition(new Vec3(0,i*smallSlice.getComponent(UITransform).height,0));
            this.node.addChild(smallSlice);
            let pos = smallSlice.getPosition();
            let radomH=this.fgetRandom(a,0,this.spilt);
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
          
            pos.y=(imageAsset.height/2)-(imageAsset.height/this.spilt)-radomH*(5+(imageAsset.height/this.spilt));
            smallSlice.setPosition(pos);
            loopNum++;
        } 
    }
    
    fgetRandom(a,min, max) {
        var flag =true;
        let value=Math.floor(Math.random() * (max - min) + min); 
        return value;
        
      }
    update(deltaTime: number) {
        
    }


    start() {

    }
}
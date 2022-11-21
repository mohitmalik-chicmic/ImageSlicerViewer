import { _decorator, Component, Node, ImageAsset, SpriteFrame, Texture2D, math, Sprite, macro, Prefab, instantiate, Label, Enum, CCInteger, UITransform, Vec3 } from 'cc';

import { photoSlice2 } from './photoSlice2';

const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {

    @property({type:ImageAsset})
    imageAssert:ImageAsset=null;
    
    @property({type : Prefab})
    photo : Prefab = null;
    
    @property({type: CCInteger})
    sliceNumber : any = 0;
    start() {
    
        var a=new Array();
       
        var numOfSlice= this.node.getComponent(GamePlay).sliceNumber;
        
        let image=new SpriteFrame();
        let texture=new Texture2D();
        texture.image=this.imageAssert;
        image.texture=texture;
        var loopNum=0;
        while(loopNum<numOfSlice){
            let smallSlice=instantiate(this.photo);
            let smallSliceClass=smallSlice.getComponent(photoSlice2);
            smallSliceClass.setSlice(numOfSlice,loopNum);
            this.node.addChild(smallSlice);
            console.log(smallSlice.name);
            let pos = smallSlice.getPosition();
            let radomH=this.fgetRandom(a,0,numOfSlice);
            if(a[radomH]!=undefined){
            for(let i=0;i<numOfSlice;i++){
                if(a[i]==undefined){
                    radomH=i;
                    a[i]=1;
                    break;
                }
            }
            }else{
                a[radomH]=1;
            }
          
            pos.y=(this.node.getComponent(UITransform).height/2)-(image.height/numOfSlice)-radomH*(5+(image.height/numOfSlice));
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
}


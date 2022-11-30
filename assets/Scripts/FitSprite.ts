import { _decorator, Component, Node, assetManager, ImageAsset, SpriteFrame, Texture2D, UITransform, Sprite, Size } from "cc";

const { ccclass } = _decorator;

@ccclass("FitSprite")
export class FitSprite extends Component {
    start() {}

    fitRemoteImage(remoteUrl: string) {
        assetManager.loadRemote<ImageAsset>(remoteUrl, (err, imageAsset) => {
            if (err) {
                
            } else {
                let spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                this.fitImage(spriteFrame);
            }
        });
    }

    fitImage(newSpriteFrame: SpriteFrame) {
        let uiTransform: UITransform = this.node.getComponent(UITransform);
        let oldSize: Size = new Size(uiTransform.width, uiTransform.height);
       
        this.node.getComponent(Sprite).spriteFrame = newSpriteFrame;
        let scale=0.1 ;
        let scale2:string="";
        if (uiTransform.width < uiTransform.height) {
            scale2+=`${ oldSize.height / uiTransform.height}`
             scale = Number(scale2);
          
           
        } else {
            scale2+=`${ oldSize.height / uiTransform.height}`
          
            scale = Number(scale2);
           
        }
        uiTransform.width = uiTransform.width * scale;
        uiTransform.height = uiTransform.height * scale;
        
    }
}

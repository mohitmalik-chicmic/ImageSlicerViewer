import { _decorator, Component, Node, Prefab, instantiate, SpriteFrame, Sprite, UITransform, EventMouse, ImageAsset, Texture2D, assetManager } from "cc";
import { FitSprite } from "./FitSprite";
import { resourceLoader } from "./resourceLoader";
const { ccclass, property } = _decorator;

@ccclass("imageLoad")
export class imageLoad extends Component {
    @property({ type: Prefab })
    image: Prefab = null!;

    @property({ type: Node })
    contentNode: Node = null;

    _flag : Boolean = false;
    _image : any = null;
    selectedCallback : any = null;

    sliceImages : ImageAsset[] = [];

    start() {}
    show(items: ImageAsset[] , callback) {
        this.selectedCallback = callback;
        this.sliceImages = items;
        items.forEach((item,Index) => {
            let itemInstantiate = instantiate(this.image);
            let sprite = SpriteFrame.createWithImage(item);
            
            console.log(itemInstantiate.getComponent(UITransform).height);
            
            itemInstantiate.getComponent(FitSprite).fitImage(sprite);
            itemInstantiate.name = `${Index}`
            
            itemInstantiate.on(Node.EventType.TOUCH_END,this.getSelected,this)
            this.contentNode.addChild(itemInstantiate);
        });
    }
   
    getSelected(event : any){

        let asset : ImageAsset = this.sliceImages[event.target.name]
      
        this.selectedCallback(asset);
    }
    update(deltaTime: number) {
    }
}

import { _decorator, Component, Node, Prefab, instantiate, SpriteFrame, Sprite, UITransform, EventMouse, ImageAsset, Texture2D, assetManager } from "cc";
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
            itemInstantiate.getComponent(Sprite).spriteFrame =sprite;
            itemInstantiate.name = `${Index}`
            let parentWidth = this.contentNode.getComponent(UITransform).width/2
            let childWidth= itemInstantiate.getComponent(UITransform).width
            
            itemInstantiate.getComponent(UITransform).height= (this.contentNode.getComponent(UITransform).width)/2;
            itemInstantiate.getComponent(UITransform).width= (this.contentNode.getComponent(UITransform).width)/2;
            itemInstantiate.on(Node.EventType.TOUCH_END,this.getSelected,this)
            this.contentNode.addChild(itemInstantiate);
        });
    }
    //(itemInstantiate.getComponent(UITransform).height)*(parentWidth/childWidth)
    getSelected(event : any){

        let asset : ImageAsset = this.sliceImages[event.target.name]
        //console.log("Inside getSelected",event.target.name);
        this.selectedCallback(this._image,asset);
    }
    update(deltaTime: number) {
    }
}

import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset, SystemEvent, Input, Scene, SceneAsset, Vec3, UITransform } from "cc";
import { GamePlay } from "./GamePlay";
import { glowing } from "./glowing";
import { imageLoad } from "./imageLoad";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {

    @property({ type: Prefab })
    scrollView: Prefab = null;

    @property({type   : Prefab})
    imageSlicePrefab : Prefab = null;

   @property({type: Prefab})
   imageGlow : Prefab = null;

    img : any = null;
    scrollViewNode : Node = null;
    ImageSlide : Node = null;
    result: boolean = false

    start() {
       this.scrollViewNode = instantiate(this.scrollView);
        //this is adding scrolling prefab to the page
        resources.loadDir("Images", ImageAsset, (err, item) => {
            if (err) {
                console.log("ERROR IN LOADING");
            } else {
                this.scrollViewNode.getComponent(imageLoad).show(item,this.setSelectedImage)
                this.node.addChild(this.scrollViewNode);
            }
        });
    }
    setSelectedImage = (image : SpriteFrame, imageIndex : any) =>{
        this.scrollViewNode.active = false;
        this.ImageSlide = instantiate(this.imageSlicePrefab);
        this.ImageSlide.getComponent(GamePlay).setImageforSlice(imageIndex, this.addGlow);
        this.img= SpriteFrame.createWithImage(imageIndex);
        this.node.addChild(this.ImageSlide);
    }

    addGlow = (result : Boolean, pos : Vec3) =>{
        this.ImageSlide.active = false;
        let imageG = instantiate(this.imageGlow);
        imageG.getComponent(glowing).blink(this.img)
        let sprite = imageG.getChildByName('Item_cat');
        let maskContent = imageG.getChildByName('Mask');
        console.log("Resource loader add Glow")
        this.node.addChild(imageG);
        imageG.setPosition(0, pos.y, 0)
        let imageRect = this.img._rect;
        sprite.getComponent(UITransform).height = imageRect.height;
        sprite.getComponent(UITransform).width = imageRect.width;
        maskContent.getComponent(UITransform).height = imageRect.height;
        maskContent.getComponent(UITransform).width = imageRect.width;


    }

    update(deltaTime: number) {
    }
}

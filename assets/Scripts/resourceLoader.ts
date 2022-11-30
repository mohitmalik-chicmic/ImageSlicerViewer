import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset, SystemEvent, Input, Scene, SceneAsset, Vec3, UITransform, JsonAsset } from "cc";
import { GamePlay } from "./GamePlay";
import { glowing } from "./glowing";
import { imageLoad } from "./imageLoad";
import { SingletonClass } from "./SingleTon";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {

    @property({ type: Prefab })
    scrollView: Prefab = null;

    @property({type   : Prefab})
    sliceGlowBackGround : Prefab = null;

    @property({type   : Prefab})
    imageSlicer : Prefab = null;

   @property({type: Prefab})
   glowInstantiatelow : Prefab = null;

    img : any = null;
    scrollViewNode : Node = null;
    ImageSlide : Node = null;
    result: boolean = false
    glowInstantiate:Node=null;
    slicePerfab : Node =null;
    imgIndex : any =null;
    start() {
        
       
        
    }
    handleStartButtonClick (){

        console.log("hello");
        var child=this.node.getChildByName("Node");
        child.active=false;
        this.scrollViewFunction();

        
    }
    scrollViewFunction(){
         var lvl = SingletonClass.getInstance();
        
        console.log(lvl);
        this.scrollViewNode = instantiate(this.scrollView);
        resources.loadDir('Images', ImageAsset, (err, item) => {
            if (err) {
                console.log("ERROR IN LOADING");
            } else {
                this.scrollViewNode.getComponent(imageLoad).show(item,this.setSelectedImage)
                this.node.addChild(this.scrollViewNode);
            }
        });
    }
    
    setSelectedImage = (imageIndex : any) =>{
        this.imgIndex = imageIndex
        this.scrollViewNode.active = false;
        this.ImageSlide = instantiate(this.sliceGlowBackGround);
        this.img= SpriteFrame.createWithImage(imageIndex);
        this.node.addChild(this.ImageSlide);
        this.slicePerfab = instantiate(this.imageSlicer)
        this.slicePerfab.getComponent(GamePlay).setImageforSlice(imageIndex, this.addGlow);
        this.ImageSlide.getChildByName('frameData').addChild(this.slicePerfab)
        let btn=this.ImageSlide.getChildByName('restartButton')
        console.log("Button", btn)
        btn.on(Node.EventType.TOUCH_END,this.restart,this);


    }

    addGlow = (result : Boolean, pos : Vec3) =>{
        this.ImageSlide.getChildByName('frameData').removeChild(this.slicePerfab);
        this.glowInstantiate = instantiate(this.glowInstantiatelow);
        this.glowInstantiate.getComponent(glowing).blink(this.img)
        let sprite = this.glowInstantiate.getChildByName('Item_cat');
        let maskContent = this.glowInstantiate.getChildByName('Mask');
        console.log("Resource loader add Glow")
        this.ImageSlide.getChildByName('frameData').addChild(this.glowInstantiate);
        this.glowInstantiate.setPosition(0, pos.y, 0)
       let imageRect = this.img._rect;
        sprite.getComponent(UITransform).height = imageRect.height;
        sprite.getComponent(UITransform).width = imageRect.width;
        maskContent.getComponent(UITransform).height = imageRect.height;
        maskContent.getComponent(UITransform).width = imageRect.width;
    }
    restart(){
        console.log("restart clicked")
        this.ImageSlide.getChildByName('frameData').removeAllChildren();
        this.setSelectedImage(this.imgIndex)
    }

    update(deltaTime: number) {
    }
}

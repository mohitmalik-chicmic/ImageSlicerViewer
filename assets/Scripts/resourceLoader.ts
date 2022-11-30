import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset, SystemEvent, Input, Scene, SceneAsset, Vec3, UITransform, JsonAsset } from "cc";
import { GamePlay } from "./GamePlay";
import { glowing } from "./glowing";

import { SingletonClass } from "./SingleTon";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {

    @property({ type: Prefab })
    image: Prefab = null!;

    @property({type   : Prefab})
    imageSlicer : Prefab = null;

   @property({type: Prefab})
   imageArray : ImageAsset[] =[];
   inc : number =2;

   @property({type: Prefab})
   glowPrefab: Prefab = null;


  // glowInstantiatelow : Prefab = null;
 
    img : any = null;
    ImageSlide : Node = null;
    result: boolean = false
    glowInstantiate:Node=null;
    slicePerfab : Node =null;
    child : Node = null;
    start() {
        
       
        
    }
    handleStartButtonClick (){

        console.log("hello");
        this.child=this.node.getChildByName("Node");  
        this.addSlider()     
    }
    addSlider(){
        this.node.removeAllChildren()
        this.ImageSlide = instantiate(this.imageSlicer);
        this.node.addChild(this.ImageSlide)
        this.getImages();   
    }
    getImages(){

        resources.loadDir('Images', ImageAsset, (err, item) => {
            if (err) {
                console.log("ERROR IN LOADING");
            } else {
                this.imageArray =item;
                this.setSelectedImage()
            }
        });
    }
        setSelectedImage(){
            let nextBtn = this.ImageSlide.getChildByName('nextImage');
            let resetBtn = this.ImageSlide.getChildByName('resetImage');
            resetBtn.on('click', this.resetImage,this)
           // console.log(nextBtn)
           nextBtn.on('click',this.nextImage,this);
            let imageI = SpriteFrame.createWithImage(this.imageArray[this.inc]);
            console.log(imageI)
            this.ImageSlide.getComponent(GamePlay).setImageforSlice(this.imageArray[this.inc],this.addGlow);
            // this.ImageSlide.addChild(this.slicePerfab)


        }
        resetImage = () => {
            this.addSlider();
        }
        nextImage = () =>{
            console.log("Next Image button")
            ++this.inc
            this.addSlider();
        }
        addGlow = (result : Boolean, pos : Vec3) =>{
                console.log(result)
                    this.glowInstantiate = instantiate(this.glowPrefab);
                    this.img= SpriteFrame.createWithImage(this.imageArray[this.inc])
                    this.glowInstantiate.getComponent(glowing).blink(this.img)
                    let sprite = this.glowInstantiate.getChildByName('Item_cat');
                    let maskContent = this.glowInstantiate.getChildByName('Mask');
                    this.ImageSlide.addChild(this.glowInstantiate);
                    this.glowInstantiate.setPosition(0, pos.y, 0);
                   let imageRect = this.img._rect;
                    sprite.getComponent(UITransform).height = imageRect.height;
                    sprite.getComponent(UITransform).width = imageRect.width;
                    maskContent.getComponent(UITransform).height = imageRect.height;
                    maskContent.getComponent(UITransform).width = imageRect.width;
                }
        }

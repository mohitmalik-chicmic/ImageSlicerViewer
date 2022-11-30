import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset, SystemEvent, Input, Scene, SceneAsset, Vec3, UITransform, JsonAsset } from "cc";
import { GamePlay } from "./GamePlay";
import { glowing } from "./glowing";

import { SingletonClass } from "./SingleTon";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {

    @property({type   : Prefab})
    imageSlicer : Prefab = null;

   @property({type: Prefab})
   imageArray : ImageAsset[] =[];
   inc : number =0;

   @property({type: Prefab})
   glowPrefab: Prefab = null;

    img : any = null;
    ImageSlide : Node = null;
    result: Boolean = false
    glowInstantiate:Node=null;
    child : Node = null;
    start() {
        
       
        
    }
    handleStartButtonClick (){

        console.log("hello");
        this.child=this.node.getChildByName("Node");  
        this.addSlider()     
    }
    addSlider(){
        this.result = false
        this.child.active = false
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
                console.log('Array length',item.length)
                this.setSelectedImage()
            }
        });
    }
        setSelectedImage(){
            let nextBtn = this.ImageSlide.getChildByName('nextImage');
            let resetBtn = this.ImageSlide.getChildByName('resetImage');
            let prevImage = this.ImageSlide.getChildByName('prevImage');
            prevImage.on('click', this.prevImage, this)
            resetBtn.on('click', this.resetImage,this)
           nextBtn.on('click',this.nextImage,this);
            let imageI = SpriteFrame.createWithImage(this.imageArray[this.inc]);
            console.log(imageI)
            this.ImageSlide.getComponent(GamePlay).setImageforSlice(this.imageArray[this.inc],this.inc,this.addGlow);
        }
        prevImage = () =>{
            this.ImageSlide.destroy();
            this.child.active = true
            this.inc=0

        }
        resetImage = () => {
            this.glowInstantiate.destroy();
           this.ImageSlide.getComponent(GamePlay).setImageforSlice(this.imageArray[this.inc],this.inc,this.addGlow);
        }
        nextImage = () =>{
            console.log("Next Image button")
            if(this.result){
                if(this.inc<this.imageArray.length){
                    ++this.inc
                    this.ImageSlide.destroy();
                    this.addSlider();
                }
            } else{
                console.log("END OF ARRAY")
                
            }
        }
        addGlow = (result : Boolean, pos : Vec3) =>{
                this.result = result;
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

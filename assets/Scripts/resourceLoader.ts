import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset, SystemEvent, Input, Scene, SceneAsset } from "cc";
import { GamePlay } from "./GamePlay";
import { imageLoad } from "./imageLoad";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {

    @property({ type: Prefab })
    scrollView: Prefab = null;

    @property({type   : Prefab})
    imageSlicePrefab : Prefab = null;

   // sliceCount : number = 8;
    scrollViewNode : Node = null;

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
        let ImageSlide = instantiate(this.imageSlicePrefab);
        ImageSlide.getComponent(GamePlay).setImageforSlice(imageIndex);
        this.node.addChild(ImageSlide);
    }


    update(deltaTime: number) {}
}

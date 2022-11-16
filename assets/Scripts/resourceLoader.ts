import { _decorator, Component, Node, resources, Prefab, instantiate, director, SpriteFrame, Sprite, Texture2D, ImageAsset } from "cc";
import { imageLoad } from "./imageLoad";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {
    @property({ type: Prefab })
    load: Prefab = null;

    start() {
        let it = instantiate(this.load);
        //this is adding scrolling prefab to the page
        resources.loadDir("Images", SpriteFrame, (err, item) => {
            if (err) {
                console.log("ERROR IN LOADING");
            } else {
                it.getComponent(imageLoad).show(item);
                this.node.addChild(it);
            }
        });
    }

    update(deltaTime: number) {}
}

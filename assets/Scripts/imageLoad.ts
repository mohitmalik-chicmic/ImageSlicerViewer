import { _decorator, Component, Node, Prefab, instantiate, SpriteFrame, Sprite, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("imageLoad")
export class imageLoad extends Component {
    @property({ type: Prefab })
    image: Prefab = null!;

    @property({ type: Node })
    contentNode: Node = null;

    start() {}
    show(items: SpriteFrame[]) {
        items.forEach((item) => {
            let ite = instantiate(this.image);
            ite.getComponent(Sprite).spriteFrame = item;

            //height and width of images
            //let height=ite.getComponent(UITransform).height 
            let pwidth = this.contentNode.getComponent(UITransform).width
            let cwidth= ite.getComponent(UITransform).width
            // let scaleFactor = 1/Math.max(cwidth/pwidth);
            // ite.setScale(Math.min(scaleFactor, 1));
            ite.getComponent(UITransform).width= (this.contentNode.getComponent(UITransform).width)/2;
            ite.getComponent(UITransform).height = (this.contentNode.getComponent(UITransform).width)/2
            this.contentNode.addChild(ite);
        });
    }

    update(deltaTime: number) {}
}

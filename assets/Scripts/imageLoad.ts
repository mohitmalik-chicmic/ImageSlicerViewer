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
            ite.getComponent(UITransform).height = 150;
            ite.getComponent(UITransform).width = 180;
            this.contentNode.addChild(ite);
        });
    }

    update(deltaTime: number) {}
}

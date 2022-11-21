import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bheem')
export class bheem extends Component {
    @property({type:SpriteFrame})
    character:SpriteFrame=null;

    start() {

    }
    changeImage(event,data): void {
        //new functionality added
        this.node.getComponent(Sprite).spriteFrame = this.character;
    }


    update(deltaTime: number) {
        
    }
}


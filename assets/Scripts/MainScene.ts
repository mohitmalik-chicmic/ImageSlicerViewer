import { _decorator, Component, Node, SpriteFrame, Prefab, instantiate, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    
   /* @property({type:Prefab})
    charcter:Prefab;
    
    start(): void {
        let character : Node = instantiate(this.charcter);

        this.node.addChild(character);

        for (let index = 0; index < 100; index++) {
            let character : Node = instantiate(this.charcter);

            let x = this.node.getComponent(UITransform).width/2;
            let Y = this.node.getComponent(UITransform).height/2;
            let randomX= x* Math.random() * Math.pow(-1,Math.round(Math.random()));
            let randomY= Y* Math.random()* Math.pow(-1,Math.round(Math.random()));
            
            character.setPosition(new Vec3(randomX,randomY,0));
            this.node.addChild(character);
        }
    }
*/
    update(deltaTime: number): void {
        
    }
}


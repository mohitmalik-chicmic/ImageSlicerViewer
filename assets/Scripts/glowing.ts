import { _decorator, Component, Node, Sprite, AudioSource } from "cc";
import { SingletonClass } from "./singleTon";
import { SoundManager } from "./managers/soundManager";
const { ccclass, property } = _decorator;

@ccclass("glowing")
export class glowing extends Component {
  @property({ type: Node })
  getMask: Node = null!;

  //check: Boolean = true;
  audio: any = null;
  soundsObj: any = null;
  soundManager: any = null;

  start() {
    // this.soundsObj=SingletonClass.getInstance();
    // console.log(this.soundsObj.boolSound)
    // this.audio = this.node.getComponent(AudioSource).clip;
    // if(!this.soundsObj.boolSound){
    //     this.audio.play();
    // }
    this.soundManager = SoundManager.getInstance();
  }

  blink = (imageSprite: any) => {
    this.getMask.getComponent(Sprite).spriteFrame = imageSprite;
    this.node.getChildByName("imageSprite").getComponent(Sprite).spriteFrame =
      imageSprite;
    this.soundsObj = SingletonClass.getInstance();
   // console.log(this.soundsObj.boolSound);
    this.audio = this.node.getComponent(AudioSource).clip;
  };
  update() {}
}

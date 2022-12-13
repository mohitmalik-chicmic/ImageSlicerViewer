import {
  _decorator,
  Component,
  Node,
  Sprite,
  AudioSource,
  AudioClip,
  SpriteFrame,
} from "cc";
import { SingletonClass } from "./singleTon";
import { SoundManager } from "./managers/soundManager";
const { ccclass, property } = _decorator;

@ccclass("glowing")
export class glowing extends Component {
  @property({ type: Node })
  getMask: Node = null!;
  audio: AudioClip = null;
  soundsObj: SingletonClass = null;
  soundManager: SoundManager = null;

  start() {
    this.soundManager = SoundManager.getInstance();
  }

  blink = (imageSprite: SpriteFrame) => {
    this.getMask.getComponent(Sprite).spriteFrame = imageSprite;
    this.node.getChildByName("imageSprite").getComponent(Sprite).spriteFrame =
      imageSprite;
    this.soundsObj = SingletonClass.getInstance();
    this.audio = this.node.getComponent(AudioSource).clip;
  };
  update() {}
}

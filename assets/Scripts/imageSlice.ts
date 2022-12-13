import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Prefab,
  instantiate,
  CCInteger,
  UITransform,
  Vec3,
  ImageAsset,
} from "cc";
import { SoundManager } from "./managers/soundManager";
import { cutSlice } from "./cutSlice";
import { SingletonClass } from "./singleTon";
const { ccclass, property } = _decorator;

@ccclass("GamePlay")
export class GamePlay extends Component {
  @property({ type: Prefab })
  frame: Prefab = null;
  @property({ type: Prefab })
  slicePrefab: Prefab = null;
  @property({ type: CCInteger })
  spilt: number = 0;

  frameCh: Node = null;
  smallSlice: Node = null;

  imgCallback: Function = null;
  selectedImage: SpriteFrame = null;
  puzzleResult: Boolean = false;
  soundsObj: SingletonClass = null;
  soundManager: SoundManager = null;

  onLoad() {
    let Frame = instantiate(this.frame);
    this.node.addChild(Frame);
  }
  start() {
    this.soundsObj = SingletonClass.getInstance();
    this.soundManager = SoundManager.getInstance();
  }
  setImageforSlice(imageAsset: ImageAsset, inc: number, callback: Function) {
    if (inc >= 11) {
      this.spilt = 8;
    }
    this.imgCallback = callback;
    let slicePosArray = new Array();
    let loopNum = 0;
    let frame = this.node.getChildByName("imageFrame");
    this.frameCh = frame.getChildByName("frameChild");
    this.frameCh.removeAllChildren();
    for (var i = 0; i < this.spilt; i++) {
      this.smallSlice = instantiate(this.slicePrefab);
      this.smallSlice
        .getComponent(cutSlice)
        .setSlice(this.spilt, i, imageAsset, this.imageComplete);

      this.smallSlice.setPosition(
        new Vec3(0, i * this.smallSlice.getComponent(UITransform).height, 0)
      );

      this.frameCh.addChild(this.smallSlice);
      let pos = this.smallSlice.getPosition();
      let radomH = this.fgetRandom(0, this.spilt);
      this.smallSlice.setSiblingIndex(radomH);
      if (slicePosArray[radomH] != undefined) {
        for (let i = 0; i < this.spilt; i++) {
          if (slicePosArray[i] == undefined) {
            radomH = i;
            slicePosArray[i] = 1;
            break;
          }
        }
      } else {
        slicePosArray[radomH] = 1;
      }

      pos.y =
        imageAsset.height / 2 -
        imageAsset.height / this.spilt -
        radomH * (imageAsset.height / this.spilt);
      pos.y += imageAsset.height / this.spilt / 2;
      this.smallSlice.setPosition(pos);
      loopNum++;
    }
  }

  fgetRandom(min: number, max: number) {
    let value = Math.floor(Math.random() * (max - min) + min);
    return value;
  }
  imageComplete = (result: Boolean) => {
    if (result) {
      this.frameCh.removeAllChildren();
      this.imgCallback();
    }
  };

  update(deltaTime: number) {}
}

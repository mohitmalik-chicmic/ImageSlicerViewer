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
} from "cc";
import { ResourceUtils } from "./managers/resourceUtils";
import { SoundManager } from "./managers/soundManager";

import { photoSlice2 } from "./photoSlice2";
import { SingletonClass } from "./singleTon";
const { ccclass, property } = _decorator;

@ccclass("GamePlay")
export class GamePlay extends Component {
  @property({ type: Prefab })
  frame: Prefab = null;
  @property({ type: Prefab })
  settingMenu: Prefab = null;
  @property({ type: Prefab })
  slicePrefab: Prefab = null;
  @property({ type: CCInteger })
  spilt: number = 0;
  //   @property({ type: Prefab })
  //   imageGlow: Prefab = null;
  //  @property({ type: ImageAsset })
  //   imageAssert: ImageAsset = null;
  //   @property({ type: CCInteger })
  //   sliceNumber: any = 0;
  frameCh: Node = null;
  smallSlice: Node = null;

  imgCallback: Function = null;
  selectedImage: SpriteFrame = null;
  puzzleResult: Boolean = false;
  soundsObj: any = null;
  soundManager: any = null;

  onLoad() {
    let Frame = instantiate(this.frame);
    this.node.addChild(Frame);
    // console.log("GAME PLAY ON LOAD CALLED");
    //console.log(Frame.name);
  }
  start() {
    //console.log("GAME PLAY START CALLED");
    this.soundsObj = SingletonClass.getInstance();
    this.soundManager = SoundManager.getInstance();
  }
  handleStartButtonClick() {
    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    let setting = instantiate(this.settingMenu);
    this.node.addChild(setting);
  }
  setImageforSlice(imageAsset: any, inc: number, callback) {
    if (inc >= 11) {
      this.spilt = 8;
    }
    this.imgCallback = callback;
    let slicePosArray = new Array();
    let loopNum = 0;
    // console.log(this.node.children);
    let frame = this.node.getChildByName("imageFrame");
    this.frameCh = frame.getChildByName("frameChild");
    this.frameCh.removeAllChildren();

    // console.log(this.node.getChildByName("settings"));
    // console.log(this.node.getChildByName("settings"));

    //console.log(frame);
    for (var i = 0; i < this.spilt; i++) {
      this.smallSlice = instantiate(this.slicePrefab);
      this.smallSlice
        .getComponent(photoSlice2)
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

  fgetRandom(min, max) {
    // var flag = true;
    let value = Math.floor(Math.random() * (max - min) + min);
    return value;
  }
  imageComplete = (result) => {
    if (result) {
      this.frameCh.removeAllChildren();
      this.imgCallback();
    }
    //this.puzzleResult = result;
  };

  update(deltaTime: number) {}
}

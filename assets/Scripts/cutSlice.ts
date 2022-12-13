import {
    _decorator,
    Component,
    SpriteFrame,
    math,
    Sprite,
    ImageAsset,
    Vec3
  } from "cc";
  const { ccclass } = _decorator;
  import { SingletonClass } from "./singleTon";
  import { SoundManager } from "./managers/soundManager";
import { photoSlice2 } from "./sliceDrag";
  @ccclass("cutSlice")
  export class cutSlice extends Component {
    imageSprite: SpriteFrame = null;
    NegativePoint: number = 0;
    GnumOfSlice: number = 0;
    imageCallback: Function = null;
    rect: Vec3 = null;
    selectImgPos: Vec3 = null;
    pos: Vec3 = null;
    soundsObj: SingletonClass = null;
    soundManager: SoundManager = null;
  
    start() {
      this.soundsObj = SingletonClass.getInstance();
      this.soundManager = SoundManager.getInstance();
    }
    /**
     * asdasdasdad
     * @param splitCount ad
     * @param Index
     * @param imageAsset
     */
    setSlice(
      splitCount: number,
      Index: number,
      imageAsset: ImageAsset,
     callback : Function
    ) {
      this.GnumOfSlice = splitCount;
    this.imageCallback = callback;
      let sprite = SpriteFrame.createWithImage(imageAsset);
      this.imageSprite = sprite;
      this.NegativePoint =
        sprite.height / 2 -
        sprite.height / this.GnumOfSlice -
        (this.GnumOfSlice - 1) * (sprite.height / this.GnumOfSlice) +
        sprite.height / this.GnumOfSlice / 2;
  
      let rect = math.rect(
        0,
        Index * (sprite.height / splitCount),
        sprite.width,
        sprite.height / splitCount
      );
      sprite.setRect(rect);
      this.node.getComponent(Sprite).spriteFrame = sprite;
      this.node.name = `${Index}`;
      this.node.getComponent(photoSlice2).registerTouchEvents(this.imageSprite,this.GnumOfSlice,this.imageCallback)
    }
}
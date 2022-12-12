import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  math,
  Sprite,
  ImageAsset,
  EventTouch,
  UITransform,
  Vec3,
  tween,
} from "cc";
const { ccclass } = _decorator;
import { SingletonClass } from "./singleTon";
import { ResourceUtils } from "./managers/resourceUtils";
import { SoundManager } from "./managers/soundManager";
@ccclass("photoSlice2")
export class photoSlice2 extends Component {
  //   MouseposX: Number = 0;
  //   MouseposY: Number = 0;
  //puzzleResult: Boolean = false;
  // flag: boolean = true;

  imageSprite: SpriteFrame = null;
  rect: Vec3 = null;
  GnumOfSlice: number = 0;
  imageCallback: any = null;
  selectImgPos: Vec3 = null;
  pos: Vec3 = null;
  NegativePoint: number = 0;
  soundsObj: any = null;
  soundManager: any = null;

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
    callback
  ) {
    this.GnumOfSlice = splitCount;
    this.imageCallback = callback;
    let sprite = SpriteFrame.createWithImage(imageAsset);
    this.imageSprite = sprite;
    // if (this.flag == true) {
    //   this.imageSprite = sprite;
    //   this.flag = false;
    // }
    //console.log(sprite);
    // this.NegativePoint=(imageAsset.height/2)-(imageAsset.height/this.GnumOfSlice)-(this.GnumOfSlice-1)*((imageAsset.height/this.GnumOfSlice))+((imageAsset.height/this.GnumOfSlice)/2);
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
    this.registerTouchEvents();
    sprite.setRect(rect);
    this.node.getComponent(Sprite).spriteFrame = sprite;
    this.node.name = `${Index}`;
  }

  registerTouchEvents() {
    this.node.on(Node.EventType.TOUCH_START, this.touchStart, this, true);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
    this.node.on(Node.EventType.TOUCH_END, this.checkOrder2, this, true);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.checkOrder2, this, true);
  }

  touchStart(event: EventTouch) {
    this.rect = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(
        new Vec3(event.getUILocation().x, event.getUILocation().y, 0)
      );
    this.pos = this.node.getPosition();
    console.log(this.pos);
    this.rect.x = this.rect.x - this.pos.x;
    this.rect.y = this.rect.y - this.pos.y;

    this.selectImgPos = this.node.getPosition();
  }
  //---------------END OF touchStart
  onTouchMove(event: EventTouch) {
    if (this.rect.x < 0 && this.rect.y < 0) {
      event.target.position = this.node.parent
        .getComponent(UITransform)
        .convertToNodeSpaceAR(
          new Vec3(
            event.getUILocation().x - this.rect.x,
            event.getUILocation().y - this.rect.y,
            0
          )
        );
    } else if (this.rect.x >= 0 && this.rect.y < 0) {
      event.target.position = this.node.parent
        .getComponent(UITransform)
        .convertToNodeSpaceAR(
          new Vec3(
            event.getUILocation().x - this.rect.x,
            event.getUILocation().y - this.rect.y,
            0
          )
        );
    } else if (this.rect.x < 0 && this.rect.y > 0) {
      event.target.position = this.node.parent
        .getComponent(UITransform)
        .convertToNodeSpaceAR(
          new Vec3(
            event.getUILocation().x - this.rect.x,
            event.getUILocation().y + this.rect.y,
            0
          )
        );
    } else {
      event.target.position = this.node.parent
        .getComponent(UITransform)
        .convertToNodeSpaceAR(
          new Vec3(
            event.getUILocation().x - this.rect.x,
            event.getUILocation().y - this.rect.y,
            0
          )
        );
    }
    var pos = this.node.getPosition();
    pos.z = 0;

    this.node.setPosition(pos);
    pos.x = 0;
    this.node.setPosition(pos);
    var distance: number = 0;
    let swapCheck: boolean = false;
    let swapNode: Node = null;
    var AnotherNode: Node = null;
    var nodeName = parseInt(this.node.name);
    var Nodepos = this.node.getPosition();
    this.node.getChildByName("outerStroke").active = true;

    for (var i = 0; i < this.GnumOfSlice; i++) {
      let AnotherNodeCheck = this.node.parent.getChildByName(`${i}`);
      if (AnotherNodeCheck.name != this.node.name) {
        AnotherNodeCheck.getChildByName("highLighter").active = false;
        AnotherNodeCheck.getChildByName("outerStroke").active = false;
      }
    }
    for (var i = 0; i < this.GnumOfSlice; i++) {
      let AnotherNodeCheck = this.node.parent.getChildByName(`${i}`);
      if (nodeName != i) {
        var lowerDistance = Vec3.distance(
          AnotherNodeCheck.getPosition(),
          Nodepos
        );
        if (lowerDistance < this.imageSprite.height / this.GnumOfSlice) {
          swapCheck = true;

          if (distance == 0) {
            distance = lowerDistance;
            AnotherNode = AnotherNodeCheck;
          }
          if (distance > lowerDistance) {
            distance = lowerDistance;
            AnotherNode = AnotherNodeCheck;
          }
        }
      }
    }
    if (AnotherNode != null) {
      AnotherNode.getChildByName("highLighter").active = true;
      AnotherNode.getChildByName("outerStroke").active = true;
    }
  }
  //---------------END OF onTouchMove
  checkOrder2(event: EventTouch) {
    for (let i = 0; i < this.GnumOfSlice; i++) {
      let AnotherNodeCheck = this.node.parent.getChildByName(`${i}`);
      AnotherNodeCheck.getChildByName("highLighter").active = false;
      AnotherNodeCheck.getChildByName("outerStroke").active = false;
    }
    var Nodepos = this.node.getPosition();

    this.node.setPosition(Nodepos);
    var nodeName = parseInt(this.node.name);
    if (
      Nodepos.y >=
      this.imageSprite.height / 2 - this.imageSprite.height / this.GnumOfSlice
    ) {
      this.node.setPosition(this.selectImgPos);
      // console.log("out of bound + ", Nodepos.y);
    } else if (Nodepos.y < this.NegativePoint) {
      console.log("work");
      this.node.setPosition(this.selectImgPos);
      //console.log("out of bound", Nodepos.y);
    }
    let distance: number = 0;
    let swapCheck: boolean = false;
    // let swapNode: Node = null;
    let AnotherNode: Node = null;
    for (var i = 0; i < this.GnumOfSlice; i++) {
      let AnotherNodeCheck = this.node.parent.getChildByName(`${i}`);
      if (nodeName != i) {
        var lowerDistance = Vec3.distance(
          AnotherNodeCheck.getPosition(),
          Nodepos
        );
        if (lowerDistance < this.imageSprite.height / this.GnumOfSlice) {
          swapCheck = true;

          if (distance == 0) {
            distance = lowerDistance;
            AnotherNode = AnotherNodeCheck;
          }
          if (distance > lowerDistance) {
            distance = lowerDistance;
            AnotherNode = AnotherNodeCheck;
          }
        }
      }
    }

    if (swapCheck) {
      let newPos = AnotherNode.getPosition();
      let pos = newPos;
      this.node.setPosition(pos);
      newPos.y = this.selectImgPos.y;
      newPos.z = 0;
      if (this.selectImgPos.y < newPos.y) {
        tween(AnotherNode)
          .to(0.07, { position: new Vec3(newPos.x, -newPos.y, newPos.z) })
          .call(() => {
            if (!this.soundsObj.boolSound) {
              // this.audio.play();
              this.soundManager.playSoundEffect(
                ResourceUtils.getInstance().getMusicFile("swap"),
                false
              );
            }

            this.checkPuzzle();
          })
          .start();
      } else {
        tween(AnotherNode)
          .to(0.07, { position: new Vec3(newPos.x, newPos.y, newPos.z) })
          .call(() => {
            if (!this.soundsObj.boolSound) {
              // this.audio.play();
              this.soundManager.playSoundEffect(
                ResourceUtils.getInstance().getMusicFile("swap"),
                false
              );
            }
            this.checkPuzzle();
          })
          .start();
      }
    }
  }
  //---------------END OF CheckOrder2
  checkPuzzle() {
    var FirstNode = this.node.parent?.getChildByName("0");
    var secNode = this.node.parent?.getChildByName("1");

    if (!FirstNode || !secNode) {
      return;
    }
    var FirstNodePos = FirstNode.getPosition();
    var check = 0;
    if (FirstNode.getPosition().y > secNode.getPosition().y) {
      check = 1;
      for (var i = 1; i < this.GnumOfSlice; i++) {
        var remaingNode = this.node.parent.getChildByName(`${i}`);
        var distance = Vec3.distance(remaingNode.getPosition(), FirstNodePos);
        if (
          distance + 10 >= i * (this.imageSprite.height / this.GnumOfSlice) &&
          distance - 10 <= i * (this.imageSprite.height / this.GnumOfSlice)
        ) {
        } else {
          check = 0;
        }
      }
    }
    if (check) {
      if (!this.soundsObj.boolSound) {
        this.soundManager.playSoundEffect(
          ResourceUtils.getInstance().getMusicFile("Sky-Puzzle"),
          false
        );
        // console.log("win sound");
      }
      //let mid = Math.floor(this.GnumOfSlice / 2);
      //   let c = this.node.parent.getChildByName(`${mid}`);
      //this.// = true;
      this.imageCallback(true);
    }
  }
  //---------------END OF checkPuzzle
  update(deltaTime: number) {}
}

import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  SpriteFrame,
  Sprite,
  UITransform,
  AudioSource,
} from "cc";
import { GamePlay } from "./gamePlay";
import { glowing } from "./glowing";
import { SoundManager } from "./managers/soundManager";
import { SingletonClass } from "./singleTon";
import { ResourceUtils } from "./managers/resourceUtils";
import { loadImages } from "./loadImages";
const { ccclass, property } = _decorator;

@ccclass("resourceLoader")
export class resourceLoader extends Component {
  // @property({ type: Prefab }) loading: Prefab = null;
  // @property({ type: Prefab }) settingMenu: Prefab = null;
  // @property(Node) winSound: Node = null;

  @property({ type: Prefab }) imageSlicer: Prefab = null;
  @property({ type: Prefab }) endPrefab: Prefab = null;
  @property({ type: Prefab }) glowPrefab: Prefab = null;
  @property(Node) musicAudioSource: Node = null;
  @property(Node) soundAudioSource: Node = null;
  inc: number = 0;
  // load: Node = null;

  // startButton: Node = null;
  glowInstantiate: Node = null;
  startGame: Node = null;
  ImageSlide: Node = null;
  end: Node = null;
  nextButton: Node = null;

  img: SpriteFrame = null;
  result: Boolean = false;
  soundsObj: SingletonClass = null;
  soundManager: SoundManager = null;
  imageI: loadImages = null;

  start() {
    this.imageI = loadImages.getInstance();
    this.initAudioSource();
    this.soundsObj = SingletonClass.getInstance();
    this.soundManager = SoundManager.getInstance();
    ResourceUtils.getInstance().loadMusicFiles();
  }
  initAudioSource() {
    SoundManager.getInstance().init(
      this.musicAudioSource.getComponent(AudioSource)!
    );
    SoundManager.getInstance().initSoundEffectAS(
      this.soundAudioSource.getComponent(AudioSource)!
    );
  }

  handleStartButtonClick() {
    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    this.startGame = this.node.getChildByName("StartGame");
    this.startGame.active = false;
    // this.startButton = this.startGame.getChildByName("StartButton");
    // this.startButton.active = false;
    // this.load = instantiate(this.loading);
    // this.node.addChild(this.load);
    this.addSlider();
  }
  restart() {
    this.handleStartButtonClick();
  }
  addSlider() {
    // this.load.destroy();
    this.result = false;
    this.startGame.active = false;
    this.ImageSlide = instantiate(this.imageSlicer);
    this.node.addChild(this.ImageSlide);
    this.controlButtons();
    this.setSelectedImage();
  }
  setSelectedImage() {
    this.img = SpriteFrame.createWithImage(this.imageI.imageArray[this.inc]);
    this.ImageSlide.getComponent(GamePlay).setImageforSlice(
      this.imageI.imageArray[this.inc],
      this.inc,
      this.addGlow
    );
    // let imageI = SpriteFrame.createWithImage(this.imageI.imageArray[this.inc]);
    // console.log(this.imageI.imageArray[this.inc]);
    // console.log(" this.ImageSlide : ", this.ImageSlide);
  }
  controlButtons() {
    this.nextButton = this.ImageSlide.getChildByName("nextImage");
    let resetBtn = this.ImageSlide.getChildByName("resetImage");
    let prevImage = this.ImageSlide.getChildByName("prevImage");
    prevImage.on("click", this.prevImage, this);
    resetBtn.on("click", this.resetImage, this);
    this.nextButton.on("click", this.nextImage, this);
  }
  prevImage = () => {
    this.soundManager.CanPlayMusic = false;

    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    // this.startButton.active = true;
    // this.load.destroy();
    this.ImageSlide.destroy();
    this.startGame.active = true;
    this.inc = 0;
  };
  resetImage = () => {
    this.soundManager.CanPlayMusic = false;
    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    if (this.result) {
      this.glowInstantiate.destroy();
    }
    this.ImageSlide.getComponent(GamePlay).setImageforSlice(
      this.imageI.imageArray[this.inc],
      this.inc,
      this.addGlow
    );
  };
  nextImage = () => {
    this.imageI.index++;
    // if (this.inc >= 20) {
    //     this.inc = 0;
    // }
    this.soundManager.CanPlayMusic = false;
    //console.log("Next Image button");
    if (this.inc < this.imageI.imageArray.length - 1) {
       if (this.result) {
      ++this.inc;
      this.ImageSlide.destroy();
      this.addSlider();
       }
    } else {
      // console.log("END OF ARRAY");
      this.inc = 0;
      this.ImageSlide.destroy();
      this.end = instantiate(this.endPrefab);
      this.node.addChild(this.end);
      let reset = this.end.getChildByName("Button");
      //  console.log(reset);
      reset.on("click", this.resetGame, this);
    }
  };

  addGlow = () => {
    //this.result = result;
    // let nextBtn = this.ImageSlide.getChildByName("nextImage");
    this.nextButton.getComponent(Sprite).grayscale = false;
    this.glowInstantiate = instantiate(this.glowPrefab);
    this.glowInstantiate.getComponent(glowing).blink(this.img);
    let maskSprite = this.glowInstantiate.getChildByName("imageSprite");
    let maskContent = this.glowInstantiate.getChildByName("Mask");
    this.ImageSlide.addChild(this.glowInstantiate);
    // this.glowInstantiate.setPosition(0, pos.y, 0);
    let imageRect = this.img.rect;
    maskSprite.getComponent(UITransform).height = imageRect.height;
    maskSprite.getComponent(UITransform).width = imageRect.width;
    maskContent.getComponent(UITransform).height = imageRect.height;
    maskContent.getComponent(UITransform).width = imageRect.width;
  };
  resetGame() {
    let end = this.node.getChildByName("endscene");
    end.destroy();
    // this.startButton.active = true;
    let startGameNode = this.node.getChildByName("StartGame");
    startGameNode.active = true;
  }

  update() {
    // this.inc=this.imageI.index;
    if (this.soundsObj.boolSound) {
      this.soundManager.CanPlayMusic = false;
    }
  }
}

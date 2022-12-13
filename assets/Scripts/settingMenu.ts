import { _decorator, Component, SpriteFrame, Sprite } from "cc";
import { SingletonClass } from "./singleTon";
const { ccclass, property } = _decorator;
import { SoundManager } from "./managers/soundManager";
import { ResourceUtils } from "./managers/resourceUtils";

@ccclass("SetiningMenu")
export class SetiningMenu extends Component {
  @property({ type: Sprite })
  musicButoon: Sprite = null;
  @property({ type: Sprite })
  SoundButoon: Sprite = null;

  @property({ type: SpriteFrame })
  ButtonOn: SpriteFrame = null;

  @property({ type: SpriteFrame })
  ButtonOff: SpriteFrame = null;

  soundsObj: SingletonClass = null;
  soundManager: SoundManager = null;
  start() {
    this.soundsObj = SingletonClass.getInstance();
    this.soundManager = SoundManager.getInstance();
    if (!this.soundsObj.boolSound) {
      this.SoundButoon.spriteFrame = this.ButtonOn;
    }
    if (!this.soundsObj.boolMusic) {
      this.musicButoon.spriteFrame = this.ButtonOn;
    }
  }
  handleStartButtonClick() {
    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    if (this.soundsObj.boolSound) {
      this.soundManager.CanPlaySound = this.soundsObj.boolSound;
      this.soundsObj.offsound();
      this.SoundButoon.spriteFrame = this.ButtonOn;

      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    } else {
      this.soundManager.CanPlaySound = false;
      this.soundsObj.onSound();
      this.SoundButoon.spriteFrame = this.ButtonOff;
      this.soundManager.stopSoundEffect();
    }
  }
  handleStartButtonClick2() {
    if (this.soundsObj.boolMusic) {
      this.soundManager.CanPlayMusic = false;
    }
    if (this.soundsObj.boolMusic) {
      this.soundManager.CanPlayMusic = this.soundsObj.boolMusic;
      this.soundsObj.offMusic();
      this.musicButoon.spriteFrame = this.ButtonOn;

      this.soundManager.playMusicClip(
        ResourceUtils.getInstance().getMusicFile("Music"),
        true
      );
    } else {
      this.soundManager.CanPlayMusic = false;
      this.soundsObj.onMusic();
      this.musicButoon.spriteFrame = this.ButtonOff;

      this.soundManager.stopMusic();
    }
  }
  close() {
    if (!this.soundsObj.boolSound) {
      this.soundManager.playSoundEffect(
        ResourceUtils.getInstance().getMusicFile("sound"),
        false
      );
    }
    this.node.parent.active = false;
  }

  update(deltaTime: number) {}
}

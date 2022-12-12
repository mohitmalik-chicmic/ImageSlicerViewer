import { _decorator, Component, Node, AudioSource } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Audio")
export class Audio extends Component {
  @property(AudioSource)
  public _audioSource: AudioSource = null!;
  start() {}
  Audiostart() {
    this._audioSource.play();
  }

  update(deltaTime: number) {}
}

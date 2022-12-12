import { _decorator, Component, ImageAsset, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadImages")
export class loadImages extends Component {
  index = 0;
  imageArray: ImageAsset[] = [];

  private static _instance: loadImages = new loadImages();
  public static getInstance(): loadImages {
    return loadImages._instance;
  }
  private constructor() {
    super();
    resources.loadDir("images", ImageAsset, (err, item) => {
      if (err) {
        console.log("ERROR IN LOADING");
      } else {
        this.imageArray = item;
        console.log("Array length", item.length);
      }
    });
  }
  getImage() {
    return this.imageArray[this.index];
  }
}

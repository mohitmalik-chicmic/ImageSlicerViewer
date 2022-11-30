import { _decorator, Component, resources, Asset, Prefab, AudioClip, error, VideoClip, SpriteFrame } from "cc";
// import { LOG_VISIBILITY } from "../Common/Costant";
// import { consoleMyLog } from "../Common/Utility";
const { ccclass } = _decorator;

//Loads all the resources on login.

@ccclass("ResourceUtils")
export class ResourceUtils extends Component {
    _musicFiles: AudioClip[] = [];
    _gameResource: Record<string, any> = {};
    public static _instance: ResourceUtils;

    start() {}

    public static getInstance() {
        if (!ResourceUtils._instance) {
            ResourceUtils._instance = new ResourceUtils();
        }
        return ResourceUtils._instance;
    }

    

    public musicFiles() {
        return new Promise((resolve, reject) => {
            if (this._musicFiles.length > 0) {
                resolve(this._musicFiles);
            } else {
                resources.loadDir(`audio`, (err: Error | null, data: AudioClip[]) => {
                    if (err) {
                        console.log("ERROR");
                        
                        reject(err);
                        error("load audio files :" + err);
                    } else {
                        console.log("LOADED: ",data);

                        this._musicFiles = data;
                    }
                    resolve(this._musicFiles);
                });
            }
        });
    }

    public getMusicFile(name: string):AudioClip{
        if (this._musicFiles) {
            let clip = this._musicFiles.find((clip) => clip.name == name);
            return clip || null;
        }
    }
}

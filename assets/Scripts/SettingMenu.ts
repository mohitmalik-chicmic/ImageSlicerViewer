import { _decorator, Component, Node, AudioSource, AudioClip, Prefab, Button, SpriteFrame, Sprite } from 'cc';
import { SingletonClass } from './SingleTon';
const { ccclass, property } = _decorator;
import { SoundManager } from './Managers/SoundManager';
import { ResourceUtils } from './Managers/ResourceUtils';

@ccclass('SetiningMenu')
export class SetiningMenu extends Component {
    @property({type:AudioClip})
    audio:AudioClip=null;
    @property({type:AudioClip})
    Sound:AudioClip=null;
    @property({type:Sprite})
    musicButoon:Sprite=null;
    @property({type:Sprite})
    SoundButoon:Sprite=null;

    @property({type:SpriteFrame})
    ButtonOn:SpriteFrame=null;

    @property({type:SpriteFrame})
    ButtonOff:SpriteFrame=null;
   
    
    soundsObj:any=null;
    soundManager:any=null;
    start() {
        this.soundsObj=SingletonClass.getInstance();
        this.soundManager = SoundManager.getInstance();
        if(!this.soundsObj.boolSound){
        this.SoundButoon.spriteFrame=this.ButtonOn;
        }
    }
    handleStartButtonClick(){
        console.log("function call");
        
        if(!this.soundsObj.boolSound){
            
            this.soundManager.playSoundEffect( ResourceUtils.getInstance().getMusicFile("sound"),false);
        }
        if(this.soundsObj.boolSound){
            this.soundManager.canPlaySound=this.soundsObj.boolSound;
            this.soundsObj.offsound();
            this.SoundButoon.spriteFrame=this.ButtonOn;
            
            this.soundManager.playSoundEffect( ResourceUtils.getInstance().getMusicFile("sound"),false);
        }else{
            this.soundManager.canPlaySound=false;
            this.soundsObj.onSound();
            this.SoundButoon.spriteFrame=this.ButtonOff;
            this.soundManager.stopSoundEffect();
        }
    }
    handleStartButtonClick2 (){
        
      
        if(this.soundsObj.boolMusic){
            this.soundManager.canPlayMusic=this.soundsObj.boolMusic;
            this.soundsObj.offMusic();
            this.musicButoon.spriteFrame=this.ButtonOn;
            
            this.soundManager.playMusicClip( ResourceUtils.getInstance().getMusicFile("Music"),true);
        }else{ 
            this.soundManager.canPlayMusic=false;
            this.soundsObj.onMusic();
            this.musicButoon.spriteFrame=this.ButtonOff;
           
            this.soundManager.stopMusic();
        }
    }
    close(){
        if(!this.soundsObj.boolSound){
            
            this.soundManager.playSoundEffect( ResourceUtils.getInstance().getMusicFile("sound"),false);
        }
        this.node.parent.active=false;

    }

    update(deltaTime: number) {
         
    }
}


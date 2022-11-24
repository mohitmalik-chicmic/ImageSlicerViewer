import { _decorator, Component, Node, resources, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Singleton')
export class Singleton{
     _temp: any = null;
    private static instance  : Singleton;
    private constructor(){
        resources.loadDir("JSON", JsonAsset , (err,item)=>{
            console.log(item)
            this._temp  = item;
        })
    }

    public static getInstance() : Singleton{
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    // get temp():JsonAsset[]{
    //     return this._temp;
    // }
    // set temp(val : JsonAsset[]){
    //     this._temp  = val
    // }
}




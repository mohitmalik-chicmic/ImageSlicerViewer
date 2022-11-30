import { JsonAsset, resources } from "cc";


export class SingletonClass {
    
    boolMusic:Boolean=true;
    boolSound:Boolean=false;

    private static _instance:SingletonClass = new SingletonClass();
    public static getInstance():SingletonClass
    {
        return SingletonClass._instance;
    }
    
    onSound(){
        this.boolSound=true;
    }
    offsound(){
        this.boolSound=false;
    }

    onMusic(){
        this.boolMusic=true;
    }
    offMusic(){
        this.boolMusic=false;
    }
} 


// currentlvl=0;
//     value;
//     private static _instance:SingletonClass = new SingletonClass();
//     public static getInstance():SingletonClass
//     {
//         return SingletonClass._instance;
//     }

//     constructor(){
    
//         resources.loadDir("Json",JsonAsset, (err , item)=>{
//         if (err) {
//             console.log("ERROR IN LOADING");
//         }else{
//             console.log(item);
//             this.value=item;
           
//         } 
//         return item;
//     });
    
//     }
//     setLvl(number){
//         this.currentlvl=number;

//     }
//     getLvl(){
//         return this.currentlvl;
//     }
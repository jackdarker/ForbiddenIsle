"use strict";
//stuff for ForbiddenIsle
window.gm.initGameFlags = function(forceReset,NGP=null) {
    let s= window.story.state,map,data;
    function dataPrototype(){return({visitedTiles:[],mapReveal:[],tmp:{},version:0});}
    if (forceReset) {  
      s.Settings=s.DngSY=null; 
      s.Lab=s.Known=null;
    }
    let Settings = {
      showCombatPictures:true,
      showNSFWPictures:true,
      showDungeonMap:true
    };
    let DngSY = {
        remainingNights: -1,
        resourceForest: 5,   //number resource left
        exploreForest:0,
        visitedTiles: [],mapReveal: [],
        dng:'', //current dungeon name
        prevLocation:'', nextLocation:'', //used for nav-logic
        dngMap:{} //dungeon map info
    };
    let Lab={} //see brewInit
    let Known={ //flags for things you know, see Data.ods
      recipes:{}  //'LustPotion:20%'
      ,places:{},study:{}
    }
    //see comment in rebuildFromSave why this is done
    s.Settings=window.gm.util.mergePlainObject(Settings,s.Settings);
    s.DngSY=window.gm.util.mergePlainObject(DngSY,s.DngSY);
    s.Lab=window.gm.util.mergePlainObject(Lab,s.Lab);
    s.Known=window.gm.util.mergePlainObject(Known,s.Known);
    //todo cleanout obsolete data ( filtering those not defined in template) 
  }

window.gm.printGoto=function(location,time,energy,alias){
    let msg='';
    msg=window.gm.printLink((alias===''?location:alias)+((time>0)?' ('+time+'min)':''),
    "window.gm.addTime("+time.toString()+");window.story.show(\""+location+"\");")
    return(msg);
};
class effFoodEffect extends Effect {
    static factory(type){
        window.storage.registerConstructor(effFoodEffect);
        let eff = new effFoodEffect();
        eff.type = type;
        eff.data.id=eff.data.name='eff'+type;
        return(eff);
    }
    constructor(){
        super();
        this.data.id = this.data.name= effFoodEffect.name, this.data.hidden=0;
        this.data.duration = 120,this.data.cycles = 1, this.data.magnitude = 1;
    }
    toJSON(){return window.storage.Generic_toJSON("effFoodEffect", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(effFoodEffect, value.data);};
    get desc(){return(this.data.name);}

    onTimeChange(time){
        var delta = window.gm.getDeltaTime(time,this.data.time);
        this.data.time = time;
        this.data.duration-= delta;
        if(this.data.duration<0){
            delta = delta+this.data.duration; // if delta is 20 but remaining duration is only 5, delta should be capped to 5
            this.data.duration =0;
        }
        /*this.parent.parent.Stats.increment('energy',10*delta/60);
        this.parent.parent.Stats.increment('health',10*delta/60);
        this.parent.parent.Stats.increment('will',10*delta/60);    */    
        if(this.data.duration<=0){ 
            this.data.cycles-=1;
            if(this.data.magnitude>=2){
                this.__trgMutation();
            }
            if(this.data.cycles<=0){//remove yourself
                return(function(me){return function(Effects){ 
                    Effects.removeItem(me.data.id);}
                }(this));
            }            
        }
        return(null);
    }
    __trgMutation(){
        let _i = this.parent.findItemSlot(effMutateHorse.name);
        if(_i===-1){ //todo extend if exist?
            this.parent.parent.addEffect(new effMutateHorse(),effMutateHorse.name );
        }
    }
    onApply(){
        this.data.duration = 120;
        this.data.time = window.gm.getTime();
        if(this.data.id='effBrownPill'){
            this.parent.parent.Stats.addModifier('arm_poison',{id:'arm_poison:'+this.data.name, bonus:25});
        }
    }
    onRemove(){
        if(this.data.id='effBrownPill'){
            this.parent.parent.Stats.addModifier('arm_poison',{id:'arm_poison:'+this.data.name, bonus:25});
        }  this.parent.parent.Stats.addModifier('rst_pierce',{id:'rst_pierce:'+this.data.name, bonus:25});
    }
    merge(neweffect){
        if(neweffect.id===this.data.id){
            this.onApply(); //refresh 
            this.data.magnitude +=1; //bonus effect triggers only if added multiple times
            return(true);
        }
    }
}
class Food extends Item {
    constructor(){ super('Food'); this.addTags([window.gm.ItemTags.Food]);this.price=this.basePrice=15;this.style=0;}
    toJSON(){return window.storage.Generic_toJSON("Food", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(Food, value.data);};
    usable(context,on=null){return({OK:true, msg:'eat'});}
    use(context,on=null){ 
        var _txt='';
        if(context instanceof Inventory){
            if(on===null) on=context.parent;
            context.removeItem(this.id);
            if(on instanceof Character){ 
                //on.addEffect(effPillEffect.factory(this.id));
                _txt=on.name+' ate something. ';
                return({OK:true, msg:_txt});
            }
        } else throw new Error('context is invalid');
    }
    set style(style){
        this._style = style;
        if(style===0) this.id=this.name='SnackBar';
        else if(style===20) this.id=this.name='PepperBell';
        else if(style===30) this.id=this.name='StraightBanana';
        else if(style===40) this.id=this.name='SquishyMelon';
        else if(style===50) this.id=this.name='JuicyPeach';
        else if(style===60) this.id=this.name='SmellyPear';
        else throw new Error(this.id +' doesnt know '+style); 
    }
    get style(){return this._style;}
    get desc(){ 
        let msg =this.name;
        return(msg);
    }
  }
  window.gm.ItemsLib = (function (ItemsLib){
    window.storage.registerConstructor(Food);
    ItemsLib['SnackBar'] = function(){ let x= new Food();x.style=0;return(x);};
    ItemsLib['PepperBell'] = function(){ let x= new Food();x.style=30;return(x);};
    ItemsLib['StraightBanana'] = function(){ let x= new Food();x.style=30;return(x);};
    ItemsLib['SquishyMelon'] = function(){ let x= new Food();x.style=40;return(x);};
    ItemsLib['JuicyPeach'] = function(){ let x= new Food();x.style=50;return(x);};
    ItemsLib['SmellyPear'] = function(){ let x= new Food();x.style=60;return(x);};
    return ItemsLib; 
  }(window.gm.ItemsLib || {}));
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
class effMutator extends Effect {
    static factory(type){
        window.storage.registerConstructor(effMutator);
        let eff = new effMutator();
        //eff.type = type;eff.data.id=eff.data.name='eff'+type;
        return(eff);
    }
    static mutatorDataProto(){ return(
        {
            Ass:0.0,    //Ass
            Chest:0.0,    //Chest
            Face:0.0,    //Face
            Genital:0.0,    //Genital
            Hair:0.0,
            Hip:0.0,    //Hips
            Skin:0.0,
            Torso:0.0,    //torso

            F:0.0,    //feminin
            M:0.0,    //masculin

            Cat:0.0,
            Horse:0.0
        }
    );}
    static mVector(vA,vB) { 
        let diff=0.0,sum=0.0;
        for (const key in vA) {
            diff=vA[key]-vB[key];
            if(diff<0) break; //mutator A is valid if every item is bigger then B
            sum+=diff*diff; //c²=a²+b²
        }
        if(diff<0) return(-1);
        return(sum); //value close to 0: best fit; largest value = overshot
    }
    static vectorForId(id) {
        let v=effMutator.mutatorDataProto();
        switch(id){
            case "SquishyMelon":
                v.F=0.5,v.Ass=0.5,v.Chest=0.4;
                break;
            case "StraightBanana":
                v.M=0.5,v.Torso=0.1,v.Genital=0.4;
                break;
            default:
                break;
        }
        return(v);
    }
    constructor(){
        super();
        this.data.id = this.data.name= effMutator.name, this.data.hidden=0;
        this.data.duration = 120,this.data.cycles = 1, this.data.magnitude = 1;
        /**/
        this.Stack=[];
        // timestamp: window.gm.getTime()
        // source: ""
        // factor: 1.0
        // values: {}
    }
    toJSON(){return window.storage.Generic_toJSON("effMutator", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(effMutator, value.data);};
    get desc(){return(this.data.name);}

    addMutator(mutator){
        let i=-1,_item;
        for(i=this.Stack.length-1;i>=0;i--){
            if(this.Stack[i].source==mutator) { //similiar already present?
               break;
            }
        }
        if(i>-1){ //then update entry..
            _item=this.Stack[i];
            _item.timestamp=window.gm.getTime();
            _item.factor=1.0//+_item.factor; //TODO sum up or 1+ factor*50% ?
        } else { //else push to stack
            this.Stack.push({timestamp: window.gm.getTime(),source:mutator,factor:1.0,values:effMutator.vectorForId(mutator)});
        }
    }
    sumupMutators() {
        let v=effMutator.mutatorDataProto();
        for(i=this.Stack.length-1;i>=0;i--){
            for (const key in v) {
                v[key]+=this.Stack[i].values[key];
            }
        }
        return(v);
    }
    findMutation(trigger){//check what mutators got accumulated and fit the trigger
        //triggers: "sleep","hungry","horny","fuckedAnal"
        //search all mutators that
        //  - enough mutators
        //  - precondition met
        //
        let i,res,entry,mut, valid=[];
        let sum=this.sumupMutators();
        for (const key in window.gm.Mutators) {
            mut= window.gm.Mutators[key];
            entry = {id:key,v:effMutator.mVector(sum,mut.m)};
            if(entry.v>=0) valid.push(entry)
        }
        valid.sort((a,b)=>a.v-b.v); //sort by best match
        for(i=0;i<valid.length;i++){ //check requirement
            entry=window.gm.Mutators[valid[i].id];
            res=entry.req(this.parent.parent);
            if(res.OK==true) {
                let foo=entry.f.bind(null,this.parent.parent,entry.mag);
                foo();
                this.Stack=[]; //todo remove only usedup mutators
               break;
            }
        }
        return(null);
    }
    onTimeChange(time){
        var delta = window.gm.getDeltaTime(time,this.data.time);
        
        return(null);
    }
    onApply(){
        this.data.duration = 120;
        this.data.time = window.gm.getTime();
    }
    onRemove(){
    }
    merge(neweffect){
        if(neweffect.id===this.data.id){
            this.onApply(); //refresh 
            this.data.magnitude +=1; //bonus effect triggers only if added multiple times
            return(true);
        }
    }
}
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
                on.Effects.get(effMutator.name).addMutator(this.id);
                _txt=on.name+' ate something. ';
                return({OK:true, msg:_txt});
            }
        } else throw new Error('context is invalid');
    }
    set style(style){
        this._style = style;
        if(style===0) this.id=this.name='SnackBar';
        else if(style===20) this.id=this.name='BellPepper';
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
class CraftMaterial extends Item {
    constructor(){ super('CraftMaterial');
        this.addTags([window.gm.ItemTags.Material]); this.price=this.basePrice=10;   
        this.style=0;this.lossOnRespawn = true;
    }
    set style(style){ 
        this._style = style; 
        if(style===0) this.id='Branch',this.name='Branch';
        else if(style===10) this.id=this.name='ObsidianShard';
        else throw new Error(this.id +' doesnt know '+style);
    }
    get style(){return this._style;}
    get desc(){ 
        let msg ='';
        switch(this._style){
            case 0: 
                msg ='wodden branch';
                break;
            case 10: 
                msg ='shard from obsidian';
                break;
            default: throw new Error(this.id +' doesnt know '+style);
        }
        return(msg);
    }
    toJSON(){return window.storage.Generic_toJSON("CraftMaterial", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(CraftMaterial, value.data);};
}
class Tools extends Item{
    constructor(){ super('Tools');
        this.addTags([window.gm.ItemTags.Tool]); this.price=this.basePrice=10;   
        this.style=0;this.lossOnRespawn = true;
    }
    set style(style){ 
        this._style = style; 
        if(style===0) this.id='Lighter',this.name='Lighter';
        else if(style===10) this.id=this.name='HandAxe';
        else if(style===20) this.id=this.name='ButterflyNet';
        else throw new Error(this.id +' doesnt know '+style);
    }
    get style(){return this._style;}
    get desc(){ 
        let msg ='';
        switch(this._style){
            case 0: 
                msg ='a storm lighter';
                break;
            case 10: 
                msg ='hand axe made from stone';
                break;
            case 20: 
                msg ='a net attached to a stick to catch butterfly or small fish';
                break;
            default: throw new Error(this.id +' doesnt know '+style);
        }
        return(msg);
    }
    toJSON(){return window.storage.Generic_toJSON("Tools", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(Tools, value.data);};
}

window.gm.ItemsLib = (function (ItemsLib){
window.storage.registerConstructor(Food);
ItemsLib['SnackBar'] = function(){ let x= new Food();x.style=0;return(x);};
ItemsLib['BellPepper'] = function(){ let x= new Food();x.style=30;return(x);};
ItemsLib['StraightBanana'] = function(){ let x= new Food();x.style=30;return(x);};
ItemsLib['SquishyMelon'] = function(){ let x= new Food();x.style=40;return(x);};
ItemsLib['JuicyPeach'] = function(){ let x= new Food();x.style=50;return(x);};
ItemsLib['SmellyPear'] = function(){ let x= new Food();x.style=60;return(x);};
ItemsLib['Branch'] = function(){ let x= new CraftMaterial();x.style=0;return(x);}
ItemsLib['ObsidianShard'] = function(){ let x= new CraftMaterial();x.style=10;return(x);}

ItemsLib['Lighter'] = function(){ let x= new Tool();x.style=0;return(x);}
ItemsLib['HandAxe'] = function(){ let x= new Tool();x.style=10;return(x);}
ItemsLib['ButterflyNet'] = function(){ let x= new Tool();x.style=20;return(x);}
return ItemsLib; 
}(window.gm.ItemsLib || {}));
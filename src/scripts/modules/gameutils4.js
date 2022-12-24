"use strict";
//stuff for ForbiddenIsle
window.gm.initGameFlags = function(forceReset,NGP=null) {
    let s= window.story.state;
    function dataPrototype(){return({visitedTiles:[],mapReveal:[],tmp:{},version:0});}
    if (forceReset) { 
        s.NGP=s.Settings=s.DngSY=null; 
        s.Lab=s.Known=null;
    }
    let Settings = {
      showCombatPictures:true,
      showNSFWPictures:true,
      showDungeonMap:true
    };
    let DngSY = {
        remainingNights: -1,
        resourceForest: {wood:5,fruit:5},   //number resource left
        exploreForest:0,
        exploreHill:0,
        exploreBeach:0,
        campUpgrade:{}, //see Data.ods
        talkEric:{},
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
    if(!NGP) { //init if missing
        NGP={token:0,tokenUsed:0,xForestFood:0,increasedSatiation:0,willOnSatiated:0}
    }else{ //grant NGP-options; window.gm.player is not valid yet!
        if(!!NGP.ProteinBars) window.story.state.PlayerVR.Inv.addItem(window.gm.ItemsLib["SnackBar"](),12);
    }
    if(!window.gm.achievements){//||forceReset) { 
        window.gm.resetAchievements();
    }
    window.storage.loadAchivementsFromBrowser();

    //see comment in rebuildFromSave why this is done
    s.Settings=window.gm.util.mergePlainObject(Settings,s.Settings);
    s.NGP=window.gm.util.mergePlainObject(NGP,s.NGP);
    s.DngSY=window.gm.util.mergePlainObject(DngSY,s.DngSY);
    s.Lab=window.gm.util.mergePlainObject(Lab,s.Lab);
    s.Known=window.gm.util.mergePlainObject(Known,s.Known);
    //todo cleanout obsolete data ( filtering those not defined in template) 
}
window.gm.resetAchievements = function() { //declare achievements here
    window.gm.achievements={
        looseEnd: 0 //
        ,swamToFar: 0
        ,starveBreakfast:0
        ,survive7days: 0
        ,insaneTFHuman: 0
      }
      window.gm.achievementsInfo={ //this is kept separate to not bloat savegame
          //hidden bitmask: 0= all visisble, 1= Name ???, 2= Todo ???
          looseEnd: {set:1, hidden:3, name:"loose end", descToDo:"Find a loose end.",descDone:"Found a link without target. Gained a NGPtoken."} //
          ,starveBreakfast: {set:1, hidden:3, name:"starved at breakfast", descToDo:"Have nothing to eat at breakfast and no will.",descDone:"You starved at breakfast because you had no food left and no will to go and find something."} //
          ,swamToFar: {set:1, hidden:2, name:"swam to far", descToDo:"swim to far into the sea",descDone:"You swam to far and drowned."} //
          ,survive7days: {set:1, hidden:1, name:"survive 7 days", descToDo:"Make it to day 8.",descDone:"You survived a week. But this is only the beginning."} //
          ,insaneTFHuman: {set:1, hidden:1, name:"insane human TF", descToDo:"Got insane by transforming to much.",descDone:"You stayed human but all the TF are stressing you to much."} //
      }
}
window.gm.checkMutation= function(trigger){ //
    var f=window.gm.player.Effects.get("effMutator").findMutation(trigger);
    if(f) {
        f();
        //window.story.state.tmp.args=[(function(){window.gm.sex.growBreast({state:0});})];window.story.show('GenericPassage');
    }  
}

class effMutator extends Effect {
    static factory(type){
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
            Legs:0.0,
            Torso:0.0,    //torso
            Skin:0.0,
            Color:0.0,   

            F:0.0,    //feminin
            M:0.0,    //masculin
            //narrow-wide, short-long, slim- thick, soft-hard, elastic-plastic

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
        let G={v:effMutator.mutatorDataProto(),max:effMutator.mutatorDataProto()};
        switch(id){
            case "SquishyMelon":
                G.v.F=0.5,G.v.Ass=0.5,G.v.Chest=0.2;
                G.max.F=0.5,G.max.Ass=0.5,G.max.Chest=0.4;
                break;
            case "StraightBanana":
                G.v.M=0.5,G.v.Torso=0.1,G.v.Genital=0.2;
                G.max.M=0.5,G.max.Torso=0.1,G.max.Genital=0.4;
                break;
            case "HairyKiwi":
                G.v.F=0.2,G.v.Hair=0.2,G.v.Face=0.2;
                G.max.F=0.2,G.max.Hair=0.6,G.max.Face=0.2;
                break;
            case "SeaLettuce":
                G.v.F=-0.5,G.v.Ass=-0.2,G.v.Chest=-0.2;
                break;
            default:
                break;
        }
        return(G);
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
            _item.factor+=1.0; //TODO sum up or 1+ factor*50% ?
        } else { //else push to stack
            let G=effMutator.vectorForId(mutator);
            this.Stack.push({timestamp: window.gm.getTime(),source:mutator,factor:1.0,values:G.v,max:G.max});
        }
    }
    sumupMutators() {
        let factor,v=effMutator.mutatorDataProto(),max=effMutator.mutatorDataProto();
        for(i=this.Stack.length-1;i>=0;i--){
            factor=this.Stack[i].factor;
            for (const key in v) {
                v[key]+=factor*this.Stack[i].values[key];
                max[key]=Math.max(max[key],this.Stack[i].max[key]);
            }
        }
        for (const key in v) { //limit mutators
            v[key]=Math.max(0,Math.min(v[key],max[key])); //no neg. mutators? 
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
                //this.__trgMutation();
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
                on.Stats.increment("satiation",this.satiation*(1+window.story.state.NGP.increasedSatiation)),
                on.Stats.increment("energy",this.energy);
                on.Effects.get(effMutator.name).addMutator(this.id);
                _txt=on.name+' ate something. ';
                return({OK:true, msg:_txt});
            }
        } else throw new Error('context is invalid');
    }
    set style(style){
        this._style = style; this.satiation=10,this.energy=20;
        if(style===0) this.id=this.name='SnackBar',this.satiation=30,this.energy=50;
        else if(style===20) this.id=this.name='BellPepper';
        else if(style===30) this.id=this.name='StraightBanana';
        else if(style===40) this.id=this.name='SquishyMelon';
        else if(style===50) this.id=this.name='JuicyPeach';
        else if(style===60) this.id=this.name='SmellyPear';
        else if(style===70) this.id=this.name='HairyKiwi';
        else if(style===80) this.id=this.name='BreadFruit';
        else if(style===100) this.id=this.name='Oyster';    //https://en.wikipedia.org/wiki/List_of_types_of_seafood
        else if(style===110) this.id=this.name='Loco';
        else if(style===120) this.id=this.name='Sepia';
        else if(style===200) this.id=this.name='SeaGrapes'; //https://en.wikipedia.org/wiki/Edible_seaweed
        else if(style===210) this.id=this.name='SeaLettuce';
        else if(style===220) this.id=this.name='RawFish';
        else if(style===230) this.id=this.name='RoastedFish';
        //Cocoabean PewPepper Zwiebel
        //scrub
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
        if(style===0) this.id='Branch',this.name='crooked Branch';
        else if(style===5) this.id='SturdyBranch',this.name='sturdy Branch';
        else if(style===10) this.id="ObsidianShard",this.name='Obsidian Shard';
        else if(style===20) this.id="CookingPot",this.name='Cooking Pot';
        else throw new Error(this.id +' doesnt know '+style);
    }
    get style(){return this._style;}
    get desc(){ 
        let msg ='';
        switch(this._style){
            case 0: 
                msg ='crooked branch';
                break;
            case 5: 
                msg ='sturdy branch';
                break;
            case 10: 
                msg ='shard from obsidian';
                break;
            case 20: 
                msg ='cooking pot';
                break;
            default: throw new Error(this.id +' doesnt know '+style);
        }
        return(msg);
    }
    toJSON(){return window.storage.Generic_toJSON("CraftMaterial", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(CraftMaterial, value.data);};
}
class Tool extends Item{
    constructor(){ super('Tools');
        this.addTags([window.gm.ItemTags.Tool]); this.price=this.basePrice=10;   
        this.style=0;this.lossOnRespawn = true;
    }
    set style(style){ 
        this._style = style; 
        if(style===0) this.id='Lighter',this.name='Lighter';
        else if(style===10) this.id=this.name='HandAxe';
        else if(style===20) this.id=this.name='ButterflyNet';
        else if(style===30) this.id=this.name='CookingPot';
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
            case 30: 
                msg ='a old, dented but still usable cooking pot';
                break;
            default: throw new Error(this.id +' doesnt know '+style);
        }
        return(msg);
    }
    toJSON(){return window.storage.Generic_toJSON("Tool", this); };
    static fromJSON(value){ return window.storage.Generic_fromJSON(Tool, value.data);};
}

window.gm.ItemsLib = (function (ItemsLib){
    window.storage.registerConstructor(effFoodEffect);
    window.storage.registerConstructor(effMutator);
    window.storage.registerConstructor(Food);
    window.storage.registerConstructor(CraftMaterial);
    window.storage.registerConstructor(Tool);
ItemsLib['SnackBar'] = function(){ let x= new Food();x.style=0;return(x);};
ItemsLib['BellPepper'] = function(){ let x= new Food();x.style=30;return(x);};
ItemsLib['StraightBanana'] = function(){ let x= new Food();x.style=30;return(x);};
ItemsLib['SquishyMelon'] = function(){ let x= new Food();x.style=40;return(x);};
ItemsLib['JuicyPeach'] = function(){ let x= new Food();x.style=50;return(x);};
ItemsLib['SmellyPear'] = function(){ let x= new Food();x.style=60;return(x);};
ItemsLib['HairyKiwi'] = function(){ let x= new Food();x.style=70;return(x);};
ItemsLib['BreadFruit'] = function(){ let x= new Food();x.style=80;return(x);};
ItemsLib['Oyster'] = function(){ let x= new Food();x.style=100;return(x);};
ItemsLib['Loco'] = function(){ let x= new Food();x.style=110;return(x);};
ItemsLib['Sepia'] = function(){ let x= new Food();x.style=120;return(x);};
ItemsLib['SeaGrapes'] = function(){ let x= new Food();x.style=200;return(x);};
ItemsLib['SeaLettuce'] = function(){ let x= new Food();x.style=210;return(x);};
ItemsLib['RawFish'] = function(){ let x= new Food();x.style=220;return(x);};
ItemsLib['RoastedFish'] = function(){ let x= new Food();x.style=230;return(x);};

ItemsLib['Branch'] = function(){ let x= new CraftMaterial();x.style=0;return(x);}
ItemsLib['SturdyBranch'] = function(){ let x= new CraftMaterial();x.style=5;return(x);}
ItemsLib['ObsidianShard'] = function(){ let x= new CraftMaterial();x.style=10;return(x);}

ItemsLib['Lighter'] = function(){ let x= new Tool();x.style=0;return(x);}
ItemsLib['HandAxe'] = function(){ let x= new Tool();x.style=10;return(x);}
ItemsLib['ButterflyNet'] = function(){ let x= new Tool();x.style=20;return(x);}
ItemsLib['CookingPot'] = function(){ let x= new Tool();x.style=30;return(x);}
return ItemsLib; 
}(window.gm.ItemsLib || {}));
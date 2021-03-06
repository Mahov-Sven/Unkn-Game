import Component from "../Component.js";
import Card from "./Card.js";

export default class Flipcard extends Card {
	constructor(...args){
		super(...args);
	}

	init(){
		super.init();
		this._side = 0;
		this._front;
		this._back;
	}

	// Construction Functions

	construct(frontElem, backElem){
		this._constructRoot();
		this._constructFront(frontElem);
		this._constructBack(backElem);
		this._resize();
	}

	_constructRoot(){
		super._constructRoot();
		this.addClass("Flipcard");
		this.addClass("Front");
	}

	_constructFront(frontComponent){
		const frontContainer = new Component();
		frontContainer.addClass("FlipcardFront");
		frontContainer.addClass("FlipcardFace");
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");
		frontContainer.addClass("FlexCenter");

		frontContainer.append(frontComponent);
		this._front = frontContainer;
		this.append(frontContainer);
	}

	_constructBack(backElem){
		const backContainer = new Component()
		backContainer.addClass("FlipcardBack");
		backContainer.addClass("FlipcardFace");
		backContainer.addClass("FlexStatic");
		backContainer.addClass("FlexColumn");
		backContainer.addClass("FlexCenter");

		backContainer.append(backElem);
		this._back = backContainer;
	}

	attachEvents(){
		this.parent().perspective();
	}

	// General Functions

	allowScrollX(side){
		if(side === undefined || side === 0)
			this._front.allowScrollX();
		if(side === undefined || side === 1)
			this._back.allowScrollX();
	}

	allowScrollY(side){
		if(side === undefined || side === 0)
			this._front.allowScrollY();
		if(side === undefined || side === 1)
			this._back.allowScrollY();
	}

	async flip_(){
		switch(this._side){
			case 0: // Front to Mid
				this.removeClass("Front");
				this.addClass("Mid");
				this.addClass("FrontSpeed");
				await $.sleep_(50);
				break;
			case 1: // Back to Mid
				this.removeClass("Back");
				this.addClass("Mid");
				this.addClass("BackSpeed");
				await $.sleep_(200);
				break;
		}
		this._side = 1 - this._side;
		this.clear();
		this.append(this.sideElem());
		this.removeClass("Mid");
		switch(this._side){
			case 0: // Mid to Front
				this.removeClass("BackSpeed")
				this.addClass("Front");
				this.addClass("FrontSpeed");
				break;
			case 1: // Mid to Back
				this.removeClass("FrontSpeed");
				this.addClass("Back");
				this.addClass("BackSpeed");
				break;
		}
	}
	
	flipOn(eventName){
		this.on(eventName, () => this.flip_());
		if(eventName === "click") this.addClass("Button");
	}

	scrollX(side){
		if(side === undefined || side === 0)
			this._front.scrollX();
		if(side === undefined || side === 1)
			this._back.scrollX();
	}

	scrollY(side){
		if(side === undefined || side === 0)
			this._front.scrollY();
		if(side === undefined || side === 1)
			this._back.scrollY();
	}

	sideElem(side){
		switch((side || this._side)){
			case 0: return this._front;
			case 1: return this._back;
		}
	}
}
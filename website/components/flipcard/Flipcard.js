import Component from "../Component.js";

export default class Flipcard extends Component{
	constructor(...args){
		super(...args);
	}

	init(){
		super.init();
		this.side = 0;
	}

	construct(frontElem, backElem){
		this._constructRoot();
		this._constructFront(frontElem);
		this._constructBack(backElem);
	}

	_constructRoot(){
		this._create();
		this.addClass("Flipcard");
	}

	_constructFront(frontComponent){
		const frontContainer = new Component();
		frontContainer.addClass("FlipcardFront");
		frontContainer.addClass("FlipcardFace");
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");
		frontContainer.addClass("FlexCenter");

		frontContainer.append(frontComponent);
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
		this.append(backContainer);
	}

	_resizeCard(){
		this._elem.width(this._elem.children().eq(this.side).width());
		this._elem.height(this._elem.children().eq(this.side).height());
	}

	attachEvents(){
		this._resizeCard();
	}

	flip(){
		this.side = 1 - this.side;
		this.addClass("Transition");
		this._resizeCard();
		this.toggleClass("Active");
	}
	
	flipOn(eventName){
		this._elem.on(eventName, () => this.flip());
	}
}
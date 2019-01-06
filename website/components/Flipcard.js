import Component from "./Component.js";

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
		this.elem = Component.div();
		this.elem.addClass("Flipcard");
	}

	_constructFront(frontElem){
		const frontContainer = Component.div();
		frontContainer.addClass("FlipcardFront");
		frontContainer.addClass("FlipcardFace");
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");
		frontContainer.addClass("FlexCenter");

		frontContainer.append(frontElem);
		this.elem.append(frontContainer);
	}

	_constructBack(backElem){
		const backContainer = Component.div();
		backContainer.addClass("FlipcardBack");
		backContainer.addClass("FlipcardFace");
		backContainer.addClass("FlexStatic");
		backContainer.addClass("FlexColumn");
		backContainer.addClass("FlexCenter");

		backContainer.append(backElem);
		this.elem.append(backContainer);
	}

	_resizeCard(){
		this.elem.width(this.elem.children().eq(this.side).width());
		this.elem.height(this.elem.children().eq(this.side).height());
	}

	attachEvents(){
		this._resizeCard();
	}

	flip(){
		this.side = 1 - this.side;
		this.elem.addClass("Transition");
		this._resizeCard();
		this.elem.toggleClass("Active");
	}
	
	flipOn(eventName){
		this.elem.on(eventName, this.flip());
	}
}
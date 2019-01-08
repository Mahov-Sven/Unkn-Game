import Component from "./Component.js";

export default class Flipcard extends Component{
	constructor(...args){
		super(...args);
	}

	construct(title){
		this._constructRoot(title);
	}

	_constructRoot(title){
		this._create();
		this.addClass("Heading");
		this.addClass("Text");
		this.text(title);
	}
}
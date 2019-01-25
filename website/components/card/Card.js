import Component from "../Component.js";

export default class Flipcard extends Component{
	constructor(...args){
		super(...args);
	}

	init(){
		super.init();
		this._ratio; // w/h
		this._size;
	}

	// Construction Functions

	construct(){
		this._constructRoot();
		this._resize();
	}

	_constructRoot(){
		this._create();
		this.addClass("Card");
	}

	_resize(){
		if(this._size !== undefined && this._ratio !== undefined){
			const w = this._size * this._ratio;
			const h = this._size;
			this.width(w);
			this.height(h);
		}
	}

	// General Functions

	ratio(width, height){
		if(height === undefined) this._ratio = width;
		else this._ratio = width / height;
		this._resize();
	}

	size(size){
		this._size = size;
		this._resize();
	}
}
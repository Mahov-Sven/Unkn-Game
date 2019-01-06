export default class Component {
	constructor(...args){
		this.elem = undefined;
		this.init(...args);
		this.construct(...args);
	}

	init(...args){}

	construct(){
		this._constructRoot();
	}

	/**
	 * @abstract
	 */
	_constructRoot(){
		throw new Error(`Subclass ${this.constructor.name} did not override the _constructRoot method`);
	}

	attachEvents(){}

	static div(){
		return $("<div>");
	}
}
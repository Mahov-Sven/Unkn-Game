export default class Component {
	constructor(...args){
		this._elem = undefined;
		this.init(...args);
		this.construct(...args);
	}

	_create(){
		this._elem = Component.div();
	}

	init(){}

	construct(elem){
		this._constructRoot(elem);
	}

	_constructRoot(elem){
		if(elem === undefined) this._create();
		else if(typeof elem === "string") this._elem = $(`#${elem}`);
		else this._elem = elem;
	}

	attachEvents(){}

	addClass(className){
		this._elem.addClass(className);
	}

	_append(elem){
		this._elem.append(elem);
	}

	append(component){
		this._append(component.elem());
	}

	clear(){
		this._elem.empty();
	}

	click(event){
		this._elem.click(event);
	}
	
	elem(){
		return this._elem;
	}

	_find(query){
		return new Component(this._elem.find(query));
	}

	findClass(className){
		return this._find(`.${className}`);
	}

	findId(id){
		return this._find(`#${id}`);
	}

	id(id){
		this._elem.attr("id", id);
	}

	text(txt){
		this._elem.text(txt);
	}

	toggleClass(className){
		this._elem.toggleClass(className);
	}

	static div(){
		return $("<div>");
	}
}
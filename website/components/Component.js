export default class Component {
	constructor(...args){
		/** @type Element */
		this._parent = undefined;
		/** @type Element */
		this._elem = undefined;
		this.init(...args);
		this.construct(...args);
	}

	// Construction Functions

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

	append(comp){
		this._elem.append(comp._elem);
		comp._parent = this;
	}

	// General Functions

	addClass(className){
		this._elem.classList.add(className);
	}

	allowScrollX(){
		this.addClass("AllowScroll");
		this.addClass("X");
	}

	allowScrollY(){
		this.addClass("AllowScroll");
		this.addClass("Y");
	}

	attr(attrName, attrValue){
		this._elem.setAttribute(attrName, attrValue);
	}

	clear(){
		for (let child = this._elem.firstChild; child !== null; child = this._elem.firstChild) {
			this._elem.removeChild(child);
		}
	}

	click(event){
		this.on("click", event);
	}

	child(index){
		return new Component(this._elem.children[index]);
	}

	children(){
		const children = [];
		for(const child of this._elem.children)
			children.push(new Component(child));
		return children;
	}

	css(prop, value){
		if(value === undefined) return this._elem.style[prop];
		else this._elem.style[prop] = value;
	}

	elem(){
		return this._elem;
	}

	_find(query){
		return new Component(this._elem.querySelector(query));
	}

	findClass(className){
		return this._find(`.${className}`);
	}

	findId(id){
		return this._find(`#${id}`);
	}

	height(height){
		if(height === undefined) return this._elem.clientHeight;
		else this.css("height", Component._toValidCSSQuantity(height));
	}

	id(id){
		this.attr("id", id);
	}

	on(eventName, eventFunc){
		this._elem.addEventListener(eventName, eventFunc);
	}

	once(eventName, eventFunc){
		this._elem.addEventListener(eventName, eventFunc, {once: true});
	}

	parent(){
		return this._parent || this._elem.parentElement;
	}

	perspective(){
		this.css("perspective", "1000px");
	}

	removeClass(className){
		this._elem.classList.remove(className);
	}

	scrollX(){
		this.addClass("Scroll");
		this.addClass("X");
	}

	scrollY(){
		this.addClass("Scroll");
		this.addClass("Y");
	}

	style(value){
		this._elem.setAttribute("style", value);
	}

	text(txt){
		this._elem.textContent = txt;
	}

	toggleClass(className){
		this._elem.classList.toggle(className);
	}

	type(numb){
		this.addClass(`Type${numb}`);
	}

	width(width){
		if(width === undefined) return this._elem.clientWidth;
		else this.css("width", Component._toValidCSSQuantity(width));
	}

	static div(){
		return document.createElement("div");
	}

	static parse(domstring){
		const elem = new DOMParser().parseFromString(domstring, "text/html");
		return new Component(elem.body.children[0]);
	}

	static _isValidCSSQuantity(quantity){
		if(/^[0-9]+(cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vmin|vmax|%)$/.exec(quantity))
			return true;
		Number.parseFloat(quantity);
		return false;
	}

	static _toValidCSSQuantity(quantity){
		if(Component._isValidCSSQuantity(quantity)) return quantity;
		else return `${quantity}px`;
	}
}
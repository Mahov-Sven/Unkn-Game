import Flipcard from "../Flipcard.js";
import Component from "../Component.js";
import AbstractFragment from "../../fragments/AbstractFragment.js";

export default class Flipmenu extends Flipcard{
	constructor(...args){
		super(...args);
	}

	init(id, options){
		super.init();

		this._id = id;
		this._options = options;
	}

	construct(){
		this._constructRoot();
		this._constructFront();
		this._constructBack();
	}

	_constructFront(){
		const frontContainer = new Component();
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");

		for(const optionName in this._options){
			const option = new Component();
			option.addClass("ButtonText");
			option.addClass("Button");
			option.addClass("Text");
			option.text(optionName);
			option.id(`${this._id}Option${optionName}`);

			frontContainer.append(option);
		}

		this._front = frontContainer;
		this.append(frontContainer);
	}

	_constructBack(){
		const backContainer = new Component();
		backContainer.addClass("FlexStatic");
		backContainer.addClass("FlexColumn");

		this._back = backContainer;
	}

	_assignBackElem(optionName){
		this._back.clear();

		const optionContainer = new Component();
		optionContainer.addClass("FlexStatic");
		optionContainer.addClass("FlexColumn");

		const option = this._options[optionName];
		const optionElem = (option instanceof AbstractFragment) ? option.cache.comp : option;
		optionElem.addClass("FlexStatic");
		optionElem.id(`${this._id}${optionName}`);

		const optionBack = new Component();
		optionBack.addClass("FlexStatic");
		optionBack.addClass("ButtonText");
		optionBack.addClass("Button");
		optionBack.addClass("Text");
		optionBack.text("Back");
		optionBack.id(`${this._id}${optionName}Back`);
		optionBack.click(() => this.flip_());

		optionContainer.append(optionElem);
		optionContainer.append(optionBack);
		
		this._back.append(optionContainer);
	}

	attachEvents(){
		super.attachEvents();
		
		for(const optionName in this._options){
			this.findId(`${this._id}Option${optionName}`).click(() => {
				const option = this._options[optionName];
				this._assignBackElem(optionName);
				if(option instanceof AbstractFragment)
					option.attachEvents();
				
				this.flip_();
			});
		}
	}

	addOption(optionName){
		const option = new Component();
		option.addClass("FlexStatic");
		option.addClass("Text");
		option.text(optionName);
		option.id(`${this._id}Option${optionName}`);

		this._front.append(option);
		return option;
	}
}
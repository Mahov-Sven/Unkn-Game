import Flipcard from "./Flipcard.js";
import Component from "../Component.js";
import AbstractFragment from "../../fragments/AbstractFragment.js";

export default class Flipmenu extends Flipcard{
	constructor(...args){
		super(...args);
	}

	init(id, options){
		super.init();

		this.id = id;
		this.options = options;
		this.front;
		this.back;
	}

	construct(){
		this._constructRoot();
		this._constructFront();
		this._constructBack();
	}

	_constructFront(){
		const frontContainer = new Component();
		frontContainer.addClass("FlipcardFront");
		frontContainer.addClass("FlipcardFace");
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");

		for(const optionName in this.options){
			const option = new Component();
			option.addClass("ButtonText");
			option.addClass("Button");
			option.addClass("Text");
			option.text(optionName);
			option.id(`${this.id}Option${optionName}`);

			frontContainer.append(option);
		}

		this.front = frontContainer;
		this.append(frontContainer);
	}

	_constructBack(){
		const backContainer = new Component();
		backContainer.addClass("FlipcardBack");
		backContainer.addClass("FlipcardFace");
		backContainer.addClass("FlexStatic");
		backContainer.addClass("FlexColumn");

		this.back = backContainer;
		this.append(backContainer);
	}

	_assignBackElem(optionName){
		this.back.clear();

		const optionContainer = new Component();
		optionContainer.addClass("FlexStatic");
		optionContainer.addClass("FlexColumn");

		const option = this.options[optionName];
		const optionElem = (option instanceof AbstractFragment) ? option.cache.comp : option;
		optionElem.addClass("FlexStatic");
		optionElem.id(`${this.id}${optionName}`);

		const optionBack = new Component();
		optionBack.addClass("FlexStatic");
		optionBack.addClass("ButtonText");
		optionBack.addClass("Button");
		optionBack.addClass("Text");
		optionBack.text("Back");
		optionBack.id(`${this.id}${optionName}Back`);
		optionBack.click(() => this.flip());

		optionContainer.append(optionElem);
		optionContainer.append(optionBack);
		
		this.back.append(optionContainer);
	}

	attachEvents(){
		super.attachEvents();
		
		for(const optionName in this.options){
			new Component(`${this.id}Option${optionName}`).click(() => {
				const option = this.options[optionName];
				this._assignBackElem(optionName);
				if(option instanceof AbstractFragment)
					option.attachEvents();
				
				this.flip();
			});
		}
	}

	addOption(optionName){
		const option = new Component();
		option.addClass("FlexStatic");
		option.addClass("Text");
		option.text(optionName);
		option.id(`${this.id}Option${optionName}`);

		this.front.append(option);
		return option;
	}
}
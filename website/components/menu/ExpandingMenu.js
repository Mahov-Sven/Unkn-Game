import Component from "../Component.js";
import AbstractFragment from "../../fragments/AbstractFragment.js";
import Card from "../card/Card.js"

export default class ExpandingMenu extends Card {
	constructor(...args){
		super(...args);
	}

	// Construction Functions

	init(id, options){
		super.init();

		this._id = id;
		this._options = options;
		this._state = 0;
		this._optionsElem;
		this._menuItemElem;
	}

	construct(){
		this._constructRoot();
		this._constructOptions();
		this._constructItem();
	}

	_constructRoot(){
		super._constructRoot();
		this.addClass("ExpandingMenu");
	}

	_constructOptions(){
		const optionsElem = new Component();
		optionsElem.addClass("FlexStatic");
		optionsElem.addClass("FlexColumn");

		for(const optionName in this._options){
			const option = new Component();
			option.addClass("ButtonText");
			option.addClass("Button");
			option.addClass("Text");
			option.text(optionName);
			option.id(`${this._id}Option${optionName}`);

			optionsElem.append(option);
		}

		this._optionsElem = optionsElem;
		this.append(optionsElem);
	}

	_constructItem(){
		const menuItem = new Component();
		menuItem.addClass("FlexStatic");
		menuItem.addClass("FlexColumn");

		this._menuItemElem = menuItem;
	}

	attachEvents(){
		for(const optionName in this._options){
			this.findId(`${this._id}Option${optionName}`).click(() => {
				const option = this._options[optionName];
				this._assignMenuItem(optionName);
				this.change();
				if(option instanceof AbstractFragment)
					option.attachEvents();
			});
		}
	}

	// General Functions

	_assignMenuItem(optionName){
		this._menuItemElem.clear();

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
		optionBack.click(() => this.change());

		this._menuItemElem.append(optionElem);
		this._menuItemElem.append(optionBack);
	}

	change(){
		this._state = 1 - this._state;
		this.clear()
		switch(this._state){
			case 0: // To Menu Options
				this.append(this._optionsElem);
				break;
			case 1: // To Menu Item
				this.append(this._menuItemElem);
				break;
		}
	}

	addOption(optionName){
		const option = new Component();
		option.addClass("FlexStatic");
		option.addClass("Text");
		option.text(optionName);
		option.id(`${this._id}Option${optionName}`);

		this._optionsElem.append(option);
		return option;
	}
}
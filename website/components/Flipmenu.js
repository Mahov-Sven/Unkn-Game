import Flipcard from "./Flipcard.js";
import Component from "./Component.js";

export default class Flipmenu extends Flipcard{
	constructor(...args){
		super(...args);
	}

	init(id, options){
		super.init();

		this.id = id;
		this.options = options;
		this.back;
	}

	construct(){
		this._constructRoot();
		this._constructFront();
		this._constructBack();
	}

	_constructFront(){
		const frontContainer = Component.div();
		frontContainer.addClass("FlipcardFront");
		frontContainer.addClass("FlipcardFace");
		frontContainer.addClass("FlexStatic");
		frontContainer.addClass("FlexColumn");

		for(const optionName in this.options){
			const option = Component.div();
			option.addClass("Text");
			option.text(optionName);
			option.attr("id", `${this.id}Option${optionName}`);

			frontContainer.append(option);
		}

		this.elem.append(frontContainer);
	}

	_constructBack(){
		const backContainer = Component.div();
		backContainer.addClass("FlipcardBack");
		backContainer.addClass("FlipcardFace");
		backContainer.addClass("FlexStatic");
		backContainer.addClass("FlexColumn");

		this.back = backContainer;
		this.elem.append(backContainer);
	}

	_assignBackElem(optionName){
		this.back.empty();

		const optionContainer = Component.div();
		optionContainer.addClass("FlexStatic");
		optionContainer.addClass("FlexColumn");

		const optionElem = this.options[optionName];
		optionElem.addClass("FlexStatic");
		optionElem.attr("id", `${this.id}${optionName}`);

		const optionBack = Component.div();
		optionBack.addClass("FlexStatic");
		optionBack.text("Back");
		optionBack.attr("id", `${this.id}${optionName}Back`);
		optionBack.click(() => this.flip());

		optionContainer.append(optionElem);
		optionContainer.append(optionBack);
		
		this.back.append(optionContainer);
	}

	attachEvents(){
		super.attachEvents();
		
		for(const optionName in this.options){
			$(`#${this.id}Option${optionName}`).click(() => {
				this._assignBackElem(optionName);
				this.flip();
			});
		}
	}

	addOption(optionName){
		const option = Component.div();
		option.addClass("FlexStatic");
		option.addClass("Text");
		option.text(optionName);
		option.attr("id", `${this.id}Option${optionName}`);

		this.elem.children().eq(0).append(option);
		return option;
	}
}
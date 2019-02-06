import AbstractFragment from "../AbstractFragment.js";
import Component from "../../components/Component.js";
import Loader from "../../scripts/Loader.js";

export default class MainMenu extends AbstractFragment {
	constructor(...args){
		super(...args);
		this.location = "Content";
		/** @type {Object.<string, AbstractFragment>} */
		this._menuFragments = {};
	}

	async _loadCSS_(){}

	async _loadHTML_(){
		const root = new Component();
		root.id(this.componentId("Background"))
		root.flex("row", "static");
		root.full();

		const menu = new Component();
		menu.id(this.componentId("Menu"));
		menu.flex("column", "static", "center");
		menu.css("background-color", "#000000bf");
		menu.css("margin-right", "2rem");
		menu.width("10rem");

		const menuOptions = new Component();
		menuOptions.flex("column","static");

		this._addOption(menuOptions, "Play");
		this._addOption(menuOptions, "Profile");
		this._addOption(menuOptions, "Unlocks");
		this._addOption(menuOptions, "Stats");
		this._addOption(menuOptions, "Settings");
		this._addOption(menuOptions, "Credits");
		this._addOption(menuOptions, "Quit");

		menu.append(menuOptions);

		const menuSpaceContainer = new Component();
		menuSpaceContainer.flex("column", "dynamic");
		menuSpaceContainer.css("padding", "2rem");

		const menuSpace = new Component();
		menuSpace.id(this.componentId("MenuSpace"));
		menuSpace.flex("column", "dynamic");
		menuSpace.css("background-color","#000000bf");
		menuSpace.hide();

		menuSpaceContainer.append(menuSpace);

		root.append(menuSpaceContainer);
		root.append(menu);
		this.component = root;
	}

	attachEvents(){
		const menuContainer = this.component.child(0);
		menuContainer.click((e) => menuContainer.child().hide());
		menuContainer.child().click((e) => e.stopPropagation());

		this._addOptionEvent("Play");
		this._addOptionEvent("Profile");
		this._addOptionEvent("Unlocks");
		this._addOptionEvent("Stats");
		this._addOptionEvent("Settings");
		this._addOptionEvent("Credits");
		this._addOptionEvent("Quit");
	}

	_addOption(comp, name){
		const option = new Component();
		option.id(this.componentId(`Option${name}`));
		option.text(name.toUpperCase());
		option.font("center", "button");
		comp.append(option);
	}

	_addOptionEvent(name){
		this.component
				.findId(this.componentId(`Option${name}`))
				.click(async (e) => {
					const menu = this.component.findId(this.componentId("MenuSpace"));
					const fragment = await this._menu_(name);
					fragment.location = menu.id();
					fragment.attach();
					if(menu.attr("menu") === name) menu.toggle();
					else {
						menu.attr("menu", name);
						menu.show();
					}
				});
	}

	/**
	 * A fragment for the menu of the given name
	 * @param {String} name
	 * @returns {AbstractFragment} the menu fragment 
	 */
	async _menu_(name){
		if(this._menuFragments[name] === undefined)
			this._menuFragments[name] = await Loader.loadFragment_(`${this.id}/`, name);
		return this._menuFragments[name];
	}
}
import AbstractFragment from "../AbstractFragment.js";
import Heading from "../../components/Heading.js"
import Component from "../../components/Component.js";

export default class MainMenu extends AbstractFragment {
	constructor(){
		super();
		this.location = "Content";
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

		const addOption = (name) => {
			const option = new Component();
			option.id(this.componentId(`Option${name}`));
			option.text(name);
			option.font("center", "button");
			menuOptions.append(option);
		}

		addOption("PLAY");
		addOption("PROFILE");
		addOption("UNLOCKS");
		addOption("STATS");
		addOption("SETTINGS");
		addOption("CREDITS");
		addOption("QUIT");

		menu.append(menuOptions);

		const menuSpace = new Component();
		menuSpace.id(this.componentId("MenuSpace"));
		menuSpace.flex("column", "dynamic");
		menuSpace.style("background-color: #000000bf; margin: 2rem;");

		root.append(menuSpace);
		root.append(menu);
		this.component = root;
	}

	attachEvents(){
		
	}
}
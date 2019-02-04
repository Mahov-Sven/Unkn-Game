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
		root.flex("row", "static");
		root.full();

		const menu = new Component();
		menu.id(this.componentId("Menu"));
		menu.flex("column", "static");
		menu.css("background-color", "#00000066");
		menu.css("margin-right", "2rem");
		menu.width("10rem");
		menu.font("center");
		menu.text("PLAY");

		const menuSpace = new Component();
		menuSpace.id(this.componentId("MenuSpace"));
		menuSpace.flex("column", "dynamic");
		menuSpace.style("background-color: #00000066; margin: 2rem;");

		root.append(menuSpace);
		root.append(menu);
		this.component = root;
	}

	attachEvents(){}
}
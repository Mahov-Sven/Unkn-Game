import AbstractFragment from "../AbstractFragment.js";
import Loader from "../../scripts/Loader.js";
import Flipmenu from "../../components/Flipmenu.js";
import Component from "../../components/Component.js";

export default class MainMenu extends AbstractFragment {
	constructor(){
		super();
		this.location = "Content";
		this.cache.flipmenu;
	}

	async _loadCSS_(){}

	async _loadHTML_(){

		const options = {
			"Play": await Loader.loadHTML_(`${this.fullPath}Play.html`),
			"Profile": await Loader.loadHTML_(`${this.fullPath}Profile.html`),
			"Unlocks": await Loader.loadHTML_(`${this.fullPath}Unlocks.html`),
			"Stats": await Loader.loadHTML_(`${this.fullPath}Stats.html`),
			"Settings": await Loader.loadHTML_(`${this.fullPath}Settings.html`),
			"Credits": await Loader.loadHTML_(`${this.fullPath}Credits.html`),
		};

		this.cache.flipmenu = new Flipmenu(`${this.name}-`, options);
		this.cache.flipmenu.addOption("Quit");

		const root = Component.div();
		root.addClass("FullContainer");
		root.addClass("FlexColumn");
		root.addClass("FlexCenter");
		root.append(this.cache.flipmenu.elem);

		this.cache.elem = root;
	}

	attachEvents(){
		this.cache.flipmenu.attachEvents();
	}
}
import AbstractFragment from "../AbstractFragment.js";
import Loader from "../../scripts/Loader.js";
import Component from "../../components/Component.js";
import ExpandingMenu from "../../components/menu/ExpandingMenu.js";

export default class MainMenu extends AbstractFragment {
	constructor(){
		super();
		this.location = "Content";
		this.cache.menu;
		this.cache.fragments = [];
	}

	async _loadCSS_(){}

	async _loadHTML_(){

		//const unlocks = await Loader.loadFragment_("Unlocks");
		//this.cache.fragments.push(unlocks);

		const options = {
			"Play": await Loader.loadHTML_(`${this.fullPath}Play.html`),
			"Profile": await Loader.loadHTML_(`${this.fullPath}Profile.html`),
			"Unlocks": await Loader.loadFragment_("Unlocks"),
			"Manual": await Loader.loadHTML_(`${this.fullPath}Manual.html`),
			"Stats": await Loader.loadHTML_(`${this.fullPath}Stats.html`),
			"Settings": await Loader.loadHTML_(`${this.fullPath}Settings.html`),
			"Credits": await Loader.loadHTML_(`${this.fullPath}Credits.html`),
		};

		this.cache.menu = new ExpandingMenu(`${this.name}-`, options);
		this.cache.menu.allowScrollY(1);

		const quit = this.cache.menu.addOption("Quit");
		quit.addClass("ButtonText");
		quit.addClass("Button");

		const root = new Component()
		root.addClass("FlexColumn");
		root.addClass("FlexCenter");
		root.addClass("FullContainer");
		root.append(this.cache.menu);

		this.cache.comp = root;
	}

	attachEvents(){
		this.cache.menu.attachEvents();
	}
}
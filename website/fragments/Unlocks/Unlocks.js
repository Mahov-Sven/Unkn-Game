import AbstractFragment from "../AbstractFragment.js";
import Loader from "../../scripts/Loader.js";
import Component from "../../components/Component.js";
import Flipcard from "../../components/Flipcard/Flipcard.js";
import Header from "../../components/Header.js";

export default class Unlocks extends AbstractFragment {
	constructor(){
		super();
		this.flipcards = [];
	}

	async _loadCSS_(){}

	async _loadHTML_(){

		/*
		const dfDescTitle = Component.div();
		dfDescTitle.addClass("Heading");
		dfDescTitle.addClass("Text");
		dfDescTitle.text("Description");
		df.append(dfDescTitle);

		const dfDesc = Component.div();
		dfDesc.addClass("Text");
		dfDesc.text("As a FANTASY_SAUCE creature yourself, you're already privy to the secrets of the Mountain. But something is beckoning you deeper...");
		df.append(dfDesc);

		const dfPrereqTitle = Component.div();
		dfPrereqTitle.addClass("Heading");
		dfPrereqTitle.addClass("Text");
		dfPrereqTitle.text("Prerequisite");
		df.append(dfPrereqTitle);

		const dfPrereq = Component.div();
		dfPrereq.addClass("Text");
		dfPrereq.text("Get the Pacifist Ending");
		df.append(dfPrereq);
		*/

		const root = await Loader.loadHTML_(`${this.fullPath}Unlocks.html`);
		
		
		const df = new Component();
		df.append(new Header("Denizen"));

		const db = new Component();
		db.append(new Header("Skill 1"));

		const d = new Flipcard(df, db)
		d.flipOn("click");	

		const ancestriesLocked = root.findId("Unlocks-AncestriesLocked");
		ancestriesLocked.append(d);
		this.flipcards.push(d);

		//const ancestriesUnocked = root.find("#Unlocks-AncestriesUnlocked");

		//const classesLocked = root.find("#Unlocks-ClassesLocked");
		//const classesUnocked = root.find("#Unlocks-ClassesUnlocked");

		//const backgroundsLocked = root.find("#Unlocks-BackgroundsLocked");
		//const backgroundsUnocked = root.find("#Unlocks-BackgroundsUnlocked");

		this.cache.comp = root;
	}

	attachEvents(){
		for(const flipcard of this.flipcards){
			flipcard.attachEvents();
		}
	}
}
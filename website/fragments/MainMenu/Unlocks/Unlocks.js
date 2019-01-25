import AbstractFragment from "../../AbstractFragment.js";
import Loader from "../../../scripts/Loader.js";
import Component from "../../../components/Component.js";
import Flipcard from "../../../components/card/Flipcard.js";
import Heading from "../../../components/Heading.js";
import Paragraph from "../../../components/Paragraph.js";

export default class Unlocks extends AbstractFragment {
	constructor(...args){
		super(...args);
		this.flipcards = [];
	}

	async _loadCSS_(){}

	async _loadHTML_(){
		const root = await Loader.loadHTML_(`${this.fullPath}Unlocks.html`);

		const df = new Component();
		df.addClass("FullContainer");
		df.append(new Heading("Denizen"));
		df.append(new Paragraph("As a FANTASY_SAUCE creature yourself, you're already privy to the secrets of the Mountain. But something is beckoning you deeper..."));
		df.append(new Heading("Prequisite(s)"));
		df.append(new Paragraph("Get the Pacifist Ending"));

		const db = new Component();
		db.addClass("FullContainer");
		db.append(new Heading("Skill 1"));

		const d = new Flipcard(df, db)
		d.flipOn("click");	
		d.ratio(0.625);
		d.size(300);
		d.type(3);

		const d2 = new Flipcard(df, db)
		d2.flipOn("click");	
		d2.ratio(0.625);
		d2.size(300);
		d2.type(3);

		const ancestriesLocked = root.findId("Unlocks-AncestriesLocked");
		ancestriesLocked.append(d);
		this.flipcards.push(d);

		ancestriesLocked.append(d2);
		this.flipcards.push(d2);

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
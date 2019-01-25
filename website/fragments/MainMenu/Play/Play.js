import AbstractFragment from "../../AbstractFragment.js";
import Loader from "../../../scripts/Loader.js";
import Heading from "../../../components/Heading.js";
import Paragraph from "../../../components/Paragraph.js";
import Card from "../../../components/card/Card.js";

export default class Unlocks extends AbstractFragment {
	constructor(...args){
		super(...args);
		this.flipcards = [];
	}

	async _loadCSS_(){}

	async _loadHTML_(){
		const root = await Loader.loadHTML_(`${this.fullPath}Play.html`);

		function constructPlayCard(type, heading, description, img){
			const playcard = new Card();
			playcard.ratio(0.625);
			playcard.size(500);
			playcard.type(type);
			playcard.append(new Heading(heading))

			const playCardFrontImg = new Paragraph(description);
			playcard.append(playCardFrontImg);

			return playcard;
		}

		root.append(constructPlayCard(1, "Story", "Start a new adventure through the story of the world!", ""));
		root.append(constructPlayCard(2, "Endless", "Journey into the endless depths!", ""));
		root.append(constructPlayCard(3, "Encursion", "Battle some of the toughest enemies in strategic combat!", ""));

		this.cache.comp = root;
	}

	attachEvents(){
		for(const flipcard of this.flipcards){
			flipcard.attachEvents();
		}
	}
}
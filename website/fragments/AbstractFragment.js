import Loader from "../scripts/Loader.js";

export default class AbstractFragment {
	constructor(){
		this.name = this.constructor.name;
		this.path = "";
		this.fullPath = `fragments/${this.path}${this.name}/${this.name}`;
		this.id = this.name;
		this.location;
		this.cache = {};
		this.cache.elem;
		this.cache.style;
	}

	async load_(){
		this.cache.style = await Loader.loadCSS_(`${this.fullPath}.css`, this.id);
		this.cache.elem = $(await Loader.loadHTML_(`${this.fullPath}.html`));
	}

	attatch(){
		document.head.appendChild(this.cache.style);
		//$(`#${this.location}`).empty();
		$(`#${this.location}`).append(this.cache.elem);
	}

	detatch(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.cache.elem}`).detatch();
	}

	clear(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.cache.elem}`).remove();
	}
}
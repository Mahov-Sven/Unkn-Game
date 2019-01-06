import Loader from "../scripts/Loader.js";

export default class AbstractFragment {
	constructor(){
		this.name = this.constructor.name;
		this.path = "";
		this.fullPath = `fragments/${this.path}${this.name}/`;
		this.id = this.name;
		this.location;
		this.cache = {};
		this.cache.elem;
		this.cache.style;
	}

	async _loadCSS_(){
		this.cache.style = await Loader.loadCSS_(`${this.fullPath}${this.name}.css`, this.id);
	}

	async _loadHTML_(){
		this.cache.elem = await Loader.loadHTML_(`${this.fullPath}${this.name}.html`);
	}

	async load_(){
		await this._loadCSS_();
		if(this.cache.style !== undefined) this.cache.style.attr("id", `${this.id}-CSS`);
		
		await this._loadHTML_();
		if(this.cache.elem !== undefined) this.cache.elem.attr("id", `${this.id}`);
	}

	attach(){
		if(this.cache.style !== undefined)
			document.head.appendChild(this.cache.style);
		//$(`#${this.location}`).empty();
		if(this.cache.elem !== undefined)
			$(`#${this.location}`).append(this.cache.elem);

		this.attachEvents();
	}

	attachEvents(){}

	detatch(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.id}`).detatch();
	}

	clear(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.id}`).remove();
	}
}
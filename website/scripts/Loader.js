import Component from "../components/Component.js";

export default class Loader {
	static async loadFile_(location){
		return new Promise((resolve, reject) => {
			$.get(location, function(file) {
				resolve(file)
			});
		});
	}
	
	static async loadCSS_(location, id){
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.type = "text/css";
		style.href = location;
		style.id = `${id}-CSS`
		return new Component($(style));
	}
	
	static async loadHTML_(location){
		return new Component($(await Loader.loadFile_(location)));
	}
	
	static async loadJS_(location, id){
		const script = document.createElement("script");
		script.type = "module";
		script.id = `${id}-JavaScript`;
		script.src = location;
		return new Component($(script));
	}
	
	static async loadFragment_(path, name){
		if(name === undefined || name === ""){
			name = path;
			path = "";
		}
		const fragment = new ((await import(`./../fragments/${path}${name}/${name}.js`)).default)();
		await fragment.load_();
		return fragment;
	}
}
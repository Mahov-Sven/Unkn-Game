import Loader from "./scripts/Loader.js"

export default class Main {
	
	static async main_(){
		$("#Content");
		const mainMenu = await Loader.loadFragment_("MainMenu");
		mainMenu.attach();
	}
}

Main.main_();
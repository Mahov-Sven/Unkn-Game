import * as Util from "./scripts/Util.js"
import Loader from "./scripts/Loader.js"

export default class Main {
	
	static async main_(){
		const mainMenu = await Loader.loadFragment_("MainMenu");
		mainMenu.attach();
	}
}

Main.main_();
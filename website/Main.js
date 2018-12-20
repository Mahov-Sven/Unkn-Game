import Loader from "./scripts/Loader.js"

export default class Main {
	
	static async main_(){
		$("#Content");
		const MainMenu = await Loader.loadFragment_("MainMenu");
		MainMenu.attatch();
	}
}

Main.main_();
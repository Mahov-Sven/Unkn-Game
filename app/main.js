const App = require("electron").app;

const Window = require("./window.js");

class Main {

	constructor(){}

	static restart(){
		if(!Main.window.isClosed()) return;
		Main.window.open();
	}

	static main(){
		Main.window = new Window();

		// Start Main method
		App.on("ready", Main.restart);

		// Quit when all windows are closed.
		App.on("window-all-closed", () => {
			// Keep app alive on MacOS (since you use Cmd-Q to quit)
			if (process.platform !== "darwin") App.quit()
		})

		// Restart the window for Mac
		App.on("activate", Main.restart);
	}
}

Main.main();
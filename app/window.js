const BrowserWindow = require("electron").BrowserWindow;

module.exports = class Window {
	constructor(){
		this.browserWindow = undefined;
	}

	open(){
		this.browserWindow = new BrowserWindow({width: 800, height: 600});
		//this.browserWindow.loadFile("app/website/html/index.html");
		this.browserWindow.loadURL("localhost:8080/website");
		this.browserWindow.webContents.openDevTools();
		this.browserWindow.on("closed", () => this.close());
	}

	close(){
		this.browserWindow = null
	}

	isClosed(){
		return this.browserWindow === null;
	}
}
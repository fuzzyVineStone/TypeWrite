const {app, BrowserWindow, Menu, globalShortcut} = require('electron');

let win;

function createWindow() {
	win = new BrowserWindow({ width: 800, height: 600 });

	win.loadFile('html/main.html');

	win.on('closed', () => {
		win = null;
	});

	const template = [
	{
		label: "File",
		submenu: [
			{label: "Save", click() {}},
			{label: "Open", click() {}},
			{type: "separator"},
			{label: "Exit", click() { app.quit(); }, accelerator: process.platform == 'darwin' ? 'Option + Q' : 'Alt + Q'}
		]
	},
	{
		label: "View",
		submenu: [
			{role: "reload"},
			{role: "togglefullscreen"},
			{role: "toggledevtools"}
		]
	},
	{
		role: "window",
		submenu: [
			{role: "minimize"},
			{role: "close"}
		]
	},
	{
		role: 'help',
		submenu: [{
				label: 'Learn More',
				click () { require('electron').shell.openExternal('https://vinestone-studio.xyz') }
		}]
	}]

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
	createWindow();

	globalShortcut.register(process.platform == 'darwin' ? 'Option + 1' : 'Alt + 1', () => {
		if (win.isMinimized()) {
			win.restore();
		}
		else if (win.isFocused()) {
			win.minimize();
		}		
	});
});

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win == null) {
		createWindow();
	}
});

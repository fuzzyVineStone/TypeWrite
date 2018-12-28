const {app, BrowserWindow, Menu} = require('electron');

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
			{label: "Exit", click() { app.quit(); }}
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

app.on('ready', createWindow);

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

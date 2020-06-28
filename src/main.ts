import { app, BrowserWindow } from "electron";
import { client } from "electron-connect";
import os from "os";
import path from "path";

const mainURL = `file://${__dirname}/index.html`;

let mainWindow: BrowserWindow | null = null;

// アプリ起動後にWindowを立ち上げる
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: { nodeIntegration: true }
  });
  // mainWindow.setMenu(null);

  mainWindow.loadURL(mainURL);
  // 開発者ツールも同時に開く
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  client.create(mainWindow);
};

// アプリの起動と終了
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  app.quit();
});
app.on("activate", () => {
  if (mainWindow === null) {
    BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0"
      )
    );
  }
});

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

  if (process.env.NODE_ENV === "production") {
    mainWindow.setMenu(null);
    mainWindow.loadURL(mainURL);
  } else {
    mainWindow.loadURL(mainURL);
    client.create(mainWindow);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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

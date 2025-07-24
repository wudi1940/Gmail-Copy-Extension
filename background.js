chrome.commands.onCommand.addListener(async (command) => {
    if (command === "copy-gmail-subject") {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const subject = tab.title;
        console.log(subject);

        const subjectPattern = /: (.)(.*?)\1/;
        const subjectPattern2 = /:\s'(.*?)'/;
        const subjectMatch = subjectPattern.exec(subject);
        const subjectMatch2 = subjectPattern2.exec(subject);

        let textToCopy = null;
        if (subjectMatch && subjectMatch[2]) {
            textToCopy = subjectMatch[2];
        } else if (subjectMatch2 && subjectMatch2[1]) {
            textToCopy = subjectMatch2[1];
        }

        if (textToCopy) {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: copyToClipboard,
                    args: [textToCopy]
                });
                console.log('Text copied to clipboard:', textToCopy);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        }
    }
});

function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
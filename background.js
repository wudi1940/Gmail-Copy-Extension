chrome.commands.onCommand.addListener(function (command) {
    if (command === "copy-gmail-subject") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const subject = tabs[0].title
            console.log(subject)

            const subjectPattern = /Item shared with you: "(.*?)"/;
            const subjectMatch = subjectPattern.exec(subject);

            if (subjectMatch && subjectMatch[1]) {
                const textToCopy = subjectMatch[1];
                copyToClipboard(textToCopy);
            }
        });
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
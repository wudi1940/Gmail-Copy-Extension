chrome.commands.onCommand.addListener(function (command) {
    if (command === "copy-gmail-subject") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const subject = tabs[0].title
            console.log(subject)

            const subjectPattern = /: (.)(.*?)\1/;
            const subjectPattern2 = /:\s‘(.*?)’/;
            const subjectMatch = subjectPattern.exec(subject);
            const subjectMatch2 = subjectPattern2.exec(subject);

            if (subjectMatch && subjectMatch[2]) {
                const textToCopy = subjectMatch[2];
                copyToClipboard(textToCopy);
            } else if (subjectMatch2 && subjectMatch2[1]) {
                const textToCopy = subjectMatch2[1];
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
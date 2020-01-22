

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        let text = navigator.clipboard.readText();
        switch(message.type) {
            case "getText":
                sendResponse(text);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);


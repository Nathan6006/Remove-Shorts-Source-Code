console.log('running content.js')
// Function to send a message to the background script
function sendMessageToBackground(action, value) {
    console.log('Sending message from content to background');
    chrome.runtime.sendMessage({ action: action, value: value }, function(response) {
    });
}


window.addEventListener('load', () => {
    console.log('Page loaded, about to send message to bg')
    sendMessageToBackground('check', 'isbuttonon');
});

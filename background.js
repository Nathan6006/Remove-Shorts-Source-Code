console.log('background.js is running');

// Setup rules on extension install
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1], // Remove any existing rule with the same ID
        addRules: [
            {
                "id": 1,
                "priority": 1,
                "action": {
                    "type": "redirect",
                    "redirect": {
                        "extensionPath": "/removed.html"
                    }
                },
                "condition": {
                    "urlFilter": "*://*.youtube.com/shorts/*",
                    "resourceTypes": ["main_frame"]
                }
            }
        ]
    });
});

// Handle tab updates to redirect YouTube Shorts pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/shorts/')) {
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL('/removed.html') });
    }
});

// Handle history state changes to redirect YouTube Shorts pages
chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    if (details.url && details.url.includes('youtube.com/shorts/')) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL('/removed.html') });
    }
}, {
    url: [{ hostContains: 'youtube.com' }]
});

//------------------------------------------------------------------------------------------------
// Block Youtube when toggling.
var block = false;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in background:', message);

    if (message.action === 'toggleBlockYouTube' && message.value === 'on') {
        block = true;
        checkIfYouTube().then(isYouTube => {
            if (isYouTube) {
                console.log('The current tab is a YouTube page and will be blocked');
                blockYouTube();
            } else {
                console.log('The current tab is not a YouTube page.');
            }
        });
    } else if (message.action === 'toggleBlockYouTube' && message.value === 'off') {
        block = false;
        unblockYouTube();
    }
    else if (message.action === 'check') {
        console.log('Checking button status');
        if (block) {
            blockYouTube();
        }
    }
    sendResponse({ status: 'Action processed' });
});

function blockYouTube() {
    console.log('Running blockYouTube function');
    let url = chrome.runtime.getURL('/blocked.html');
    console.log('Redirecting to:', url);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { url: url });
        } else {
            console.error('No active tab found');
        }
    });
}

function unblockYouTube() {
    console.log('Unblocking YouTube');
}

//------------------------------------------------------------------------
function checkIfYouTube() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) {
                resolve(false);
                return;
            }
            
            const activeTab = tabs[0];
            const url = new URL(activeTab.url);
            const isYouTube = (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com');
            resolve(isYouTube);
        });
    });
}


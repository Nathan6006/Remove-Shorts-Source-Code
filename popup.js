console.log('popup.js is running')
document.addEventListener('DOMContentLoaded', function () {
console.log('page loaded')
//load button 
chrome.storage.sync.get('blockYouTube', function (data) {
    if (data.blockYouTube === 'on') {
        document.querySelector('#btnradio1').checked = true;
    } else {
        document.querySelector('#btnradio2').checked = true;
    }
});
    //Save when toggling button
    document.querySelector('#btnradio1').addEventListener('change', function () {
        if (this.checked) {
            saveState('on');
        }
    });

    document.querySelector('#btnradio2').addEventListener('change', function () {
        if (this.checked) {
            saveState('off');
        }
    });

    
    function saveState(state) {
        chrome.storage.sync.set({ blockYouTube: state }, function () {
            console.log('State saved:', state);
        });
    }
});

// Toggle on off

function toggleBlockYouTube(value) {
    chrome.runtime.sendMessage({ action: 'toggleBlockYouTube', value: value }, function(response) {
        console.log('turning value to:', value);
    });
}

function buttonOn() {
    if (document.querySelector('#btnradio1').checked === true) {
        toggleBlockYouTube('on');
        console.log('button is on')
    } else {
        toggleBlockYouTube('off');
    }
}

document.querySelector('#btnradio1').addEventListener('change', buttonOn);
document.querySelector('#btnradio2').addEventListener('change', buttonOn);
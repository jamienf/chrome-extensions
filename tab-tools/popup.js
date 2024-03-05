document.getElementById('groupTabs').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "groupTabs"});
});

document.getElementById('closeDuplicates').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "closeDuplicates"});
});

document.getElementById('saveAndClose').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "saveAndClose"});
});

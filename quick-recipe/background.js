chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentUrl = tabs[0].url;
    var newUrl = 'https://cooked.wiki/' + currentUrl;
    chrome.tabs.create({url: newUrl});
  });
});

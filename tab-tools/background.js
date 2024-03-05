chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "groupTabs") {
    groupTabs();
  } else if (request.action === "closeDuplicates") {
    closeDuplicates();
  } else if (request.action === "sortTabsByOpenOrder") {
    sortTabsByOpenOrder();
  } else if (request.action === "saveAndClose") {
    saveAndClose();
  }
});

function groupTabs() {
  chrome.tabs.query({}, function(tabs) {
    let groups = {};
    tabs.forEach(tab => {
      const url = new URL(tab.url);
      const domain = url.hostname;
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab.id);
    });

    for (const domain in groups) {
      if (groups[domain].length > 1) {
        chrome.tabs.group({tabIds: groups[domain]}, (groupId) => {
          chrome.tabGroups.update(groupId, { title: domain });
        });
      }
    }
  });
}

function closeDuplicates() {
  chrome.tabs.query({}, function(tabs) {
    let urls = {};

    tabs.forEach(tab => {
      if (urls[tab.url]) {
        chrome.tabs.remove(tab.id);
      } else {
        urls[tab.url] = true;
      }
    });
  });
}

function saveAndClose() {
  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${year}-${hours}:${minutes}`;
  };

  const folderTitle = formatDate();

  chrome.bookmarks.create({ title: folderTitle }, function(newFolder) {
    chrome.tabs.query({}, function(tabs) {
      const totalTabs = tabs.length;
      let processedTabs = 0;

      tabs.forEach(function(tab) {
        chrome.bookmarks.create({
          parentId: newFolder.id,
          title: tab.title,
          url: tab.url
        }, function() {
          processedTabs++;
          if (totalTabs > 1 && processedTabs < totalTabs) {
            chrome.tabs.remove(tab.id);
          } else if (processedTabs === totalTabs) {
            chrome.tabs.create({}); // This will create a new tab
          }
        });
      });
    });
  });
}

function sortTabsByOpenOrder() {
  chrome.windows.getCurrent({populate: true}, function(currentWindow) {
    chrome.tabs.query({windowId: currentWindow.id}, function(tabs) {
      let sortedTabs = tabs.sort((a, b) => a.id - b.id);
      
      sortedTabs.forEach((tab, index) => {
        chrome.tabs.move(tab.id, {index: index});
      });
    });
  });
}

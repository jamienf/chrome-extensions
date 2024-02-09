document.addEventListener('DOMContentLoaded', function() {
  var appendButton = document.getElementById('appendButton');
  var textInput = document.getElementById('textInput');
  var historyList = document.getElementById('historyList');
  var clearHistoryButton = document.getElementById('clearHistoryButton');

  function displayHistory() {
    historyList.innerHTML = '';

    var browsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];

    browsingHistory = [...new Set(browsingHistory)];
    browsingHistory = browsingHistory.slice(-20);
    browsingHistory.reverse();

    browsingHistory.forEach(function(url) {
      var listItem = document.createElement('li');
      var link = document.createElement('a');
      link.textContent = url;
      link.href = url;
      link.target = "_blank"; // Open link in new tab
      listItem.appendChild(link);
      historyList.appendChild(listItem);
    });
    clearHistoryButton.style.display = browsingHistory.length > 0 ? 'block' : 'none';
  }

  displayHistory();

  appendButton.addEventListener('click', function() {
    var subdomain = localStorage.getItem('subdomain') || '';
    if (subdomain === '') {
      alert('Please enter a subdomain in the Settings page.');
      return;
    }

    var text = textInput.value.trim();
    if (text === '') {
      alert('Please enter text before appending.');
      return;
    }

    var url = "https://" + subdomain + ".atlassian.net/browse/" + text;
    var browsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];

    browsingHistory = [...new Set(browsingHistory)];

    var index = browsingHistory.indexOf(url);
    if (index !== -1) {
      browsingHistory.splice(index, 1);
    }

    browsingHistory.push(url);
    localStorage.setItem('browsingHistory', JSON.stringify(browsingHistory));
    displayHistory();
    chrome.tabs.create({ url: url });
  });

  clearHistoryButton.addEventListener('click', function() {
    localStorage.removeItem('browsingHistory');
    clearHistoryButton.style.display = 'none';
    historyList.innerHTML = '';
  });
});

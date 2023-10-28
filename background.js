// background.js

// On install, initialize the links array
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({links: []});
  });
  
  // Listen for changes to links array, save to storage
  chrome.storage.onChanged.addListener(function(changes) {
    if (changes.links) {
      chrome.storage.sync.set({links: changes.links.newValue});
    }
  });
  
  // On startup, restore links array from storage
  chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.get(['links'], function(result) {
      if (result.links) {
        chrome.storage.sync.set({links: result.links});
      }
    });
  });
  
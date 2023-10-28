document.addEventListener('DOMContentLoaded', function() {

    const titleInput = document.getElementById('linkTitle');
    const linkInput = document.getElementById('link');
    const saveButton = document.getElementById('saveButton');
    const linkDirectories = document.getElementById('linkDirectories');
  
    saveButton.addEventListener('click', function() {
  
      const buttonTitle = titleInput.value;
      const buttonLink = linkInput.value;
  
      // Save link data
      chrome.storage.sync.set({
        links: [{
          title: buttonTitle,
          link: buttonLink  
        }]
      });
  
      // Create link button
      const button = document.createElement('button');
      button.textContent = buttonTitle;
      button.style.backgroundColor = 'white'; 
      button.style.color = 'black';
  
      // Copy link on click
      button.addEventListener('click', function() {
        navigator.clipboard.writeText(buttonLink);
      });
  
      // Add to UI
      linkDirectories.appendChild(button);
  
      // Clear inputs
      titleInput.value = '';
      linkInput.value = '';
  
    });
  
    // Load saved links
    chrome.storage.sync.get('links', function(result) {
      const links = result.links || [];
      
      links.forEach(function(link) {
        
        const button = document.createElement('button');
        button.textContent = link.title;
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
  
        button.addEventListener('click', function() {
          navigator.clipboard.writeText(link.link);  
        });
  
        linkDirectories.appendChild(button);
  
      });
  
    });
  
  });
  
# extensions
Basic chrome extension for storing commonly used links and not having to copy/paste by opening new websites / asking ppl in slack.

**To implement keyboard shortcuts:**

html:
<!-- Inside the .link-directory div for each saved link -->
<div class="saved-link">
    <button id="shortcutButton">Set Shortcut</button>
    <!-- Other content for the link, like title and URL -->
</div>

=================================================================

popup.js:
document.addEventListener('DOMContentLoaded', function () {
    // ...

    // Get the saved link elements
    const savedLinks = document.querySelectorAll('.saved-link');

    // Loop through each saved link and add event listener to Set Shortcut button
    savedLinks.forEach(function (savedLink) {
        const shortcutButton = savedLink.querySelector('#shortcutButton');

        shortcutButton.addEventListener('click', function () {
            // Add logic to capture the keyboard combination
            document.addEventListener('keydown', function (event) {
                // Check if the user pressed a valid keyboard combination (e.g., Ctrl + K)
                if (event.ctrlKey && event.key === 'k') {
                    // Perform the desired action, like opening the associated link
                    const linkURL = savedLink.getAttribute('data-url');
                    chrome.tabs.create({ url: linkURL });
                }
            });
        });
    });

    // ...
});

=================================

manifest.json:
{
    "manifest_version": 2,
    "name": "Link Manager Extension",
    "version": "1.0",
    "permissions": [
        "activeTab"
    ],
    "background": {
        "scripts": ["background.js"],
        "persistent": false
    },
    "browser_action": {
        "default_popup": "popup.html",
        "default_icon": {
            "16": "images/icon16.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
        }
    },
    "icons": {
        "16": "images/icon16.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["content.js"]
        }
    ],
    "permissions": [
        "storage",
        "activeTab"
    ],
    "content_security_policy": {
        "extension_pages": "script-src 'self'; object-src 'self';"
    }
}

================================

When the user sets a shortcut for a saved link, you need to store this information in Chrome's storage. Additionally, you might want to update the UI to indicate that a shortcut has been set for a specific link.



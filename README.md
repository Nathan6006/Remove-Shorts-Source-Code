# Remove Shorts Extension 

### Overview
The Remove Shorts Extension is a Chrome browser extension designed to enhance your productivity during browsing. Remove Shorts does so by completely blocking YouTube Shorts and giving the option to block YouTube entirely. As YouTube Shorts are addicting and can often destroy productivity, this extension offers a seamless way to save time by blocking access to these shorts. 

### Project Structure
Below is an overview of each file included in the extension:

##### manifest.json
The manifest.json file is the core of the extension. It contains metadata about the extension, such as its name, version, description, permissions, and the files it uses. Here’s a brief rundown of its contents:

* manifest_version: This extension uses version 3.
* name: The name of the extension, Remove Shorts
* version: The current version of the extension. It is 1.0 (I likely won't make too many future updates)
* description: A brief description of what the extension does.
* icons: Specifies the icons used for the extension in different sizes. Icons can be found in the images folder.
* permissions: Lists the permissions required by the extension, such as accessing YouTube URLs and using storage. The extension uses the following permissions: activeTab", "declarativeNetRequest", "declarativeNetRequestWithHostAccess", "storage", and "webNavigation"
* background: Points to the background script that runs in the background to manage blocking functionality. The background script is background.js.
* action: Specifies the popup file (popup.html) and icon.
* content_scripts: Lists the scripts that run on matched (YouTube) pages.
* web_accessible_resources: Specifies resources accessible to the extension. Such as blocked and removed.html

##### background.js
The background.js file contains the background script that handles the core functionality of the extension. It listens for messages from the popup and content scripts to toggle the Block YouTube feature. It also checks whether the user is visiting a YouTube Shorts URL and proceeds to block it. The way pages are blocked are by redirecting to HTML pages (blocked.html for Block YouTube and removed.html for Removing Shorts).

##### popup.js
The popup.js file manages the popup interface that users interact with. It includes code to handle user input, such as toggling the blocking functionality on or off. The popup script communicates with the background script to block YouTube based on the user input. It is important that popup.js serves no role in blocking YouTube shorts. The blocking of YouTube shorts is automatic and may not be turned off other than uninstalling (find out why in design choices).

##### content.js
The content.js file is injected into YouTube pages and communicates with the background script to ensure YouTube is blocked when the Block Youtube feature is active. It sends messages to the background script to check the current state and act accordingly.

##### blocked.html and removed.html
The removed.html file is the custom page users are redirected to when they try to access YouTube Shorts. This page informs them that they have been redirected because YouTube Shorts are blocked by the extension. 
Blocked.html is similar, it redirects to a page saying they have turned on the Block Youtube feature. 

##### blocked.css
The blocked.css file contains the styles for both the blocked.html page and removed.html page. It ensures that the blocked page looks clean and professional, providing a good user experience even when users are redirected. I will admit the redirection page is not that aesthetic, but it will do.

##### images/
This folder contains the images used by the extension, such as the logo and any other visual elements. The images are referenced in the manifest, popup, and blocked/removed HTML files.

### Design Choices
##### Blocking Mechanism
One of the critical design choices for this extension was deciding how to block YouTube Shorts effectively. Since I know how addicting short-form content can be, I opted to not include a feature to toggle whether YouTube shorts are blocked. While I understand this may frustate some users, I decided to build the extension this way. I made the block YouTube feature toggle-able because long-form content isn't as addicting. 

##### User Interface
The user interface was designed to be simple and intuitive. The popup interface allows users to toggle the blocking functionality with a single click. I debated adding more complex features, such as customization options or scheduling when the blocking is active. However, since this is the first extenstion I've developed I opted for mroe simple features I could manage. 

##### Redirection Page
For the redirection page, I chose to create a custom blocked/removed.html file. This approach ensures users understand why they were redirected and provides a clean, user-friendly experience. I debated displaying a generic error page but opted for a custom page to offer a more professional and polished experience (Again, I admit the page is not exceddingly aesthetic).

### Conclusion
The Remove Shorts Extension is designed to provide a focused and distraction-free (at least from YouTube) broswer experience. By leveraging a combination of background and content scripts, we ensure that YouTube Shorts are effectively blocked based on user preferences. Our design choices, such as a simple user interface and a custom redirection page, contribute to a seamless and user-friendly experience. We believe this extension will be a valuable tool for users who want to maintain a clean and distraction-free YouTube feed.

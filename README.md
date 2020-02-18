# gtm-quickshare

![preview](/public/assets/images/documentation-explanation/appPreview.gif)

## Introduction
GTM QuickShare is a file repository that specializes in maintaining your teams versioned tax software. We provide space to store and manage your files, bridging the gap between you and your clients. We keep all of your files categorized and organized, synchronously!

## QuickShare Documentation

- [gtm-quickshare](#gtm-quickshare)
  - [Introduction](#introduction)
  - [QuickShare Documentation](#quickshare-documentation)
  - [Getting Started Guide](#getting-started-guide)
    - [File Repositories](#file-repositories)
      - [Navigating File Repositories](#navigating-file-repositories)
    - [Reading, Writing, and Navigating Folders](#reading-writing-and-navigating-folders)
      - [Show All Existing Folders](#show-all-existing-folders)
      - [Navigating Folders](#navigating-folders)
      - [Creating New Folders](#creating-new-folders)
    - [Importing, Editing, and Deleting Files](#importing-editing-and-deleting-files)
      - [Upload Files](#upload-files)
      - [Editing and Deleting Files](#editing-and-deleting-files)
    - [Accessing Key Shortcuts](#accessing-key-shortcuts)
    - [Latest Release Notes:](#latest-release-notes)
      - [gtm-quickshare Patch Notes | Released: 2.18.2020 | [V-1.1.0-Beta]:](#gtm-quickshare-patch-notes--released-2182020--v-110-beta)
      - [gtm-quickshare Patch Notes | Released: 1.14.2020 | [V-1.0.0-Beta]:](#gtm-quickshare-patch-notes--released-1142020--v-100-beta)
      - [gtm-quickshare Patch Notes | Released: 7.25.2019 | [V-1.0.0-Alpha]:](#gtm-quickshare-patch-notes--released-7252019--v-100-alpha)

## Getting Started Guide
GTM QuickShare makes it easy to host and manage your tax automation software. We will go over all key features of QuickShare and how to use them. Learn all there is to know about our services by following this 'Getting Started' guide in order.

### File Repositories
GTM Quickshare gives your team space to maintain your files, these organized collections are called 'File Repositories'.

#### Navigating File Repositories
1. On <a href="https://gtm-quickshare.herokuapp.com/">gtm-quickshare.herokuapp.com</a> click on 'File Repositories' located on the right side of the navbar.
2. Click on the latest collection available in the dropdown.
3. That's it! You should see a prompt window pop up.

Now that you know where to find a collection, on the next part, let's talk about reading and writing data, as well as navigating folders within these collections.

### Reading, Writing, and Navigating Folders
Inside each file repository collection is a group of folders. These folders contain files for all teams that participate in QuickShare.
Currently, only TAS participates, so each folder represents different file collections specifically for TAS clients. We will be going over reading, writing, and navigating between these folders.

#### Show All Existing Folders
The first thing you want to do before proceeding to read files is view what currently exists in the collection. You can do this by
leaving the prompt box empty and clicking 'OK'. This will bring up a listing of all known folders that currently exist. You can
click on any of the folders to bring up the box prompt again or by doing the shortcut 'ctrl + r'.

If you don't see a box prompt, simply refresh the page or use the shortcut 'ctrl + r' and the prompt should appear.

#### Navigating Folders
In order to pull up all the files inside a folder, simply type the name of the folder into the prompt box, then click 'OK'.
This will pull up that folders contents and allow you to see what is currently available for download. Its that simple.

Using 'ctrl + r' or refreshing the page will then pull back up the prompt box, allowing you to enter other folders by explicitly providing the desired folder name in the prompt box.

#### Creating New Folders
If you want to create a new folder, simply type a unique name for the folder you want to create into the box prompt.
It's that simple, you have successfully created a new folder. At thid point, if you refresh the page with an empty
folder, it will not be saved and your folder will get deleted.

Next we will upload a file to your newly created folder!

### Importing, Editing, and Deleting Files
When inside a folder you have complete control over the data in front of you. You can upload, edit, and delete files very easily.
In this section we will go over uploading, editing, and deleting files from a folder.

#### Upload Files
1. Navigate to the 'Data Options' menu by directly clicking on the (⚙️) icon labeled 'Data Options' or using the shortcut 'Shift + D'.
2. A menu should pop up with a big blue button labeled 'Upload File', click on that. (Alternitively use the shortcut 'Shift + U').
3. A file browser should pop up, search for the file you are looking to upload and click 'Open', or double click the file.
4. At this point, your file has been pushed to site storage. Click on 'Push File' or use shortcut 'Shift + p' to finish importing.

That's it! If your file successfully pushes to the table an alert box will let you know it was successful. When the upload process is complete, you will be taken back to the prompt box. In order to view your newly uploaded file, enter the name of the folder you
created, your file should be there, ready to maintain and use. If you don't remember the name of your folder, it can be found
by checking all existing folders (read 'Show All Existing Folders' for a refresher) on how to do that.

#### Editing and Deleting Files
You've successfully created a folder, uploaded a file, aaannd messed it up (I know you didn't, just go with it). So, how can we fix this?

1. Under 'File Actions' click on the yellow edit icon.
2. A box will pop up asking you to rename the file, enter any new desired name into the box below.
3. You should get an edit success message, in which case you will be sent back to the folder prompt.
4. Go back into the folder with the file you edited, you should see the changes you made take effect.
5. That's it! Your file has been edited. If you don't want your file edited, don't follow these steps.

Deleting Files: I don't need to make section for deleting files, click the red 'X' next to the edit icon, and your file will be removed.

### Accessing Key Shortcuts
While you can simply click your way through uploading we have plenty of shortcuts to make it faster! Simply click on 'Shortcuts' in the navbar and a list of all shortcuts will be displayed.

That's it, you're now a QuickShare Pro!

### Latest Release Notes:

#### gtm-quickshare Patch Notes | Released: 2.18.2020 | [V-1.1.0-Beta]:
* Bug Fixes/Improvements:
  * Fixed a bug that let users push undefined, null, and empty file content.
  * The file upload option becomes disabled when a user is viewing all folders to avoid pushing data outside of folders.
  * The 'Push File' button is no longer present on every Data Options tab.
  * Fixed a glitch that caused 'File Action' tooltips to not display.
  * Fixed an issue causing the date and time to display incorrect Am/Pm values.
  * Fixed a problem where the last updated date and time wouldn't show leading zeros and display incorrectly formatted times.
* New Features:
  * Users can now edit the name of their files.
  * Changed the icons for edit and delete to better fit the page.
  * 'Last Updated' dates now display when a file has been edited.
  * Created blue and yellow checkmarks to indicate when a file is new or has been updated.

#### gtm-quickshare Patch Notes | Released: 1.14.2020 | [V-1.0.0-Beta]:
* Bug Fixes/Improvements:
  * Fixed a bug causing files to be shown as 'Undefined' when leaving the folder select prompt blank.
  * When leaving the folder select prompt blank, you will no longer see an invisible folder name.
  * Date added no longer contains the current date prior to pushing files.
  * Removed the bugged overflow border from 'All Folders'.
  * The 'About' section no longer appears under any of the current data collections.
  * The 'About' link actually works now, smooth scrolling you to the about content.
  * Fixed a glitch causing the 'scroll back to top' button from not rendering.
* New Features:
  * All datatables now contain file pagination.
  * Migrated source code to Node Express using the Handlebars view engine.
  * Migrated from Bootstrap to Material Design Bootstrap.

#### gtm-quickshare Patch Notes | Released: 7.25.2019 | [V-1.0.0-Alpha]:
* Bug Fixes/Improvements:
  * Fixed a bug causing the upload sound not to play during a shortcut upload.
  * Fixed a bug that caused the IE detector not to display the browser warning.
* New Features:
  * Deleting a file no longer requires you to enter a 'unique ID'.
  * The table now displays the number of files contained within a folder.
  * Added search filtering to make searching files through Sync Tables easier.
  * The Sync Table has been totally redesigned with even smarter autofill features.
  * Got rid of the boring old carousel photos in favor of better looking gifs.
  * Added a few more featurettes to the landing page to better answer 'WHY QuickShare?'.
  * GTM QuickShare has a fresh new design from it's previous beta build.
  * Updated the Folder navigation prompt to better explain the upload process.

Please Note: All updates are made here, check back on occasion for future releases.
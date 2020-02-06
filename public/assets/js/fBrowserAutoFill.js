// AutoFill Form Fields | Populates the Uploaded File Name to the DOM Elements (Browser, File Name, File Date).
$('input[type=file]').change(() => {
    // Listen to the Browser For Later Population.
    const FileBrowser = document.getElementById("FileBrowser");
    // Listen to the 'File Name' Field For later Population.
    const fName = document.getElementById("fName");
    // Listen to the 'Date Added' Input Field For later Population.
    const fDate = document.getElementById("fDate");

    // Listen For and Grab the Values From the File Browser.
    // Store the Values Into 'sFileName' Use A Regex To
    // Remove Trailing Characters and Trim Off White Space
    // To the Right, But Leaving Some On the Left To
    // Make Room Between the Font Awesome Icon and
    // the File Name Text.
    let sFileName = $("#fBrowser").val().trim().replace(/^.*\\/, " ");

    // Populate the Input Browser.
    FileBrowser.textContent = sFileName;

    // Populate the File Name Input Field.
    fName.value = sFileName;
});
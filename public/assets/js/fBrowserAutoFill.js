// AutoFill Form Fields | Populates the Uploaded File Name to the DOM Elements (Browser, File Name, File Date).
$('input[type=file]').change(() => {
    // Get the Current Date For the 'Date Added' Input Field.
    let newDate = new Date();

    // Month, Date, and Year (MM:DD:YY) Format With Zeros.
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate();
    let yyyy = newDate.getFullYear();

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

    // Populate the New Date Stamp to 'NewDate'.
    newDate = mm + '-' + dd + '-' + yyyy;
    newDate = mm + '/' + dd + '/' + yyyy;

    // Populate the 'Date Added' Input Field With Our Newly Created Date.
    fDate.value = newDate;
});
// Only execute script if it matches the URL.
if (window.location.href.indexOf('localhost:3000/m-2020') != -1) {

    // Define Fire Config Object.
    let fireConfig = {
        apiKey: "AIzaSyCJX3knlZNP2WuJf71uxs0qbFMH3uY-xZY",
        authDomain: "m-2020.firebaseapp.com",
        databaseURL: "https://m-2020.firebaseio.com",
        projectId: "m-2020",
        storageBucket: "m-2020.appspot.com",
        messagingSenderId: "889412402961",
        appId: "1:889412402961:web:fc1405facf4f7a6dde16b0",
        measurementId: "G-FJ9HR5F7SF"
    };

    // Let the user pick the folder they want to navigate to.
    // This can also be used to let them create new folders.
    let fPath = prompt("Welcome to the " + fireConfig.projectId + " collection.\n*************************************************************************\n                                 ---- Folder Navigation ---- \n How This Works:\n 1.) Leave the box blank to pull up a list of all folders.\n 2.) Type an existing folder name to view it.\n 3.) Create a new folder by typing the desired folder name into the box.\n\nRecommendation: Keep all folder names unique to avoid confusion.");

    // Initialize DB Object.
    firebase.initializeApp(fireConfig);
    // Make a reference to the DB we are writing to.
    let FireDB = firebase.database().ref(fireConfig.projectId + '/' + fPath);
    // Populate the name of the database onto the DB path.
    document.getElementById("DBName").textContent = fireConfig.projectId;

    // The 'Upload File' Button.
    let btnUpload = document.getElementById('fBrowser');

    // This is the submit event for uploading files.
    btnUpload.addEventListener('change', function (e) {
        // The percent value element.
        const uploader = document.getElementById("uploader");
        // Target and save file data.
        const file = e.target.files[0];
        // File dump path.
        const uploadPath = firebase.storage().ref('data-storage/' + file.name);
        // Pass the file through storage bucket.
        const task = uploadPath.put(file);
        // Track upload progress.
        task.on('state_changed', function progress(snapshot) {
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                // Textarea for download link.
                const fLink = document.getElementById("fLink");
                // If the download link is ready, populate the textarea with direct downloadURL.
                if (percentage < 100) {
                    // Disable file browse button during an upload to prevent data confliction and errors.
                    $("input[type='file']").attr("disabled", true);
                    // Hide normal submit button.
                    $("#btnSubmit").hide();
                    // Show processing button.
                    $("#btnProcessing").show();

                } else if (percentage === 100) {
                    window.BeforeUnloadEvent = null;
                    // Pass download link into our textarea field.
                    fLink.value = downloadURL;
                    // Pass the file name into the fName input.
                    fName.value = file.name;
                    // Show normal submit button.
                    $("#btnSubmit").show();
                    // Hide processing button.
                    $("#btnProcessing").hide();
                }
            });

            // Show upload progress.
            $(".progress").show();
            // Calculate upload percent complete.
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // As progress is being calculated, reflect this in the upload bar by passing percent calc through bar width.
            $('#uploadProgress').attr('aria-valuenow', Math.round(percentage)).css('width', Math.round(percentage) + "%");

            // Pass the calculated percent into the DOM tracker.
            uploader.textContent = "Processing Your File: " + Math.round(percentage) + "%";

            // Check for errors.
        }, function error(err) {
            // Error.
            console.log(err);
            // Success!
        }, function complete() {
            // Hide Progress.
            function removeBar() {
                $(".progress").hide();
                console.log("Database: File '" + file.name + "' Uploaded Successfully!");
                clearInterval(removeLoadBar);
                // Population Success Alert.
                $.notify({
                    // Font Awesome Icon.
                    icon: 'fa fa-exclamation-triangle',
                    // Toast Title.
                    title: '<b>File Upload Success:</b> ',
                    // Toast Message.
                    message: 'Your file, "' + file.name + '", was recently uploaded to site storage. Click the "Upload File" button to push details to the public repository.',
                });
            }
            // Hide progress bar.
            const removeLoadBar = setInterval(removeBar, 0);
        });
    });

    // When the user clicks on the 'Upload File' button, initialize a form capture to gather input values.
    $("#formSubmit").on("submit", function (e) {
        // Prevent default form behavior so the page doesn't refresh.
        e.preventDefault();

        // Start collecting form input data.
        submitForm(e);

        // Reload.
        setTimeout(() => {
            window.location.reload();
        }, 10);

        alert("Your file has been successfully pushed to " + fireConfig.projectId + "!")
    });

    // When a submitssion is triggered by the user, listen to each field of reference and save the data.
    function submitForm(e) {
        // Prevent default form behavior so the page doesn't refresh.
        e.preventDefault();

        // Gather Input Data Values.
        let fName = document.getElementById("fName").value;
        let fLink = document.getElementById("fLink").value;
        let fSize = document.getElementById("fSize").value;
        let fDate = document.getElementById("fDate").value;

        // Push Captures into a save function.
        saveFile(fName, fLink, fDate, fSize);

        // Show sync notification.
        $.notify({
            // Notify Settings.
            icon: 'fa fa-exclamation-triangle',
            title: '<b>Upload Successful:</b> ',
            message: 'Your file, "' + fName + '", was merged to the table successfully.',
        });
    }

    // Push data to the DB we are writing to.
    function saveFile(fName, fLink, fDate, fSize) {
        // Push the saved data into the database: 'gtm-slot1'.
        let formData = FireDB.push();
        formData.set({
            fName: fName,
            fLink: fLink,
            fDate: fDate,
            fSize: fSize
        });
    }

    // When a submit is triggered by the user, save the data.
    function submitForm(e) {
        e.preventDefault(); // Prevents the usual submit functionality during a save.

        // Global variables used to put our user info into for later table population.
        let fName = getInputVal('fName'); // File Name.
        let fLink = getInputVal('fLink'); // File Link.
        let fDate = getInputVal('fDate'); // File Author.
        let fSize = getInputVal('fSize'); // File Size.

        // Push file data into a save.
        saveFile(fName, fLink, fDate, fSize);
    }

    // Listen for submit data.
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    // Save submit data into their respective variables.
    function saveFile(fName, fLink, fDate, fSize) {
        let newMessageRef = FireDB.push();
        newMessageRef.set({
            fName: fName,
            fLink: fLink,
            fDate: fDate,
            fSize: fSize
        });
    }
    // Populate the Sync Table with each new entry in order by key.
    let userDataRef = firebase.database().ref(fireConfig.projectId + "/" + fPath).orderByKey();
    userDataRef.once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // If the name of the folder is correct, use the shorthand name typed by the user.
                // If it is otherwise wrong, use the population name. This will ensure that when
                // it fails, it will instead use the 'All Folders (Root)' name instead of white space.
                if (fPath !== "") {
                    // Populate using the official DB reference.
                    document.getElementById("SlotName").textContent = fPath;
                    document.getElementById("foldName").textContent = fPath;
                    $("#tabFolders").hide();
                } else if (fPath == "") {
                    // Populate using hard coded root warning.
                    document.getElementById("SlotName").textContent = "All Folders (Root)";
                    document.getElementById("foldName").textContent = "All Folders (Root)";

                    // Show All Folders.
                    $(".fa-cog").click();
                    $("#tabFolders").click();
                    $("#dataPopulate").hide();
                }
                // Stores the unique key generated for each file.
                let key = childSnapshot.key;

                let fName = childSnapshot.val().fName; // File Name.
                let fLink = childSnapshot.val().fLink; // File Link.
                let fSize = childSnapshot.val().fSize // File Size.
                let fDate = childSnapshot.val().fDate; // File Date.

                // Format our table into a datatable.
                let table = $('#dataPopulation').DataTable({
                    lengthMenu: [4, 8, 16, 25, 50, 80, 100],
                    "scrollY": "350px",
                    "paging": true,
                });

                // *******************************************************************SYNC TABLE**********************************************************************************************************************************************
                let dataSet = [
                    // File Name.
                    ["<td>" + "<a class='text-info' href='" + fLink + "'><span class='domFName'>" + fName + "</span></a></td>"],
                    [
                        // File Size.
                        ['<td>' + fSize + '</td>']
                    ],
                    // Date Added.
                    [
                        ['<td>' + fDate + '</td>']
                    ],
                    // Table Actions.
                    [
                        '<td>' +
                        // Delete File.
                        '<i style="cursor: pointer;" class="fa fa-trash text-danger p-3" aria-hidden="true"></i>' +
                        '<i style="cursor: pointer;" class="fa fa-edit text-warning p-3" aria-hidden="true"></i>' +
                        '</td>'
                    ],
                    [
                        ['</tr>']
                    ],
                ];
                // *******************************************************************SYNC TABLE**********************************************************************************************************************************************

                // Populate our table with the user entered data.
                table.rows.add([dataSet]).draw();

                // If the user leaves the prompt blank, be sure to show the list of folders currently registered in the DB.
                if (fPath == "" || " " || null) {
                    // Loop through and populate the 'All Folders' tab with each folder name.
                    for (let i = 0; i < key.length; ++i) {
                        let buttons = $('<a href="https://gtm-quickshare.herokuapp.com/' + fireConfig.projectId + '"><button style="font-size: 150%; margin-top: 10px; width: 100%; height: 50px;"><i class="fa fa-folder text-warning float-left" aria-hidden="true"></i> <b class="text-primary">' + key + '</b></button><br />')
                        buttons.appendTo('#AllFolders');
                        break;
                    }
                }
                // Deletes a single row in the table.
                $(".fa-trash").on('click', function () {
                    for (let k = 0; k < key.length; ++k) {
                        // Remove child from the database.
                        FireDB.child(key).remove();
                        // Remove this row from the DB to reflect the current state of the DB.
                        $(this).parents("tr").remove();
                        // Stop looping once key is removed.
                        if (key == removed()) {
                            break;
                        }
                    }
                });
                // Edits a single row in the table.
                $(".fa-edit").on('click', function () {
                    for (let l = 0; l < key.length; ++l) {
                        // Modify fName prompt.
                        let mName = prompt("Type a new name for '" + fName + "' in the box below and click 'OK'.");
                        // Key we want to modify.
                        let FireDB = firebase.database().ref("m-2020/" + fPath + "/" + key);
                        // Change data based on prompt data.
                        FireDB.update({
                            fName: mName,
                        });
                        // Let the user know their file was changed.
                        alert("Your file was successfully renamed '" + mName + "'.");
                        window.location.reload();
                        // Stop looping once key is modified.
                        if (key == removed()) {
                            break;
                        }
                    }
                });
            });
        });

    // File Size Calculator.
    $(document).ready(function () {
        $("#fBrowser").change(function () {
            let iSize = ($("#fBrowser")[0].files[0].size / 1024);
            if (iSize / 1024 > 1) {
                if (((iSize / 1024) / 1024) > 1) {
                    iSize = (Math.round(((iSize / 1024) / 1024) * 100) / 100);
                    $("#fSize").val(iSize + " GB");
                } else {
                    iSize = (Math.round((iSize / 1024) * 100) / 100)
                    $("#fSize").val(iSize + " MB");
                }
            } else {
                iSize = (Math.round(iSize * 100) / 100)
                $("#fSize").val(iSize + " KB");
            }
        });
    });

    // Shortcut to 'Data Options'.
    $(this).on('keypress', function (event) {
        let keyU = 68; // 'D' Key.
        if (event.keyCode == keyU) {
            $(".fa-cog").click();
        }
    });

    // Shortcut to 'Upload Files'.
    $(this).on('keypress', function (event) {
        let keyU = 85; // 'U' Key.
        if (event.keyCode == keyU) {
            $("#fBrowser").click();
        }
    });

    // Shortcut to 'Push File'.
    $(this).on('keypress', function (event) {
        let keyU = 80; // 'P' Key.
        if (event.keyCode == keyU) {
            $("#btnSubmit").click();
            setTimeout(() => {
                window.location.reload();
            }, 10);
        }
    });

    // Shortcut to 'Shortcuts List'.
    $(this).on('keypress', function (event) {
        let keyU = 83; // 'S' Key.
        if (event.keyCode == keyU) {
            $("#ShortcutMenu").click();
        }
    });
}
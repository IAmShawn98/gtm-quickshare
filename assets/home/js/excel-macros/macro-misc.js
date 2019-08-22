// DATABASE CONFIG.
var dbConfig = {
  apiKey: "AIzaSyCD1TuhLI8uqpd5ttAXzTzVoIkYd60Kg84",
  authDomain: "gtm-slot1.firebseapp.com",
  databaseURL: "https://gtm-slot1.firebaseio.com",
  projectId: "gtm-slot1",
  storageBucket: "gtm-slot1.appspot.com",
  messagingSenderId: "397260549406",
  appId: "1:397260549406:web:d3738fc15e56e8ad"
};

// Initialize Database Config.
firebase.initializeApp(dbConfig);

// Global ToolTip.
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Event Logger.
console.warn("%cDatabase Connection Established!", "color: #1a7343;");

// Define Success Audio.
var audio = new Audio('../audio/success.mp3');

// Define current date format.
var mDate = moment().format("MM.DD.YY");

// pass current date into the 'Date Added' input field.
dateAdded.value = mDate;

// Keep all 'Data Options' hidden until called for.
$("#fileInfoEdit").hide();
// $("#fileFolders").hide();

// Listen for 'Data Option' IDs to call them when they are clicked.
$(".item-2").on("click", function () {
  $("#fileInfoEdit").show();
})

// Shortcut to 'Data Options'.
$(this).on('keypress', function (event) {
  var keyU = 68; // 'D' Key.
  if (event.keyCode == keyU) {
    $(".fa-cog").click();
  }
})

// Shortcut to 'Upload Files'.
$(this).on('keypress', function (event) {
  var keyU = 85; // 'U' Key.
  if (event.keyCode == keyU) {
    $("#file").click();
  }
})

// Shortcut to 'Push File'.
$(this).on('keypress', function (event) {
  var keyU = 80; // 'P' Key.
  if (event.keyCode == keyU) {
    $("#btnSubmit").click();
    window.location.reload();
  }
})

dataFolder = prompt("                           --- Folder Navigation Instructions ---\n" +
  "1.) Type the name of the folder you want to view in the box below. If you don't know which folder you want, leave it blank and do #2. \n" +
  "2.) Navigate to 'Data Options ---> Data Folders' to view a list of all available folders.\n" +
  "3.) Click on one of the folders to bring you back here or do the shortcut 'CTRL + R'. " +
  "Then enter the name of the folder into the box below. The Sync Table should then populate with your folder data.\n\n" +
  "                           --- Create New Folder Instructions ---\n" +
  "1.) Enter a new folder name into the box below, ensure the name you picked isn't already an existing folder.\n" +
  "2.) Upload at least one file and the folder should appear in the 'Data Folders' tab in 'Data Options'. \n\n" +
  "Have questions? Contact me at 'sluther@gtmtax.com'");

// Reference the database we're writing to.
var gtmSlot1 = firebase.database().ref('gtm-slot1/' + dataFolder + "/");

// Display Database Name In Data Folder Container.
var displayDBName = document.querySelector(".displayDBName").innerHTML = dbConfig.projectId + "<span class='text-dark'> / " + dataFolder + "</span>";
var displayDBNameCrumbs = document.querySelector(".displayDBNameCrumbs").innerHTML = dbConfig.projectId + "<span class='text-dark'> / " + dataFolder + "</span>";

// UPLOAD BUTTON CLICK EVENT.

// When the user clicks on the 'Upload File' button, initialize a form capture to gather input values.
$("#formSubmit").on("submit", function (e) {
  // Event Logger.
  console.clear(); // Clear previous DB messages.
  console.log("Database: Submit triggered, initializing data capture....");

  // Prevent default form behavior so the page doesn't refresh.
  e.preventDefault();

  // Start collecting form input data.
  submitForm(e)
});

// GATHER INPUT DATA.

// When a submitssion is triggered by the user, listen to each field of reference and save the data.
function submitForm(e) {
  // Prevent default form behavior so the page doesn't refresh.
  e.preventDefault();

  // Gather Input Data Values.
  var fName = document.getElementById("fName").value;
  var fLink = document.getElementById("fLink").value;
  var fSize = document.getElementById("fSize").value;
  var dateAdded = document.getElementById("dateAdded").value;

  // Event Logger.
  console.log("Database: DOM elements captured, pushing data to 'saveFile'....");
  console.log("-------------------------------------------------");
  console.log("DATA CAPTURE REPORT: ");
  console.log("fName: " + fName);
  console.log("fLink Raw: " + fLink);
  console.log("fLink Slice: " + fLink.slice(0, 38));
  console.log("fSize: " + fSize);
  console.log("dateAdded: " + dateAdded);
  console.log("-------------------------------------------------");

  // Push Captures into a save function.
  saveFile(fName, fLink, fSize, dateAdded);

  // Show sync notification.
  $.notify({
    // Notify Settings.
    icon: 'fa fa-exclamation-triangle',
    title: '<b>Upload Successful:</b> ',
    message: 'Your file, "' + fName + '", was merged to the table successfully.',
  })
}

// PUSH DATA COLLECTION TO FIREBASE.

// Push data to the correct DB slot.
function saveFile(fName, fLink, fSize, dateAdded) {
  // Event Logger.
  console.log("Database: Sending data to Firebase....");

  // Push the saved data into the database: 'gtm-slot1'.
  var formData = gtmSlot1.push();
  formData.set({
    fName: fName,
    fLink: fLink,
    fSize: fSize,
    dateAdded: dateAdded
  });

  // Event Logger.
  console.log("Database: Form submit complete, data sent!");
}

// BUILD HTML DATA TABLE.
function buildTable() {
  var database = firebase.database().ref('gtm-slot1/' + dataFolder);
  database.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;

      // Define our gathered data for table population.
      var fName = childSnapshot.val().fName; // File Name.
      var fLink = childSnapshot.val().fLink; // File Link.
      var fSize = childSnapshot.val().fSize; // File Size.
      var dateAdded = childSnapshot.val().dateAdded; // Date Added.

      // Format our table into a datatable.
      var table = $('#dataPopulation').DataTable({
        "scrollY": "300px",
        "scrollCollapse": true,
        "paging": false,
      });

      // Format our DB snapshots into readable HTML.
      if (dataFolder === "") {
        var dataSet = [
          // File Name.
          ['<tr><h1>-</h1>'],
          [
            // File Size.
            ["<h1>-</h1>"]
          ],
          // Date Added.
          [
            ['<td><h1>-</h1></td>']
          ],
          // Table Actions.
          ["<h1>-</h1>"],
          [
            ['</tr>']
          ],
        ];
        // Populate our table with the user entered data.
        table.rows.add([dataSet]).draw();
      } else {
        var dataSet = [
          // File Name.
          ['<tr>' + '<td>' + '<a href=' + fLink + '>' + fName + '</a>'],
          [
            // File Size.
            ['<td>' + fSize + '</td>']
          ],
          // Date Added.
          [
            ['<td>' + dateAdded + '</td>']
          ],
          // Table Actions.
          [
            '<td>' +
            // Delete File.
            '<i class="fa fa-trash text-danger p-3" aria-hidden="true"></i>' +
            // '<i class="fa fa-edit text-warning p-3" aria-hidden="true"></i>' +
            // Edit File.
            // '<i id="btnEdit" class="fa fa-edit text-warning" aria-hidden="true"></i>' +
            // Save File.
            // '<i style="display: none;" id="btnEdit" class="fa fa-save text-info p-3" aria-hidden="true"></i>' +
            '</td>'
          ],
          [
            ['</tr>']
          ],
        ];
        // Populate our table with the user entered data.
        table.rows.add([dataSet]).draw();
      }

      for (var i = 0; i < key.length; i++) {

        var buttons = $('<button style="font-size: 120%; color: #000000;" id="myInput" onclick="window.location.reload();" class="btn btn-sm btn-outline-secondary bg-light m-1 font-size-"><i class="fa fa-folder text-warning" aria-hidden="true"></i> ' + key + '</button>')
        buttons.appendTo('#btnFolders');

        // Folder / File ID card title.
        var dfTitle = document.querySelector(".dfTitle");

        // Folder / File ID card DB name.
        var dbName = document.querySelector(".dbName");

        // If the folder is undefined, tell the user they need to select one.
        if (dataFolder === "") {
          txtFolderName.textContent = "No Folder Selected";
          setTimeout(() => {
            $(".fa-cog").click();
            $("#tabFolders").click();
          }, 500);
          dataFolder = "NRG";
          // $("#dataBody").hide();
        } else {
          // If the folder is selected, call it's name in the folder name title.
          txtFolderName.textContent = dataFolder;
          dfTitle.textContent = "File IDs";
          tabFolders.textContent = dataFolder + " IDs";
        }
        // To prevent dupes, break.
        break;
      }

      // Deletes a single row in the table.
      $(".fa-trash").on('click', function () {
        for (var i = 0; i < key.length;) {
          // Remove child from the database.
          gtmSlot1.child(key).remove();
          // Remove this row from the DB to reflect the current state of the DB.
          $(this).parents("tr").remove();
          // Stop looping once key is removed.
          if (key === removed()) {
            break;
          }
        }
      })

      // Allows the user to edit a single row.
      $(".fa-edit").on('click', function () {
        // Turn the row into an input so we can request child updates.
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
          $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '" id="' + key + '">');
          // gtmSlot1.child(key).set;
        });
      })
    });
  });
}

// Execute Build Table Function.
buildTable();

// File Upload Functionality.

// The submit button.
var fileButton = document.getElementById('file');

// Submit Event.
fileButton.addEventListener('change', function (e) {
  // Storage Reference.
  var storage = firebase.storage();
  // Storage path to add files.
  var storageRef = storage.ref();
  // The percent value element.
  var uploader = document.getElementById("uploader");
  // Target and save file data.
  var file = e.target.files[0];
  // File dump path.
  var storageRef = firebase.storage().ref('uploads/' + file.name);
  // Pass the file through storage bucket.
  var task = storageRef.put(file);
  // Track upload progress.
  task.on('state_changed', function progress(snapshot) {
    task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      // Textarea for download link.
      var fLink = document.getElementById("fLink");
      // If the download link is ready, populate the textarea with direct downloadURL.
      if (percentage < 100) {
        // Disable file browse button during an upload to prevent data confliction and errors.
        $("input[type='file']").attr("disabled", true);
        // Hide normal submit button.
        $("#btnSubmit").hide();
        // Show processing button.
        $("#btnProcessing").show();
      } else if (percentage === 100) {
        // // If a good file path is detected, continue pushing file.
        // if (fLink.value.slice(0, 38) === "https://firebasestorage.googleapis.com") {
        //   alert("File Security: This file is secure.");
        // } else {
        //   // If a bad file path is detected, warn the user, and stop the upload.
        //   $("#btnProcessing").hide();
        //   alert("File Security: Suspicious file path detected, removing bad file.");
        //   window.location.reload();
        // }
        // Pass download link into our textarea field.
        fLink.value = downloadURL;
        // Pass the file name into the fName input.
        fName.value = file.name;

        // Show normal submit button.
        $("#btnSubmit").show();
        // Hide processing button.
        $("#btnProcessing").hide();
        $("input[type='file']").attr("disabled", false);
      }
    });

    // Show upload progress.
    $(".progress").show();
    // Calculate upload percent complete.
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // As progress is being calculated, reflect this in the upload bar by passing percent calc through bar width.
    $('#uploadProgress').attr('aria-valuenow', Math.round(percentage)).css('width', Math.round(percentage) + "%");

    // Pass the calculated percent into the DOM tracker.
    uploader.textContent = Math.round(percentage) + "%";

    // Check for errors.
  }, function error(err) {
    // Error.
    console.log(err);
    // Success!
  }, function complete() {
    // Hide Progress.
    function removeBar() {
      $(".progress").hide();
      // Event Logger.
      console.clear();
      console.log("Database: File '" + file.name + "' uploaded successfully!");
      clearInterval(removeLoadBar);
      // Population Success Alert.
      $.notify({
        // Font Awesome Icon.
        icon: 'fa fa-exclamation-triangle',
        // Toast Title.
        title: '<b>File Upload Success:</b> ',
        // Toast Message.
        message: 'Your file, "' + file.name + '", was recently uploaded to site storage. Click the "Upload File" button to push details to the public repository.',
      })
      // Play Success Audio.
      audio.play();
    }
    // Hide progress bar.
    var removeLoadBar = setInterval(removeBar, 0);
  });
});

// File Size Calculator.
$(document).ready(function () {
  $("#file").change(function () {
    var iSize = ($("#file")[0].files[0].size / 1024);
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
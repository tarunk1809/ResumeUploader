/* function uploadFile() {
  document.getElementById("preview").style.visibility = "hidden";
  let file = document.getElementById("resume").files[0];
  const formData = new FormData();
  formData.append("file", file);

  //console.log(formData.get("file"));

  fetch("http://localhost:8000/resumeParse", {
    method: "POST", //Get,delete
    body: formData,
  }).then((response) => {
      //console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("File upload failed");
      }
    })
    .then((data) => {
      //console.log(data)
      document.getElementById("preview").style.visibility = "visible";
      document.getElementById("contactInfo").innerHTML =
        data.ContactInformation;
      document.getElementById("summary").innerHTML = data.Summary;
      document.getElementById("education").innerHTML = data.Education;
      document.getElementById("workHistory").innerHTML = data.WorkHistory;
      document.getElementById("skills").innerHTML = data.Skills;
      document.getElementById("contactInformation").innerHTML =
        data.Certifications;
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
}
 */
function uploadFile() {
  document.getElementById("preview").style.visibility = "hidden";
  let fileInput = document.getElementById("resume");
  let file = fileInput.files[0];

  // Validation: Check if a file is selected
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Validation: Check if the file type is PDF or DOC/DOCX
  let allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type. Please upload a PDF, DOC, or DOCX file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:8000/resumeParse", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("File upload failed");
      }
    })
    .then((data) => {
      document.getElementById("preview").style.visibility = "visible";
      document.getElementById("contactInfo").innerHTML = data.ContactInformation;
      document.getElementById("summary").innerHTML = data.Summary;
      document.getElementById("education").innerHTML = data.Education;
      document.getElementById("workHistory").innerHTML = data.WorkHistory;
      document.getElementById("skills").innerHTML = data.Skills;
      document.getElementById("contactInformation").innerHTML = data.Certifications;
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
}


// function uploadFile() {
//   const input = document.getElementById('resume');
//   const file = input.files[0];

//   if (file) {
//       const reader = new FileReader();
//       reader.onload = function(event) {
//           const text = event.target.result;

//           // Example parsing logic (You should implement your own logic here)
//           const contactInfo = "Extracted Contact Info"; // Replace with actual parsing logic
//           const summary = "Extracted Summary";
//           const education = "Extracted Education";
//           const workHistory = "Extracted Work History";
//           const skills = "Extracted Skills";
//           const certifications = "Extracted Certifications";

//           document.getElementById('contactInfo').innerText = contactInfo;
//           document.getElementById('summary').innerText = summary;
//           document.getElementById('education').innerText = education;
//           document.getElementById('workHistory').innerText = workHistory;
//           document.getElementById('skills').innerText = skills;
//           document.getElementById('certifications').innerText = certifications;

//           document.getElementById('preview').style.visibility = 'visible';
//       };

//       reader.readAsText(file);
//   } else {
//       alert("Please select a file.");
//   }
// }
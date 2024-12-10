"use strict";
var _a;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    const usernameElement = document.getElementById("username");
    const profilePhoto = document.getElementById("profilePhoto");
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const educationElement = document.getElementById("education");
    const experienceElement = document.getElementById("experience");
    const skillsElement = document.getElementById("skills");
    if (usernameElement && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const username = usernameElement.value.trim();
        const uniquePath = `${window.location.origin}/resume/${username}`;
        const profilePhotoFile = (_a = profilePhoto === null || profilePhoto === void 0 ? void 0 : profilePhoto.files) === null || _a === void 0 ? void 0 : _a[0];
        const profilePhotoURL = profilePhotoFile ? URL.createObjectURL(profilePhotoFile) : "";
        const resumeHTML = `
            <h2>Resume</h2>
            ${profilePhotoURL ? `<img src="${profilePhotoURL}" alt="Profile Photo" class="profilePicture">` : ""}
            <p><strong>Name:</strong> <span class="editable">${nameElement.value}</span></p>
            <p><strong>Email:</strong> <span class="editable">${emailElement.value}</span></p>
            <p><strong>Phone:</strong> <span class="editable">${phoneElement.value}</span></p>
            <h3>Education</h3>
            <p class="editable">${educationElement.value}</p>
            <h3>Experience</h3>
            <p class="editable">${experienceElement.value}</p>
            <h3>Skills</h3>
            <p class="editable">${skillsElement.value}</p>
        `;
        const resumeOutput = document.getElementById("resumeOutput");
        if (resumeOutput) {
            resumeOutput.innerHTML = `
                <div>${resumeHTML}</div>
                <div class="share-section">
                    <p><strong>Shareable Link:</strong> <a href="${uniquePath}" target="_blank">${uniquePath}</a></p>
                    <button id="downloadPDF" class="share-btn">Download PDF</button>
                </div>
            `;
            makeEditable();
            setupDownloadPDF(resumeHTML);
        }
    }
});
function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(element => {
        element.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "text";
            input.value = element.innerText;
            element.replaceWith(input);
            input.focus();
            input.addEventListener("blur", function () {
                const span = document.createElement("span");
                span.className = "editable";
                span.textContent = input.value;
                input.replaceWith(span);
                makeEditable(); // Rebind the event listener
            });
        });
    });
}
function setupDownloadPDF(htmlContent) {
    const downloadButton = document.getElementById("downloadPDF");
    downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener("click", function () {
        const blob = new Blob([htmlContent], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.pdf";
        link.click();
    });
}

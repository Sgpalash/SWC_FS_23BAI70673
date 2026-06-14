const MAX_FILE_SIZE = 2 * 1024 * 1024;

const uploadForm = document.querySelector("#uploadForm");
const fileInput = document.querySelector("#fileInput");
const previewButton = document.querySelector("#previewButton");
const previewImage = document.querySelector("#previewImage");
const uploadButton = document.querySelector("#uploadButton");
const removeButton = document.querySelector("#removeButton");
const statusMessage = document.querySelector("#statusMessage");

let previewUrl = "";

previewButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;

    if (file) {
        validateAndPreview(file);
    }
});

["dragenter", "dragover"].forEach((eventName) => {
    previewButton.addEventListener(eventName, (event) => {
        event.preventDefault();
        previewButton.classList.add("is-dragging");
    });
});

["dragleave", "drop"].forEach((eventName) => {
    previewButton.addEventListener(eventName, (event) => {
        event.preventDefault();
        previewButton.classList.remove("is-dragging");
    });
});

previewButton.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files;

    if (file) {
        validateAndPreview(file);
    }
});

removeButton.addEventListener("click", () => {
    resetSelection();
    setStatus("Photo removed.", "success");
});

uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!fileInput.files.length) {
        setStatus("Choose a valid image before uploading.", "error");
        return;
    }

    setStatus("Photo is ready to upload.", "success");
});

function validateAndPreview(file) {
    clearStatus();

    if (!file.type.startsWith("image/")) {
        rejectFile("Please choose an image file.");
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        rejectFile("The image must be 2 MB or smaller.");
        return;
    }

    setInputFile(file);
    showPreview(file);
}

function setInputFile(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;
}

function showPreview(file) {
    releasePreviewUrl();
    previewUrl = URL.createObjectURL(file);

    previewImage.src = previewUrl;
    previewImage.alt = `Preview of ${file.name}`;
    previewButton.classList.add("has-image");
    previewButton.setAttribute("aria-label", "Change the selected profile photo");
    uploadButton.disabled = false;
    removeButton.hidden = false;

    setStatus(`${file.name} selected.`, "success");
}

function rejectFile(message) {
    resetSelection();
    setStatus(message, "error");
}

function resetSelection() {
    releasePreviewUrl();
    fileInput.value = "";
    previewImage.removeAttribute("src");
    previewImage.alt = "Selected profile photo preview";
    previewButton.classList.remove("has-image");
    previewButton.setAttribute("aria-label", "Choose a profile photo");
    uploadButton.disabled = true;
    removeButton.hidden = true;
    clearStatus();
}

function releasePreviewUrl() {
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = "";
    }
}

function setStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

function clearStatus() {
    statusMessage.textContent = "";
    statusMessage.className = "status-message";
}

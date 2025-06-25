const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileElem");
const fileList = document.getElementById("file-list");
const form = document.getElementById("upload-form");

let uploadedFiles = [];

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("highlight");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("highlight");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("highlight");

  const files = Array.from(e.dataTransfer.files).filter(file => file.type === "application/pdf");
  uploadedFiles = uploadedFiles.concat(files);
  updateFileList();
});

fileInput.addEventListener("change", () => {
  uploadedFiles = uploadedFiles.concat(Array.from(fileInput.files));
  updateFileList();
});

function updateFileList() {
  fileList.innerHTML = "";
  uploadedFiles.forEach(file => {
    const li = document.createElement("li");
    li.textContent = file.name;
    fileList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  uploadedFiles.forEach(file => {
    formData.append("pdf_files", file);
  });

  const response = await fetch("/", {
    method: "POST",
    body: formData
  });

    if (!response.ok) {
    alert("Hiba történt a PDF összefűzés során.");
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "merged.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
});

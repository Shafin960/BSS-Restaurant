function addParagraph() {
  //   var containerDiv = document.querySelector(".admin");
  //   var paragraph = document.createElement("p");
  //   paragraph.textContent = "This paragraph was added from flutter.";
  //   containerDiv.appendChild(paragraph);
  leaving();
  window.location.href = "/addtable";
}

function loadin() {
  loadingDone.postMessage("JSON.stringify(titleList)");
  console.log("JS Working");
}

function leaving() {
  leavingDone.postMessage("JSON.stringify(titleList)");
  console.log("JS Working");
}

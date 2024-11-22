document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#instruction-btn")
    .addEventListener("click", function () {
      window.open(
        "https://github.com/annnnangan/floodlight-inspector-chrome-extension?tab=readme-ov-file#floodlight-inspector-chrome-extension"
      );
    });

  document
    .querySelector("#feedback-btn")
    .addEventListener("click", function () {
      window.open(
        "https://github.com/annnnangan/floodlight-inspector-chrome-extension/issues"
      );
    });
});

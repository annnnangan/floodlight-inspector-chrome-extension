chrome.devtools.panels.create(
  "Floodlight Inspector",
  "icon.png",
  "panel.html",
  () => {
    console.log("user switched to this panel");
  }
);

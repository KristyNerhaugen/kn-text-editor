const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// used this site to better understand adding functionality to the install button: https://pwa-workshop.js.org/5-pwa-install/#add-an-installation-button
// Event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  window.defferedPrompt = event;
  // recieved console error because I had installBtn, changed to butInstall to see if error will go away
  butInstall.style.visibility = "visible";
});

// Implement a click event handler on the `butInstall` element
// this code is from https://web.dev/codelab-make-installable/
butInstall.addEventListener("click", async () => {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  // const result = await promptEvent.userChoice;
  // console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.classList.toggle("hidden", true);
  butInstall.textContent = "Installed";
});

// Handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App has been successfully installed.", "appinstalled", event);
});

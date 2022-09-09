const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installBtn.style.visibility = "visible";
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
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button
  divInstall.classList.toggle("hidden", true);
  butInstall.textContent = "Installed";
});

// Handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App has been successfully installed.", "appinstalled", event);
});

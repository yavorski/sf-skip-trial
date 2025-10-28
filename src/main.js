/**
 * init
 */
function init() {
  if (document.title !== "Sitefinity trial version") {
    return;
  }

  /** @type HTMLDivElement | null */
  const wrapper = document.body.querySelector("div");

  /** @type HTMLLinkElement | null */
  const link = wrapper && wrapper.querySelector("p > a");

  const br = document.createElement("br");
  const message = document.createElement("i");

  message.innerText = "Redirecting ";

  message.style.color = "red";
  message.style.fontSize = "15px";
  message.style.fontFamily = "monospace";

  if (wrapper) {
    wrapper.append(br, message);
  }

  // add loading ...
  setInterval(() => message.innerText += ".", 256);

  if (link) {
    link.click();
  }
  else {
    window.location.reload();
  }
}

/** DOM Ready */
document.addEventListener("DOMContentLoaded", init);

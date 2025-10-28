function should_enable() {
  const HOST = window.location.hostname;
  const domains = [
    "chef.io",
    "telerik.com",
    "flowmon.com",
    "progress.com",
    "sharefile.com",
    "whatsupgold.com",
    "kemptechnologies.com",
    "partnerlink.progress.com",
    "content.partnerlink.progress.com",
  ]

  const result = domains.findIndex(domain => HOST.includes(domain) || domain.includes(HOST));
  return result > -1;
}

function styles() {
  return `
    html { filter: invert(1) hue-rotate(180deg) }
    html, body, form { background-color: #eaeaea }
    img, video, picture, svg, canvas { filter: invert(1) hue-rotate(180deg) }
    ::-webkit-scrollbar { width: 10px !important; height: 10px !important }
    ::-webkit-scrollbar-thumb { border-radius: 0 !important }
    ::-webkit-scrollbar-thumb { background-color: #4acb7a !important }
    ::-webkit-scrollbar-track { background-color: #5d5d5d !important }
  `;
}

/** Dark Mode */
function enable_dark_mode() {
  const path = window.location.pathname.toLowerCase();

  if (path.startsWith("/sitefinity-cms")) {
    return;
  }

  if (path.startsWith("/sitefinity")) {
    const style = document.createElement("style");
    style.id = "sf-dark-mode";
    style.innerHTML = styles();
    document.head.append(style);
    localStorage.setItem("sf-dark-mode", "sf-dark-mode");
  }
}

/** Dark Mode */
function disable_dark_mode() {
  const styles = document.head.querySelector("#sf-dark-mode");

  if (styles) {
    styles.remove();
    localStorage.removeItem("sf-dark-mode");
  }
}

/** Dark Mode */
function toggle_dark_mode() {
  if (document.head.querySelector("#sf-dark-mode")) {
    disable_dark_mode()
  }
  else {
    enable_dark_mode()
  }
}

/** Skip Trial Screen */
function skip_trial() {
  if (document.title !== "Sitefinity trial version") {
    return;
  }

  /** @type HTMLDivElement | null */
  const wrapper = document.body.querySelector("div");

  /** @type HTMLLinkElement | null */
  const link = wrapper && wrapper.querySelector("p > a");

  const br = document.createElement("br");
  const message = document.createElement("i");

  message.innerHTML = "Redirecting ";
  message.style.color = "red";
  message.style.fontSize = "15px";
  message.style.maxWidth = "800px";
  message.style.wordBreak = "break-word;"
  message.style.fontFamily = "monospace";

  if (wrapper) {
    wrapper.append(br, message);
  }

  // add loading ...
  setInterval(() => message.innerHTML += ".", 256);

  if (link) {
    link.click();
  }
  else {
    window.location.reload();
  }
}

/** Fix ALT+D */
function fix_alt_d() {
  if (window.location.pathname.toLowerCase().startsWith("/sitefinity")) {
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "d") {
        event.stopPropagation();
      }
    });
  }
}

if (should_enable()) {
  /** ASAP */
  window.setTimeout(fix_alt_d);

  /** ASAP */
  if (localStorage.getItem("sf-dark-mode")) {
    window.setTimeout(enable_dark_mode);
  }

  /** DOM Ready */
  document.addEventListener("DOMContentLoaded", skip_trial);

  /** Toggle Dark Mode */
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
      toggle_dark_mode();
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

(function () {
  function preloadFonts() {
    /*
        <link rel="preload" href="https://scrin.io/Content/assets/fonts/EuclidCircularA-Regular.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://scrin.io/Content/assets/fonts/EuclidCircularA-Italic.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://scrin.io/Content/assets/fonts/EuclidCircularA-Medium.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://scrin.io/Content/assets/fonts/EuclidCircularA-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
        */
  }

  function shouldRun() {
    if (
      document.location.pathname !== "/" &&
      document.location.pathname !== "/home" &&
      document.location.pathname !== "/pricing"
    )
      return false;
    if (
      document.location.hostname !== "screenshotmonitor.com" &&
      document.location.hostname !== "127.0.0.1"
    )
      return false;

    let myId = parseInt(localStorage.getItem("barid2"));
    if (!myId) {
      myId = Math.floor(Math.random() * 1000);
      localStorage.setItem("barid2", myId);
    }
    console.log("scrinio bar id", myId);
    if (myId < 10) return true;
    return false;
  }

  let alreadyRun = false;
  function runScrinIo() {
    if (!shouldRun()) return;
    if (alreadyRun) return;
    alreadyRun = true;

    // prepare
    const html = `
  <div class="scrinio-bar unloaded">
    <a href='https://scrin.io/?utm_source=ssm&utm_medium=bar&utm_campaign=rollout'>Hey there, try 
    <img src='https://scrin.io/Content/assets/images/logo_scrinio.svg' alt='scrin.io'/> instead! &nbsp;Same service, new name.</a> 
  </div>
  `;
    const div = document.createElement("div");
    div.innerHTML = html;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "bar.css";
    link.onload = function () {
      document.body.prepend(div);
      setTimeout(() => {
        div.querySelector(".scrinio-bar").className = "scrinio-bar";
      }, 1000);
    };
    document.head.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", runScrinIo);
  if (document.body) runScrinIo();
})();

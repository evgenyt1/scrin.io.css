(function () {
    function authMe() {
        if (!window.scrinioAuth) return;
        if (document.location.hostname === "scrin.io") return;

        const s = document.createElement("script");
        s.async = true;
        s.src = "https://scrin.io/authenticateme?auth=" + window.scrinioAuth;
        document.head.appendChild(s);
    }

    function shouldRun() {
        if (
            document.location.pathname !== "/" &&
            document.location.pathname !== "/home" &&
            document.location.pathname !== "/pricing"
        )
            return false;
        if (document.location.hostname !== "screenshotmonitor.com" && document.location.hostname !== "127.0.0.1") return false;

        const key = "barid2";
        const force = document.location.search.indexOf("barforce=1") !== -1;
        let myId = parseInt(localStorage.getItem(key));
        if (!myId || force) {
            myId = force ? 1 : Math.floor(Math.random() * 1000);
            localStorage.setItem(key, myId);
        }
        console.log("scrinio bar id", myId);
        if (myId < 10) return true;
        return false;
    }

    let alreadyRun = false;
    function runScrinIo() {
        if (alreadyRun) return;
        alreadyRun = true;

        authMe();
        if (!shouldRun()) return;

        const normalUrl = "https://scrin.io/?utm_source=ssm&utm_medium=bar&utm_campaign=rollout";
        const authUrl = window.scrinioAuth
            ? "https://scrin.io/myhome?auth=" + window.scrinioAuth + "&utm_source=ssm&utm_medium=bar&utm_campaign=rollout"
            : null;

        // prepare
        const html =
            `
  <div class="scrinio-bar unloaded">
    <div>
      <a href='` +
            normalUrl +
            `'>Hey there, try 
      <img src='https://scrin.io/Content/assets/images/logo_scrinio.svg' alt='scrin.io'/> instead! <b>Same service, new name</b></a> 
    </div>
  </div>
  `;
        const div = document.createElement("div");
        div.innerHTML = html;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = document.location.hostname === "127.0.0.1" ? "bar.css" : "https://expofp.github.io/scrin.io.css/bar.css?1";
        link.onload = function () {
            document.body.prepend(div);
            setTimeout(() => {
                div.querySelector(".scrinio-bar").className = "scrinio-bar";
                if (authUrl) {
                    div.querySelector("a").addEventListener("click", (e) => {
                        e.preventDefault();
                        location.href = authUrl;
                    });
                }
            }, 1000);
        };
        document.head.appendChild(link);
    }

    document.addEventListener("DOMContentLoaded", runScrinIo);
    if (document.body) runScrinIo();
})();

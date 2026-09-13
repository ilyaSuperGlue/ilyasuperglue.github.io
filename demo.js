const LIBRARIES = {
  "sherlock-js": {
    name: "sherlock-js",
    npm: "@ilyasuperglue/sherlock-js",
    git: "https://github.com/ilyaSuperGlue/sherlock-js",
    snackUrl: "https://snack.expo.dev/@ilyasyusuf01/sherlock-js",
    device: "ios",
  },
  "react-native-reanimated-confetti": {
    name: "react-native-reanimated-confetti",
    npm: "@hikaaam/react-native-reanimated-confetti",
    git: "https://github.com/ilyaSuperGlue/react-native-reanimated-confetti",
    snackUrl:
      "https://snack.expo.dev/@ilyasyusuf01/react-native-reanimate-confetti",
    device: "web",
  },
};

const DEFAULT_SLUG = "sherlock-js";

const pageTitle = document.getElementById("pageTitle");
const demoTitle = document.getElementById("demoTitle");
const githubLink = document.getElementById("githubLink");
const npmLine = document.getElementById("npmLine");
const snackToolbarTitle = document.getElementById("snackToolbarTitle");
const snackFrame = document.getElementById("snackFrame");
const snackOpenNew = document.getElementById("snackOpenNew");
const copyBtn = document.getElementById("copyBtn");

function currentSlug() {
  return window.location.hash.replace("#", "") || DEFAULT_SLUG;
}

function render() {
  const slug = currentSlug();
  const lib = LIBRARIES[slug];

  if (!lib) {
    document.querySelector(".demo-wrapper").innerHTML =
      `<p style="padding:30px;text-align:center;">Unknown demo "${slug}".</p>`;
    return;
  }

  pageTitle.textContent = `${lib.name} — Ilyas Abdurahman Yusuf`;
  demoTitle.textContent = lib.name;
  githubLink.href = lib.git;
  npmLine.textContent = `npm install ${lib.npm}`;
  snackToolbarTitle.textContent = lib.name;
  snackFrame.src = `${lib.snackUrl}?platform=${lib.device}`;
  snackOpenNew.href = lib.snackUrl;

  document.querySelectorAll(".demo-nav .nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${slug}`);
  });
}

copyBtn.addEventListener("click", async () => {
  const lib = LIBRARIES[currentSlug()];
  if (!lib) return;
  try {
    await navigator.clipboard.writeText(`npm install ${lib.npm}`);
    const tag = document.getElementById("copiedTag");
    tag.classList.add("show");
    setTimeout(() => tag.classList.remove("show"), 1200);
  } catch (err) {
    console.error("Copy failed", err);
  }
});

window.addEventListener("hashchange", render);
render();

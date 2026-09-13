const PLATFORM_BUCKETS = [
  "Steam",
  "Epic Games Store",
  "Itch.io",
  "Gacha",
  "Others",
];
const GACHA_GAMES = [
  "genshin",
  "wuthering",
  "honkai",
  "arknight",
  "nikke",
  "blue archive",
  "nte:",
  "neverness",
  "reverse: 1999",
];

const CACHE_KEY = "cache";
const API_URL = "https://www.gamerpower.com/api/giveaways";

const gameContainer = document.getElementById("gameContainer");
const gameLoading = document.getElementById("gameLoading");
const refreshBtn = document.getElementById("refreshBtn");

let games = readCache();
let loading = true;

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {}
}

async function fetchGames() {
  loading = true;
  render();
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    games = Array.isArray(json) ? json : [];
    writeCache(games);
    loading = false;
    render();
  } catch (err) {
    loading = false;
    render(err.message || "Something went wrong.");
  }
}

function bucketGames(data) {
  return PLATFORM_BUCKETS.map((p) => {
    const filtered = data.filter((it) => {
      const platforms = it.platforms || "";
      const titleLower = (it.title || "").toLowerCase();
      if (p === "Others") {
        return (
          !platforms.includes("Steam") &&
          !platforms.includes("Epic") &&
          !platforms.includes("Itch.io") &&
          it.type !== "Game" &&
          !GACHA_GAMES.some((g) => titleLower.includes(g))
        );
      }
      if (p === "Gacha") {
        return GACHA_GAMES.some((g) => titleLower.includes(g));
      }
      return platforms.includes(p) && it.type === "Game";
    });
    return { title: p, data: filtered, count: filtered.length };
  });
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "N/A") return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function platformIconsHtml(platformStr) {
  const platforms = platformStr || "";
  let html = "";
  if (platforms.includes("PC")) {
    html += `<i class="fa-brands fa-windows"></i><i class="fa-brands fa-linux"></i><i class="fa-brands fa-apple"></i>`;
  }
  if (platforms.includes("Android")) {
    html += `<i class="fa-brands fa-android"></i>`;
  }
  if (platforms.includes("iOS")) {
    html += `<span class="plat-text">iOS</span>`;
  }
  if (platforms.includes("Playstation")) {
    html += `<i class="fa-brands fa-playstation"></i>`;
  }
  if (platforms.includes("Xbox")) {
    html += `<i class="fa-brands fa-xbox"></i>`;
  }
  if (platforms.includes("Nintendo")) {
    html += `<i class="fa-solid fa-gamepad" title="Nintendo"></i>`;
  }
  return html;
}

function cardHtml(game) {
  const dateLabel = formatDate(game.end_date);
  const worth = game.worth ?? "N/A";

  const desktop = `
    <a class="game-card" href="${game.open_giveaway_url}" target="_blank" rel="noopener">
      <div class="gc-imgwrap">
        <img class="gc-img" src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
        <div class="gc-info">
          <p class="gc-title">${game.title}</p>
          <div class="gc-platforms">${platformIconsHtml(game.platforms)}</div>
          ${dateLabel ? `<span class="gc-date">until ${dateLabel}</span>` : ""}
        </div>
      </div>
      <div class="gc-price">
        <span class="gc-percent">-100%</span>
        <div>
          <p class="gc-worth">${worth}</p>
          <p class="gc-zero">$0</p>
        </div>
      </div>
    </a>
  `;

  const mobile = `
    <a class="game-card-mobile" href="${game.open_giveaway_url}" target="_blank" rel="noopener">
      <div class="gcm-row">
        <div class="gcm-imgrow">
          <img class="gcm-img" src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
          <p class="gcm-title">${game.title}</p>
        </div>
        <div class="gcm-pricerow">
          <span class="gcm-percent">-100%</span>
          <div>
            <p class="gcm-worth">${worth}</p>
            <p class="gcm-zero">$0</p>
          </div>
        </div>
      </div>
      <div class="gcm-bottomrow">
        <div class="gc-platforms">${platformIconsHtml(game.platforms)}</div>
        ${dateLabel ? `<span class="gcm-date">until ${dateLabel}</span>` : ""}
      </div>
    </a>
  `;

  return desktop + mobile;
}

function sectionHtml(section) {
  if (section.count === 0) return "";
  return `
    <div class="platform-section">
      <p class="platform-title">${section.title}</p>
      <p class="platform-sub">${section.count} freebies on ${section.title}</p>
      <div class="platform-divider"></div>
      <div class="card-wrap">
        ${section.data.map(cardHtml).join("")}
      </div>
    </div>
  `;
}

function render(error) {
  if (!loading && games.length < 1 && error) {
    gameContainer.innerHTML = `
      <div class="game-error">
        <p>Oops, ${error}</p>
        <button id="goHomeBtn">Go back home</button>
      </div>
    `;
    document.getElementById("goHomeBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
    return;
  }

  if (loading) {
    gameContainer.innerHTML = `<div class="game-loading"><div class="spinner"></div></div>`;
    return;
  }

  const buckets = bucketGames(games);
  const sectionsHtml = buckets.map(sectionHtml).join("");

  gameContainer.innerHTML = `
    ${sectionsHtml}
    <div class="game-footer">
      <i class="fa-regular fa-copyright"></i>
      <span>ilyaSuperGlue</span>
    </div>
  `;
}

refreshBtn.addEventListener("click", fetchGames);

render();
fetchGames();

const skills = [
  { text: "TypeScript", slug: "typescript", color: "0060AF" },
  { text: "JavaScript", slug: "javascript", color: "f7df1e" },
  { text: "React Native", slug: "react", color: "0060AF" },
  { text: "Kotlin", slug: "kotlin", color: "7F56D9" },
  { text: "Swift", slug: "swift", color: "F05138" },
  { text: "ReactJS", slug: "react", color: "61DBFB" },
  { text: "Rust", slug: "rust", color: "B7410E" },
  { text: "Go", slug: "go", color: "00ADD8" },
  { text: "PHP", slug: "php", color: "484C89" },
  { text: "NodeJS", slug: "nodedotjs", color: "44883e" },
  { text: "Laravel", slug: "laravel", color: "F05340" },
  { text: "Docker", slug: "docker", color: "0db7ed" },
  { text: "Mysql", slug: "mysql", color: "00758f" },
  { text: "Graphql", slug: "graphql", color: "E10098" },
  { text: "Redux", slug: "redux", color: "764abc" },
  { text: "Tailwind", slug: "tailwindcss", color: "06b6d4" },
];

const projects = [
  {
    title: "Maybank Trade App",
    desc: "Maybank Trade delivers innovative, powerful trading tools to help you uncover potential market opportunities and implement your unique trading strategy. \nMaybank Trade uses some of the most advanced trading technologies available to help you pursue your financial goals.",
    image: "images/maybankTrade.webp",
  },
  {
    title: "MAE by Maybank2U",
    desc: "A mobile banking and lifestyle app built for Maybank Malaysia that provides a complete digital banking experience. Users can manage their finances, perform secure transfers with Secure2u, and plan their lifestyle with features like Expenses, Tabung, and Sama-Sama Lokal food delivery—all through a single, integrated platform.",
    image: "images/mae.webp",
  },
  {
    title: "Maybank2u Biz",
    desc: "A mobile business banking app built for Maybank Malaysia that simplifies SME financial management on the go. The platform enables business owners to monitor cash flow, approve transactions with Secure2u, and issue invoices—all from a single, secure dashboard designed for smarter business decisions.",
    image: "images/m2ubiz.webp",
  },
  {
    title: "Aeon Digital Bank Financing",
    desc: "A mobile app built for AEON Bank Malaysia that simplifies commercial financing. Users can apply for new financing, track pending applications in real-time, and manage their active working capital limits through a clear, user-friendly interface.",
    image: "images/aeonapp.webp",
  },
  {
    title: "Aeon Digital Bank Financing (Web)",
    desc: "A web-based dashboard built for AEON Bank Malaysia to streamline commercial financing management. The platform enables users to submit and track financing applications, manage active working capital limits, and review detailed approval requests through a clear, data-rich interface.",
    image: "images/webclient.webp",
  },
  {
    title: "Tarbee",
    desc: "An educational mobile app built to help users memorize and understand the Quran. Inspired by Duolingo's approach, the platform uses interactive quizzes, bite-sized lessons, and engaging game mechanics to make Quranic learning accessible and fun for all ages.",
    image: "images/tarbee.webp",
  },
  {
    title: "Fuxion Spark",
    desc: "Fuxion Spark is a gigs provider apps for talent to bid a job, or for searching talent that fit your job.",
    image: "images/fuxionSpark.webp",
  },
  {
    title: "Juber SuperApp",
    desc: "A comprehensive mobile SuperApp built for the Indonesian market, consolidating payments, e-commerce, food delivery, and travel into one platform. I designed the mobile interface and engineered the complex backend infrastructure, including the multi-vendor marketplace, real-time chat system, and driver tracking APIs",
    image: "images/juber.webp",
  },
  {
    title: "SIPDEH (Brebes Legal Products)",
    desc: "A mobile legal information system built for the Brebes Regency Government. The app allows users to browse and read local regulations (Perda/Perbup) and view legal statistics, while providing administrators with tools to manage, review, and publish local laws through a secure, integrated workflow.",
    image: "images/sipdeh.webp",
  },
  {
    title: "Pavel Clean ID",
    desc: "A mobile ordering app built for Pavel Clean ID, a shoe cleaning service provider. The app enables customers to easily register, browse specialized shoe care services, and place orders for pickup and cleaning, all through a clean, user-friendly interface",
    image: "images/pavel.webp",
  },
];

const libraries = [
  {
    name: "sherlock-js",
    describe:
      "a tools to search username across multiple sites, supported on node JS and react native (this a typescript fork of sherlock.py)",
    git: "https://github.com/ilyaSuperGlue/sherlock-js",
    snack: {
      url: "https://snack.expo.dev/@ilyasyusuf01/sherlock-js",
      preferedDevice: "ios",
    },
  },
  {
    name: "react-native-reanimated-confetti",
    describe:
      "a small bundle size npm library to display confetti animation using only reanimated",
    git: "https://github.com/ilyaSuperGlue/react-native-reanimated-confetti",
    snack: {
      url: "https://snack.expo.dev/@ilyasyusuf01/react-native-reanimate-confetti",
      preferedDevice: "web",
    },
  },
];

const skillContainer = document.getElementById("skillContainer");
skills.forEach((s) => {
  const box = document.createElement("div");
  box.className = "skill-box";
  box.innerHTML = `
    <img src="https://cdn.simpleicons.org/${s.slug}/${s.color}" alt="${s.text}" loading="lazy" />
    <span>${s.text}</span>
  `;
  skillContainer.appendChild(box);
});

const projectContainer = document.getElementById("projectContainer");
projects.forEach((p) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}" loading="lazy" />
    <p class="p-title">${p.title}</p>
    <p class="p-desc">${p.desc}</p>
  `;
  projectContainer.appendChild(card);
});

const libraryContainer = document.getElementById("libraryContainer");
libraries.forEach((lib) => {
  const card = document.createElement("div");
  card.className = "library-card";
  card.innerHTML = `
    <p class="lib-name">${lib.name}</p>
    <p class="lib-desc">"${lib.describe}"</p>
    <div class="lib-btn-row">
      <a class="lib-btn lib-btn-github" href="${lib.git}" target="_blank" rel="noopener">
        <i class="fa-brands fa-github"></i><span>Github</span>
      </a>
      <a class="lib-btn lib-btn-demo" href="demo.html?name=${encodeURIComponent(lib.name)}&url=${encodeURIComponent(lib.snack.url)}&device=${lib.snack.preferedDevice}">
        <i class="fa-solid fa-code"></i><span>Demo</span>
      </a>
    </div>
  `;
  libraryContainer.appendChild(card);
});

const years = new Date().getFullYear() - 2020;
document.getElementById("experienceText").innerHTML =
  `I have ${years} years of experience building
  <b>mobile apps</b> with <b>Kotlin</b>,
  <b>Swift</b> and <b>React Native</b>, along
  with backend work in <b>Node.js</b> and
  <b>Laravel</b>.`;

const menuBtn = document.getElementById("menuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");

menuBtn.addEventListener("click", () => mobileOverlay.classList.add("open"));
mobileOverlay.addEventListener("click", (e) => {
  if (e.target === mobileOverlay) mobileOverlay.classList.remove("open");
});
document
  .querySelectorAll(".mobile-nav-link, .mobile-logo-link")
  .forEach((link) => {
    link.addEventListener("click", () =>
      mobileOverlay.classList.remove("open"),
    );
  });

const subjectInput = document.getElementById("subjectInput");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const emailBtn = document.getElementById("emailBtn");

function updateSendState() {
  const disabled =
    subjectInput.value.trim().length === 0 ||
    messageInput.value.trim().length === 0;
  sendBtn.disabled = disabled;
}
subjectInput.addEventListener("input", updateSendState);
messageInput.addEventListener("input", updateSendState);

clearBtn.addEventListener("click", () => {
  subjectInput.value = "";
  messageInput.value = "";
  updateSendState();
});

function mailtoLink(subject, body) {
  return (
    "mailto:ilyasabdurahmanyusuf@gmail.com?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
}

sendBtn.addEventListener("click", () => {
  if (!sendBtn.disabled) {
    window.location.href = mailtoLink(subjectInput.value, messageInput.value);
  }
});

emailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = mailtoLink(subjectInput.value, messageInput.value);
});

const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => observer.observe(el));

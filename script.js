const START_SONG_KEY = "startWeddingSong";
const PAGE_TRANSITION_KEY = "showSamaiTransition";
const PAGE_TRANSITION_TEXT = "សហសម័យ";
const body = document.body;
const openButton = document.querySelector("#openInvitation");
const countdown = document.querySelector("#countdown");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const weddingSong = document.querySelector("#weddingSong");
const musicToggle = document.querySelector("#musicToggle");
const effectSelector = [
  ".effect-zoom-in",
  ".effect-slide-up",
  ".effect-rotate-fade",
  ".effect-flip-in",
].join(",");
const flowerSymbols = ["🌸", "❀", "✿", "❁"];

function isReloadNavigation() {
  const entries = performance.getEntriesByType?.("navigation") || [];
  return entries[0]?.type === "reload" || performance.navigation?.type === 1;
}

function redirectInvitationReload() {
  if (!body.classList.contains("engagement-page") || !isReloadNavigation()) {
    return false;
  }

  window.location.replace("index.html");
  return true;
}

function ensurePageTransitionText() {
  let label = document.querySelector(".page-transition-text");
  if (label) return label;

  label = document.createElement("div");
  label.className = "page-transition-text";
  label.setAttribute("aria-hidden", "true");
  label.dataset.text = PAGE_TRANSITION_TEXT;
  label.textContent = PAGE_TRANSITION_TEXT;
  body.append(label);

  return label;
}

function startPageTransitionEntry() {
  if (!body.classList.contains("engagement-page")) return;

  let shouldShowTransition = false;
  try {
    shouldShowTransition = sessionStorage.getItem(PAGE_TRANSITION_KEY) === "true";
    sessionStorage.removeItem(PAGE_TRANSITION_KEY);
  } catch {
    shouldShowTransition = false;
  }

  if (!shouldShowTransition) return;

  ensurePageTransitionText();
  body.classList.add("page-enter");
  window.setTimeout(() => {
    body.classList.remove("page-enter");
  }, 1280);
}

function startCoverNavigation() {
  if (!openButton) return;

  openButton.addEventListener("click", () => {
    const target = openButton.dataset.target || "invitation.html";

    try {
      sessionStorage.setItem(START_SONG_KEY, "true");
      sessionStorage.setItem(PAGE_TRANSITION_KEY, "true");
    } catch {
      // Opening the invitation should still work if storage is blocked.
    }

    ensurePageTransitionText();
    body.classList.add("page-exit");
    window.setTimeout(() => {
      window.location.href = target;
    }, 1080);
  });
}

function startCountdown() {
  if (!countdown) return;

  const target = new Date(countdown.dataset.target).getTime();
  if (Number.isNaN(target)) return;

  const setBox = (key, value) => {
    const element = countdown.querySelector(`[data-count="${key}"]`);
    if (element) element.textContent = String(value).padStart(2, "0");
  };

  const tick = () => {
    const distance = Math.max(0, target - Date.now());
    setBox("days", Math.floor(distance / 86400000));
    setBox("hours", Math.floor((distance % 86400000) / 3600000));
    setBox("minutes", Math.floor((distance % 3600000) / 60000));
    setBox("seconds", Math.floor((distance % 60000) / 1000));
  };

  tick();
  window.setInterval(tick, 1000);
}

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage || !src) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

function startGalleryLightbox() {
  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      openLightbox(card.dataset.src, image?.alt);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function startTextEffects() {
  const effectElements = document.querySelectorAll(effectSelector);
  if (!effectElements.length) return;

  if (!("IntersectionObserver" in window)) {
    effectElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  effectElements.forEach((element) => observer.observe(element));
}

function startWeddingMusic() {
  if (!weddingSong || !musicToggle) return;

  weddingSong.volume = 0.58;

  const setMusicState = (isPlaying) => {
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause wedding song" : "Play wedding song"
    );
  };

  const playSong = async () => {
    try {
      musicToggle.classList.remove("needs-tap");
      await weddingSong.play();
      setMusicState(true);
    } catch {
      setMusicState(false);
      musicToggle.classList.add("needs-tap");
    }
  };

  const pauseSong = () => {
    weddingSong.pause();
    setMusicState(false);
  };

  musicToggle.addEventListener("click", () => {
    if (weddingSong.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });

  weddingSong.addEventListener("play", () => setMusicState(true));
  weddingSong.addEventListener("pause", () => setMusicState(false));
  weddingSong.addEventListener("ended", () => setMusicState(false));

  let shouldStartSong = false;
  try {
    shouldStartSong = sessionStorage.getItem(START_SONG_KEY) === "true";
    sessionStorage.removeItem(START_SONG_KEY);
  } catch {
    shouldStartSong = false;
  }

  setMusicState(false);
  if (shouldStartSong) {
    window.setTimeout(playSong, 120);
  }
}

function startFallingFlowers() {
  if (!body.classList.contains("engagement-page")) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReducedMotion) return;

  const layer = document.createElement("div");
  layer.className = "falling-flowers";
  layer.setAttribute("aria-hidden", "true");

  const flowerCount = window.matchMedia?.("(max-width: 540px)")?.matches ? 14 : 22;

  for (let index = 0; index < flowerCount; index += 1) {
    const flower = document.createElement("span");
    const duration = 9 + Math.random() * 8;
    const delay = Math.random() * -duration;
    const drift = -90 + Math.random() * 180;
    const size = 14 + Math.random() * 18;
    const spin = Math.random() > 0.5 ? 1 : -1;

    flower.textContent = flowerSymbols[index % flowerSymbols.length];
    flower.style.setProperty("--flower-left", `${Math.random() * 100}vw`);
    flower.style.setProperty("--flower-duration", `${duration.toFixed(2)}s`);
    flower.style.setProperty("--flower-delay", `${delay.toFixed(2)}s`);
    flower.style.setProperty("--flower-drift", `${drift.toFixed(1)}px`);
    flower.style.setProperty("--flower-size", `${size.toFixed(1)}px`);
    flower.style.setProperty("--flower-spin", `${spin * (180 + Math.random() * 260)}deg`);
    flower.style.setProperty("--flower-opacity", `${(0.34 + Math.random() * 0.38).toFixed(2)}`);
    layer.append(flower);
  }

  body.append(layer);
}

if (!redirectInvitationReload()) {
  window.addEventListener("pageshow", () => {
    body.classList.remove("page-exit");
  });

  startCoverNavigation();
  startPageTransitionEntry();
  startCountdown();
  startGalleryLightbox();
  startTextEffects();
  startWeddingMusic();
  startFallingFlowers();
}

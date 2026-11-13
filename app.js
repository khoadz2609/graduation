const TAKEOFF = new Date("2026-11-21T10:30:00+07:00");

const $ = (id) => document.getElementById(id);
const music = $("music");
const musicBtn = $("music-btn");

// Returns "" once the time has passed.
function formatLeft(ms) {
  if (ms <= 0) return "";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d} ngày ${pad(h)}:${pad(m)}:${pad(s % 60)}`;
}
console.assert(formatLeft(0) === "", "past -> empty");
console.assert(formatLeft(90061000) === "1 ngày 01:01:01", "1d 1h 1m 1s");

function tick() {
  const left = formatLeft(TAKEOFF - Date.now());
  $("cd-val").textContent = left || "🎓 Đã cất cánh! Cảm ơn mọi người";
  if (!left) clearInterval(timer);
}
const timer = setInterval(tick, 1000);
tick();

function confetti() {
  const colors = ["#d7263d", "#e8b04a", "#f7f0e1", "#4aa3df"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2 + Math.random() * 2 + "s";
    c.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

$("tear").addEventListener("click", () => {
  $("stub").classList.add("torn");
  music.play().catch(() => {}); // missing mp3 or blocked: page still works
  confetti();
  setTimeout(() => {
    $("intro").remove();
    $("ticket").hidden = false;
    musicBtn.hidden = false;
  }, 600);
});

musicBtn.addEventListener("click", () => {
  if (music.paused) music.play().catch(() => {});
  else music.pause();
});
music.addEventListener("play", () => (musicBtn.textContent = "🔊"));
music.addEventListener("pause", () => (musicBtn.textContent = "🔇"));

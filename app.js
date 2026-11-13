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

// Night sky stars
for (let i = 0; i < 70; i++) {
  const s = document.createElement("span");
  s.className = "star";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 3 + "s";
  s.style.opacity = 0.3 + Math.random() * 0.7;
  $("sky").appendChild(s);
}

// Split-flap departure board: each cell shuffles, then lands on its letter
const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
document.querySelectorAll(".flap").forEach((row, r) => {
  [...row.dataset.text].forEach((ch, i) => {
    const cell = document.createElement("b");
    row.appendChild(cell);
    let n = 6 + r * 3 + i;
    const spin = setInterval(() => {
      cell.classList.remove("flip");
      void cell.offsetWidth; // restart flip animation
      cell.classList.add("flip");
      cell.textContent = --n > 0 ? FLAP_CHARS[(Math.random() * FLAP_CHARS.length) | 0] : ch;
      if (n <= 0) {
        clearInterval(spin);
        if (row.classList.contains("status") && i === row.dataset.text.length - 1) row.classList.add("done");
      }
    }, 70);
  });
});

let opened = false;
function openTicket() {
  if (opened) return;
  opened = true;
  tear.style.transform = ""; // let the CSS .torn animation take over from the drag
  $("stub").classList.add("torn");
  music.play().catch(() => {}); // missing mp3 or blocked: page still works
  confetti();
  setTimeout(() => {
    $("intro").remove();
    $("ticket").hidden = false;
    musicBtn.hidden = false;
    scrollTo(0, 0);
  }, 1000);
}

// Drag the stub down to tear it; a tap also works
const tear = $("tear");
let startY = null, dragged = 0;
tear.addEventListener("pointerdown", (e) => { startY = e.clientY; dragged = 0; tear.setPointerCapture(e.pointerId); });
tear.addEventListener("pointermove", (e) => {
  if (startY === null) return;
  dragged = Math.max(0, e.clientY - startY);
  tear.style.transform = `translateY(${dragged}px) rotate(${Math.min(dragged / 6, 18)}deg)`;
  if (dragged > 70) openTicket();
});
tear.addEventListener("pointerup", () => {
  startY = null;
  if (!opened) tear.style.transform = "";
});
tear.addEventListener("click", () => { if (dragged < 10) openTicket(); });

musicBtn.addEventListener("click", () => {
  if (music.paused) music.play().catch(() => {});
  else music.pause();
});
music.addEventListener("play", () => (musicBtn.textContent = "🔊"));
music.addEventListener("pause", () => (musicBtn.textContent = "🔇"));

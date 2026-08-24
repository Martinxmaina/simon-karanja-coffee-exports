// Общий наблюдатель "появления при скролле" для всех блоков <Reveal>.
// Прямая проверка getBoundingClientRect на scroll/resize (через rAF) вместо
// IntersectionObserver — в реальном использовании страницы это надёжнее:
// IntersectionObserver в редких случаях не уведомляет часть целей при большом
// количестве наблюдателей, созданных в один момент времени, а плоская
// геометрическая проверка не зависит от таких деталей реализации браузера.
const targets = new Map<Element, () => void>();
let ticking = false;
let listening = false;

function isNear(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.92 && rect.bottom > 0;
}

function checkAll() {
  ticking = false;
  for (const [el, cb] of targets) {
    if (isNear(el)) {
      targets.delete(el);
      cb();
    }
  }
  if (targets.size === 0) stopListening();
}

function scheduleCheck() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(checkAll);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", scheduleCheck, { passive: true });
  window.addEventListener("resize", scheduleCheck);
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", scheduleCheck);
  window.removeEventListener("resize", scheduleCheck);
}

export function observeReveal(el: Element, onReveal: () => void) {
  targets.set(el, onReveal);
  startListening();
  scheduleCheck();
  return () => {
    targets.delete(el);
    if (targets.size === 0) stopListening();
  };
}

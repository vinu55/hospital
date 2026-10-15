const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMenu();
});

// Set the minimum appointment date to today in the visitor's local time.
const appointmentDate = document.getElementById("appointmentDate");
const now = new Date();
const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
appointmentDate.min = localToday;

const appointmentForm = document.getElementById("appointmentForm");
const formFeedback = document.getElementById("formFeedback");
const toast = document.getElementById("toast");

appointmentForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!appointmentForm.reportValidity()) return;

  // Front-end demo only: no data is transmitted or stored.
  const name = appointmentForm.elements.name.value.trim();
  formFeedback.textContent = `Thank you, ${name}. This demo form is working, but it is not connected to a hospital booking system.`;
  formFeedback.classList.add("show");
  showToast("Demo request validated — no appointment has been booked.");
  appointmentForm.reset();
  appointmentDate.min = localToday;
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

document.getElementById("year").textContent = new Date().getFullYear();

// Small, accessible testimonial carousel.
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialCards = [...testimonialTrack.children];
let testimonialIndex = 0;

function updateTestimonials() {
  if (!testimonialCards.length) return;
  const cardWidth = testimonialCards[0].getBoundingClientRect().width;
  const styles = getComputedStyle(testimonialTrack);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  const visible = window.innerWidth <= 780 ? 1 : 3;
  const maxIndex = Math.max(0, testimonialCards.length - visible);
  testimonialIndex = Math.min(testimonialIndex, maxIndex);
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;
}

document.getElementById("testimonialPrev").addEventListener("click", () => {
  testimonialIndex = Math.max(0, testimonialIndex - 1);
  updateTestimonials();
});
document.getElementById("testimonialNext").addEventListener("click", () => {
  const visible = window.innerWidth <= 780 ? 1 : 3;
  testimonialIndex = Math.min(testimonialCards.length - visible, testimonialIndex + 1);
  updateTestimonials();
});
window.addEventListener("resize", updateTestimonials);
window.addEventListener("load", updateTestimonials);

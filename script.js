// Year
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

// Mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu){
  hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
}

// Scroll progress bar
const progress = document.querySelector(".progress > span");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, scrolled*100))}%`;
});

// Cursor glow
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
},{ threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Tilt effect
function tiltCard(card){
  const rect = () => card.getBoundingClientRect();
  card.addEventListener("mousemove", (e)=>{
    const r = rect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
}
document.querySelectorAll(".tilt").forEach(tiltCard);

// Quote form -> WhatsApp
const form = document.getElementById("quoteForm");
if (form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name")?.value?.trim() || "";
    const phone = document.getElementById("phone")?.value?.trim() || "";
    const type = document.getElementById("type")?.value?.trim() || "";
    const msg = document.getElementById("msg")?.value?.trim() || "";
    const text =
      `Hello Athrex Energy,%0A%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Project Type: ${type}%0A` +
      `Message: ${msg || "N/A"}%0A%0A` +
      `Please contact me.`;
    const phoneNumber = "916265422126";
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    form.reset();
  });
}

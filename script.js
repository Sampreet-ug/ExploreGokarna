const appConfig = window.DISCOVER_GOKARNA_CONFIG || {};
const contactPhone = String(appConfig.contactPhone || "").replace(/\D/g, "");

const whatsappMessages = {
  "trip-intake": `Hi Discover Gokarna, I want help planning a Gokarna trip.

What we want the trip to feel like:
Dietary needs or must-haves:`,
  "general-enquiry": "Hi Discover Gokarna, I want to know more about your curated Gokarna trips.",
  "drift-tier": `Hi Discover Gokarna, I am interested in the Drift tier. Could you please share more details?`,
  "immerse-tier": `Hi Discover Gokarna, I am interested in the Immerse tier. Could you please share more details?`,
  "belong-tier": `Hi Discover Gokarna, I am interested in the Belong tier. Could you please share more details?`,
};

const whatsappLinks = document.querySelectorAll("[data-whatsapp-message-key]");

whatsappLinks.forEach((link) => {
  const message = whatsappMessages[link.dataset.whatsappMessageKey] || "";

  if (!contactPhone) {
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "Contact phone number is not configured.");
    link.addEventListener("click", (event) => {
      event.preventDefault();
    }, { once: true });
    return;
  }

  link.href = `https://wa.me/${contactPhone}?text=${encodeURIComponent(message)}`;
});

const prefersReducedMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  // Use a data attribute to avoid huge selector queries on every page.
  const revealTargets = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    observer.observe(target);
  });
}


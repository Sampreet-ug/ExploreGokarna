const revealTargets = document.querySelectorAll(
  ".intro-strip, .activity-card, .tier-card, .reason-card, .photo-card, .masonry-card, .contact-card, .teaser-panel, .process-step, .catalog-item"
  + ", .about-section, .about-media, .about-copy, .about-stats div, .blog-card, .article-toc, .article-cta"
);

const appConfig = window.DISCOVER_GOKARNA_CONFIG || {};
const contactPhone = String(appConfig.contactPhone || "").replace(/\D/g, "");
const whatsappMessages = {
  "trip-intake": `Hi Discover Gokarna, I want help planning a Gokarna trip.

Dates:
Group size:
Tier interest (Drift/Immerse/Belong/not sure):
What we want the trip to feel like:
Dietary needs or must-haves:`,
  "general-enquiry": "Hi Discover Gokarna, I want to know more about your curated Gokarna trips.",
  "drift-tier": `Hi Discover Gokarna, I am interested in the Drift tier.

My dates are:
Group size:
Trip mood:
Dietary needs:`,
  "immerse-tier": `Hi Discover Gokarna, I am interested in the Immerse tier.

My dates are:
Group size:
Trip mood:
Dietary needs:`,
  "belong-tier": `Hi Discover Gokarna, I am interested in the Belong tier.

My dates are:
Group size:
Trip mood:
Dietary needs:`,
};
const whatsappLinks = document.querySelectorAll("[data-whatsapp-message-key]");

whatsappLinks.forEach((link) => {
  const message = whatsappMessages[link.dataset.whatsappMessageKey] || "";

  if (!contactPhone) {
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "Contact phone number is not configured.");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Contact phone number is not configured yet. Set CONTACT_PHONE in Vercel and redeploy, or run the build script locally before testing WhatsApp links.");
    });
    return;
  }

  link.href = `https://wa.me/${contactPhone}?text=${encodeURIComponent(message)}`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  observer.observe(target);
});

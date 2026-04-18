const revealTargets = document.querySelectorAll(
  ".intro-strip, .activity-card, .tier-card, .reason-card, .photo-card, .masonry-card, .contact-card, .teaser-panel"
);

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

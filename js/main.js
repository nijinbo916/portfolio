/* =========================================================
   倪金博 · 前端作品集
   1. 截图灯箱  2. 滚动入场动画  3. 导航平滑高亮
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. 截图灯箱 ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "作品截图大图";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".work-shot img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.dataset.full || img.src, img.alt));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    /* 点图片本身不关，点遮罩/提示才关 */
    if (e.target === lightbox || e.target.classList.contains("lightbox-tip")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------- 2. 滚动入场动画 ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    /* 老浏览器兜底：直接全部显示 */
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 3. 顶部导航：当前区块高亮 ---------- */
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

  if ("IntersectionObserver" in window && navLinks.length) {
    const sectionById = {};
    navLinks.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) sectionById[id] = { section, link };
    });

    const navIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = sectionById[entry.target.id];
          if (!item) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            item.link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.values(sectionById).forEach((item) => navIo.observe(item.section));
  }
})();

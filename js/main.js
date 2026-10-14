// 作品集页面的交互：截图灯箱、滚动出现、导航高亮

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

// 点小图打开灯箱
document.querySelectorAll(".work-shot img").forEach(function (img) {
  img.addEventListener("click", function () {
    openLightbox(img.dataset.full || img.src, img.alt);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

// 点图片本身不关，点背景或提示文字才关
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox || e.target.classList.contains("lightbox-tip")) {
    closeLightbox();
  }
});

// 按 Esc 也能关
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

// 元素滚动到可视区域时淡入
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(function (el) {
    io.observe(el);
  });
} else {
  // 老浏览器不支持就直接显示
  revealEls.forEach(function (el) {
    el.classList.add("is-visible");
  });
}

// 导航栏跟着当前所在区块高亮
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const navItems = [];

navLinks.forEach(function (link) {
  const id = link.getAttribute("href").slice(1);
  const section = document.getElementById(id);
  if (section) {
    navItems.push({ section: section, link: link });
  }
});

if ("IntersectionObserver" in window && navItems.length) {
  const navIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      navItems.forEach(function (item) {
        if (item.section === entry.target && entry.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.remove("is-active");
          });
          item.link.classList.add("is-active");
        }
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  navItems.forEach(function (item) {
    navIo.observe(item.section);
  });
}

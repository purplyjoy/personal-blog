//navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const nav = document.querySelector("nav");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        nav.classList.toggle("nav-open");
        
        if (navLinks.classList.contains("active")) {
            hamburger.textContent = "X";
        } else {
            hamburger.textContent = "☰";
        }
    });
}

//sorts blog posts in home page from newest to oldest
document.querySelectorAll(".boxes").forEach(boxes => {
    const entries = Array.from(boxes.querySelectorAll(".box"));

    entries.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    entries.forEach(entry => boxes.appendChild(entry));
});

//sorts blog posts in blog page from newest to oldest 
//expands expandable preview text
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.life-blog, .interest-blog, .reflection-blog').forEach(blogSection => {
        const entries = [...blogSection.querySelectorAll('.blog-content')];
        entries.sort((a, b) => {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        });

        entries.forEach(entry => blogSection.appendChild(entry));
    });

    document.querySelectorAll('.blog-content').forEach(entry => {
        entry.querySelector('.preview')?.addEventListener('click', function () {
            entry.classList.toggle('active');
        });
    });
});

//sorts recent blogs in individual blog pages from newest to oldest
document.querySelectorAll(".explore").forEach(boxes => {
    const entries = Array.from(boxes.querySelectorAll(".explore-content"));

    entries.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    entries.forEach(entry => boxes.appendChild(entry));
});

//SIDEBAR BUTTON
const toggleBtn = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

if (toggleBtn && sidebar) {
     toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");

        if (sidebar.classList.contains("show")) {
            toggleBtn.textContent = "▶";
        } else {
            toggleBtn.textContent = "◀";
        }
    });
}

//SIDEBAR active section
const sections = document.querySelectorAll("section[id]");
const sidebarLinks = document.querySelectorAll(".sidebar a");

if (sections.length > 0 && sidebarLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        let visibleSection = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (
                    !visibleSection ||
                    entry.intersectionRatio > visibleSection.intersectionRatio
                ) {
                    visibleSection = entry;
                }
            }
        });

        if (visibleSection) {
            sidebarLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.sidebar a[href="#${visibleSection.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    }, {
        threshold: [0.2, 0.4, 0.6, 0.8]
    });

    sections.forEach(section => observer.observe(section));
}

//sidebar - bottom of page
if (sidebarLinks.length > 0) {

    window.addEventListener("scroll", () => {
        const atBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

        if (atBottom) {
            sidebarLinks.forEach(link => link.classList.remove("active"));

            const galleryLink = document.querySelector('.sidebar a[href="#gallery"]');

            if (galleryLink) {
                galleryLink.classList.add("active");
            }
        }
    });
}

//scroll button in home page (left and right)
const boxes = document.querySelectorAll(".boxes");

if (boxes.length) {
    boxes.forEach((boxesContainer) => {
        const wrapper = boxesContainer.closest(".boxes-wrapper");

        const leftBtn = wrapper.querySelector(".scroll-btn.left");
        const rightBtn = wrapper.querySelector(".scroll-btn.right");
        const box = boxesContainer.querySelector(".box");

        if (leftBtn && rightBtn && box) {

            rightBtn.addEventListener("click", function () {
                const scrollAmount = (box.offsetWidth + 16) * 2;

                boxesContainer.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            });

            leftBtn.addEventListener("click", function () {
                const scrollAmount = (box.offsetWidth + 16) * 2;

                boxesContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth"
                });
            });
        }
    });
}

//video play
const videos = document.querySelectorAll('video');

videos.forEach(video => {
    video.addEventListener('play', () => {
        videos.forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });
});
// scripts/script.js

document.addEventListener("DOMContentLoaded", () => {
    // ===== Scroll-triggered animations =====
    const animateOnScroll = (elements, className) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        elements.forEach(el => observer.observe(el));
    };

    const animatedItems = document.querySelectorAll(".tool-card, .review, .bonus__item, .download__container");
    animateOnScroll(animatedItems, "animate-fade-in");

    // ===== Diagram animation =====
    const fillDiagrams = () => {
        document.querySelectorAll(".diagram-bar__fill").forEach(bar => {
            const value = bar.dataset.percent;
            bar.style.width = value + "%";
        });
    };

    const diagramSection = document.querySelector("#tools");
    const diagramObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fillDiagrams();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (diagramSection) {
        diagramObserver.observe(diagramSection);
    }

    // ===== Shadow glow effect on scroll =====
    const body = document.body;
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 20) {
            body.classList.add("dynamic");
        } else {
            body.classList.remove("dynamic");
        }
    });

    // ===== Countdown timer bar =====
    // Простий таймер зворотного відліку
    let timeLeft = 2040; // 59 хвилин у секундах
    const timerDisplay = document.getElementById('countdown-timer');

    const updateTimer = () => {
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
        }
    };

    updateTimer(); // старт
    const timerInterval = setInterval(updateTimer, 1000);
});


// ===== Animate downloads chart =====
const fillDownloadsChart = () => {
    const fill = document.querySelector(".downloads-chart__fill");
    const count = document.getElementById("download-count");
    if (fill && count) {
        const current = 1000;
        const max = 2000;
        const percent = (current / max) * 100;
        fill.style.width = percent + "%";
        count.textContent = current.toLocaleString("ru-RU");
    }
};

// Виклик після завантаження
fillDownloadsChart();


document.addEventListener("DOMContentLoaded", () => {
    const OFFSET = 80; // висота фіксованого header

    document.querySelectorAll('a[href^="#why"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const OFFSET = document.querySelector('.header')?.offsetHeight || 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".reviews__track");
    if (!track) return;

    const speed = 0.5; // швидкість прокрутки в px за кадр (чим менше — тим повільніше)
    let pos = 0;

    // Клонуємо всі слайди та додаємо їх у кінець для безшовного ефекту
    const slides = Array.from(track.children);
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    const totalScrollWidth = track.scrollWidth / 2; // половина ширини контенту (оригінали + клони)

    function scroll() {
        pos += speed;
        if (pos >= totalScrollWidth) {
            pos = 0; // скидаємо, щоб зациклити
        }
        track.scrollLeft = pos;
        requestAnimationFrame(scroll);
    }

    scroll();

    // Додатково можна підтримати "пауза при наведенні":
    track.addEventListener("mouseenter", () => {
        cancelAnimationFrame(scroll);
    });
    track.addEventListener("mouseleave", () => {
        scroll();
    });
});
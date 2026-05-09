// =====================
// INTRO
// =====================
var INTRO_DURATION = 2000;

window.addEventListener('load', function () {
    var intro  = document.getElementById('intro');
    var navbar = document.getElementById('navbar');

    setTimeout(function () {
        intro.classList.add('fade-out');
        navbar.classList.add('visible');
        intro.addEventListener('transitionend', function () { intro.remove(); }, { once: true });
    }, INTRO_DURATION);
});

// =====================
// HERO LETTER FLIP (A ↔ V, elke 2s)
// =====================
(function () {
    var morph = document.querySelector('.letter-morph');
    if (!morph) return;
    // Begin na de intro (intro 2s + fade ~0.8s)
    setTimeout(function () {
        morph.classList.add('flipped');
        setInterval(function () {
            morph.classList.toggle('flipped');
        }, 2000);
    }, 2800);
})();

// =====================
// SLIDER
// =====================
(function () {
    var slides  = document.querySelectorAll('.slide');
    var dots    = document.querySelectorAll('.dot');
    var current = 0;
    var interval;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    interval = setInterval(function () { goTo(current + 1); }, 5000);

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            clearInterval(interval);
            goTo(i);
            interval = setInterval(function () { goTo(current + 1); }, 5000);
        });
    });

    document.getElementById('arrow-prev').addEventListener('click', function () {
        clearInterval(interval);
        goTo(current - 1);
        interval = setInterval(function () { goTo(current + 1); }, 5000);
    });

    document.getElementById('arrow-next').addEventListener('click', function () {
        clearInterval(interval);
        goTo(current + 1);
        interval = setInterval(function () { goTo(current + 1); }, 5000);
    });
})();

// =====================
// DIENSTEN HOVER
// =====================
(function () {
    var rows  = document.querySelectorAll('.dienst-row');
    var descs = document.querySelectorAll('.dienst-desc');
    var imgs  = document.querySelectorAll('.dienst-img');

    function activate(index) {
        rows.forEach(function (r) { r.classList.remove('active'); });
        descs.forEach(function (d) { d.classList.remove('active'); });
        var row  = document.querySelector('.dienst-row[data-index="' + index + '"]');
        var desc = document.querySelector('.dienst-desc[data-index="' + index + '"]');
        if (row)  row.classList.add('active');
        if (desc) desc.classList.add('active');
    }

    function clear() {
        rows.forEach(function (r) { r.classList.remove('active'); });
        descs.forEach(function (d) { d.classList.remove('active'); });
    }

    rows.forEach(function (row) {
        row.addEventListener('mouseenter', function () {
            activate(parseInt(row.getAttribute('data-index'), 10));
        });
    });

    document.querySelector('.diensten-list').addEventListener('mouseleave', clear);
})();

// =====================
// NAVBAR KLEUR OP SCROLL
// =====================
(function () {
    var navbar       = document.getElementById('navbar');
    var darkSections = ['tagline-block', 'stats', 'contact-cta'];

    function updateTheme() {
        var checkY = 52;
        var onDark = false;
        var onHero = false;

        // Hero: transparant zolang de slider de navbar bedekt
        var hero = document.getElementById('hero');
        if (hero) {
            var hr = hero.getBoundingClientRect();
            if (hr.top <= checkY && hr.bottom > checkY) onHero = true;
        }

        if (!onHero) {
            darkSections.forEach(function (id) {
                var el = document.getElementById(id);
                if (!el) return;
                var r = el.getBoundingClientRect();
                if (r.top <= checkY && r.bottom > checkY) onDark = true;
            });
        }

        navbar.classList.toggle('on-hero', onHero);
        navbar.classList.toggle('on-dark', onDark);
    }

    window.addEventListener('scroll', updateTheme, { passive: true });
    updateTheme();
})();

// =====================
// COUNTER ANIMATIE
// =====================
(function () {
    var statEls = document.querySelectorAll('.stat-num[data-target]');
    var animated = false;

    function animateCounters() {
        statEls.forEach(function (el) {
            var target   = parseInt(el.getAttribute('data-target'), 10);
            var duration = 1600;
            var start    = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                // Ease-out
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + '+';
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    var statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
})();

// =====================
// HAMBURGER MENU
// =====================
(function () {
    var hamburger   = document.getElementById('hamburger');
    var mobileMenu  = document.getElementById('mobile-menu');
    var mobileClose = document.getElementById('mobile-close');
    var mobileLinks = document.querySelectorAll('#mobile-nav a');

    function openMenu()  { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });
})();

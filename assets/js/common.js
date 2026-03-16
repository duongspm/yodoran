/* ------------------------------
    Inview Animation
------------------------------ */
function initializeInview() {
    const targets = document.querySelectorAll('.inview');
    if (targets.length === 0) return;

    const options = {
        root: null,
        rootMargin: '0% 0px', // -50% 0px ==> center of viewport
        threshold: 0.5 // Execute when the element is 50% displayed
    };

    const addClass = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(addClass, options);

    targets.forEach(target => {
        observer.observe(target);
    });
}

/* ------------------------------
    Pagetop
------------------------------ */
function initializePageTop() {
    const pageTop = document.querySelector('#pagetop');

    if (!pageTop) {
        return;
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        if (scrolled >= 400) {
            pageTop.classList.add('is-show');
        } else {
            pageTop.classList.remove('is-show');
        }
    });

    pageTop.addEventListener('click', (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ------------------------------
    Anchorlink
------------------------------ */
function initializeAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ------------------------------
    Menu Active
------------------------------ */
function initializeMenuActive() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu a');

    if (menuLinks.length === 0) return;

    menuLinks.forEach(link => {
        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        
        const normalizePath = (path) => (path.length > 1 && path.endsWith('/')) ? path.slice(0, -1) : path;

        if (normalizePath(linkPath) === normalizePath(currentPath)) {
            link.classList.add('is-active');
        }
    });
}

/* ------------------------------
    Component Initializer
------------------------------ */
function initializeComponents() {
    initializeInview();
    initializePageTop();
    initializeAnchorLinks();
    initializeMenuActive();
}

/* ------------------------------
    Include
------------------------------ */
document.addEventListener("DOMContentLoaded", function() {
    const includeElements = document.querySelectorAll("[data-include]");
    const promises = [];

    includeElements.forEach(function(el) {
        const file = el.getAttribute("data-include");
        const rootPath = el.getAttribute("data-path") || "";

        if (file) {
            const promise = fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return response.text();
                })
                .then(data => {
                    const processedData = data.replace(/\{\$root\}/g, rootPath);
                    el.innerHTML = processedData;
                })
                .catch(err => {
                    console.error(err);
                    el.innerHTML = `<p style="color: red;">Could not load ${file}</p>`;
                });
            promises.push(promise);
        }
    });

    if (promises.length > 0) {
        Promise.all(promises).then(() => {
            initializeComponents();
        });
    } else {
        initializeComponents();
    }
});

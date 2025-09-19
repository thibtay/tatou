// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll and active navigation
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('a-propos');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Initialize portfolio
    initializePortfolio();

    // Initialize salon gallery
    initializeSalonGallery();

    // Initialize contact form
    initializeContactForm();

    // Initialize scroll animations
    initializeScrollAnimations();
});

// ===== ACTIVE NAVIGATION =====
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== PORTFOLIO =====
async function initializePortfolio() {
    await generatePortfolioImages();
    // Attendre que les images soient chargées avant d'initialiser les filtres
    setTimeout(() => {
        setupPortfolioFilters();
    }, 100);
}

async function generatePortfolioImages() {
    try {
        // Essayer de charger les images locales d'abord
        const portfolioImages = await loadImagesWithFallback();
        renderPortfolio(portfolioImages);
    } catch (error) {
        console.warn('Erreur lors du chargement des images locales, utilisation des images de fallback:', error);

        // Fallback vers l'image locale du logo
        const fallbackImages = [
            {
                id: 1,
                src: 'input/img_2.png',
                category: 'realistic',
                title: 'Portrait Réaliste',
                description: 'Technique hyperréaliste en noir et gris'
            },
            {
                id: 2,
                src: 'input/img_2.png',
                category: 'geometric',
                title: 'Mandala Géométrique',
                description: 'Design symétrique complexe'
            },
            {
                id: 3,
                src: 'input/img_2.png',
                category: 'botanical',
                title: 'Rose Délicate',
                description: 'Style botanique fin'
            },
            {
                id: 4,
                src: 'input/img_2.png',
                category: 'minimal',
                title: 'Ligne Minimaliste',
                description: 'Design épuré et élégant'
            },
            {
                id: 5,
                src: 'input/img_2.png',
                category: 'realistic',
                title: 'Animal Réaliste',
                description: 'Faune en technique réaliste'
            },
            {
                id: 6,
                src: 'input/img_2.png',
                category: 'geometric',
                title: 'Motifs Abstraits',
                description: 'Géométrie moderne'
            }
        ];

        renderPortfolio(fallbackImages);
    }
}

function renderPortfolio(images) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    images.forEach((image, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${image.category}`;

        portfolioItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="portfolio-overlay">
                <div class="portfolio-info">
                    <h4>${image.title}</h4>
                    <p>${image.description}</p>
                </div>
            </div>
        `;

        portfolioItem.addEventListener('click', () => openLightbox(image));
        portfolioGrid.appendChild(portfolioItem);
    });

    // Réinitialiser les filtres après le rendu
    setTimeout(() => {
        setupPortfolioFilters();
    }, 100);
}

let isFiltering = false;

function setupPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Ignorer les clics pendant qu'un filtrage est en cours
            if (isFiltering) return;

            isFiltering = true;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            const filterValue = this.getAttribute('data-filter');
            filterPortfolioItems(filterValue);

            // Réactiver les clics après un délai
            setTimeout(() => {
                isFiltering = false;
            }, 600);
        });
    });
}

function filterPortfolioItems(filterValue) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');

    // Masquer immédiatement tous les éléments
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.2s ease';
    });

    // Après un court délai, afficher/masquer selon le filtre
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);

            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, index * 50);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }, 200);
}

// ===== LIGHTBOX =====
function openLightbox(image) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay" onclick="closeLightbox()"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <img src="${image.src}" alt="${image.title}">
            <div class="lightbox-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Animation
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ===== SALON GALLERY =====
async function initializeSalonGallery() {
    const salonImages = document.getElementById('salon-images');
    if (!salonImages) return;

    // Vérifier si des images de salon sont configurées
    if (IMAGES_CONFIG.salon && IMAGES_CONFIG.salon.length > 0) {
        await renderSalonImages(IMAGES_CONFIG.salon);
    } else {
        // Afficher des placeholders si aucune image n'est configurée
        renderSalonPlaceholders();
    }
}

async function renderSalonImages(images) {
    const salonImages = document.getElementById('salon-images');
    salonImages.innerHTML = '';

    for (let index = 0; index < images.length; index++) {
        const imageSrc = images[index];
        const salonImage = document.createElement('div');
        salonImage.className = 'salon-image';

        // Vérifier si l'image existe, sinon utiliser le logo
        const imageExists = await checkImageExists(imageSrc);
        const finalImageSrc = imageExists ? imageSrc : 'input/img_2.png';

        salonImage.innerHTML = `
            <img src="${finalImageSrc}" alt="Photo du salon ${index + 1}" loading="lazy">
        `;

        // Ajouter click pour lightbox
        salonImage.addEventListener('click', () => {
            openLightbox({
                src: finalImageSrc,
                title: `Le Salon - Photo ${index + 1}`,
                description: 'Découvrez l\'ambiance de notre studio'
            });
        });

        salonImages.appendChild(salonImage);
    }
}

function renderSalonPlaceholders() {
    const salonImages = document.getElementById('salon-images');
    salonImages.innerHTML = '';

    // Créer 3 images avec le logo par défaut
    for (let i = 0; i < 3; i++) {
        const salonImage = document.createElement('div');
        salonImage.className = 'salon-image';
        salonImage.innerHTML = `
            <img src="input/img_2.png" alt="Photo du salon ${i + 1}" loading="lazy">
        `;

        // Ajouter click pour lightbox
        salonImage.addEventListener('click', () => {
            openLightbox({
                src: 'input/img_2.png',
                title: `Le Salon - Photo ${i + 1}`,
                description: 'Découvrez l\'ambiance de notre studio'
            });
        });

        salonImages.appendChild(salonImage);
    }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.service) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message envoyé avec succès ! Jenny vous contactera bientôt.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);

        // In production, replace with actual API call
        console.log('Form data:', data);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .about-text, .about-image, .portfolio-item, .contact-info, .contact-form'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Close lightbox with Escape
    if (e.key === 'Escape') {
        closeLightbox();

        // Close mobile menu
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// ===== CSS ANIMATIONS (additional styles) =====
const additionalStyles = `
<style>
/* Lightbox styles */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox.active {
    opacity: 1;
}

.lightbox-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background: var(--color-dark);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.lightbox.active .lightbox-content {
    transform: scale(1);
}

.lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 10001;
    transition: var(--transition);
}

.lightbox-close:hover {
    background: rgba(0, 0, 0, 0.9);
}

.lightbox-content img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 70vh;
    object-fit: contain;
}

.lightbox-info {
    padding: var(--space-lg);
    text-align: center;
}

.lightbox-info h3 {
    color: var(--color-white);
    margin-bottom: var(--space-sm);
    font-family: var(--font-display);
}

.lightbox-info p {
    color: var(--color-grey-light);
}

/* Notification styles */
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: var(--color-dark);
    color: var(--color-white);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    max-width: 400px;
    border-left: 4px solid;
    animation: slideIn 0.3s ease;
}

.notification-success {
    border-left-color: #22c55e;
    background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
}

.notification-error {
    border-left-color: #ef4444;
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
}

.notification button {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification.fade-out {
    animation: slideOut 0.3s ease forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animation for elements coming into view */
.animate-in {
    animation: fadeIn 0.6s ease forwards;
}

/* Portfolio grid loading animation */
.portfolio-grid.loaded .portfolio-item {
    animation: fadeIn 0.6s ease forwards;
}

@media (max-width: 768px) {
    .notification {
        top: 1rem;
        right: 1rem;
        left: 1rem;
        max-width: none;
    }

    .lightbox-content {
        max-width: 95%;
        max-height: 95%;
    }

    .lightbox-info {
        padding: var(--space-md);
    }
}
</style>
`;

// Add additional styles to document
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});
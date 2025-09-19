// ===== CONFIGURATION DES IMAGES =====
// Ce fichier permet de configurer facilement les images du site

const IMAGES_CONFIG = {
    // Photo de profil de Jenny
    profile: {
        jenny: 'images/profile/jenny-portrait.jpg'
    },

    // Photos du salon
    salon: [
        'images/salon/salon-01.jpg',
        'images/salon/salon-02.jpg',
        'images/salon/salon-03.jpg'
        // Ajoutez autant de photos que nécessaire
    ],

    // Portfolio de tatouages
    portfolio: {
        realistic: [
            {
                src: 'input/img_2.png',
                title: 'Portrait Réaliste',
                description: 'Technique hyperréaliste en noir et gris'
            },
            {
                src: 'input/img_2.png',
                title: 'Animal Réaliste',
                description: 'Faune en technique réaliste'
            },
            {
                src: 'input/img_2.png',
                title: 'Portrait Féminin',
                description: 'Réalisme saisissant'
            }
            // Ajoutez vos photos réalistes ici
        ],

        geometric: [
            {
                src: 'input/img_2.png',
                title: 'Mandala Géométrique',
                description: 'Design symétrique complexe'
            },
            {
                src: 'input/img_2.png',
                title: 'Motifs Abstraits',
                description: 'Géométrie moderne'
            }
            // Ajoutez vos photos géométriques ici
        ],

        botanical: [
            {
                src: 'input/img_2.png',
                title: 'Rose Délicate',
                description: 'Style botanique fin'
            },
            {
                src: 'input/img_2.png',
                title: 'Feuillage',
                description: 'Inspiration naturelle'
            }
            // Ajoutez vos photos botaniques ici
        ],

        minimal: [
            {
                src: 'input/img_2.png',
                title: 'Ligne Minimaliste',
                description: 'Design épuré et élégant'
            },
            {
                src: 'input/img_2.png',
                title: 'Symbole Simple',
                description: 'Minimalisme raffiné'
            }
            // Ajoutez vos photos minimalistes ici
        ]
    }
};

// ===== FONCTIONS UTILITAIRES =====

// Récupérer toutes les images du portfolio
function getAllPortfolioImages() {
    const allImages = [];

    Object.keys(IMAGES_CONFIG.portfolio).forEach(category => {
        IMAGES_CONFIG.portfolio[category].forEach(image => {
            allImages.push({
                ...image,
                category: category,
                id: allImages.length + 1
            });
        });
    });

    return allImages;
}

// Récupérer les images par catégorie
function getImagesByCategory(category) {
    return IMAGES_CONFIG.portfolio[category] || [];
}

// Vérifier si une image existe
function checkImageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
    });
}

// Charger les images avec découverte automatique des dossiers
async function loadImagesWithFallback() {
    const portfolioImages = await discoverPortfolioImages();
    return portfolioImages;
}

// Découvrir automatiquement les images dans les dossiers
async function discoverPortfolioImages() {
    const categories = ['realistic', 'geometric', 'botanical', 'minimal'];
    const allImages = [];
    let imageId = 1;

    for (const category of categories) {
        const categoryImages = await discoverCategoryImages(category);

        // Ajouter les vraies images trouvées
        categoryImages.forEach(image => {
            allImages.push({
                ...image,
                id: imageId++,
                category: category
            });
        });

        // Compléter avec le logo si moins de 2 images
        const minImages = 2;
        while (categoryImages.length < minImages) {
            allImages.push({
                id: imageId++,
                src: 'input/img_2.png',
                category: category,
                title: getDefaultTitle(category, categoryImages.length + 1),
                description: getDefaultDescription(category),
                isFallback: true
            });
            categoryImages.push({}); // Juste pour compter
        }
    }

    return allImages;
}

// Découvrir les images d'une catégorie
async function discoverCategoryImages(category) {
    const images = [];
    const maxImages = 10; // Limite pour éviter les boucles infinies

    // Essayer de trouver des images dans le dossier de la catégorie
    for (let i = 1; i <= maxImages; i++) {
        const imagePath = `images/portfolio/${category}/tatouage-${String(i).padStart(2, '0')}.jpg`;
        const exists = await checkImageExists(imagePath);

        if (exists) {
            // Récupérer le titre et la description depuis la config si disponible
            const configImage = IMAGES_CONFIG.portfolio[category]?.[i-1];
            images.push({
                src: imagePath,
                title: configImage?.title || getDefaultTitle(category, i),
                description: configImage?.description || getDefaultDescription(category)
            });
        } else {
            // Essayer aussi avec .png
            const imagePathPng = `images/portfolio/${category}/tatouage-${String(i).padStart(2, '0')}.png`;
            const existsPng = await checkImageExists(imagePathPng);

            if (existsPng) {
                const configImage = IMAGES_CONFIG.portfolio[category]?.[i-1];
                images.push({
                    src: imagePathPng,
                    title: configImage?.title || getDefaultTitle(category, i),
                    description: configImage?.description || getDefaultDescription(category)
                });
            }
        }
    }

    return images;
}

// Générer des titres par défaut
function getDefaultTitle(category, index) {
    const titles = {
        realistic: [`Portrait Réaliste ${index}`, `Animal Réaliste ${index}`, `Visage Réaliste ${index}`],
        geometric: [`Mandala ${index}`, `Motif Géométrique ${index}`, `Design Abstrait ${index}`],
        botanical: [`Fleur ${index}`, `Feuillage ${index}`, `Nature ${index}`],
        minimal: [`Ligne Minimaliste ${index}`, `Symbole ${index}`, `Design Épuré ${index}`]
    };

    const categoryTitles = titles[category] || [`Tatouage ${index}`];
    return categoryTitles[(index - 1) % categoryTitles.length];
}

// Générer des descriptions par défaut
function getDefaultDescription(category) {
    const descriptions = {
        realistic: 'Technique hyperréaliste en noir et gris',
        geometric: 'Design symétrique et moderne',
        botanical: 'Inspiration naturelle délicate',
        minimal: 'Épuré et élégant'
    };

    return descriptions[category] || 'Création artistique unique';
}

// Images de fallback locales si les images configurées n'existent pas
function getFallbackImage(category) {
    // Utiliser l'image du logo comme fallback pour toutes les catégories
    return 'input/img_2.png';
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IMAGES_CONFIG,
        getAllPortfolioImages,
        getImagesByCategory,
        loadImagesWithFallback,
        checkImageExists
    };
}
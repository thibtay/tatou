# 🎨 Encrée par Jenny - Site Web

Site web professionnel pour Jenny, artiste tatoueuse à Rurange-lès-Thionville.

## ✨ Fonctionnalités

- **Design moderne** et responsive
- **Portfolio filtrable** par style de tatouage
- **Galerie du salon** avec lightbox
- **Formulaire de contact** interactif
- **Intégration réseaux sociaux**
- **Géolocalisation** Google Maps

## 🛠️ Technologies

- HTML5 sémantique
- CSS3 avec variables personnalisées
- JavaScript ES6+ vanilla
- Responsive design mobile-first

## 📁 Structure du Projet

```
tatoo/
├── index.html              # Page principale
├── styles.css             # Styles CSS
├── script.js              # JavaScript interactif
├── images-config.js       # Configuration des images
├── input/                 # Logo et ressources
│   └── img_2.png         # Logo principal
├── images/               # Photos du site
│   ├── portfolio/        # Photos de tatouages
│   │   ├── realistic/    # Tatouages réalistes
│   │   ├── geometric/    # Tatouages géométriques
│   │   ├── botanical/    # Tatouages botaniques
│   │   └── minimal/      # Tatouages minimalistes
│   ├── salon/            # Photos du salon
│   └── profile/          # Photo de profil de Jenny
└── docs/                 # Documentation
    ├── GUIDE-PHOTOS.md   # Guide d'ajout des photos
    └── README.md         # Documentation technique
```

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/[USERNAME]/tatoo.git
cd tatoo
```

2. **Ouvrir le site**
```bash
# Avec un serveur local (recommandé)
python -m http.server 8000
# ou
npx serve .

# Puis ouvrir http://localhost:8000
```

## 📸 Ajouter des Photos

### Portfolio
1. Placez vos photos dans `images/portfolio/[catégorie]/`
2. Nommez-les : `tatouage-01.jpg`, `tatouage-02.jpg`, etc.
3. Modifiez `images-config.js` pour les titres/descriptions

### Salon
1. Placez vos photos dans `images/salon/`
2. Nommez-les : `salon-01.jpg`, `salon-02.jpg`, etc.

### Profil
1. Placez votre photo dans `images/profile/`
2. Nommez-la : `jenny-portrait.jpg`

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `styles.css` :
```css
:root {
  --color-coral: #FF6B6B;
  --color-rose: #FF69B4;
  --color-gold: #D4AF37;
  /* ... */
}
```

### Contenu
- **Contact** : Mettez à jour les informations dans `index.html`
- **À propos** : Personnalisez la section Jenny
- **Services** : Adaptez les tarifs et descriptions

## 📱 Fonctionnalités

### Portfolio
- **Filtres interactifs** par style
- **Lightbox** pour voir les images en grand
- **Animations fluides** sans clignotement

### Contact
- **Formulaire** avec validation
- **Géolocalisation** Google Maps
- **Liens réseaux sociaux**

### Performance
- **Images optimisées** avec lazy loading
- **CSS moderne** avec Grid et Flexbox
- **JavaScript vanilla** pour la rapidité

## 🌐 Déploiement

### GitHub Pages
1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez la branche `main`
3. Le site sera disponible à : `https://[USERNAME].github.io/tatoo/`

### Netlify
1. Connectez votre repository GitHub
2. Déployez automatiquement à chaque commit

## 📞 Contact

**Jenny** - Artiste Tatoueuse
📍 Rurange-lès-Thionville, France
📧 contact@encreepar jenny.fr
📱 [Instagram](https://instagram.com/encreepar jenny) | [Facebook](https://facebook.com/encreepar jenny)

## 📄 Licence

© 2025 Encrée par Jenny. Tous droits réservés.

---

Développé avec ❤️ pour Jenny
# 📸 Guide d'Ajout des Photos - Encrée par Jenny

## 🚀 Installation Rapide

### 1. Téléchargez vos photos Facebook
- Allez sur votre page Facebook
- Sauvegardez les photos que vous souhaitez sur votre ordinateur
- Renommez-les selon le guide ci-dessous

### 2. Placez les photos dans les bons dossiers

```
📁 images/
├── 📁 portfolio/
│   ├── 📁 realistic/     ← Photos de tatouages réalistes
│   ├── 📁 geometric/     ← Photos de tatouages géométriques
│   ├── 📁 botanical/     ← Photos de tatouages botaniques
│   └── 📁 minimal/       ← Photos de tatouages minimalistes
├── 📁 salon/             ← Photos de votre salon
└── 📁 profile/           ← Votre photo de profil
```

## 📝 Comment Nommer vos Photos

### Portfolio (tatouages) :
- `tatouage-01.jpg`, `tatouage-02.jpg`, etc.
- Format : **JPG ou PNG**
- Taille recommandée : **800x800px** (carré)

### Salon :
- `salon-01.jpg`, `salon-02.jpg`, etc.
- Format : **JPG ou PNG**
- Taille recommandée : **1200x800px** (paysage)

### Profil :
- `jenny-portrait.jpg`
- Format : **JPG ou PNG**
- Taille recommandée : **600x800px** (portrait)

## ⚙️ Configuration des Photos

### Étape 1 : Ouvrez le fichier `images-config.js`

### Étape 2 : Ajoutez vos photos dans les bonnes sections

**Exemple pour un tatouage réaliste :**
```javascript
realistic: [
    {
        src: 'images/portfolio/realistic/tatouage-01.jpg',
        title: 'Portrait de Lion', // ← Changez le titre
        description: 'Réalisme en noir et gris' // ← Changez la description
    },
    {
        src: 'images/portfolio/realistic/tatouage-02.jpg',
        title: 'Votre nouveau tatouage',
        description: 'Description de votre choix'
    }
    // Ajoutez autant de photos que vous voulez
]
```

## 🎯 Exemple Complet

Si vous avez 3 photos de tatouages réalistes :

1. **Placez les photos :**
   - `images/portfolio/realistic/tatouage-01.jpg`
   - `images/portfolio/realistic/tatouage-02.jpg`
   - `images/portfolio/realistic/tatouage-03.jpg`

2. **Configurez dans `images-config.js` :**
```javascript
realistic: [
    {
        src: 'images/portfolio/realistic/tatouage-01.jpg',
        title: 'Portrait Réaliste',
        description: 'Technique hyperréaliste'
    },
    {
        src: 'images/portfolio/realistic/tatouage-02.jpg',
        title: 'Animal Sauvage',
        description: 'Lion en noir et gris'
    },
    {
        src: 'images/portfolio/realistic/tatouage-03.jpg',
        title: 'Visage Féminin',
        description: 'Portrait délicat'
    }
]
```

## 🔄 Mise à Jour Automatique

Une fois vos photos ajoutées :
1. ✅ Actualisez votre navigateur
2. ✅ Les nouvelles photos apparaissent automatiquement
3. ✅ Elles sont filtrables par catégorie
4. ✅ Elles s'ouvrent en lightbox au clic

## 🆘 Dépannage

### "Ma photo ne s'affiche pas"
- ✅ Vérifiez le nom du fichier (pas d'espaces, pas d'accents)
- ✅ Vérifiez le chemin dans `images-config.js`
- ✅ Vérifiez que la photo est bien dans le bon dossier

### "L'image est déformée"
- ✅ Redimensionnez votre photo aux tailles recommandées
- ✅ Utilisez un format carré pour le portfolio

### "Le site affiche encore les photos d'exemple"
- ✅ Videz le cache de votre navigateur (Ctrl+F5)
- ✅ Vérifiez que `images-config.js` est bien modifié

## 💡 Conseils Pro

- **Qualité** : Utilisez des photos haute résolution
- **Éclairage** : Photos bien éclairées, contrastes nets
- **Compression** : Gardez vos fichiers sous 500KB pour la rapidité
- **Backup** : Gardez toujours une copie de vos photos originales

---

**🎉 C'est tout ! Votre site va maintenant afficher vos vraies créations !**
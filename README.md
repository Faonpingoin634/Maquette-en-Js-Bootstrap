# 🎨 Palette UI

**Palette UI** est une application web interactive permettant de construire des interfaces simples via un système de **Glisser-Déposer (Drag & Drop)**. Elle utilise des composants **Bootstrap 5** que l'on peut placer, déplacer et organiser sur un espace de travail virtuel.

## ✨ Fonctionnalités Principales

* **Drag & Drop intuitif :** Glissez des éléments depuis la barre latérale vers la zone de travail.
* **Composants disponibles :**
    * Bouton
    * Barre de progression (animée)
    * Accordéon (interactif)
    * Placeholder (squelette de chargement)
    * Badge
* **Contrôle total :**
    * Déplacement à la souris.
    * Déplacement de précision avec les **flèches du clavier** (après sélection).
    * Suppression du dernier élément ou remise à zéro complète.
* **Système de succès :** Un message de félicitations apparaît automatiquement une fois que tous les types de composants ont été utilisés au moins une fois.

## 🚀 Installation et Utilisation

Aucune installation (npm, serveur, etc.) n'est nécessaire. Le projet fonctionne directement dans le navigateur.

1.  Assurez-vous d'avoir les 3 fichiers suivants dans le même dossier :
    * `main.html`
    * `style.css`
    * `script.js`
2.  Ouvrez simplement le fichier **`main.html`** avec votre navigateur web (Chrome, Firefox, Edge...).

## 🎮 Raccourcis Clavier

Une fois un élément déposé sur le canvas, cliquez dessus pour le sélectionner (il sera entouré en bleu), puis utilisez :

* `⬆️ Flèche Haut` : Monter
* `⬇️ Flèche Bas` : Descendre
* `⬅️ Flèche Gauche` : Aller à gauche
* `➡️ Flèche Droite` : Aller à droite

## 📂 Structure des fichiers

* **main.html** : Structure de la page et import des librairies Bootstrap (CDN).
* **style.css** : Mise en page (Flexbox), thème sombre pour la barre d'outils et styles de l'interface.
* **script.js** : Logique de création des éléments DOM, gestion du Drag & Drop et événements clavier.

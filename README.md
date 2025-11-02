# AdminJS Example - CODEX OUTSOURCING SOLUTIONS

Application d'administration basée sur AdminJS pour gérer les utilisateurs, les actualités, les équipes et les projets.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 16.0.0 ou supérieure ([Télécharger Node.js](https://nodejs.org/))
- **MongoDB** ([Télécharger MongoDB](https://www.mongodb.com/try/download/community))
- **Yarn** (optionnel, mais recommandé)

### Installation de Yarn (si nécessaire)

```bash
npm install -g yarn
```

## 🚀 Installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances**

```bash
yarn install
```

ou avec npm :

```bash
npm install
```

## ⚙️ Configuration

### MongoDB

L'application nécessite une base de données MongoDB en cours d'exécution.

**Par défaut**, l'application se connecte à :
```
mongodb://localhost:27017/adminjs-example
```

Pour utiliser une autre URL MongoDB, créez un fichier `.env` à la racine du projet :

```env
MONGO_URL=mongodb://localhost:27017/votre-base-de-donnees
```

### Démarrage de MongoDB

**Sur Linux :**
```bash
sudo systemctl start mongod
```

**Sur macOS (avec Homebrew) :**
```bash
brew services start mongodb-community
```

**Sur Windows :**
Démarrez MongoDB depuis les services Windows ou avec :
```bash
mongod
```

**Vérifier que MongoDB est en cours d'exécution :**
```bash
mongo --eval "db.version()"
```

## ▶️ Lancement de l'application

### Mode développement (avec rechargement automatique)

```bash
yarn dev
```

L'application sera accessible à :
- **Page de connexion** : http://localhost:3000/login
- **Interface AdminJS** : http://localhost:3000/admin

### Mode production

```bash
yarn start
```

ou

```bash
node app.js
```

### Utiliser un port personnalisé

```bash
PORT=3001 yarn dev
```

## 🔑 Première connexion

1. Accédez à http://localhost:3000/login
2. Créez un compte depuis la page d'inscription (`/register`)
3. Connectez-vous avec vos identifiants
4. Vous serez redirigé vers l'interface AdminJS

## 📁 Structure du projet

```
adminjs-example/
├── app.js                    # Point d'entrée de l'application
├── package.json              # Dépendances et scripts
├── prisma/                   # Configuration Prisma
│   ├── schema.prisma        # Schéma de base de données
│   └── dev.db               # Base de données SQLite (si utilisée)
├── public/                   # Fichiers statiques
│   ├── custom-admin.js      # Scripts personnalisés AdminJS
│   ├── custom-admin.css     # Styles personnalisés
│   ├── login.html           # Page de connexion
│   ├── register.html        # Page d'inscription
│   └── uploads/             # Dossier pour les fichiers uploadés
├── components/               # Composants React personnalisés
│   ├── MemberPhotoEdit.jsx
│   └── MemberPhotoShow.jsx
└── generated/               # Fichiers générés (Prisma)
```

## 🛠️ Scripts disponibles

- `yarn dev` - Lance l'application en mode développement avec rechargement automatique
- `yarn start` - Lance l'application en mode production
- `yarn install` - Installe les dépendances

## 🌐 Endpoints de l'application

- `/` - Redirige vers `/login` ou `/admin` selon l'état de connexion
- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/admin` - Interface AdminJS (nécessite une session active)
- `/logout` - Déconnexion
- `/api/login` - API de connexion (POST)
- `/api/register` - API d'inscription (POST)
- `/api/upload` - API d'upload de fichiers (POST)
- `/api/logout` - API de déconnexion (POST)

## 📦 Ressources gérées dans AdminJS

- **Users** - Gestion des utilisateurs
- **News** - Gestion des actualités
- **Team** - Gestion des équipes
- **InternalEvent** - Gestion des événements internes
- **HomepageHighlight** - Mises en avant de la page d'accueil
- **Project** - Gestion des projets
- **ProjectAlt** - Gestion des projets alternatifs

## 🔧 Résolution de problèmes

### Erreur : Port déjà utilisé

Si vous obtenez l'erreur `EADDRINUSE: address already in use :::3000` :

```bash
# Trouver le processus qui utilise le port
lsof -i :3000

# Arrêter le processus
kill $(lsof -t -i:3000)
```

Ou utilisez un autre port :
```bash
PORT=3001 yarn dev
```

### Erreur : MongoDB connection error

Vérifiez que MongoDB est bien démarré :

```bash
# Vérifier le statut
sudo systemctl status mongod

# Démarrer MongoDB
sudo systemctl start mongod
```

### Erreur lors de l'installation

Si vous rencontrez des erreurs lors de `yarn install`, essayez :

```bash
# Nettoyer le cache
yarn cache clean

# Supprimer node_modules et réinstaller
rm -rf node_modules yarn.lock
yarn install
```

## 📝 Notes importantes

- L'application utilise **MongoDB** comme base de données principale
- Les sessions sont stockées en mémoire (redémarrez l'app pour réinitialiser les sessions)
- Les fichiers uploadés sont stockés dans `public/uploads/`
- Le mot de passe est haché avec bcrypt avant stockage

## 👥 Support

Pour toute question ou problème, veuillez consulter la documentation AdminJS :
- [Documentation AdminJS](https://docs.adminjs.co/)
- [GitHub AdminJS](https://github.com/SoftwareBrothers/adminjs)

## 📄 Licence

Ce projet est un exemple d'utilisation d'AdminJS.

---

**Développé pour CODEX OUTSOURCING SOLUTIONS**

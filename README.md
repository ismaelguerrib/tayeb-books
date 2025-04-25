# 📚 Tayeb Books — Librairie en ligne (Monorepo Nx)

**Tayeb Books** est un site vitrine pour une librairie, construit avec une architecture modulaire en **monorepo Nx**.  
Le projet combine :

- 🌐 **Angular** (client) — Interface utilisateur publique
- 🧠 **Strapi** (cms) — Gestion des contenus (livres, articles)
- 🧾 **NestJS** (server) — Backend minimal, utilisé pour la gestion du panier et le paiement Stripe (à venir)

---

## 📦 Structure du projet

```
tayeb-books/
├── apps/
│   ├── client/     # Application Angular
│   ├── server/     # Application NestJS
│   └── cms/        # Instance Strapi
├── libs/           # Types partagés (ex: Book, BlogPost)
├── nx.json         # Configuration NX
├── tsconfig.base.json
```

---

## 🚀 Lancer le projet en local

### 1. 📥 Cloner et installer les dépendances

```bash
git clone https://github.com/ismaelguerrib/tayeb-books.git
cd tayeb-books
npm install
```

### 2. 🔧 Démarrer chaque application

#### ➤ Strapi (CMS headless)

```bash
cd apps/cms
npm install
npm run develop
```

Accès à l’admin Strapi : [http://localhost:1337/admin](http://localhost:1337/admin)

#### ➤ Angular (Client)

```bash
cd ../..
nx serve client
```

Client accessible : [http://localhost:4200](http://localhost:4200)

#### ➤ NestJS (Backend API - optionnel pour checkout Stripe)

```bash
nx serve server
```

API accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 🧱 Fonctionnalités

- 🖼️ Affichage des livres via CMS
- 🛒 Panier client
- 📚 Blog SEO
- 🔐 Back-office via Strapi (livres + posts)
- 💳 Paiement Stripe (à venir)

---

## 📚 Stack technique

| Technologie                                   | Rôle               |
| --------------------------------------------- | ------------------ |
| [Nx](https://nx.dev/)                         | Monorepo & tooling |
| [Angular](https://angular.io/)                | Frontend SPA       |
| [NestJS](https://nestjs.com/)                 | Backend API        |
| [Strapi](https://strapi.io/)                  | CMS Headless       |
| [Stripe](https://stripe.com/)                 | Paiement en ligne  |
| [TypeScript](https://www.typescriptlang.org/) | Partout            |

---

## 🔐 Environnement

Crée un fichier `.env` dans `apps/cms/` avec :

```env
STRAPI_ADMIN_BACKEND_URL=http://localhost:1337
STRAPI_TELEMETRY_DISABLED=true
```

---

## ✨ À venir

- [ ] Intégration complète de Stripe Checkout dans NestJS
- [ ] Déploiement multi-app (Vercel / Render / Railway)

---

## 🧑‍💻 Auteur

Développé par [Ismaël Guerrib](https://github.com/ismaelguerrib)

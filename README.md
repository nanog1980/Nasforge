# Nasforge

Site personnel éditorial documentant la construction d'un NAS de zéro : sélection des composants, assemblage, install TrueNAS Scale, partages, sauvegarde, monitoring.

🌐 **Live** : [https://nasforge.fr](https://nasforge.fr)

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** + **Tailwind v4**
- **MDX** pour la rédaction des tutoriels (`@next/mdx`)
- Polices via `next/font` : Space Grotesk (display), Inter (body), JetBrains Mono (code/specs)

## Hébergement

- **VM Debian 13** auto-hébergée
- Servi via **Cloudflare Tunnel** (pas de port forwarding nécessaire)
- Service systemd `nasforge.service`

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm run start
```

## Identité visuelle

Palette dark-first avec accent cuivre/braise (`#d97757`) — esthétique « atelier tech / forge » qui contraste avec le ton éditorial pastel des sites de docs habituels.

## Licence

MIT — code libre de réutilisation, attribution appréciée. Les contenus écrits (tutoriels, photos, schémas) restent sous copyright auteur.

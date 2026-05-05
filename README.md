# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


---->
right now im building the backend to provide API endpoints for the frontend.
i started with:
1- contact us backend Contact form handler: 
*- rejects bots via honeypot fields (company/website),
*- then sends a
*- Resend email with a UUID-suffixed subject and HTML template to the site owner.

------> Right Now Im Here...
2- Sponsors API endpoints:
*- get all active sponsors.
*- get sponsor by slug.

3- Sponsors/Admin 
*- add new sponsor.
*- update existing sponsor.
*- delete sponsor.
*- get all sponsors.
*- get sponsor by id.

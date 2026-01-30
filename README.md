[![Deploy Status](https://github.com/tripadvancer/portal/actions/workflows/deploy.yml/badge.svg)](https://github.com/tripadvancer/portal/actions/workflows/deploy.yml)

# Tripadvancer Portal

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 18.0.0

## Getting started

Create a `.env.local` file similar to `.env.example`:

```bash
cp .env.example .env.local
```

### Run app in development mode

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

### Run app in production mode

Install dependencies:

```bash
npm ci
```

Build the app:

```bash
npm run build
```

Start the app:

```bash
npm start
```

### Run app in Docker container

If you want to run the app in a Docker container, you can use the instructions below:

Change `.env.local` file:

```bash
NODE_ENV=development

API_URL=http://app:3001/api/v1
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_PORTAL_URL=http://localhost:3000
```

Build the image:

```bash
docker compose up -d --build
```

Run the container:

```bash
docker compose up -d
```

Stop the container:

```bash
docker compose down
```

### Open the app in your browser

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

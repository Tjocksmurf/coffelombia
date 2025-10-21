# Colombian Coffee Heritage

An interactive storytelling experience showcasing generational Colombian coffee farms. This web application takes visitors on a visual journey through family-owned coffee farms that have been cultivating coffee for over 100 years.

## Features

- Interactive video backgrounds showcasing coffee farms
- Detailed farm profiles with location mapping
- Coffee bean specifications and tasting notes
- Image galleries with lightbox viewing
- Demo order system with shopping cart
- Fully responsive design for mobile and desktop

## Technology Stack

- React 19 with TypeScript
- Vite for build tooling
- Supabase for backend services
- CSS3 with custom animations
- GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment with automatic builds via GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Setup GitHub Pages

1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Project Structure

- `/src` - React components and application code
- `/public` - Static assets including videos
- `/.github/workflows` - GitHub Actions CI/CD configuration
- `/dist` - Production build output

## Features in Detail

### Farm Profiles
Each farm profile includes:
- Historical background spanning 100+ years
- Bean type specifications
- Altitude and growing conditions
- Tasting notes
- Interactive Colombia map with farm location

### Interactive Experience
- Smooth transitions between farm stories
- Expandable detailed information panels
- Image galleries with full-screen lightbox
- Responsive navigation controls

## License

Private project

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dog Clock is a React-based web application that displays the current date and time alongside a dog image from TheDogAPI. The project is built with Vite, TypeScript, and React 19, and is deployed to GitHub Pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Build Configuration

The project uses Vite with custom configuration (vite.config.ts):
- Base path: `/dog-clock/` (for GitHub Pages deployment)
- Output directory: `docs/` (instead of default `dist/`)

## Architecture

### Application Structure

- **src/main.tsx**: Entry point that renders the App component into the DOM with React StrictMode
- **src/App.tsx**: Main component containing clock logic and dog image display
  - Uses `useState` to manage current time and dog image URL
  - Clock updates every second via `useEffect` (lines 8-14)
  - Fetches dog image URL from `/dog-clock/metadata.json` on mount and every 10 minutes (lines 16-33)
  - Uses cache busting with timestamp query parameter for metadata fetches
  - Formats time using `toLocaleTimeString` and date using `toLocaleDateString`
- **src/App.css**: Styles for the clock component
- **src/index.css**: Global styles
- **index.html**: Root HTML template with dog.svg favicon

### GitHub Actions Automation

The project includes a GitHub Actions workflow (.github/workflows/build.yml) that:
1. Runs on a cron schedule (weekdays 0:00-9:00 UTC, hourly) or manually via workflow_dispatch
2. Fetches a random dog image URL from TheDogAPI
3. Generates `public/metadata.json` with the image URL and timestamp (line 29)
4. Builds the project using `npm run build`
5. Commits and pushes changes if any exist
6. Requires a Personal Access Token (PAT) secret for authenticated git push

### Key Implementation Details

**Dog Image Management**: The application uses a metadata-based approach for dog images:
- GitHub Actions generates `public/metadata.json` with a random dog image URL and timestamp
- `src/App.tsx` fetches this metadata file on mount and every 10 minutes (with cache busting)
- The dog image state updates dynamically when new metadata is detected
- Initial fallback URL is set in state (src/App.tsx:6) in case metadata fetch fails

**Deployment**: Built files are output to `docs/` directory for GitHub Pages hosting. The base path is set to `/dog-clock/` in vite.config.ts.

## TypeScript Configuration

The project uses three TypeScript config files:
- **tsconfig.json**: Base configuration
- **tsconfig.app.json**: Application-specific settings
- **tsconfig.node.json**: Node/tooling configuration

## Linting

ESLint configuration (eslint.config.js) uses the modern flat config format with:
- TypeScript ESLint recommended rules
- React Hooks plugin
- React Refresh plugin for Vite
- Ignores `dist` directory

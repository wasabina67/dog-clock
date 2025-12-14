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
  - Uses `useState` and `useEffect` to manage time updates every second
  - Displays dog image from TheDogAPI at line 32
  - Formats time using `toLocaleTimeString` and date using `toLocaleDateString`
- **src/App.css**: Styles for the clock component
- **src/index.css**: Global styles
- **index.html**: Root HTML template with dog.svg favicon

### GitHub Actions Automation

The project includes a GitHub Actions workflow (.github/workflows/build.yml) that:
1. Runs hourly (cron schedule) or manually via workflow_dispatch
2. Fetches a random dog image from TheDogAPI
3. Updates the image URL in src/App.tsx at line 32 using sed
4. Builds the project and commits changes
5. Requires a Personal Access Token (PAT) secret for git push

### Key Implementation Details

**Dog Image Management**: The dog image URL is hardcoded in src/App.tsx:32 and is automatically updated by the GitHub Actions workflow. When modifying this line, ensure the sed command in .github/workflows/build.yml:29 still matches the pattern.

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

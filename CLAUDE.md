# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev

# Build (outputs to docs/ for GitHub Pages)
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

## Architecture

This is a React + TypeScript + Vite application that displays a real-time clock with a dog image from The Dog API.

**Key files:**
- `src/App.tsx` - Main component with clock logic and dog image fetching
- `vite.config.ts` - Configured with base path `/dog-clock/` for GitHub Pages, outputs to `docs/`

**Data flow:**
- Clock updates every second via `setInterval`
- Dog image URL is fetched from `/dog-clock/metadata.json` on load and every 10 minutes

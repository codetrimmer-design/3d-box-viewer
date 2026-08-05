# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static 3D viewer for a box model (3mm × 3mm × 6mm). No build step — `box_viewer.html` runs directly in the browser with Three.js loaded from CDN.

## Architecture

- `box_viewer.html` — Single-file app: inline CSS + Three.js scene setup, orbit controls, wireframe/edge toggles
- `box_3x3x6.step` — Source CAD geometry (STEP format)

## Development

No build tooling. Edit `box_viewer.html` and refresh the browser. Three.js r128 and OrbitControls load from CDN.

## Deployment

GitHub Pages serves from `master` branch root: https://codetrimmer-design.github.io/3d-box-viewer/box_viewer.html

## Installed Skills

Custom skills in `.claude/skills/` for website optimization:

- **frontend-design** — Visual design guidance for distinctive UI
- **seo-audit** — SEO diagnostics and optimization
- **lead-magnets** — Email capture and lead generation strategy
- **ui-ux-pro-max** — UI/UX best practices and design patterns
- **3dbox-website** — Custom skill combining all above for this project

Use `/3dbox` command for quick project context.

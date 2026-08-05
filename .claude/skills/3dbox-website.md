---
name: 3dbox-website
description: Customized skills for the 3D Box Viewer website - combines frontend design, SEO, lead magnets, and UI/UX best practices for the Three.js 3D visualization project.
---

# 3D Box Viewer Website Skills

Specialized guidance for the 3D Box Viewer project (3mm × 3mm × 6mm Three.js visualization).

## Project Context

- **Live URL**: https://codetrimmer-design.github.io/3d-box-viewer/box_viewer.html
- **Tech Stack**: Static HTML + Three.js r128 (CDN)
- **Files**: `box_viewer.html` (viewer), `box_3x3x6.step` (CAD source)

---

## Frontend Design Guidelines

### Visual Identity
- **Dark theme**: Background `#1a1a1a` with blue accent `#00aaff`
- **Typography**: Arial/sans-serif for clean technical feel
- **Signature element**: Interactive 3D box with orbit controls

### Design Principles
- Keep controls minimal and intuitive (Reset, Wireframe, Edges)
- Use dimension labels (3mm × 3mm × 6mm) as visual anchors
- Grid and axes helpers provide spatial context
- Responsive: Works on all screen sizes

---

## SEO Optimization

### Technical SEO
- Add meta description: "Interactive 3D box model viewer - 3mm × 3mm × 6mm visualization with Three.js"
- Add Open Graph tags for social sharing
- Implement structured data (WebApplication schema)
- Ensure fast load time (CDN assets, minimal JS)

### On-Page SEO
- **Title**: "3D Box Viewer | Interactive 3D Model Visualization"
- **H1**: Clear, descriptive heading
- **Alt text**: For screenshot image in README
- **Keywords**: 3D viewer, Three.js, CAD viewer, 3D visualization, STEP file viewer

---

## Lead Magnet Strategy

### Potential Lead Magnets
1. **Downloadable 3D Models**: Offer the STEP file in multiple formats (OBJ, GLTF, STL)
2. **Tutorial Series**: "How to Build a 3D Viewer with Three.js"
3. **Template Pack**: Starter templates for different 3D objects
4. **Interactive Configurator**: Let users customize dimensions/colors

### Email Capture Points
- Before download: "Enter email to get the 3D model files"
- Newsletter signup: "Get notified of new 3D models and tutorials"
- Resource library: "Access our full 3D model collection"

---

## UI/UX Best Practices

### Accessibility
- Keyboard navigation for all controls
- ARIA labels on buttons
- High contrast text on dark background
- Focus indicators visible

### Interaction Design
- **Orbit controls**: Left-drag rotate, right-drag pan, scroll zoom
- **Toggle feedback**: Clear visual state for wireframe/edges
- **Reset button**: Returns to default view position
- **Responsive**: Touch-friendly on mobile

### Performance
- Lazy load Three.js from CDN
- Optimize geometry (simple box = fast render)
- RequestAnimationFrame for smooth animation
- Handle window resize gracefully

---

## Enhancement Opportunities

### Short-Term
- [ ] Add meta tags to HTML head
- [ ] Create favicon (3D box icon)
- [ ] Add loading indicator
- [ ] Implement dark/light mode toggle

### Medium-Term
- [ ] Add more 3D model formats support
- [ ] Create model gallery page
- [ ] Add measurement tool
- [ ] Implement screenshot export

### Long-Term
- [ ] User accounts for saved models
- [ ] Collaborative annotations
- [ ] AR/VR preview mode
- [ ] API for programmatic access

---

## Code Quality

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="...">
    <title>...</title>
</head>
```

### CSS Organization
- Use CSS custom properties for theming
- Mobile-first responsive design
- Minimal external dependencies

### JavaScript Best Practices
- Modular functions (resetView, toggleWireframe, toggleEdges)
- Clean event handling
- Error boundaries for WebGL support
- Progressive enhancement

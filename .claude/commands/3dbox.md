Work on the 3D box viewer project.

The project is a static Three.js viewer for a box model (3mm × 3mm × 6mm).

Key files:
- `box_viewer.html` — Main viewer (inline CSS + Three.js)
- `box_3x3x6.step` — STEP CAD source

When making changes:
1. Edit `box_viewer.html` directly (no build step)
2. Test by opening in browser
3. Commit and push to deploy via GitHub Pages

Common tasks:
- Modify geometry dimensions in the BoxGeometry constructor (line 91)
- Adjust colors via the MeshPhongMaterial color property
- Add new controls by creating HTML buttons and corresponding JS functions
- Update lighting by modifying DirectionalLight positions/intensities

Deployment: Push to `master` → https://codetrimmer-design.github.io/3d-box-viewer/box_viewer.html

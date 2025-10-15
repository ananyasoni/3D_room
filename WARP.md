# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a 3D room visualization project built with Three.js that displays an interactive 3D environment with voxel-based models. The project creates a customizable room where users can view, manipulate, and position various 3D objects including furniture, pets, and decorative items.

## Development Commands

### Essential Commands
- `npm install` - Install dependencies (Three.js and Vite)
- `npm start` - Start development server with Vite (opens browser automatically)
- `npm run build` - Build for production (outputs to `dist/` directory)

### Development Server
The development server runs on Vite and automatically opens the browser. Hot module replacement is enabled for fast development iteration.

## Architecture and Code Structure

### Core Architecture
The application follows a modular Three.js structure with these key components:

1. **Scene Setup** (`main.js` lines 8-45): Camera, renderer, lighting configuration with shadow mapping
2. **Room Creation** (`createRoom()` function): Procedural generation of floor and walls with purple/pink theme
3. **Model Loading System** (`loadModels()` function): Dynamic OBJ+MTL loader with fallback material handling
4. **Interactive Controls**: OrbitControls for camera movement, TransformControls for object manipulation
5. **Grid System**: Visual grid helper with coordinate display and snapping functionality

### Model Management System
- **Model Definitions Array** (lines 108-235): Configuration-driven approach for positioning 3D objects
- **Dynamic Loading**: MTL materials loaded first, then OBJ geometry with error handling
- **Material Enhancement**: Automatic color assignment and shadow casting/receiving setup
- **Fallback System**: Default materials applied when MTL files fail to load

### Interactive Features
- **Object Selection**: Click objects to attach transform controls
- **Transform Modes**: G (translate), R (rotate), S (scale), Escape (deselect)
- **Grid Snapping**: Optional snapping to grid divisions for precise positioning
- **Real-time Coordinates**: Mouse position tracking with world coordinate display

### 3D Assets Structure
All models located in `/models/` directory with consistent naming:
- Each model has 4 files: `.vox` (source), `.obj` (geometry), `.mtl` (materials), `.png` (texture)
- 25 different voxel models available including furniture, pets, and decorative objects
- Models are positioned using a coordinate system with the room center at origin

### Lighting System
- **Multi-light Setup**: Ambient light + main directional light + two fill lights
- **Shadow Configuration**: PCF soft shadows with 2048x2048 shadow maps
- **Color Temperature**: Optimized for purple/pink room aesthetic

## Key Configuration

### Model Positioning
Models are defined in the `modelDefinitions` array with:
```javascript
{
  name: "model_name",           // Must match files in /models/
  position: { x, y, z },        // World coordinates
  rotation: { x, y, z },        // Euler rotation in radians
  scale: number                 // Uniform scaling factor
}
```

### Room Dimensions
- Floor size: 20x20 units
- Wall height: 10 units
- Grid divisions: 20 (1 unit per division)

### Controls Configuration
- Camera: Perspective with 45° FOV, positioned at (18, 16, 18)
- Orbit target: (0, 3, 0) - slightly elevated room center
- Damping enabled for smooth camera movement

## Development Notes

### Adding New Models
1. Place `.obj`, `.mtl`, and `.png` files in `/models/` directory
2. Add entry to `modelDefinitions` array with positioning
3. Ensure consistent naming convention across all files
4. Default colors defined in `defaultColors` object for fallback materials

### Performance Considerations
- Shadow maps set to 2048x2048 (reduce for performance on slower devices)
- Model loading is asynchronous with progress tracking
- Grid helper can be toggled off to improve performance

### Browser Compatibility
- Uses ES6 modules and import maps
- Requires modern browser with WebGL support
- Three.js version 0.160.0 loaded from CDN

### Audio Integration
Media files present in `/media/` suggest planned audio features for interactive elements (door sounds, typing, etc.)
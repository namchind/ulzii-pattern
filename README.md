# Endless Knot Pattern Generator

A JavaScript implementation of endless knot pattern generation, converted from Swift reference code. This project creates mathematical visualizations of traditional endless knot patterns.

## Features

- **Interactive Pattern Generation**: Generate endless knot patterns with customizable parameters
- **Real-time Controls**: Adjust length, width, rotation, scale, line width, and color
- **Pattern Grid**: View multiple patterns simultaneously to identify endless vs finite patterns
- **Canvas Rendering**: High-quality pattern rendering using HTML5 Canvas
- **Pattern Analysis**: Automatically identifies whether patterns are endless (green) or finite (red)

## Files

- `endless-knot.js` - Core JavaScript implementation of the pattern generation algorithm
- `index.html` - Interactive web interface with controls and visualizations
- `reference.txt` - Original Swift code reference

## Usage

### Basic Web Usage

1. Open `index.html` in a web browser
2. Use the controls to adjust pattern parameters:
   - **Length (ldiag)**: Controls the length dimension of the pattern
   - **Width (rdiag)**: Controls the width dimension of the pattern
   - **Rotation**: Rotates the pattern (0-360°)
   - **Scale**: Zooms in/out (0.1x - 3.0x)
   - **Line Width**: Thickness of the pattern lines
   - **Color**: Pattern color

### Programmatic Usage

```javascript
// Generate a single pattern
const points = batUlzii(ldiag, rdiag, nud);

// Create a pattern on canvas
const result = createEndlessKnotPattern('canvasContainerId', {
    containerSize: 400,
    ldiag: 8,
    rdiag: 5,
    strokeColor: 'blue',
    lineWidth: 2,
    scale: 1,
    rotation: 0
});

// Create a grid of patterns
createPatternGrid('gridContainerId', {
    maxL: 20,
    maxR: 20,
    cellSize: 20,
    lineWidth: 1
});
```

## Algorithm

The core algorithm (`batUlzii` function) generates points for endless knot patterns using mathematical calculations based on:
- Left diagonal parameter (`ldiag`)
- Right diagonal parameter (`rdiag`)
- Node spacing (`nud`)

The algorithm determines whether a pattern is "single-loop" (forms a complete loop) or "multi-loop" (loop closes before completing the whole pattern) based on the final coordinates.

## Pattern Types

- **Green patterns**: Endless knots that form complete loops
- **Red patterns**: Finite patterns that don't close properly
- **Gray cells**: Invalid parameter combinations (length < width)

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript features
- CSS Grid

## Development

To extend or modify the pattern generator:

1. The core algorithm is in the `batUlzii` function
2. Rendering logic is in the `LineShape` class
3. UI controls are in the HTML file's JavaScript section
4. Styling can be modified in the CSS section

Enjoy exploring the mathematical beauty of endless knot patterns!

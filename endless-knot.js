// Endless Knot Pattern Generator - JavaScript Version
// Converted from Swift reference code

function batUlzii(ldiag, rdiag, nud) {
    let tseguud = [];
    let delta = 0;
    let x = 0;
    let y = 0;
    let counter = 0;
    
    for (let i = 0; i < ldiag + rdiag; i++) {
        if (x === 0 || (ldiag % 2 === 1 && x === ldiag)) {
            if (y % 2 === 0) {
                y += 1;
            } else {
                y -= 1;
            }
        } else if (ldiag % 2 === 0 && x === ldiag) {
            if (y % 2 === 0) {
                y -= 1;
            } else {
                y += 1;
            }
        } else {
            delta = 0;
            if (y === 0 && x < rdiag) {
                delta = rdiag - (x % rdiag);
            }
            if (y === ldiag && ldiag - x < rdiag) {
                delta = rdiag - ((ldiag - x) % rdiag);
            }
            if (y < x) {
                y += rdiag * 2 - delta;
                if (y > ldiag) {
                    y = ldiag;
                }
            } else {
                y -= rdiag * 2 - delta;
                if (y < 0) {
                    y = 0;
                }
            }
        }
        tseguud.push({x: x * nud, y: y * nud});
        
        if (y === 0 || (ldiag % 2 === 1 && y === ldiag)) {
            if (x % 2 === 0) {
                x += 1;
            } else {
                x -= 1;
            }
        } else if (ldiag % 2 === 0 && y === ldiag) {
            if (x % 2 === 0) {
                x -= 1;
            } else {
                x += 1;
            }
        } else {
            delta = 0;
            if (x === 0 && y < rdiag) {
                delta = rdiag - (y % rdiag);
            }
            if (x === ldiag && ldiag - y < rdiag) {
                delta = rdiag - ((ldiag - y) % rdiag);
            }
            if (x < y) {
                x += rdiag * 2 - delta;
                if (x > ldiag) {
                    x = ldiag;
                }
            } else {
                x -= rdiag * 2 - delta;
                if (x < 0) {
                    x = 0;
                }
            }
        }
        tseguud.push({x: x * nud, y: y * nud});
        counter += 1;
        
        if (x === 0 && y === 0) {
            break;
        }
    }
    
    if (x === 0 && y === 0 && counter === ldiag + rdiag) {
        tseguud.push({x: 0, y: 0});
    } else {
        tseguud.push({x: ldiag * nud, y: ldiag * nud});
    }
    
    return tseguud;
}

class LineShape {
    constructor(ldiag = 8, rdiag = 5, tseguud = []) {
        this.ldiag = ldiag;
        this.rdiag = rdiag;
        this.tseguud = tseguud;
    }
    
    getPath(rect) {
        const nud = rect.height / (this.ldiag + 1);
        const pad = nud / 2;
        
        let pathData = `M ${pad + nud} ${pad} L ${pad} ${pad}`;
        
        // Add lines for all points except the last one
        for (let i = 0; i < this.tseguud.length - 1; i++) {
            const tseg = this.tseguud[i];
            pathData += ` L ${tseg.x + pad} ${tseg.y + pad}`;
        }
        
        return pathData;
    }
    
    // Canvas drawing method
    drawToCanvas(ctx, rect, strokeColor = 'blue', lineWidth = 1) {
        const nud = Math.min(rect.width, rect.height) / (this.ldiag + 1);
        const pad = nud / 2;
        
        // Center the pattern in the canvas
        const patternSize = this.ldiag * nud + nud;
        const offsetX = (rect.width - patternSize) / 2 + pad;
        const offsetY = (rect.height - patternSize) / 2 + pad;
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        
        ctx.moveTo(offsetX + nud, offsetY);
        ctx.lineTo(offsetX, offsetY);
        
        for (let i = 0; i < this.tseguud.length - 1; i++) {
            const tseg = this.tseguud[i];
            ctx.lineTo(offsetX + tseg.x, offsetY + tseg.y);
        }
        
        ctx.stroke();
    }
}

// Utility function to create and render endless knot patterns
function createEndlessKnotPattern(containerId, options = {}) {
    const {
        containerSize = 1000,
        ldiag = 8,
        rdiag = 5,
        strokeColor = 'blue',
        lineWidth = 2,
        scale = 1,
        rotation = 0
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = containerSize;
    canvas.height = containerSize / 2;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Apply transformations
    ctx.save();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
    
    const nud = Math.min(canvasWidth, canvasHeight) / (ldiag + 1);
    const points = batUlzii(ldiag, rdiag, nud);
    const lineShape = new LineShape(ldiag, rdiag, points);
    
    const rect = { width: canvasWidth, height: canvasHeight };
    lineShape.drawToCanvas(ctx, rect, strokeColor, lineWidth);
    
    ctx.restore();
    
    return { canvas, points, isEndless: points[points.length - 1].x === 0 && points[points.length - 1].y === 0 };
}

// Function to create a grid of patterns like in the Swift version
function createPatternGrid(containerId, options = {}) {
    const {
        maxL = 20,
        maxR = 20,
        cellSize = 20,
        lineWidth = 1,
        onPatternSelect = null
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    container.innerHTML = ''; // Clear existing content
    
    // Make container focusable and add keyboard navigation
    container.tabIndex = 0;
    container.style.outline = 'none';
    
    let selectedLdiag = 8; // Default selected pattern
    let selectedRdiag = 5;
    
    // Create a wrapper for the grid with labels
    const gridWrapper = document.createElement('div');
    gridWrapper.style.display = 'inline-block';
    gridWrapper.style.position = 'relative';
    
    // Create column headers
    const colHeaders = document.createElement('div');
    colHeaders.style.display = 'grid';
    colHeaders.style.gridTemplateColumns = `${cellSize + 10}px repeat(${maxL-3}, ${cellSize}px)`;
    colHeaders.style.gap = '1px';
    colHeaders.style.marginBottom = '2px';
    
    // Empty cell for top-left corner
    const cornerCell = document.createElement('div');
    cornerCell.style.width = `${cellSize + 10}px`;
    cornerCell.style.height = `${cellSize}px`;
    cornerCell.style.display = 'flex';
    cornerCell.style.alignItems = 'center';
    cornerCell.style.justifyContent = 'center';
    cornerCell.style.fontSize = '10px';
    cornerCell.style.fontWeight = 'bold';
    cornerCell.textContent = 'L→';
    colHeaders.appendChild(cornerCell);
    
    // Column headers (L values)
    for (let lside = 4; lside <= maxL; lside++) {
        const header = document.createElement('div');
        header.style.width = `${cellSize}px`;
        header.style.height = `${cellSize}px`;
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'center';
        header.style.fontSize = '8px';
        header.style.fontWeight = 'bold';
        header.style.backgroundColor = '#f0f0f0';
        header.style.border = '1px solid #ccc';
        header.textContent = lside;
        colHeaders.appendChild(header);
    }
    
    // Create main grid container
    const mainGrid = document.createElement('div');
    mainGrid.style.display = 'grid';
    mainGrid.style.gridTemplateColumns = `${cellSize + 10}px repeat(${maxL-3}, ${cellSize}px)`;
    mainGrid.style.gap = '1px';
    
    // Store cell references for keyboard navigation
    const cellMap = new Map();
    
    function selectPattern(ldiag, rdiag) {
        const cellKey = `${ldiag}-${rdiag}`;
        const cell = cellMap.get(cellKey);
        
        if (!cell) return;
        
        // Remove previous selection highlight
        const previouslySelected = container.querySelector('.selected-pattern');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected-pattern');
            previouslySelected.style.border = '1px solid transparent';
        }
        
        // Highlight current selection
        cell.classList.add('selected-pattern');
        cell.style.border = '2px solid #0066cc';
        
        selectedLdiag = ldiag;
        selectedRdiag = rdiag;
        
        // Call the callback if provided
        if (onPatternSelect) {
            const points = batUlzii(ldiag, rdiag, 1);
            const isEndless = points[points.length - 1].x === 0 && points[points.length - 1].y === 0;
            onPatternSelect(ldiag, rdiag, isEndless);
        }
    }
    
    function getValidRValues() {
        const rValues = [];
        for (let r = 3; r <= maxR; r += 2) {
            rValues.push(r);
        }
        return rValues;
    }
    
    function getValidLValues() {
        const lValues = [];
        for (let l = 4; l <= maxL; l++) {
            lValues.push(l);
        }
        return lValues;
    }
    
    for (let rside = 3; rside <= maxR; rside += 2) {
        // Add row header (R value)
        const rowHeader = document.createElement('div');
        rowHeader.style.width = `${cellSize + 10}px`;
        rowHeader.style.height = `${cellSize}px`;
        rowHeader.style.display = 'flex';
        rowHeader.style.alignItems = 'center';
        rowHeader.style.justifyContent = 'center';
        rowHeader.style.fontSize = '8px';
        rowHeader.style.fontWeight = 'bold';
        rowHeader.style.backgroundColor = '#f0f0f0';
        rowHeader.style.border = '1px solid #ccc';
        rowHeader.textContent = `R${rside}`;
        mainGrid.appendChild(rowHeader);
        
        for (let lside = 4; lside <= maxL; lside++) {
            const cell = document.createElement('div');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.style.cursor = 'pointer';
            cell.style.border = '1px solid transparent';
            cell.style.transition = 'border-color 0.2s';
            
            if (lside < rside) {
                cell.style.backgroundColor = 'gray';
            } else {
                const canvas = document.createElement('canvas');
                canvas.width = cellSize;
                canvas.height = cellSize;
                cell.appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                const nud = cellSize / (lside + 1);
                const points = batUlzii(lside, rside, nud);
                
                const isEndless = points[points.length - 1].x === 0 && points[points.length - 1].y === 0;
                const color = isEndless ? 'green' : 'red';
                
                const lineShape = new LineShape(lside, rside, points);
                const rect = { width: cellSize, height: cellSize };
                lineShape.drawToCanvas(ctx, rect, color, lineWidth);
                
                // Store cell reference for keyboard navigation
                const cellKey = `${lside}-${rside}`;
                cellMap.set(cellKey, cell);
                
                // Add click handler
                cell.addEventListener('click', () => {
                    selectPattern(lside, rside);
                    container.focus(); // Set focus for keyboard navigation
                });
                
                // Add hover effect
                cell.addEventListener('mouseenter', () => {
                    if (!cell.classList.contains('selected-pattern')) {
                        cell.style.border = '1px solid #ccc';
                    }
                });
                
                cell.addEventListener('mouseleave', () => {
                    if (!cell.classList.contains('selected-pattern')) {
                        cell.style.border = '1px solid transparent';
                    }
                });
            }
            
            mainGrid.appendChild(cell);
        }
    }
    
    // Add keyboard navigation
    container.addEventListener('keydown', (e) => {
        const rValues = getValidRValues();
        const lValues = getValidLValues();
        
        const currentRIndex = rValues.indexOf(selectedRdiag);
        const currentLIndex = lValues.indexOf(selectedLdiag);
        
        let newRIndex = currentRIndex;
        let newLIndex = currentLIndex;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                newRIndex = Math.max(0, currentRIndex - 1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                newRIndex = Math.min(rValues.length - 1, currentRIndex + 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                newLIndex = Math.max(0, currentLIndex - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                newLIndex = Math.min(lValues.length - 1, currentLIndex + 1);
                break;
            default:
                return;
        }
        
        const newRdiag = rValues[newRIndex];
        const newLdiag = lValues[newLIndex];
        
        // Only select if the pattern is valid (ldiag >= rdiag)
        if (newLdiag >= newRdiag) {
            selectPattern(newLdiag, newRdiag);
        }
    });
    
    // Append elements to wrapper and container
    gridWrapper.appendChild(colHeaders);
    gridWrapper.appendChild(mainGrid);
    container.appendChild(gridWrapper);
    
    // Select default pattern
    selectPattern(selectedLdiag, selectedRdiag);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        batUlzii,
        LineShape,
        createEndlessKnotPattern,
        createPatternGrid
    };
}

export const freehandsPage = {
    title: "FreeHands - WebApp",
    date: "May 25, 2026",
    theme: "theme-hypnospace",
    content: `
<center>
    <a href="https://github.com/jm-works/freehands" target="_blank" style="text-decoration: none;" alt="FreeHands">
        <img src="https://camo.githubusercontent.com/ef38d83fe456c84a2c72da95bed385dd381455c871b7120f94cad7e20c81cc33/68747470733a2f2f692e706f7374696d672e63632f5673345a4a6e76782f467265652d48616e64732e706e67" width="300" style="border: 4px solid #8A2BE2; border-radius: 5px; margin-bottom: 10px; image-rendering: pixelated;">
    </a>
    <h1 style="color: #8A2BE2; text-shadow: 2px 2px #000;">FreeHands</h1>
</center>

Welcome to **FreeHands**! 
A digital drawing WebApp built for those who believe that downloading 2GB of \`node_modules\` just to draw a simple line is a crime against humanity. This project is a love letter to the pure Canvas API and a direct attack on modern web development bloat.
<br>
---

### The Anti-Framework Crusade<br>
The goal was simple but masochistic: build a professional-grade drawing tool using absolutely NO UI frameworks, NO build steps, and NO compiling. Just pure, unadulterated code.<br><br>

* **The Motivation:** Prove that React, Vue, and Angular are not strictly necessary to build complex, state-heavy interfaces. Vanilla JavaScript is still alive and kicking.
* <span style="text-decoration: line-through red; text-decoration-thickness: 2px;">**The Suffering:** Implementing a custom layer compositing system from scratch via offscreen canvas, because real devs do their own math.</span>
<br>
---

### The Engine Under the Canvas<br>
To achieve peak Bob Ross levels of performance, I had to get my hands dirty:<br><br>

* **Fabric.js & perfect-freehand:** The only allowed external guests. Fabric acts as the object abstraction layer, while perfect-freehand generates smooth, pressure-sensitive brush strokes.
* **Manager-based Architecture:** Since I threw Redux out the window, the entire application state is controlled by isolated ES6 Modules (LayerManager, HistoryManager, etc.).
* **Command Pattern History:** Every stroke, color fill, and destructive pixel operation is saved in a robust Undo/Redo stack. You can always go back in time to fix that happy little accident.
* **Offscreen Compositing:** A custom rendering pipeline that merges layers off-screen before painting them to the main canvas. This allows for real blend modes without melting your CPU.
<br>
---

### Features to Unleash Your Inner Artist

1. **Dynamic Brushes:** Pressure sensitivity support for drawing tablets.
2. **Advanced Layer System:** Lock, hide, reorder, and blend layers like a pro.
3. **Selection & Transformation:** Move, scale, and rotate objects freely.
4. **Pure Native Speed:** Because there is no Virtual DOM bottleneck, drawing feels as smooth as butter on a hot pan.

<br>
<center>
    <a href="https://jm-works.github.io/freehands/" target="_blank" style="text-decoration: none; font-size: 16px; font-weight: bold; color: #FFF;">OPEN FREEHANDS APP</a>
    <br><br>
    <a href="https://github.com/jm-works/freehands" target="_blank" style="text-decoration: none;">
        ACCESS GITHUB REPOSITORY
    </a>
    <br><br>
    <i>Made by JM | José Matheus. \`npm install\` is for LOSERS.</i>
    <br><br>
</center>

<center style="margin-top: 20px; opacity: 0.6;">
    <img src="https://cyber.dabamos.de/88x31/js.gif">
    <img src="https://cyber.dabamos.de/88x31/321webmaster.gif">
</center>
    `
};
<div align="center">

<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/logo.png" width="140" style="image-rendering:pixelated">

```
ZezinOS 98 SE  //  Web Edition
```

[![Version](https://img.shields.io/badge/version-1.0.0-teal?style=flat-square&labelColor=000000)](https://zezinos.site/)
[![Status](https://img.shields.io/badge/status-living__project-lime?style=flat-square&labelColor=000000)](https://zezinos.site/)
[![Stack](https://img.shields.io/badge/stack-vanilla__js-yellow?style=flat-square&labelColor=000000)](https://github.com/jm-works/ZezinOS)
[![Frameworks](https://img.shields.io/badge/frameworks-zero-red?style=flat-square&labelColor=000000)](https://github.com/jm-works/ZezinOS)
[![Live](https://img.shields.io/badge/%E2%96%B6%20live-zezinos.site-cyan?style=flat-square&labelColor=000000)](https://zezinos.site/)

</div>

---

<div align="center">

```
+========================================+
|                                        |
|   >> CLICK TO LAUNCH ZEZINOS.SITE <<  |
|                                        |
+========================================+
```

### **[>> LAUNCH ZEZINOS.SITE <<](https://zezinos.site/)**

</div>

---

```
+---------------------------------------------------+
|  SYSTEM REPORT          ZEZIN@ZezinOS             |
|  ---------------------------------------------------
|  OS      : ZezinOS 98 SE  (Web Edition)           |
|  Host    : Your Browser                           |
|  Shell   : ZEZIN-DOS                              |
|  Theme   : ZezinOS 98 SE                          |
|  CPU     : 486DX2-66                              |
|  GPU     : ASCII Graphics Adapter                 |
|  Stack   : Vanilla JS / CSS3 / HTML5              |
|  Uptime  : since Feb 2026                         |
+---------------------------------------------------+
```

> *"The sky above the port was the color of television, tuned to a dead channel."*
> — William Gibson, Neuromancer, 1984

This is my portfolio. It runs in your browser.  
It has a boot screen, draggable windows, a terminal, a paint app,  
a minesweeper, a media player, a DOS emulator, a Waifu Viewer —  
and somewhere in there, my actual projects.  
It was built without React, without Vite, without npm.  
I don't know why I did this. I would do it again.

---

<div align="center">

```
[ DEMO VIDEO ]
```

[![▶ WATCH DEMO — ZezinOS 1.0](https://i.postimg.cc/Vkv0k2vj/desktop-busy.png)](https://www.youtube.com/watch?v=iYtTzi7Se0c)

```
^ click the image above to watch on YouTube ^
```

</div>

---

## Screenshots

<div align="center">

| Boot Sequence | Desktop |
|:---:|:---:|
| <img src="https://i.postimg.cc/J0ScQms8/Boot.png" width="400"> | <img src="https://i.postimg.cc/YSXXm5zf/desktop.png" width="400"> |

| Chaos Mode | ZEZIN-DOS |
|:---:|:---:|
| <img src="https://i.postimg.cc/Vkv0k2vj/desktop-busy.png" width="400"> | <img src="https://i.postimg.cc/3wpRyhTm/terminal.png" width="400"> |

</div>

---

## Installed Programs

```
C:\Programs> dir
```

<table>
<tr>
<td valign="top">

<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/zenzinDOS.svg" width="16"> **ZEZIN-DOS** — terminal. try `neofetch`. try `help`. do NOT try `surprise`.<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/zezinpaint.webp" width="16"> **ZezinPaint** — HTML5 canvas drawing tool<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/internet.png" width="16"> **Zezin Explorer** — internal browser + portfolio pages<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/mediaplayer.svg" width="16"> **Media Player** — SoundCloud integration<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/sobreMim.svg" width="16"> **About Me** — who is this guy<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/waifuviewer.svg" width="16"> **Waifu Viewer** — for science<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/patchnotes.svg" width="16"> **Patch Notes** — changelog, updated whenever I feel like it<br>

</td>
<td valign="top">

<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/dosgames.svg" width="16"> **DOS Games** — emulated classics<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/minewsweeper.png" width="16"> **Minesweeper** — you will lose<br>
<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/programs.svg" width="16"> **GTA Vice City** — mini-game<br>

<br>

<img src="https://i.postimg.cc/PqhG4nDy/paint.png" width="280">

</td>
</tr>
</table>

---

## How to Boot

ZezinOS uses ES Modules. `file://` won't work. Needs an HTTP server.

```
RECOMMENDED BOOT METHOD
------------------------
1. Install VS Code extension: "Live Server"
2. Right-click index.html
3. Select "Open with Live Server"
4. Wait for the BIOS screen

No npm. No install. No build pipeline.
Just a browser and a server.
```

---

## Architecture

| Layer | Technology | Notes |
|-------|-----------|-------|
| Logic | Vanilla JS (ES6+) | ES Modules, no bundler |
| Style | CSS3 + custom properties | Per-component stylesheets, theme vars |
| Windows | `windowFactory.js` + `windowManager.js` | Dynamic DOM, z-index stack |
| Rendering | Native DOM APIs | No virtual DOM, no overhead |
| Canvas | HTML5 Canvas API | ZezinPaint + CRT scanline overlay |
| Audio | Web Audio / `audioManager.js` | Centralized retro sound bus |

---

## Legal

Fan project. Aesthetic tribute. Not a product.

- **Microsoft** — Windows trademarks, sounds and visual design belong to Microsoft Corporation.
- **Icons & Assets** — Collected from public repositories for non-commercial, atmospheric use. No authorship claimed.

---

<div align="center">

```
+------------------------------------------+
|  Copyright (C) 1998-2026 JM-WORKS Inc.   |
|  The web as it was meant to be.          |
+------------------------------------------+
```

<img src="https://raw.githubusercontent.com/jm-works/ZezinOS/main/public/icons/github.svg" width="14"> [José Matheus](https://github.com/jm-works) — a living project, updated whenever the mood strikes.

</div>
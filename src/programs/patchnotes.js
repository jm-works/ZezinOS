import { createWindow } from '../modules/windowFactory.js';

const updates = [
    {
        version: "v1.0.1",
        date: "25/05/2026",
        changes: [
            "Full interface translated to English."
        ]
    },
    {
        version: "v1.0.0",
        date: "23/02/2026",
        changes: [
            "Bug fixes.",
            "Window optimization.",
            "Portfolio added.",
            "Finally, after almost 70 hours of work, I have the near-definitive version, thank you all for the support so far, the project will continue to have updates, but focused on bug fixes and very rarely, adding something, the pace will now be much slower, God willing."
        ]
    },
    {
        version: "v0.9.9",
        date: "22/02/2026",
        changes: [
            "Visual and audio fixes.",
            "Added 'My Projects'.",
            "Added conversion to HTML and markdown."
        ]
    },
    {
        version: "v0.9.7",
        date: "20/02/2026",
        changes: [
            "Added pseudo login screen.",
            "Reworked boot screen functionality.",
            "Visual update for windows.",
            "Added system sounds.",
            "Window optimization"
        ]
    },
    {
        version: "v0.9.5",
        date: "19/02/2026",
        changes: [
            "Added 'ZezinPaint'.",
            "Bug fixes."
        ]
    },
    {
        version: "v0.9.3",
        date: "15/02/2026",
        changes: [
            "Added Notepad.",
            "Visual improvements."
        ]
    },
    {
        version: "v0.9.0",
        date: "13/02/2026",
        changes: [
            "Finished the games function.",
            "Added 'Minesweeper'.",
            "Added 'GTA Vice City'.",
            "Added 'MS-DOS Games'.",
            "Reworked boot screen functionality.",
            "Visual improvements."
        ]
    },
    {
        version: "v0.8.5",
        date: "12/02/2026",
        changes: [
            "Site moved to GitHub Pages (Easier deployment).",
            "BOOT Screen",
            "Minor visual fix",
            "Added more commands to ZEZIN-DOS"
        ]
    },
    {
        version: "v0.8.0",
        date: "10/02/2026",
        changes: [
            "Added calculator.",
            "Visual fixes for some windows.",
            "Now it runs DOOM!",
            "Minor bug fixes."
        ]
    },
    {
        version: "v0.7.0",
        date: "08/02/2026",
        changes: [
            "Added filter feature in 'Display Properties' tab.",
            "Added 'Waifu Viewer' feature.",
            "Updated window logic.",
            "Minor bug fixes."
        ]
    },
    {
        version: "v0.6.0",
        date: "06/02/2026",
        changes: [
            "Added Media Player feature (Click 'File' and you can search for music on SoundCloud).",
        ]
    },
    {
        version: "v0.5.0",
        date: "05/02/2026",
        changes: [
            "Added Start Menu feature.",
            "Added wallpaper selection feature",
            'Fixed desktop spacing.',
            'Command "neofetch" added to ZEZIN-DOS.'
        ]
    },
    {
        version: "v0.3.0",
        date: "04/02/2026",
        changes: [
            "Folder system rework.",
            'Project hosted at <a href="https://zezinos.site/" target="_blank">ZezinOS site</a>.',
            'Added "Patch Notes" program to easily describe project updates.',
            'First public version.'
        ]
    },
    {
        version: "v0.2.0",
        date: "03/02/2026",
        changes: [
            "Implemented window Drag & Drop system.",
            'Added functional ZEZIN-DOS Terminal with commands.',
        ]
    }
];

export function renderPatchNotes() {
    const contentHTML = updates.map(update => `
        <div class="patch-entry">
            <h4 class="patch-version-title">
                ${update.version} <span class="patch-date">- ${update.date}</span>
            </h4>
            <ul class="patch-list">
                ${update.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
            <hr class="patch-separator">
        </div>
    `).join('');

    const menuHTML = `
        <div class="menu-item">File</div>
        <div class="menu-item">Edit</div>
        <div class="menu-item">Search</div>
        <div class="menu-item">Help</div>
    `;

    createWindow({
        id: 'window-patchnotes',
        title: 'Patch Notes',
        menuBar: menuHTML,
        content: `<div class="patch-notes-area">${contentHTML}</div>`,
        isCentered: true
    });
}
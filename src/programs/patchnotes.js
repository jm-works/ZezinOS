import {createWindow} from '../modules/windowFactory.js';

const updates = [
        {
        version: "v0.6.0",
        date: "06/02/2026",
        changes: [
            "Adicionado a feature de Media Player (Clique em 'Arquivo' e poderá pesquisar alguma música no SoundCloud).",
        ]
    },
    {
        version: "v0.5.0",
        date: "05/02/2026",
        changes: [
            "Adicionado a feature do Menu Iniciar (Start Menu).",
            "Adicionado a feature de selecionar wallpaper",
            'Corrigido espaçamento do desktop.',
            'Comando "neofetch" adicionado ao ZEZIN-DOS.'
        ]
    },
    {
        version: "v0.3.0",
        date: "04/02/2026",
        changes: [
            "Reformulação do sistema de pastas.",
            'Hospetagem do projeto em <a href="https://zezinos.site/" target="_blank">ZezinOS site</a>.',
            'Adicionado o programa "Patch Notes" para facilitar a descrição das atualizações do projeto.',
            'Primeira versão a ser pública.'
        ]
    },
    {
        version: "v0.2.0",
        date: "03/02/2026",
        changes: [
            "Implementado sistema de arrastar janelas (Drag & Drop).",
            'Adicionado Terminal ZEZIN-DOS funcional com comandos.',
        ]
    }
];

export function renderPatchNotes() {
    const contentHTML = updates.map(update => `
        <div class="patch-entry">
            <h4 style="margin-bottom: 5px; color: var(--win-blue);">
                ${update.version} <span style="color: #000; font-weight: normal;">- ${update.date}</span>
            </h4>
            <ul style="list-style-type: square; margin-left: 20px; margin-bottom: 15px;">
                ${update.changes.map(change => `<li style="margin-bottom: 2px;">${change}</li>`).join('')}
            </ul>
            <hr style="border: 0; border-top: 1px solid var(--border-dark); border-bottom: 1px solid var(--border-light); margin-bottom: 15px;">
        </div>
    `).join('');

    const menuHTML = `
        <div class="menu-item">Arquivo</div>
        <div class="menu-item">Editar</div>
        <div class="menu-item">Formatar</div>
        <div class="menu-item">Exibir</div>
        <div class="menu-item">Ajuda</div>
    `;

    createWindow({
        id: 'window-patchnotes',
        title: 'Patch Notes - Bloco de Notas',
        menuBar: menuHTML,
        content: `<div style="font-family: 'Courier New', monospace; font-size: 13px;">${contentHTML}</div>`,
        isCentered: true
    });
}
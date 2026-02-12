import {createWindow} from '../modules/windowFactory.js';

const updates = [
    {
        version: "v0.8.5",
        date: "12/02/2026",
        changes: [
            "Site passado para o GitHub Pages (Facilidade para Deploy).",
            "Tela de BOOT",
            "Pequena correção visual",
            "Adicionado mais comandos no ZEZIN-DOS"
        ]
    },
    {
        version: "v0.8.0",
        date: "10/02/2026",
        changes: [
            "Adicionado calculadora.",
            "Correção visual de algumas janelas.",
            "Agora roda DOOM!",
            "Correção de pequenos erros."
        ]
    },
    {
        version: "v0.7.0",
        date: "08/02/2026",
        changes: [
            "Adicionado a feature de filtro na aba de 'Propriedades de Video'.",
            "Adicionado a feature de 'Waifu Viewer'.",
            "Atualizado a lógica das janelas.",
            "Correção de pequenos erros."
        ]
    },
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
        <div class="menu-item">Arquivo</div>
        <div class="menu-item">Editar</div>
        <div class="menu-item">Pesquisar</div>
        <div class="menu-item">Ajuda</div>
    `;

    createWindow({
        id: 'window-patchnotes',
        title: 'Patch Notes',
        menuBar: menuHTML,
        content: `<div class="patch-notes-area">${contentHTML}</div>`,
        isCentered: true
    });
}
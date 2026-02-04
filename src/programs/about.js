import { createWindow } from '../modules/windowFactory.js';

export function renderAbout() {
    const menuHTML = `
        <div class="menu-item">Arquivo</div>
        <div class="menu-item">Editar</div>
        <div class="menu-item">Pesquisar</div>
        <div class="menu-item">Ajuda</div>
    `;

    const bodyHTML = `
        <h3 style="margin-bottom: 10px;">Quem sou eu?</h3>
        <p>Olá! Me chamo José Matheus e sou estudante de Ciência da Computação na Universidade Tiradentes - UNIT (4º período).</p>
        <br>
        <p><strong>Estudando:</strong> Python, HTML/CSS/JavaScript e Java.</p>
        <p><strong>Hobbies:</strong> Design e Jogos.</p>
        <p><strong>Mais projetos & contatos:</strong> <a href="https://github.com/jm-works" target="_blank">jm-works</a></p>
    `;

    createWindow({
        id: 'window-about',
        title: 'Sobre Mim',
        menuBar: menuHTML,
        content: bodyHTML,
        isCentered: false
    });
}
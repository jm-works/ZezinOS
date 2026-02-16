import { createWindow } from '../modules/windowFactory.js';

export function renderAbout() {
    const menuHTML = `
        <div class="menu-item">Arquivo</div>
        <div class="menu-item">Editar</div>
        <div class="menu-item">Pesquisar</div>
        <div class="menu-item">Ajuda</div>
    `;

    const bodyHTML = `
    <div class="md-content">
            <h1>Sobre Mim</h1>
            
            <h3>Quem sou eu?</h3>
            <br>
            <p>Olá, me chamo José Matheus, sou um desenvolvedor apaixonado pela <i>estética retrô</i> e interfaces nostálgicas.</p>

            <hr>

            <h3>Quais as minhas habilidades?</h3>
            <br>
            <ul>
                <li><b>Frontend:</b> HTML5, CSS3, JavaScript (ES6+)</li>
                <li><b>Backend:</b> Java, Python</li>
                <li><b>Design:</b> Photoshop</li>
            </ul>

            <hr>

            <h3>Meus Contatos</h3>
            <br>
            <ul>
                <li>
                    <a href="mailto:jmatheus_vida@outlook.com">Email</a>
                </li>
                <li>
                    <a href="https://github.com/jm-works" target="_blank">GitHub</a>
                </li>
            </ul>
            
            <br>
            <p style="text-align: center; color: #888; font-size: 12px;">
                <i>Feito com 💙 por JM | José Matheus</i>
            </p>
        </div>
    `;

    createWindow({
        id: 'window-about',
        title: 'Sobre Mim',
        menuBar: menuHTML,
        content: bodyHTML,
        isCentered: false
    });
}
import { createWindow } from '../modules/windowFactory.js';

export function renderAbout() {
    const menuHTML = `
        <div class="menu-item">File</div>
        <div class="menu-item">Edit</div>
        <div class="menu-item">Search</div>
        <div class="menu-item">Help</div>
    `;

    const bodyHTML = `
    <div class="md-content">
            <h1>About Me</h1>
            
            <h3>Who am I?</h3>
            <br>
            <p>Hello, my name is José Matheus, I am a developer passionate about <i>retro aesthetics</i> and nostalgic interfaces.</p>

            <hr>

            <h3>What are my skills?</h3>
            <br>
            <ul>
                <li><b>Frontend:</b> HTML5, CSS3, JavaScript (ES6+)</li>
                <li><b>Backend:</b> Java, Python</li>
                <li><b>Design:</b> Photoshop</li>
            </ul>

            <hr>

            <h3>My Contacts</h3>
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
                <i>Made with 💙 by JM | José Matheus</i>
            </p>
        </div>
    `;

    createWindow({
        id: 'window-about',
        title: 'About Me',
        menuBar: menuHTML,
        content: bodyHTML,
        isCentered: false
    });
}
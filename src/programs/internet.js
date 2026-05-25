import { createWindow } from '../modules/windowFactory.js';
import { playSound } from '../modules/audioManager.js';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

import { homePage } from './internet_pages/home.js';
import { zezinosPage } from './internet_pages/zezinos.js';
import { catalogoPage } from './internet_pages/catalogo.js';
import { deneasyPage } from './internet_pages/deneasy.js';
import { pokedexPage } from './internet_pages/pokedex.js';
import { registroJogosPage } from './internet_pages/registroJogos.js'

const routes = {
    'home': homePage,
    'zezinos': zezinosPage,
    'catalogo': catalogoPage,
    'deneasy': deneasyPage,
    'pokedex': pokedexPage,
    'registroJogos': registroJogosPage,
};

let history = [];
let currentIndex = -1;

const renderLayout = (pageData) => {
    let rawContent = pageData.content || '';

    let cleanContent = rawContent.replace(/^[ \t]+/gm, '');

    cleanContent = cleanContent.replace(/(>)\n+(?=[^<\n])/g, '$1\n\n');

    return `
        <div class="blog-layout">
            <div class="blog-sidebar">
                <center>
                    <img src="./src/assets/profile/profile.jpg" width="90" style="border: 3px outset #ccc;">
                    <br><br><b>${pageData.theme === 'theme-hypnospace' ? '<span class="blink">X_Zezin_X</span>' : 'José Matheus'}</b>
                </center>
                <br>
                <h3>Navigation</h3>
                <a href="home">Home</a>
                <a href="catalogo">Catalog</a>
                <a href="zezinos">ZezinOS</a>
                <br>
                <h3>Webring</h3>
                <center>
                    <img src="https://win98icons.alexmeub.com/icons/png/chm-0.png" width="32">
                </center>
            </div>
            <div class="blog-content">
                <div class="blog-post-card">
                    <span class="blog-date">Updated on: ${pageData.date}</span>
                    <div class="markdown-body">
                        ${pageData.theme === 'theme-directory'
            ? cleanContent
            : marked.parse(cleanContent, { breaks: true, gfm: true })}
                    </div>
                </div>
            </div>
        </div>
    `;
};

const loadPage = (pageId, isHistoryNav = false) => {
    const windowElement = document.getElementById('window-internet');
    const viewport = document.getElementById('ie-viewport');
    const addressInput = document.getElementById('ie-address');
    const statusText = document.getElementById('ie-status-text');
    const throbber = document.getElementById('ie-throbber');
    const btnBack = document.getElementById('ie-back');
    const btnForward = document.getElementById('ie-forward');

    if (!viewport) return;
    if (windowElement && windowElement.style.visibility !== 'hidden') {
        playSound('click');
    }

    statusText.textContent = `Looking for host zezin.web...`;
    throbber.classList.add('loading');

    setTimeout(() => {
        const pageData = routes[pageId] || routes['home'];

        viewport.className = `ie-viewport ${pageData.theme}`;

        let existingTheme = document.getElementById('dynamic-page-theme');
        if (existingTheme) existingTheme.remove();

        if (pageData.theme && pageData.theme !== '') {
            const link = document.createElement('link');
            link.id = 'dynamic-page-theme';
            link.rel = 'stylesheet';
            link.href = `./src/styles/pages/${pageData.theme}.css`;
            document.head.appendChild(link);
        }

        viewport.innerHTML = renderLayout(pageData);

        setTimeout(() => {
            viewport.scrollTop = 0;
        }, 10);

        viewport.querySelectorAll('.markdown-body a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('http') && !href.includes('zezin.web')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });

        if (typeof pageData.init === 'function') {
            pageData.init();
        }

        addressInput.value = `http://zezin.web/${pageId}.htm`;
        statusText.textContent = 'Done';
        throbber.classList.remove('loading');

        if (!isHistoryNav) {
            history = history.slice(0, currentIndex + 1);
            history.push(pageId);
            currentIndex++;
        }

        if (currentIndex > 0) btnBack.removeAttribute('disabled');
        else btnBack.setAttribute('disabled', 'true');

        if (currentIndex < history.length - 1) btnForward.removeAttribute('disabled');
        else btnForward.setAttribute('disabled', 'true');

    }, 300);
};

export function renderInternet() {

    if (document.getElementById('window-internet')) {
        history = [];
        currentIndex = -1;

        const addressInput = document.getElementById('ie-address');
        const btnGo = document.getElementById('ie-go');

        if (addressInput && btnGo) {
            addressInput.value = 'http://zezin.web/home.htm';

            setTimeout(() => {
                btnGo.click();
            }, 50);
        }
        return;
    }

    const contentHTML = `
        <div class="ie-app-container">
            <div class="ie-header">
                <div class="ie-toolbar-row">
                    <div class="ie-drag-handle"></div>
                    <div class="ie-buttons-group">
                        <button class="ie-tool-btn" id="ie-back" disabled>
                            <span class="ie-icon">⬅</span>
                            <span class="ie-label">Back</span>
                        </button>
                        <button class="ie-tool-btn" id="ie-forward" disabled>
                            <span class="ie-icon">➡</span>
                            <span class="ie-label">Forward</span>
                        </button>
                        <button class="ie-tool-btn" id="ie-stop">
                            <span class="ie-icon">❌</span>
                            <span class="ie-label">Stop</span>
                        </button>
                        <button class="ie-tool-btn" id="ie-refresh">
                            <span class="ie-icon">🔄</span>
                            <span class="ie-label">Refresh</span>
                        </button>
                        <button class="ie-tool-btn" id="ie-home">
                            <span class="ie-icon">🏠</span>
                            <span class="ie-label">Home</span>
                        </button>
                    </div>
                    <div class="ie-throbber" id="ie-throbber"></div>
                </div>

                <div class="ie-address-row">
                    <div class="ie-drag-handle-small"></div>
                    <div class="ie-address-label">Address</div>
                    <input type="text" id="ie-address" value="http://zezin.web/home.htm" spellcheck="false">
                    <button class="os-btn ie-go-btn" id="ie-go">Go</button>
                </div>
            </div>

            <div class="ie-viewport" id="ie-viewport"></div>

            <div class="ie-status-bar">
                 <div class="ie-status-zone" id="ie-status-text" style="flex: 1;">Done</div>
                 <div class="ie-status-zone" style="width: 120px; border-left: none;">
                     <img src="https://win98icons.alexmeub.com/icons/png/world-0.png" width="14" style="margin-right: 4px;"> Internet
                 </div>
            </div>
        </div>
    `;

    createWindow({
        id: 'window-internet',
        title: 'My Projects',
        content: contentHTML,
        isCentered: true
    });

    const viewport = document.getElementById('ie-viewport');
    const addressInput = document.getElementById('ie-address');
    const statusText = document.getElementById('ie-status-text');
    const throbber = document.getElementById('ie-throbber');
    const btnGo = document.getElementById('ie-go');

    viewport.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && link.getAttribute('target') !== '_blank') {
                e.preventDefault();
                loadPage(href);
            }
        }
    });

    document.getElementById('ie-home').addEventListener('click', () => loadPage('home'));

    document.getElementById('ie-refresh').addEventListener('click', () => {
        if (currentIndex >= 0) loadPage(history[currentIndex], true);
    });

    document.getElementById('ie-back').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            loadPage(history[currentIndex], true);
        }
    });

    document.getElementById('ie-forward').addEventListener('click', () => {
        if (currentIndex < history.length - 1) {
            currentIndex++;
            loadPage(history[currentIndex], true);
        }
    });

    document.getElementById('ie-stop').addEventListener('click', () => {
        playSound('click');
        statusText.textContent = 'Stopped';
        throbber.classList.remove('loading');
    });

    btnGo.addEventListener('click', () => {
        let url = addressInput.value.replace('http://zezin.web/', '').replace('.htm', '').trim();
        if (url) loadPage(url);
    });

    addressInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnGo.click();
    });

    history = [];
    currentIndex = -1;
    loadPage('home');
}
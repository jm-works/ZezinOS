export function initLogin() {
    return new Promise((resolve) => {
        const loginScreen = document.createElement('div');
        loginScreen.id = 'login-screen';
        
        const userIconSVG = `./src/assets/profile/profile.jpg`;

        loginScreen.innerHTML = `
            <div class="login-window">
                <div class="login-header">
                    <div class="login-title-text">Logon</div>
                    <div class="login-controls">
                        <button aria-label="Close">✕</button>
                    </div>
                </div>

                <div class="login-body">
                    <div class="login-banner">
                        <div class="login-banner-text"><b>ZezinOS</b> 98 SE</div>
                    </div>
                    
                    <div class="login-content">
                        <div class="login-icon-area">
                            <img src="${userIconSVG}" alt="User">
                        </div>
                        <div class="login-inputs">
                            <div class="login-row">
                                <label>Nome de usuário:</label>
                                <input type="text" value="Zezin" id="login-user" readonly>
                            </div>
                            <div class="login-row">
                                <label>Senha:</label>
                                <input type="password" id="login-pass" autofocus placeholder="Aperte OK para avançar">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="login-footer">
                    <button class="login-btn" id="btn-login-ok">OK</button>
                    <button class="login-btn" id="btn-login-cancel">Cancelar</button>
                </div>
            </div>
        `;

        document.body.appendChild(loginScreen);

        const inputPass = document.getElementById('login-pass');
        const btnOk = document.getElementById('btn-login-ok');
        
        setTimeout(() => inputPass.focus(), 100);

        const startFadeOut = (durationInSeconds) => {
            const windowElement = loginScreen.querySelector('.login-window');
            
            loginScreen.style.transition = `all ${durationInSeconds}s ease-in-out`;
            if (windowElement) {
                windowElement.style.transition = `all ${durationInSeconds}s ease-in-out`;
            }
            
            requestAnimationFrame(() => {
                loginScreen.style.opacity = '0';
                loginScreen.style.backdropFilter = 'blur(0px)'; 
                
                if (windowElement) {
                    windowElement.style.transform = 'scale(1.15)';
                    windowElement.style.filter = 'blur(4px)';
                }
            });
            
            setTimeout(() => {
                loginScreen.remove();
                resolve(); 
            }, durationInSeconds * 1000); 
        };

        const doLogin = () => {
            inputPass.disabled = true;
            btnOk.disabled = true;
            
            const audio = new Audio('src/assets/sounds/login.mp3'); 
            
            const playAndFade = () => {
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play error:", e));
                
                const fadeTime = (audio.duration && isFinite(audio.duration)) ? audio.duration : 2;
                startFadeOut(fadeTime);
            };

            audio.addEventListener('loadedmetadata', playAndFade, { once: true });

            audio.onerror = () => {
                console.log("Som de login não encontrado.");
                const bootAudio = new Audio('src/assets/sounds/boot.mp3');
                bootAudio.volume = 0.5;
                bootAudio.play().catch(() => {});
                
                startFadeOut(0.8);
            };
        };

        btnOk.addEventListener('click', doLogin);

        inputPass.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doLogin();
        });
        
        document.getElementById('btn-login-cancel').onclick = () => {
            inputPass.value = '';
            inputPass.focus();
        };
        
        document.querySelector('.login-controls button').onclick = () => {
             inputPass.value = '';
        };
    });
}
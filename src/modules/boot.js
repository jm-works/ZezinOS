export function runBootSequence(onComplete) {
    const screen = document.getElementById('boot-screen');
    const memDisplay = document.getElementById('bios-mem');
    const footer = document.getElementById('bios-footer');

    const header = screen.querySelector('.bios-header');
    const info = screen.querySelector('.bios-info');
    const drives = screen.querySelector('.bios-drives');
    const cursor = screen.querySelector('.bios-cursor');
    
    const totalMem = 16384;
    let currentMem = 0;
    const warmUpTime = 1000;

    const audio = new Audio('src/assets/sounds/boot.mp3');
    audio.volume = 0.5;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Autoplay bloqueado. Aguardando interação...");
            showClickToStart(audio);
        }).then(() => {
            if (!audio.paused) {
                startWarmUpSequence();
            }
        });
    }

    function startWarmUpSequence() {
        setTimeout(() => {
            header.style.visibility = 'visible';
            
            setTimeout(() => {
                info.style.visibility = 'visible';
                startMemoryCheck();
            }, 600);

        }, warmUpTime);
    }

    function startMemoryCheck() {
        const memInterval = setInterval(() => {
            currentMem += 256; 
            if (currentMem >= totalMem) {
                currentMem = totalMem;
                memDisplay.innerText = currentMem + "K OK";
                clearInterval(memInterval);
                
                setTimeout(() => {
                    drives.style.visibility = 'visible';
                    
                    setTimeout(() => {
                        if(footer) {
                            footer.style.visibility = 'visible';
                        }
                        cursor.style.visibility = 'visible'; 
                        
                        setTimeout(finishBoot, 1500); 
                    }, 1000); 
                }, 400);

            } else {
                memDisplay.innerText = currentMem;
            }
        }, 10);
    }

    function showClickToStart(audioElement) {
        const msg = document.createElement('div');
        msg.style.position = 'absolute';
        msg.style.top = '50%';
        msg.style.left = '50%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.color = '#666'; 
        msg.style.fontFamily = "'Courier New', monospace";
        msg.style.fontSize = '14px';
        msg.style.visibility = 'visible';
        msg.style.animation = "blink 1s infinite";
        msg.innerText = "PRESSIONE QUALQUER BOTÃO...";
        screen.appendChild(msg);

        const start = () => {
            msg.remove(); 
            audioElement.play();
            startWarmUpSequence(); 
            
            window.removeEventListener('keydown', start);
            window.removeEventListener('click', start);
        };

        window.addEventListener('keydown', start);
        window.addEventListener('click', start);
    }

    function finishBoot() {
        screen.classList.add('boot-fade-out');
        setTimeout(() => {
            screen.remove();
            if (onComplete) {
                onComplete();
            }
        }, 500);
    }
}
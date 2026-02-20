const sounds = {
    click: new Audio('src/assets/sounds/click.mp3'),
    window: new Audio('src/assets/sounds/window.mp3'),
};

Object.values(sounds).forEach(audio => audio.volume = 0.5);

export function playSound(type) {
    const sound = sounds[type];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}
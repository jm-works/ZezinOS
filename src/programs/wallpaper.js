const wallpapers = [
    { 
        id: 'win98', 
        name: 'Clássico (Zezin OS)', 
        style: 'background-color: #008080; background-image: none;' 
    },
    { 
        id: 'clouds', 
        name: 'Nuvens - Microsoft', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp2807966.jpg"); background-size: cover;' 
    },
    { 
        id: 'megera', 
        name: 'Solidão de Megera', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp4307675.jpg"); background-size: cover;' 
    },
    { 
        id: 'neko', 
        name: 'Neko Neko', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp5078797.jpg"); background-size: cover;' 
    },
    { 
        id: 'night', 
        name: 'Night City', 
        style: 'background-image: url("https://raw.githubusercontent.com/this-fifo/vaporwave-theme-vscode/refs/heads/master/vaporwaveisnotdead.png"); background-size: cover;' 
    },
    { 
        id: 'eva', 
        name: 'Evangelion', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp4307544.png"); background-size: cover;' 
    },
    { 
        id: 'gameBoy', 
        name: 'Game Boy Arcano', 
        style: 'background-image: url("https://i.postimg.cc/VvWgCJ93/08-(1).png"); background-size: cover;' 
    }, 
    {
        id: 'mei', 
        name: 'Mei - Overwatch', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp5078793.jpg"); background-size: cover;' 
    },
    {
        id: '64', 
        name: 'N64', 
        style: 'background-image: url("https://i.postimg.cc/HWcyKcf9/17.jpg"); background-size: cover;' 
    },
    {
        id: 'water', 
        name: 'Waterwave', 
        style: 'background-image: url("https://i.postimg.cc/858SzYzB/32.jpg"); background-size: cover;' 
    },
    {
        id: 'megumin', 
        name: 'Megumin', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp1895678.jpg"); background-size: cover;' 
    },
    {
        id: 'win95', 
        name: 'Windows 95 CRT - Microsoft', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp1895686.jpg"); background-size: cover;' 
    },
    {
        id: 'eyes', 
        name: 'Look at my eyes', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp6274450.jpg"); background-size: cover;' 
    },
];

let selectedWallpaperStyle = wallpapers[0].style;

export function renderWallpaper() {
    const listElement = document.getElementById('wallpaper-list');
    const previewScreen = document.getElementById('wallpaper-preview-screen');
    
    listElement.innerHTML = '';

    wallpapers.forEach((wp, index) => {
        const li = document.createElement('li');
        li.innerText = wp.name;
        li.dataset.style = wp.style;
        
        if (index === 0) li.classList.add('selected');

        li.onclick = () => {
            document.querySelectorAll('.wp-list li').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
            
            selectedWallpaperStyle = wp.style;
            updatePreview(previewScreen, wp.style);
        };

        listElement.appendChild(li);
    });

    window.applyWallpaper = () => {
        const desktop = document.querySelector('.desktop-area');
        if (desktop) {
            desktop.style = ''; 
            desktop.style.cssText = selectedWallpaperStyle + ' background-position: center center;';
        }
    };
}

function updatePreview(element, styleString) {
    element.style = '';
    element.style.cssText = styleString;
}
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;

// FUNCIONES
const showPostModal = () => {
    MAIN.style.display = "none";
    MODAL_POST.style.display = "block";
    setTimeout(() => {
        MODAL_POST.style.transform = "translateY(0)";
    }, 1);
};

const closePostModal = () => {
    MAIN.style.display = "block";
    MODAL_POST.style.transform = "translateY(100vh)";
};

// Cuando se carga el DOM
window.addEventListener('load', () => {
    MAIN = document.querySelector('#main');
    MODAL_POST = document.querySelector('#modal-post-section');
    BTN_SHOW_POST = document.querySelector('#btn-add-post');
    BTN_SHOW_POST.addEventListener('click', showPostModal);

    BTN_CANCEL_POST = document.querySelector('#btn-post-cancel');
    BTN_CANCEL_POST.addEventListener('click', closePostModal);

    if('serviceWorker' in navigator) {
        const res = navigator.serviceWorker.register('/sw.js');
        if(res){
            console.log('Service Worker registered successfully');
        }
    }
});

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeInstallPrompt event fired');
    e.preventDefault();
    deferredPrompt = e;
});

const bannerInstall = document.getElementById('banner-install');

bannerInstall.addEventListener('click', async () => {
    console.log('Install button clicked');
    if(deferredPrompt) {
        deferredPrompt.prompt();
        const response = await deferredPrompt.userChoice;
        if(response.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {

    const profileCards = document.querySelectorAll('.profile-card');
    const profileScreen = document.getElementById('profile-screen');
    const mainApp = document.getElementById('main-app');

    profileCards.forEach(card => {
        card.addEventListener('click', () => {
            profileScreen.style.display = 'none';
            mainApp.style.display = 'block';
            mainApp.style.animation = "fadeIn 1s";
        });
    });

    const playBtn = document.querySelector('.hero-banner .btn-light');
    const infoBtn = document.querySelector('.hero-banner .btn-secondary');
    
    if(playBtn) playBtn.onclick = () => alert("▶ Playing Stranger Things...");
    if(infoBtn) infoBtn.onclick = () => alert("ℹ️ STRANGER THINGS\n\nRating: TV-14");

    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        let playTimeout;
        const video = card.querySelector('video');

        card.addEventListener('mouseenter', () => {
            if (!video) return;
            
            playTimeout = setTimeout(() => {
                card.classList.add('is-playing');
                let playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented by browser.", error);
                    });
                }
            }, 800);
        });

        card.addEventListener('mouseleave', () => {
            if (!video) return;
            
            clearTimeout(playTimeout);
            card.classList.remove('is-playing');
            video.pause();
            video.currentTime = 0;
        });
    });
});
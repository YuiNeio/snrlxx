document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    var swiper = new Swiper('.premium-user-scroll', {
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 1,
            }
        }
    });

    // Visitor count logic
    const visitorCountElement = document.getElementById('visitor-count');
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    visitorCountElement.textContent = visitorCount;

    // Countdown logic
    function updateCountdown() {
        const targetDate = new Date('2024-08-17T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30)); // Approximate months
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365)); // Approximate years

        document.getElementById('days').querySelector('p').innerText = days.toString().padStart(2, '0');
        document.getElementById('months').querySelector('p').innerText = months.toString().padStart(2, '0');
        document.getElementById('years').querySelector('p').innerText = years.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerText = "Update sudah datang!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Function to view image in modal
    const images = document.querySelectorAll('.profile-image');
    images.forEach(image => {
        image.addEventListener('click', () => {
            viewImage(image.src);
        });
    });
});

function viewImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = src;
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}
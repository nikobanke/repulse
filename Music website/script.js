document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Check if the required elements exist before running the script
    if (!track || !prevBtn || !nextBtn) {
        console.warn("Carousel elements not found. Script disabled.");
        return;
    }

    let currentPosition = 0;
    const slideCard = document.querySelector('.slide');
    
    // Check if a slide element exists to calculate width
    if (!slideCard) {
        console.warn("No slide elements found. Carousel disabled.");
        return;
    }
    
    // Get width of one slide + its margins once the page is fully loaded
    const slideStyle = window.getComputedStyle(slideCard);
    const slideWidth = slideCard.offsetWidth + 
                       parseInt(slideStyle.marginLeft) + 
                       parseInt(slideStyle.marginRight);

    // Function to move the carousel track
    function moveTrack(direction) {
        const trackWidth = track.scrollWidth;
        const windowWidth = document.querySelector('.carousel-window').offsetWidth;
        
        // Calculate the maximum negative scroll position before hitting the end
        const maxScroll = -(trackWidth - windowWidth);

        if (direction === 'next') {
            // Move left
            currentPosition -= slideWidth;
            
            // Loop back to start if we go past the end
            // We use a small buffer (10px) to handle fractional pixel rendering issues
            if (currentPosition < (maxScroll - 10)) {
                currentPosition = 0;
            }
        } else {
            // Move right
            currentPosition += slideWidth;
            
            // Loop to the end if we try to go past the start (position 0)
            if (currentPosition > 0) {
                currentPosition = maxScroll; 
            }
        }
        
        // Apply the translation
        track.style.transform = `translateX(${currentPosition}px)`;
    }

    // --- EVENT LISTENERS ---
    nextBtn.addEventListener('click', () => {
        moveTrack('next');
        resetTimer(); // Reset auto-scroll timer when user interacts
    });

    prevBtn.addEventListener('click', () => {
        moveTrack('prev');
        resetTimer();
    });

    // --- AUTO SCROLL LOGIC ---
    let autoScroll = setInterval(() => {
        moveTrack('next');
    }, 3000); // Auto-scroll every 3 seconds

    function resetTimer() {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            moveTrack('next');
        }, 3000);
    }
});
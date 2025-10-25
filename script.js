const featuredSection = document.querySelector('.featured-recipes');

const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry=>{
        if (entry.isIntersecting) {
            featuredSection.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

observer.observe(featuredSection);

window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("loader").classList.add("hidden");
    }, 2700); // 2700ms - 2.7s 
});

function scrollToBottom(duration = 1900) {
    const start = window.scrollY;
    const end = document.body.scrollHeight - window.innerHeight;
    const distance = end - start;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5 
        ? 2 * progress * progress: -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, start + distance * ease);

        if (elapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    } 

    requestAnimationFrame(scrollStep);
}

function scrollToPosition(targetY, duration = 1900) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + distance * ease);

        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function handleScrollCue() {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
    if (atBottom) {
        scrollToPosition(0); // Scrolls to the top
    } else {
        scrollToPosition(document.body.scrollHeight); // Scrolls to the bottom
    }
}

window.addEventListener("scroll", function() {
    const cue = document.getElementById("scrollCue");
    const atBottom = window.innerHeight + this.window.scrollY >= document.body.scrollHeight - 10;
    cue.textContent = atBottom ? "⬆" : "⬇";
});


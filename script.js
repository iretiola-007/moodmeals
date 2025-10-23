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
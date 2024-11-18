
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Adds underline for a clicked link in the top navbar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove the active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add the active class to the clicked link
            link.classList.add('active');
        });
    });
});
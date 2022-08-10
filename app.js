const toggler = document.querySelector('.toggler');
const navMenu = document.querySelector('.nav-links');

toggler.addEventListener('click', ()=>{
    navMenu.classList.toggle("active");
});

const navLinks = document.querySelectorAll('.nav-link');
console.log(navLinks);

for(const navLink of navLinks){
    navLink.addEventListener('click', ()=>{
        navMenu.classList.remove("active");
    });
}
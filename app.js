//nav-bar:
const toggler = document.querySelector('.toggler');
const navMenu = document.querySelector('.nav-links');

toggler.addEventListener('click', ()=>{
    navMenu.classList.toggle("active");
});

const navLinks = document.querySelectorAll('.nav-link');
for(const navLink of navLinks){
    navLink.addEventListener('click', ()=>{
        navMenu.classList.remove("active");
    });
}


//sorting using sort() method:
const names = [
    {
        "name": "Blood of zeus",
        "image": "zeus.png"
    },
    {
        "name": "Naruto",
        "image": "naruto.jpg"
    },
    {
        "name": "Demon slayer",
        "image": "slayer.jpeg"
    },
    {
        "name": "One piece",
        "image": "one-piece.jpeg"
    },
    {
        "name": "Anime girl",
        "image": "anime-girl.jpg"
    },{
        "name": "Yasuke",
        "image": "yasuke.jpeg"
    }
];

const myOutput = document.querySelector('.contents');

var output = "";
for(let personName of names){
    output+=`
    <div class="animes">
        <img src="${personName["image"]}"/>
        <p class="name">${personName["name"]}</p>
    </div>`;
};

myOutput.innerHTML = output;

var sorted = names.sort((a, b)=>{
    if(a.name < b.name){
        return -1;
    }
    if(a.name > b.name){
        return 1;
    }
    return 0;
});

var output2 = "";
for(sortedName of names){
    output2+=`
    <div class="animes">
        <img src="${sortedName["image"]}"/>
        <p class="name">${sortedName["name"]}</p>
    </div>`;
};
console.log(output2);

const sortButton = document.querySelector('.sort');
sortButton.addEventListener("click", ()=>{
    myOutput.innerHTML = output2;
});


import { annotate, annotationGroup } from "https://unpkg.com/rough-notation?module";

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
        "image": "zeus.png",
        "link": "https://www.netflix.com/ke/title/81001988?source=35"
    },
    {
        "name": "Naruto",
        "image": "naruto.jpg",
        "link": "https://www.youtube.com/watch?v=Y9P1EhndE0w"
    },
    {
        "name": "Demon slayer",
        "image": "slayer.jpeg",
        "link": "https://www.imdb.com/video/vi2476588825/?ref_=tt_vi_i_1"
    },
    {
        "name": "One piece",
        "image": "one-piece.jpeg",
        "link": "https://www.youtube.com/watch?v=-3g8Nnehdao"
    },
    {
        "name": "Anime girl",
        "image": "anime-girl.jpg",
        "link": "https://www.bilibili.tv/en/video/2049239198"
    },
    {
        "name": "Inuyasha",
        "image": "inuyasha.jpg",
        "link": "https://www.youtube.com/watch?v=UCFBsLagBPk"
    },
    {
        "name": "Fate",
        "image": "fate.jpg",
        "link": "https://www.youtube.com/watch?v=NPItqNsCXM4"
    },
    {
        "name": "Bleach",
        "image": "bleach.jpg",
        "link": "https://www.youtube.com/watch?v=iutQJzAXiWo"
    },
    
];

const myOutput = document.querySelector('.contents');

var output = "";
for(let personName of names){
    output+=`
    <div class="animes">
        <img src="${personName["image"]}"/>
        <p class="name">${personName["name"]}</p>
        <a class="watch" href="${personName.link}">Watch</a>
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
for(let sortedName of names){
    output2+=`
    <div class="animes">
        <img src="${sortedName["image"]}"/>
        <p class="name">${sortedName["name"]}</p>
        <a class="watch" href="${sortedName["link"]}">Watch</a>
    </div>`;
};

const sortButton = document.querySelector('.sort');
sortButton.addEventListener("click", ()=>{
    myOutput.innerHTML = output2;
});


//header
const myQuote = document.createElement('p');
const parentEl = document.querySelector('.background-contents');
myQuote.innerHTML = "“Those who stand at the top determine what’s wrong and what’s right! This very place is neutral ground! Justice will prevail, you say? But, of course, it will! Whoever wins this war becomes justice!” ";
myQuote.classList.add("quote")
parentEl.appendChild(myQuote);


const header = document.querySelector('.tittle');
const a1 = annotate(header, {type: 'highlight', color: 'red'});
const a2 = annotate(myQuote, {type: 'underline', color: 'red'});

const ag = annotationGroup([a1, a2]);
ag.show();

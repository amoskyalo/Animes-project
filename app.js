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
};




//sorting using sort() method:
const first_display_animes = [
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

const first_output_animes = first_display_animes.map((first_display) =>{
    const first_img = first_display.image;
    const first_name = first_display.name;
    const first_link = first_display.link;

    const initial_anime_output = `
        <div class="animes">
            <img src="${first_img}"/>
            <p class="name">${first_name}</p>
            <a href="${first_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
        </div>`

    myOutput.innerHTML+=initial_anime_output;
});


//all animes function
var output1 = "";
var output2 = "";
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '337848fd1dmsh7152c94608a87d0p1cca0cjsn3350d457e7b5',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
};

fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=100', options)
.then(response => response.json())
.then(response => {
    const animes = response.data;

    //view all function
    animes.map((all_animes) =>{
        const all_animes_images = all_animes.image;
        const all_animes_title = all_animes.title;
        const all_animes_link = all_animes.link;

        output1+=`
            <div class="anime">
                <img src="${all_animes_images}"/>
                <p class="name">${all_animes_title}</p>
                <a href="${all_animes_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
            </div>
        `
    });

    const sorted_animes = animes.sort((a, b)=>{
        if(a.title > b.title){
            return 1;
        }
        else if(a.title < b.title){
            return -1;
        }
        return 0;
    });

    //view sorted animes
    sorted_animes.map((sorted_anime) =>{
        const sorted_anime_image = sorted_anime.image;
        const sorted_anime_title = sorted_anime.title;
        const sorted_anime_link = sorted_anime.link;

        output2 += `
            <div class="anime">
                <img src="${sorted_anime_image}"/>
                <p class="name">${sorted_anime_title}</p>
                <a href="${sorted_anime_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
            </div>`
    });

})
.catch(err => console.error(err));

//sorting buttons
const display_sort_button = document.querySelector('.sort');
const sort_buttons = document.querySelector('.view');

display_sort_button.addEventListener('click', ()=>{
    sort_buttons.style.display = 'flex';
    const remove_view = document.querySelector('.no-view');
    remove_view.addEventListener('click', ()=>{
        sort_buttons.style.display = "none";
    });
});

const viewAll = document.querySelector('.all');
viewAll.addEventListener("click", ()=>{
    myOutput.innerHTML = output1;
});

const sort_by_name = document.querySelector('.sort-by-name');
sort_by_name.addEventListener('click', ()=>{
    myOutput.innerHTML = output2;
    sort_buttons.style.display = "none";
});


//header
const myQuote = document.createElement('p');
const parentEl = document.querySelector('.background-contents');
myQuote.innerHTML = "<span class='line2'>“Those who stand at the top determine what’s wrong and what’s right! This very place is neutral ground!</span> Justice will prevail, you say? But, of course, it will! Whoever wins this war becomes justice!” ";
myQuote.classList.add("quote");
parentEl.appendChild(myQuote);

const subScription = document.createElement('p');
subScription.innerHTML = "SUBSCRIPTION";
parentEl.appendChild(subScription);
subScription.classList.add('sub');

const header = document.querySelector('.tittle');
const line = document.querySelector('.line2');

const a1 = annotate(header, {type: 'highlight', color: 'red'});
const a2 = annotate(myQuote, {type: 'underline', color: 'yellow', strokeWidth: 0.9});
const a3 = annotate(subScription, {type: 'crossed-off', color: 'red', strokeWidth: 3, iterations: 1})
const ag = annotationGroup([a3, a1, a2]);
ag.show();


//dark theme
const body = document.querySelector('.body');
const animes = document.querySelectorAll('.animes');
const themeButton = document.querySelector('.theme-toggler');

themeButton.addEventListener('click', ()=>{
    for(let anime of animes){
        anime.classList.toggle('contents-back');
    };
    body.classList.toggle("body-back");
})

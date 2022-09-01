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
        "link": "https://www.netflix.com/ke/title/81001988?source=35",
        "desc": "Chronicles the illegitimate son of Zeus, a young man tasked with saving heaven and earth despite the interference of a vengeful goddess and her monstrous forces."
    },
    {
        "name": "Naruto",
        "image": "naruto.jpg",
        "link": "https://www.youtube.com/watch?v=Y9P1EhndE0w",
        "desc": "Naruto, an adolescent ninja, dreams of becoming the Hokage in his village."
    },
    {
        "name": "Demon slayer",
        "image": "slayer.jpeg",
        "link": "https://www.imdb.com/video/vi2476588825/?ref_=tt_vi_i_1",
        "desc": " After a demon attack leaves his family slain and his sister cursed, Tanjiro embarks upon a perilous journey to find a cure and avenge those he's lost."
    },
    {
        "name": "One piece",
        "image": "one-piece.jpeg",
        "link": "https://www.youtube.com/watch?v=-3g8Nnehdao",
        "desc": "Monkey D. Luffy wants to become the King of all pirates. Along his quest he meets: a skilled swordsman named Roronoa Zolo; Nami, a greedy thief who has a knack for navigation; Usopp, a great liar who has an affinity for inventing; Sanji, a warrior cook; Chopper, a sentient deer who is also a skilled physician; and Robin, former member of Baroque Works. The gang sets sail to unknown seas in Grand Line to find the treasure of One Piece."
    },
    {
        "name": "Anime girl",
        "image": "anime-girl.jpg",
        "link": "https://www.bilibili.tv/en/video/2049239198",
        "desc": "The series focuses on the existence of a supernatural system that allows people to take revenge by having other people sent to Hell via the services of the mysterious title character and her assistants who implement this system"
    },
    {
        "name": "Inuyasha",
        "image": "inuyasha.jpg",
        "link": "https://www.youtube.com/watch?v=UCFBsLagBPk",
        "desc": "To defend the Jewel of Four Souls, Inuyasha and Kagome continue to confront the wicked Naraku. Shippo, Miroku and the demon hunter Sango are all assisting them."
    },
    {
        "name": "Fate",
        "image": "fate.jpg",
        "link": "https://www.youtube.com/watch?v=NPItqNsCXM4",
        "desc": "It follows a high schooler named Shirou Emiya, who finds himself unwittingly involved in the fifth iteration of a magical battle royale called the Holy Grail War."
    },
    {
        "name": "Bleach",
        "image": "bleach.jpg",
        "link": "https://www.youtube.com/watch?v=iutQJzAXiWo",
        "desc": "Ichigo Kurosaki never asked for the ability to see ghosts -- he was born with the gift. When his family is attacked by a Hollow -- a malevolent lost soul -- Ichigo becomes a Soul Reaper, dedicating his life to protecting the innocent and helping the tortured spirits themselves find peace.        "
    }
    
];

const myOutput = document.querySelector('.contents');

const first_output_animes = first_display_animes.map((first_display) =>{
    const first_img = first_display.image;
    const first_name = first_display.name;
    const first_link = first_display.link;
    const first_desc = first_display.desc;

    function truncateDesc(str, num){
        if(str.length > num){
            return str.slice(0, num) + "..." + `<a href="${first_link}">read more</a>`;
        }
        return str
    }
    const first_info = truncateDesc(first_desc, 100);

    const initial_anime_output = `
        <div class="animes">
            <div class="anime-img">
                <img src="${first_img}"/>
            </div>
            <div class="anime-contents">
                <p class="name">${first_name}</p>
                <p class="info">${first_info}</p>
                <a href="${first_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
            </div>
        </div>`

    myOutput.innerHTML+=initial_anime_output;
});


//dark theme
const body = document.querySelector('.body');
const animes = document.querySelectorAll('.animes');
const themeButton = document.querySelector('.theme-toggler');

function darkMode(){
    for(let anime of animes){
        anime.classList.toggle('contents-back');
    };
    body.classList.toggle("body-back");
}

themeButton.addEventListener('click', darkMode);



//ANIMES FUNCTIONS:

//outputs
var output1 = "";
var output2 = "";
var output3 = "";
var output4 = "";


//fetch the animes API
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

    //slice anime names.
    function sliceName(str, num){
        if(str.length > num){
            return str.slice(0, num) + "...";
        }
        return str;
    };


    //all animes
    animes.map((all_animes) =>{
        const all_animes_images = all_animes.image;
        const all_animes_title = sliceName(all_animes.title, 10);
        const all_animes_link = all_animes.link;
        const all_animes_info = all_animes.synopsis;

        function truncateDesccription(str, num){
            if(str.length > num){
                return str.slice(0, num) + "..." + `<a href="${all_animes_link}">read more</a>`;
            }
            return str;
        };

        const all_anime_info = truncateDesccription(all_animes_info, 100);

        output1+=`
            <div class="anime">
                <div class="anime-img">
                    <img src="${all_animes_images}"/>
                </div>
                <div class="anime-contents">
                    <p class="name">${all_animes_title}</p>
                    <p class="info">${all_anime_info}</p>
                    <a href="${all_animes_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                </div>
            </div>
        `
    });


     //sorted animes
    const sorted_animes = animes.sort((a, b)=>{
        if(a.title > b.title){
            return 1;
        }
        else if(a.title < b.title){
            return -1;
        }
        return 0;
    });
    sorted_animes.map((sorted_anime) =>{
        const sorted_anime_image = sorted_anime.image;
        const sorted_anime_title = sliceName(sorted_anime.title, 10);
        const sorted_anime_link = sorted_anime.link;
        const sorted_anime_synopsis = sorted_anime.synopsis;

        function sortSynopsis(str, num){
            if(str.length > num){
                return str.slice(0, num) + "..." + `<a href="${sorted_anime_link}">read more</a>`
            }
            return str;
        }

        const sortedAnimeSynopsis = sortSynopsis(sorted_anime_synopsis, 100);

        output2 += `
            <div class="anime">
                <div class="anime-image">
                    <img src="${sorted_anime_image}"/>
                </div>
                <div class="anime-contents">
                    <p class="name">${sorted_anime_title}</p>
                    <p class="info">${sortedAnimeSynopsis}</p>
                    <a href="${sorted_anime_link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                </div>
            </div>` 
    });

    //animes gernes
   const textElements = document.querySelectorAll('.options');

   for(let textElement of textElements){
       textElement.addEventListener('click', ()=>{
           output3 = [];
           const text = textElement.textContent;

           animes.map( (animesGerne) =>{
            const animeGerneValue = animesGerne.genres;
     
            if(animeGerneValue.includes(text)){
                let animeGernes = [];
                const animesOutput = animesGerne;
                animeGernes.push(animesOutput);

                animeGernes.map( (animeGernesOutput) =>{
                    const animeGerneImage = animeGernesOutput.image;
                    const animeGerneTitle = sliceName(animeGernesOutput.title, 10);
                    const animeGerneLink = animeGernesOutput.link;
                    const animeGerneSynopsi= animeGernesOutput.synopsis;
                    
                    function animeGerne(str, num){
                        if(str.length > num){
                            return str.slice(0, num) + "..." + `<a href="${animeGerneLink}">read more</a>`
                        }
                        return str;
                    };

                    const animeGerneSynopsis = animeGerne(animeGerneSynopsi, 100);

                    output3+=`
                    <div class="anime">
                        <div class="anime-image">
                            <img src="${animeGerneImage}"/>
                        </div>
                        <div class="anime-contents">
                            <p class="name">${animeGerneTitle}</p>
                            <p class="info">${animeGerneSynopsis}</p>
                            <a href="${animeGerneLink}" class="watch"> <i class="ri-video-line"></i>stream</a>
                        </div>
                    </div>` 
                });
            };
        });

        myOutput.innerHTML = output3;
        sort_buttons.style.display = "none";
       });
   }
  
   
   //searching for animes
   const searchButton = document.getElementById('search');
   const searchIcon = document.querySelector('.icon');

   function searchDisplay(){
        const animesSearch = [];
        output4 = [];

        for(let i =  0; i < animes.length; i++){
    
            const animesSearchTitle = animes[i].title;
            const animeSearchLowerCase = animesSearchTitle.toLowerCase();
            const searchValues = searchButton.value;
            const searchValuesToLowerCase = searchValues.toLowerCase();
    
            if(animeSearchLowerCase.includes(searchValuesToLowerCase)){
                animesSearch.push(animes[i]);
            };
        };
    
        if(animesSearch == 0){
            myOutput.innerHTML = "Ooops! No search results";
        }else if(animesSearch !== 0){
            animesSearch.map( (animeSearch) =>{

                output4+=`
                        <div class="anime">
                            <div class="anime-img">
                                <img src="${animeSearch.image}"/>
                            </div>
                            <div class="anime-contents">
                                <p class="name">${animeSearch.title}</p>
                                <p class="info">${animeSearch.synopsis}}</p>
                                <a href="${animeSearch.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                            </div>
                        </div>
                        `
            });
            myOutput.innerHTML = output4;
        };

        if(searchButton.value == 0){
            myOutput.innerHTML = output1;
        };
   };

   searchIcon.addEventListener('click', searchDisplay);
   searchButton.addEventListener('keydown', searchDisplay);
  
})
.catch(err => console.error(err));

//button functionalities
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

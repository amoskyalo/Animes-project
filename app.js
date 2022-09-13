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

function darkMode(){
    for(let anime of animes){
        anime.classList.toggle('contents-back');
    };
    body.classList.toggle("body-back");
}

themeButton.addEventListener('click', darkMode);

//ANIMES PARENT
const animeParent = document.querySelector('.contents');

//outputs
let output = "";
let output1 = "";
let output2 = "";
let output3 = "";
let output4 = "";


//function truncate synopsis
function truncateDesc(str, num, link){
    if(str.length > num){
        return str.slice(0, num) + "..." + `<a href=${link}>read more</a>`
    }
    return str;
}

//function truncate name
function truncateName(str, num){
    if(str.length > num){
        return str.slice(0, num) + "..."
    };
    return str;
};


//fetch initial ANIMES
fetch('app.json')
.then(response =>{
    if(!response.ok){
        throw new Error(`HTTP error ${response.status}`)
    }
    return response.json();
})
.then( (datas) =>{
    datas.map( (data) =>{
        const synopsis = truncateDesc(data.synopsis, 100, data.link);
        const title = truncateName(data.title, 20);

        output+=`
        <div class="animes">
            <div class="anime-img">
                <img src="${data.image}"/>
            </div>
            <div class="anime-contents">
                <p class="name">${title}</p>
                <p class="info">${synopsis}</p>
                <a href="${data.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
            </div>
        </div>`
    })
    animeParent.innerHTML = output;
})


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
.then( response =>{
    const datas = response.data;
    datas.map( (data)=>{

        //all animes
        const synopsis = truncateDesc(data.synopsis, 100, data.link);
        const title = truncateName(data.title, 20);

        output1+=`
            <div class="animes">
                <div class="anime-img">
                    <img src="${data.image}"/>
                </div>
                <div class="anime-contents">
                    <p class="name">${title}</p>
                    <p class="info">${synopsis}</p>
                    <a href="${data.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                </div>
            </div>`


        //sorted animes
        const sorted_animes = datas.sort((a, b)=>{
            if(a.title > b.title){
                return 1;
            }
            else if(a.title < b.title){
                return -1;
            }
            return 0;
        });
        sorted_animes.map((sorted_anime) =>{
            const synopsis = truncateDesc(sorted_anime.synopsis, 100, sorted_anime.link);
            const title = truncateName(sorted_anime.title, 20);
            output2 += `
                <div class="anime">
                    <div class="anime-image">
                        <img src="${sorted_anime.image}"/>
                    </div>
                    <div class="anime-contents">
                        <p class="name">${title}</p>
                        <p class="info">${synopsis}</p>
                        <a href="${sorted_anime.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                    </div>
                </div>` 
        });
    })


    //animes gernes
   const textElements = document.querySelectorAll('.options');
   for(let textElement of textElements){
       textElement.addEventListener('click', ()=>{
           output3 = [];
           const text = textElement.textContent;
           datas.map( (animesGerne) =>{
            const animeGerneValue = animesGerne.genres;
            if(animeGerneValue.includes(text)){
                let animeGernes = [];
                const animesOutput = animesGerne;
                animeGernes.push(animesOutput);

                animeGernes.map( (animeGernesOutput) =>{
                    const synopsis = truncateDesc(animeGernesOutput.synopsis, 100, animeGernesOutput.link);
                    const title = truncateName(animeGernesOutput.title, 20);
                    output3+=`
                    <div class="anime">
                        <div class="anime-image">
                            <img src="${animeGernesOutput.image}"/>
                        </div>
                        <div class="anime-contents">
                            <p class="name">${title}</p>
                            <p class="info">${synopsis}</p>
                            <a href="${animeGernesOutput.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                        </div>
                    </div>` 
                });
            };
        });

        animeParent.innerHTML = output3;
        sort_buttons.style.display = "none";
       });
   }

      //searching for animes
   const searchButton = document.getElementById('search');
   const searchIcon = document.querySelector('.icon');

   function searchDisplay(){
        const animesSearch = [];
        output4 = [];

        for(let i =  0; i < datas.length; i++){
            const animesSearchTitle = datas[i].title;
            const animeSearchLowerCase = animesSearchTitle.toLowerCase();
            const searchValues = searchButton.value;
            const searchValuesToLowerCase = searchValues.toLowerCase();
    
            if(animeSearchLowerCase.includes(searchValuesToLowerCase)){
                animesSearch.push(datas[i]);
            };
        };
    
        if(animesSearch == 0){
            animeParent.innerHTML = "Ooops! No search results";
        }else if(animesSearch !== 0){
            animesSearch.map( (animeSearch) =>{
                const synopsis = truncateDesc(animeSearch.synopsis, 100, animeSearch.link);
                const title = truncateName(animeSearch.title, 20);
                output4+=`
                        <div class="anime">
                            <div class="anime-img">
                                <img src="${animeSearch.image}"/>
                            </div>
                            <div class="anime-contents">
                                <p class="name">${title}</p>
                                <p class="info">${synopsis}</p>
                                <a href="${animeSearch.link}" class="watch"> <i class="ri-video-line"></i>stream</a>
                            </div>
                        </div>
                        `
            });
            animeParent.innerHTML = output4;
        };

        if(searchButton.value == 0){
            animeParent.innerHTML = output1;
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
            animeParent.innerHTML = output1;
});


const sort_by_name = document.querySelector('.sort-by-name');
sort_by_name.addEventListener('click', ()=>{
    animeParent.innerHTML = output2;
    sort_buttons.style.display = "none";
});







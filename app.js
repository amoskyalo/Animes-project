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
        "name": "Kimilu"
    },
    {
        "name": "Amos"
    },
    {
        "name": "Samuel"
    },
    {
        "name": "Faith"
    },
    {
        "name": "Kyalo"
    },{
        "name": "Angeline"
    }
];

const myOutput = document.querySelector('.contents');

var output = "";
for(let personName of names){
    output+=`
        <p class="name">${personName["name"]}</p>`;
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
    <p class="name">${sortedName["name"]}</p>`
};
console.log(output2);

const sortButton = document.querySelector('.sort');
sortButton.addEventListener("click", ()=>{
    myOutput.innerHTML = output2;
});


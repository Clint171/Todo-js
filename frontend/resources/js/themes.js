let themeSelector = document.getElementById("theme-selector");
let body = document.querySelector("body");
let header = document.getElementById("header");
let items = document.querySelectorAll(".item");
let screens = document.querySelectorAll(".screen");
let spans = document.querySelectorAll("span");

themeSelector.value = localStorage.getItem("theme");
changeTheme(themeSelector.value);

themeSelector.addEventListener("change", function(){
    changeTheme(themeSelector.value);
    localStorage.setItem("theme", themeSelector.value);
});
themeSelector.addEventListener("click", function(){
    changeTheme(themeSelector.value);
    localStorage.setItem("theme", themeSelector.value);
});

function changeTheme(themeColor){
    header.style.backgroundColor = themeColor;
    body.style.backgroundColor = themeColor;
    popupDiv.style.backgroundColor = themeColor;
    nav.style.backgroundColor = themeColor;

    for(let i = 0; i < items.length; i++){
        //Item color should be lighter version of themecolor
        items[i].style.backgroundColor = themeColor;
    }
    for(let i = 0; i < screens.length; i++){
        //Item color should be lighter version of themecolor
        screens[i].style.backgroundColor = themeColor;
    }
    for(let i = 0; i < spans.length; i++){
        //Item color should be lighter version of themecolor
        spans[i].style.backgroundColor = themeColor;
    }
    displayAllTasks();
}
let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
    
function showNav(){
    hideAllScreens();
    nav.classList.remove("hidden");
    navIcon.setAttribute("onclick" ,"hideNav()");
    addIcon.classList.add("hidden");
}
function hideNav(){
    nav.classList.add("hidden");
    navIcon.setAttribute("onclick" ,"showNav()");
    addIcon.classList.remove("hidden");
}
function showScreen(screenId){
    hideAllScreens();
    let screen = document.getElementById(screenId);
    screen.classList.remove("hidden");
    hideNav();
    addIcon.classList.add("hidden");

}
function hideScreen(screenId){
    let screen = document.getElementById(screenId);
    screen.classList.add("hidden");
    addIcon.classList.remove("hidden");
}
function hideAllScreens(){
    let screens = document.getElementsByClassName("screen");
    for(let i = 0; i < screens.length; i++){
        let element = screens[i];
        if(element.classList.contains("hidden")){
            continue;
        }
        element.classList.add("hidden");
    }
}
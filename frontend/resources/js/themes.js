let themeSelector = document.getElementById("theme-selector");
let body = document.querySelector("body");
let header = document.getElementById("header");
let items = document.getElementsByClassName("item");
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

    let rgb = hexToRgb(themeColor);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    for(let i = 0; i < items.length; i++){
        items[i].style.backgroundColor = `rgb(${r+50},${g+50},${b+50})`;
    }
    for(let i = 0; i < screens.length; i++){
        screens[i].style.backgroundColor = `rgb(${r+50},${g+50},${b+50})`;
    }
    for(let i = 0; i < spans.length; i++){
        spans[i].style.backgroundColor = `rgb(${r+50},${g+50},${b+50})`;
    }
    //Check if rgb values are below 128
    if(r < 100 && g < 100 && b < 100){
        //Change text color to white
        body.style.color = "#FFFFFF";
        document.querySelector("path").style.fill = "#FFFFFF";
    }
    else{
        //Change text color to black
        body.style.color = "#000000";
        document.querySelector("path").style.fill = "#000000";
    }
    displayAllTasks();
}
function hexToRgb(hex) {
    // Convert the hex value to an RGB tuple.
    const rgb = [];
    hex = hex.replace("#", "");
    for (let i = 0; i < 3; i++) {
      rgb.push(parseInt(hex.substring(i * 2, i * 2 + 2), 16));
    }
    return rgb;
}
  
  function rgbToHex(rgb) {
    // Convert the RGB tuple to a hex value.
    const hex = '#';
    for (const color of rgb) {
      hex += color.toString(16).padStart(2, '0');
    }
    return hex;
}
function changeThemeColor(){
    for(let i = 0 ; i < arguments.length ; i++){
        if(i == 0){
            continue;
        }
        arguments[i].style.backgroundColor = arguments[0];
    }
}

function changeThemeLighter(){
    let rgb = hexToRgb(arguments[0]);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    for(let i = 0 ; i < arguments.length ; i++){
        if(i == 0){

            continue;

        }
        arguments[i].style.backgroundColor = `rgb(${r+50},${g+50},${b+50})`;
    }
}

function setTextColor(backgroundColor){
    let rgb = hexToRgb(backgroundColor);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    
    if(r < 100 && g < 100 && b < 100){

        return "#FFFFFF";

    }

    else{
        
        return "#000000";

    }
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

const _changeThemeColor = changeThemeColor;
const _changeThemeLighter = changeThemeLighter;
const _setTextColor = setTextColor;

export { _changeThemeColor as changeThemeColor };
export { _changeThemeLighter as changeThemeLighter};
export { _setTextColor as setTextColor};
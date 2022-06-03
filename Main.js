function set(num) {
    var ret;
    if (num < 10) { ret = "0" + num; }
    else { ret = num; }
    return ret;
}
function showClock() {
    var nowTime = new Date();
    var nowHour = set(nowTime.getHours());
    var nowMin = set(nowTime.getMinutes());
    var nowSec = set(nowTime.getSeconds());
    var msg = nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("realtime").innerHTML = msg;
}
setInterval("showClock()", 500);

document.getElementById("hidden_box").style.visibility = "hidden";
const settingsToggle = document.getElementById("set-text");

settingsToggle.addEventListener("change",function(e){
    if (e.target.checked){
        settingsMode('open');
    } else {
        settingsMode('close');
    }
})

function settingsMode(mode){
    var settingsObj = document.getElementById("hidden_box");
    if (mode == 'open'){
        settingsObj.style.visibility = "visible";
    }
    else if (mode == 'close'){
        settingsObj.style.visibility = "hidden";
    }
}
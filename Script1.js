function set(num) {
    // Œ…”‚ª1Œ…‚¾‚Á‚½‚çæ“ª‚É0‚ğ‰Á‚¦‚Ä2Œ…‚É’²®‚·‚é
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
    document.getElementById("RealtimeClockArea").innerHTML = msg;
}
setInterval("showClock()", 500);
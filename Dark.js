// JavaScript source code

const checkToggle = document.getElementById('dark_mode_toggle');
const rotateIcon = document.getElementById('dark_rotate');
const classDark = 'js-mode-dark';

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let nowRotate = 0;


/*
if (isDark) {
    rotateInfinite();
    changeMode('dark');
}
*/

// チェックボックスでの切り替え、選択をローカルストレージに保存
checkToggle.addEventListener('change', function (e) {
    rotateInfinite();
    if (e.target.checked) {
        changeMode('dark');
    } else {
        changeMode('light');
    }
});

/**
 * ダークorライトテーマ切り替え
 * @param {String} mode 'light' もしくは 'dark'
 */

function changeMode(mode) {
    tag = document.getElementById("vid");
    if (mode === 'dark') {
        document.body.classList.add(classDark);
        checkToggle.checked = true;
        tag.src = "CountdownBlack.mp4";
    } else if (mode === 'light') {
        document.body.classList.remove(classDark);
        checkToggle.checked = false;
        tag.src = "CountdownWhite.mp4";
    }
    changecolortext('version');
}

/**
 * 月と太陽アイコン無限回転
 * 呼ばれるたびに180度角度が追加されていく
 */
function rotateInfinite() {
    nowRotate += 360;
    rotateIcon.style.transform = 'rotate(' + nowRotate + 'deg)';
}

function changecolortext(objname) {
    var obj = document.getElementById(objname);
    if (checkToggle.checked === true) {
        obj.style.color = '#ddd';
    } else if (checkToggle.checked === false) {
        obj.style.color = '#222';
    }
}
function set(num) {
    // ������1����������擪��0��������2���ɒ�������
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

const checkToggle = document.getElementById('js_mode_toggle');
const rotateIcon = document.getElementById('js_rotate');
const classDark = 'js-mode-dark';

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let nowRotate = 0;


/*
if (isDark) {
    rotateInfinite();
    changeMode('dark');
}
*/

// �`�F�b�N�{�b�N�X�ł̐؂�ւ��A�I�������[�J���X�g���[�W�ɕۑ�
checkToggle.addEventListener('change', function (e) {
    rotateInfinite();
    if (e.target.checked) {
        changeMode('dark');
    } else {
        changeMode('light');
    }
});

/**
 * �_�[�Nor���C�g�e�[�}�؂�ւ�
 * @param {String} mode 'light' �������� 'dark'
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
 * ���Ƒ��z�A�C�R��������]
 * �Ă΂�邽�т�180�x�p�x���ǉ�����Ă���
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
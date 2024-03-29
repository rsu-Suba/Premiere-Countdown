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
        tag.src = "Datafile/CountdownBlack.mp4";
    } else if (mode === 'light') {
        document.body.classList.remove(classDark);
        checkToggle.checked = false;
        tag.src = "Datafile/CountdownWhite.mp4";
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
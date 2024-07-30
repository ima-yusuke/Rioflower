let nicknameInput = document.getElementById('nickname');
let nicknameBtn = document.getElementById('nickname_button');

nicknameBtn.addEventListener('click', function() {
    if(nicknameInput.value.trim() === "") {
        alert('ニックネームを入力してください');
    }else {
        let nickname = nicknameInput.value;
        sessionStorage.setItem('nickname', nickname);
        location.href = '/question';
    }
})

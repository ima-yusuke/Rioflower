const UPDATE_BTN = document.getElementById('updateBtn');
const TOP_INPUT = document.getElementById('top');
const BOTTOM_INPUT = document.getElementById('bottom');
const PREVIEW_TOP = document.getElementById('preview-top');
const PREVIEW_BOTTOM = document.getElementById('preview-bottom');

// 改行を<br>タグに変換する関数
function nl2br(str) {
    return str.replace(/\r?\n/g, '<br>');
}

// 入力が変更されたときにプレビューを更新する関数
function updatePreview() {
    PREVIEW_TOP.innerHTML = nl2br(TOP_INPUT.value);
    PREVIEW_BOTTOM.innerHTML = nl2br(BOTTOM_INPUT.value);
}

// イベントリスナーを追加して、入力が変更されたときにプレビューを更新
TOP_INPUT.addEventListener('input', updatePreview);
BOTTOM_INPUT.addEventListener('input', updatePreview);

// 更新ボタンがクリックされたときの処理
UPDATE_BTN.addEventListener('click', function() {
    const ID = UPDATE_BTN.getAttribute('data-id');
    const TOP = document.getElementById('top').value;
    const BOTTOM = document.getElementById('bottom').value;

    fetch(`/dashboard/message/${ID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            top: TOP,
            bottom: BOTTOM
        })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 422) {
                    return response.json().then(data => {
                        throw { validationErrors: data.errors };
                    });
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.alert('メール設定を更新しました');
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            if (error.validationErrors) {
                let errorMessage = '';
                for (const field in error.validationErrors) {
                    errorMessage += `${error.validationErrors[field].join('\n')}\n`;
                }
                window.alert(errorMessage);
            } else {
                console.error('Error:', error);
                window.alert('メール設定の更新に失敗しました');
            }
        });
});

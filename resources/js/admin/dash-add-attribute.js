const CAT_ADD_BTN = document.getElementById('addBtn');
const ATT_ADD_BTN = document.querySelectorAll('.att-addBtn');
const EDIT_BTN = document.querySelectorAll('.editBtn');
const CAT_DELETE_BTN = document.querySelectorAll('.deleteBtn');
const ATT_DELETE_BTN = document.querySelectorAll('.att-deleteBtn');

//アコーディオンの開閉
EDIT_BTN.forEach((btn,idx) => {
    btn.addEventListener('click', function() {

        let selected_qa_body = btn.parentNode.parentNode.nextElementSibling;//アコーディオン中身

        // 現在表示している要素を再度クリックした場合はそのアコーディオンを閉じる
        if (selected_qa_body.classList.contains('visible')) {
            selected_qa_body.classList.remove('visible')
            btn.innerHTML = "編集"
        } else {
            // 全てを一度非表示
            for (let i = 0; i < EDIT_BTN.length; i++) {
                let tmpBody = EDIT_BTN[i].parentNode.parentNode.nextElementSibling;
                tmpBody.classList.remove('visible')
                EDIT_BTN[i].innerHTML = "編集"
            }

            // クリックされた要素のみ表示
            selected_qa_body.classList.add('visible');
            btn.innerHTML = "閉じる";
        }
    });
});

//カテゴリーの追加
// addBtnがクリックされたときの処理
CAT_ADD_BTN.addEventListener('click', function() {
    // 新しいコースと価格帯を取得
    const CATEGORY = document.getElementById('category').value;

    if (!CATEGORY) {
        window.alert('カテゴリーは必須です');
        return;
    }

    fetch('/dashboard/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: CATEGORY,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.alert('カテゴリーを追加しました');
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('カテゴリーの追加に失敗しました');
        });
});

//カテゴリーの削除
CAT_DELETE_BTN.forEach((btn) => {
    btn.addEventListener('click', function() {
        const ID = btn.getAttribute('data-id');
        if (!confirm('カテゴリーを削除しますか？\r\n削除すると属性も全て削除されます')) {
            return;
        }
        fetch(`/dashboard/category/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // CSRFトークン
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else if (data.message) {
                    window.alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('削除に失敗しました');
            });
    });
});

//属性の追加
ATT_ADD_BTN.forEach((btn) => {
    btn.addEventListener('click', function() {
        const INPUTFIELD = btn.closest('.link-area').querySelector('.attAdd');
        const NAME = INPUTFIELD.value;
        const CATEGORY_ID = btn.closest('.qa__item').querySelector('.deleteBtn').getAttribute('data-id');

        fetch('/dashboard/attribute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                name: NAME,
                category_id: CATEGORY_ID,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    window.alert(data.message);
                    window.location.reload(); // 成功したらページをリロード
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('属性の追加に失敗しました');
            });
    });
});

//属性の削除
ATT_DELETE_BTN.forEach((btn) => {
    btn.addEventListener('click', function() {
        const ATTRIBUTE_ID = btn.getAttribute('data-id');
        if (!confirm('属性を削除しますか？')) {
            return;
        }
        fetch(`/dashboard/attribute/${ATTRIBUTE_ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // CSRFトークン
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.redirect) {
                    window.alert(data.message);
                    window.location.href = data.redirect;
                } else if (data.message) {
                    window.alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('属性の削除に失敗しました');
            });
    });
});

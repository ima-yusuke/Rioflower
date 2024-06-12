const ADD_BTN = document.getElementById('addBtn');
const EDIT_BTN = document.querySelectorAll('.editBtn');
const DELETE_BTN = document.querySelectorAll('.deleteBtn');
const UPDATE_BTN = document.querySelectorAll('.updateBtn');

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

//コースと価格の追加
// addBtnがクリックされたときの処理
ADD_BTN.addEventListener('click', function() {
    // 新しいコースと価格帯を取得
    const COURSE = document.getElementById('course').value;
    const PRICE = document.getElementById('price').value;
    const PICKUP = document.getElementById('pickup').value;
    const DELIVERY = document.getElementById('delivery').value;

    if (!COURSE || !PRICE) {
        window.alert('コースと価格帯は必須です');
        return;
    }

    fetch('/dashboard/link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            course: COURSE,
            price: PRICE,
            pickup_link: PICKUP,
            delivery_link: DELIVERY
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
                window.alert('リンクを追加しました')
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('リンクの追加に失敗しました');
        });
});

//リンクの更新
document.querySelectorAll('.updateBtn').forEach((btn) => {
    btn.addEventListener('click', function() {
        const ID = btn.getAttribute('data-id');
        const PICKUP_LINK = btn.closest('.link-area').querySelector('.pickup-link').value;
        const DELIVERY_LINK = btn.closest('.link-area').querySelector('.delivery-link').value;

        fetch(`/dashboard/link/${ID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // CSRFトークン
            },
            body: JSON.stringify({
                pickup_link: PICKUP_LINK,
                delivery_link: DELIVERY_LINK
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
                    window.alert('リンクを更新しました')
                    window.location.href = data.redirect;
                } else if (data.message) {
                    window.alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('リンクの更新に失敗しました');
            });

    });
});

//リンクの削除
DELETE_BTN.forEach((btn) => {
    btn.addEventListener('click', function() {
        const ID = btn.getAttribute('data-id');
        if (!confirm('リンクを削除しますか？')) {
            return;
        }
        fetch(`/dashboard/link/${ID}`, {
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
                    window.alert('コースを削除しました')
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

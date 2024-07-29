document.getElementById('updateBtn').addEventListener('click', function(event) {
    event.preventDefault();

    // 各メールアドレスを取得
    let email1 = document.getElementById('forward-1').value;
    let email2 = document.getElementById('forward-2').value;
    let email3 = document.getElementById('forward-3').value;

    // 各IDも取得
    let id1 = document.querySelector('input[name="id-1"]').value;
    let id2 = document.querySelector('input[name="id-2"]').value;
    let id3 = document.querySelector('input[name="id-3"]').value;

    fetch('/dashboard/forward', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            id1: id1,
            email1: email1,
            id2: id2,
            email2: email2,
            id3: id3,
            email3: email3
        })
    }).then(response => {
        if (!response.ok) {
            if (response.status === 422) {
                return response.json().then(data => {
                    throw { validationErrors: data.errors };
                });
            }
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data.success) {
            window.alert('転送先メールアドレスを更新しました');
        } else if (data.message) {
            alert(data.message);
        }
    }).catch(error => {
        if (error.validationErrors) {
            let errorMessage = '';
            for (const field in error.validationErrors) {
                errorMessage += `${error.validationErrors[field].join('\n')}\n`;
            }
            window.alert(errorMessage);
        } else {
            console.error('Error:', error);
            window.alert('転送先メールアドレスの更新に失敗しました');
        }
    });
});

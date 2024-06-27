import "flowbite"

const SEND_BTN = document.getElementById("mail-btn");

// 顧客情報追加
SEND_BTN.addEventListener("click",function(){
    const NAME = document.getElementById("customer-name").textContent;
    const ADDRESS = document.getElementById("customer-address").textContent;
    const EMAIL = document.getElementById("customer-mail").textContent;
    const ID = document.getElementById("product-id").textContent;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            name: NAME,
            address: ADDRESS,
            email: EMAIL,
            product_id: ID,
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
                window.alert('顧客情報を追加しました');
            } else if (data.message) {
                alert(data.message);
                window.location.href = '/question';
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
                window.alert('顧客情報の追加に失敗しました');
            }
        });
});

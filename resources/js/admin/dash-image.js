document.addEventListener('DOMContentLoaded', function () {
    const leftImgInput = document.getElementById('left-img');
    const rightImgInput = document.getElementById('right-img');
    const previewLeftImg = document.querySelector('.preview-1');
    const previewRightImg = document.querySelector('.preview-2');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = document.getElementById('image-form');

    leftImgInput.addEventListener('change', function (event) {
        handleImagePreview(event, previewLeftImg);
    });

    rightImgInput.addEventListener('change', function (event) {
        handleImagePreview(event, previewRightImg);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData();
        const leftImgFile = leftImgInput.files[0];
        const rightImgFile = rightImgInput.files[0];

        if (leftImgFile) {
            formData.append('left_img', leftImgFile);
        }

        if (rightImgFile) {
            formData.append('right_img', rightImgFile);
        }

        formData.append('_token', csrfToken);

        fetch('/dashboard/image', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
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
                window.alert('TOP画像を更新しました');
                location.reload();
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
                window.alert('TOP画像の更新に失敗しました');
            }
        });
    });

    function handleImagePreview(event, previewElement) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
});

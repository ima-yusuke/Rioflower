window.addEventListener('beforeunload', function() {
    fetch('/clear-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('セッションをクリアしました');
            } else {
                console.error('セッションのクリアに失敗しました');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
        });
});

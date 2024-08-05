// ページがアンロードされる（離れる）直前にイベントを送信
window.addEventListener('beforeunload', function (cu){
    gtag('event', "ページ離脱", {
        'event_category': 'ページ離脱',
        'event_label': 'ページ離脱',
        'value': 1
    });
});

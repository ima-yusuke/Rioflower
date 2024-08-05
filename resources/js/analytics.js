// ページがアンロードされる（離れる）直前にイベントを送信
window.addEventListener('beforeunload', function (cu){
    // 現在のURLが指定された範囲外ならば記録
    if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {
        gtag('event', "ページ離脱数", {
            'event_category': 'ページ離脱',
            'event_label': 'ページ離脱',
            'value': 1
        });
    }
});

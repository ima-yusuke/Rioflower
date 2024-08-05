// 現在のURLをチェックして、特定のURLでのみbeforeunloadイベントを設定
if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {
    let preventUnloadTracking = false;

    window.addEventListener('beforeunload', function(event) {
        // ボタンのクリックで遷移する場合は記録をスキップ
        if (preventUnloadTracking) {
            return;
        }

        // ページ離脱イベントを記録
        gtag('event', "ページ離脱数", {
            'event_category': 'ページ離脱',
            'event_label': 'ページ離脱',
            'value': 1
        });
    });

    // ボタンクリックイベントを監視（question→checkに遷移時）
    const button = document.getElementById('send-btn');
    button.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });
}

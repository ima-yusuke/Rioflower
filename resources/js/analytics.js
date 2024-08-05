let preventUnloadTracking = false;

// ボタンクリックイベントを監視（question→checkに遷移時）
const SEND_BTN = document.getElementById('send-btn');

if (SEND_BTN!=null){
    SEND_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });
}

// ボタンクリックイベントを監視（question→topに遷移時）
const BACK_START_BTN = document.getElementById('back-start-btn');

if (BACK_START_BTN!=null){
    BACK_START_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });
}

window.addEventListener('beforeunload', function(event) {

    if(preventUnloadTracking){
        return;
    }

    // ページ離脱イベントを記録
    gtag('event', "テスト", {
        'event_category': 'ページ離脱',
        'event_label': 'ページ離脱',
        'value': 1
    });
});

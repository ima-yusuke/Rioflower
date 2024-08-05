let preventUnloadTracking = false;
let isPopState = false;

// ボタンクリックイベントを監視（question→checkに遷移時）
const SEND_BTN = document.getElementById('send-btn');
if (SEND_BTN != null) {
    SEND_BTN.addEventListener('click', function(event) {
        preventUnloadTracking = true; // ボタンクリックによる遷移では記録をスキップ
    });
}

// ボタンクリックイベントを監視（question→topに遷移時）
const BACK_START_BTN = document.getElementById('back-start-btn');
if (BACK_START_BTN != null) {
    BACK_START_BTN.addEventListener('click', function(event) {
        preventUnloadTracking = true; // ボタンクリックによる遷移では記録をスキップ
    });
}

// ボタンクリックイベントを監視（headerImg→topに遷移時）
const HEADER_IMG = document.getElementById('header_img');
if (HEADER_IMG != null) {
    HEADER_IMG.addEventListener('click', function(event) {
        preventUnloadTracking = true; // ボタンクリックによる遷移では記録をスキップ
    });
}

//ブラウザの戻るボタンや進むボタンが押されたときにフラグを立てる
window.addEventListener('popstate', function(event) {
    isPopState = true;
});

// beforeunloadイベントの設定
window.addEventListener('beforeunload', function(event) {
    if (preventUnloadTracking || isPopState) {
        // ボタンクリックまたはブラウザボタンでの遷移の場合は記録をスキップ
        return;
    }

    // ページ離脱イベントを記録
    gtag('event', "テスト", {
        'event_category': 'ページ離脱',
        'event_label': 'ページ離脱',
        'value': 1
    });
});

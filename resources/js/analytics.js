
// グローバルスコープで変数を定義
let preventUnloadTracking =false;

// セッションストレージからフラグを取得
if(sessionStorage.getItem('nickNameFlag')===true){
    preventUnloadTracking = true;
    sessionStorage.removeItem('nickNameFlag');
}

if(sessionStorage.getItem('topFlag')===true) {
    preventUnloadTracking = true;
    sessionStorage.removeItem('topFlag');
}

// questionページでのbeforeunloadイベントの設定
if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {
    window.addEventListener('beforeunload', function(event) {

        // preventUnloadTrackingがtrueなら記録をスキップ
        if (preventUnloadTracking) {
            return;
        }

        // ページ離脱イベントを記録
        gtag('event', "カウント離脱数", {
            'event_category': 'ページ離脱',
            'event_label': 'ページ離脱',
            'value': 1
        });
    });

    // ボタンクリックイベントを監視（question→checkに遷移時）
    const SEND_BTN = document.getElementById('send-btn');
    if (SEND_BTN != null) {
        SEND_BTN.addEventListener('click', function(event) {
            sessionStorage.setItem('preventUnloadTracking', 'true'); // セッションストレージにフラグを設定
        });
    }
}

preventUnloadTracking = false; // フラグをリセット

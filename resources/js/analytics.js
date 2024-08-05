let preventUnloadTracking = false;

// ボタンクリックイベントを監視（nickname→questionに遷移時）
const SHOW_QUESTION_BTN = document.getElementById('nickname_button');
if (SHOW_QUESTION_BTN!=null){
    SHOW_QUESTION_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });
}

console.log(preventUnloadTracking);

// 現在のURLをチェックして、特定のURLでのみbeforeunloadイベントを設定
if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {

    window.addEventListener('beforeunload', function(event) {
        // ボタンのクリックで遷移する場合は記録をスキップ
        if (preventUnloadTracking) {
            return;
        }

        // ページ離脱イベントを記録
        gtag('event', "カウント", {
            'event_category': 'ページ離脱',
            'event_label': 'ページ離脱',
            'value': 1
        });
    });

    // ボタンクリックイベントを監視（question→checkに遷移時）
    const SEND_BTN = document.getElementById('send-btn');
    if (SEND_BTN!=null){
        SEND_BTN.addEventListener('click', function(event) {
            // ボタンクリックによる遷移では記録をスキップ
            preventUnloadTracking = true;
        });
    }


    // ボタンクリックイベントを監視（question→topに遷移時）
    const BACK_START_BTN = document.getElementById(' back-start-btn');
    if(BACK_START_BTN!=null) {
        BACK_START_BTN.addEventListener('click', function (event) {
            // ボタンクリックによる遷移では記録をスキップ
            preventUnloadTracking = true;
        });
    }

}

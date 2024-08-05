let preventUnloadTracking = false;

// ボタンクリックイベントを監視（nickname→questionに遷移時）
const SHOW_QUESTION_BTN = document.getElementById('nickname_button');
SHOW_QUESTION_BTN.addEventListener('click', function(event) {
    // ボタンクリックによる遷移では記録をスキップ
    sessionStorage.setItem('preventUnloadTracking', true);
    preventUnloadTracking = true;
});

// 現在のURLをチェックして、特定のURLでのみbeforeunloadイベントを設定
if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {

    window.addEventListener('beforeunload', function(event) {
        // ボタンのクリックで遷移する場合は記録をスキップ
        if (preventUnloadTracking) {
            return;
        }

        if (sessionStorage.getItem('preventUnloadTracking')) {
            sessionStorage.removeItem('preventUnloadTracking');
            return;
        }

        // ページ離脱イベントを記録
        gtag('event', "離脱カウント", {
            'event_category': 'ページ離脱',
            'event_label': 'ページ離脱',
            'value': 1
        });
    });

    // ボタンクリックイベントを監視（question→checkに遷移時）
    const SEND_BTN = document.getElementById('send-btn');
    SEND_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });

    // ボタンクリックイベントを監視（question→topに遷移時）
    const BACK_START_BTN = document.getElementById(' back-start-btn');
    BACK_START_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });

    // ボタンクリックイベントを監視（top→nicknameに遷移時）
    const SHOW_NICKNAME_BTN = document.getElementById('start_question');
    SHOW_NICKNAME_BTN.addEventListener('click', function(event) {
        // ボタンクリックによる遷移では記録をスキップ
        preventUnloadTracking = true;
    });

}

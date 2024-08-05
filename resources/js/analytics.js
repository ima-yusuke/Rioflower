// let preventUnloadTracking = false;
//
// if (sessionStorage.getItem('analyticsFlag') === 'true') {
//     preventUnloadTracking = true;
//     sessionStorage.removeItem('analyticsFlag');
// }
//
//
// // 現在のURLをチェックして、特定のURLでのみbeforeunloadイベントを設定
// if (window.location.href.startsWith("https://test.flaver-rio.com/question")) {
//
//     window.addEventListener('beforeunload', function(event) {
//         // ボタンのクリックで遷移する場合は記録をスキップ
//         if (preventUnloadTracking) {
//             return;
//         }
//
//         // ページ離脱イベントを記録
//         gtag('event', "カウント", {
//             'event_category': 'ページ離脱',
//             'event_label': 'ページ離脱',
//             'value': 1
//         });
//     });
//
//     // ボタンクリックイベントを監視（question→checkに遷移時）
//     const SEND_BTN = document.getElementById('send-btn');
//     if (SEND_BTN!=null){
//         SEND_BTN.addEventListener('click', function(event) {
//             // ボタンクリックによる遷移では記録をスキップ
//             preventUnloadTracking = true;
//         });
//     }
// }
window.addEventListener('beforeunload', function(event) {

    // ページ離脱イベントを記録
    gtag('event', "カウントテスト用", {
        'event_category': 'ページ離脱',
        'event_label': 'ページ離脱',
        'value': 1
    });
});

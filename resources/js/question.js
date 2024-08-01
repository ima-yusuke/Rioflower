import "flowbite";
import Quill from "quill";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// 質問画面
const QUESTION_CONTAINER = document.getElementById('question_container');
const QUESTION_BOX = document.getElementById('question');
const QUESTION_INDEX = document.getElementById('question_num');
const QUESTION_IMG_CONTAINER = document.getElementById("question_img");
const QUESTION_TEXT = document.getElementById('question_text');
const QUESTION_ANSWERS_CONTAINER = document.getElementById('question_answers_container');
const BACK_BTN = document.getElementById("back_btn");
let analyticsFlag = true;
// 座標
let screenCenterX = window.innerWidth / 2; // 画面全体の中心のx座標
let questionBoxCenterX = 0;//質問コンテナのx座標を保存
let screenCenterY = window.innerHeight / 2; // 画面全体の中心のY座標
let questionBoxCenterY = 0//質問コンテナの中心のY座標
let tmpY = 0;

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm_container");
const CONFIRM_TITLE = document.getElementById("confirm_title");
const CONFIRM_BOX = document.getElementById("confirm");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("confirm_box");
const SHOW_RESULT_BTN = document.getElementById("show_result_btn");

// 結果画面
const RESULT_CONTAINER = document.getElementById('result_container')
const RESULT_P_NAME = document.getElementById("result_p_name");
const RESULT_P_PRICE = document.getElementById("result_p_price");
const RESULT_IMG = document.getElementById("result_img");
const OPEN_MODAL_BTN = document.getElementById("open_modal_btn");
let PRODUCT_NUM = document.getElementById("product-id");
const SEND_BTN = document.getElementById("send-btn");
const BACK_START_BTN = document.getElementById("back-start-btn");
const OTHER_IMG_CONTAINER = document.getElementById("other_images_container");
let quill = null;// Quillインスタンスを保持する変数
let purchaseProductId = null;

// タイム
let fadeinAnswerTime = 300; //1つの回答選択肢に対するfadein
let fadeoutTime = 700; //全ての回答選択肢のfadeout・質問→確認時にimgのfadeout・質問コンテナのfadeout
let fadeinTime = 700; //初回の質問画面fadein(上記fadeoutTime終了後に実行のためのtime)・確認コンテナのfadein
let moveTime = 1000; //コンテナの移動時間(質問・確認）

// 配列
let oldSrcArray = [QUESTION_IMG_CONTAINER.querySelector('img.back').src];// 質問画面で画像のsrcを保存する配列
let selectedAnswersArray = [];// 選択した回答のindexを保存する配列
let scoreArray =[];// スコアを保存する配列

// 現在の質問番目
let currentQuestionIdx = 0;

// 何問目まで回答したか
let questionCount = 0;

//戻るボタンクリックするとfalseになる
let flag = true;

// --------------------------------------[⓪ロード画面]--------------------------------------
if (sessionStorage.getItem('scoreData') == null) {
    document.addEventListener("DOMContentLoaded", function() {
        const LOADING = document.getElementById('loading');
        const QUESTION_CONTENT = document.getElementById('question-content');
        QUESTION_CONTENT.classList.remove('hide'); // 質問画面を表示
        setTimeout(() => {
            LOADING.classList.add('fade-out'); // ローディング画面をフェードアウト
            QUESTION_CONTENT.classList.add('fade-in'); // 質問画面をフェードイン
        }, 1000);

        setTimeout(() => {
            LOADING.classList.add('hide'); // ローディング画面を非表示
        }, 1500);
    });
} else {
    // ロード画面を非表示
    const LOADING = document.getElementById('loading');
    const QUESTION_CONTENT = document.getElementById('question-content');
    LOADING.classList.add('hide');
    QUESTION_CONTENT.classList.remove('hide');
}

// --------------------------------------[①質問開始]--------------------------------------
function StartQuiz() {
    RESULT_CONTAINER.classList.add('hide')
    QUESTION_CONTAINER.classList.remove('hide')
    ShowQuestion()
    ShowCurrentQstNum()
}

StartQuiz()
// ----------------------------------[②残り質問数計算＆表示]----------------------------------
function ShowCurrentQstNum(){
    let questionLength = questions.length;
    let currentQuestionNum = document.getElementById("question_num");
    currentQuestionNum.innerText =  Number(currentQuestionIdx+1)+"/"+questionLength;
}
// -------------------------------------[③質問&回答作成]-------------------------------------
function ShowQuestion(choiceId) {

    // 質問作成
    QUESTION_TEXT.innerText = questions[currentQuestionIdx]["text"]



    // 確認画面から来た場合
    if(questions.length === selectedAnswersArray.length){
        setTimeout(() => {
            ShowReQuestion(); //確認画面から来た場合
        },50);
    }else{
        //２問目以降は前回の回答のフェードアウトが終わった後に次の処理を行う
        setTimeout(() => {
            // transitionスタイルをリセット
            QUESTION_BOX.style.transition = '';
            QUESTION_IMG_CONTAINER.style.transition = '';

            //診断開始の1問目以外でいずれか実行され画像表示させる
            if (currentQuestionIdx > 0 && choiceId != null) { //回答選択時
                ShowMaxImg(choiceId);
            } else if (flag===false) { //戻るボタンクリックし1問目以外に戻る場合
                ShowMaxImg();
            }

            // 回答選択肢作成
            CreateAnswers();
        },fadeinTime+50);
    }

    console.log(currentQuestionIdx)
    console.log(questionCount)
}
// ---------------------------------------[④回答選択]---------------------------------------
function SelectAnswer(idx,choiceId) {

    // 配列に選択されたボタンのindexを追加もしくはindexを更新
    if(questions.length !== selectedAnswersArray.length){
        selectedAnswersArray.push(idx);
    }else{
        selectedAnswersArray[currentQuestionIdx] = idx;
    }

    // まだ残りの質問があるかチェック（あれば新たな質問作成、なければ確認画面へ）
    if (questions.length !== selectedAnswersArray.length ) {

        if(questionCount===currentQuestionIdx){
            questionCount++;
            analyticsFlag = true;
        }
        currentQuestionIdx++
        DeleteQuestionAnswers()
        ShowCurrentQstNum()
        ShowQuestion(choiceId)
    } else {
        OnCalScore(choiceId);
        ShowConfirm()
    }
}
// -------------------------------------[⑤確認画面の表示]-------------------------------------
function ShowConfirm(){

    // スクロールを無効化
    DisableScroll();

    // クリックを無効化
    DisableClicks();

    //①画像のフェードアウト
    QUESTION_IMG_CONTAINER.style.opacity = '0';
    QUESTION_IMG_CONTAINER.style.transition = `opacity ${fadeoutTime}ms ease`;
    QUESTION_TEXT.style.opacity = '0';
    QUESTION_TEXT.style.transition = `opacity ${fadeoutTime}ms ease`;
    QUESTION_ANSWERS_CONTAINER.style.opacity = '0';
    QUESTION_ANSWERS_CONTAINER.style.transition = `opacity ${fadeoutTime}ms ease`;
    BACK_BTN.style.opacity = '0';
    QUESTION_INDEX.style.opacity = '0';

    //②画像が完全にフェードアウトするのを待つ
    setTimeout(() => {

        //x座標取得
        if(window.innerWidth < 768){
            questionBoxCenterY = QUESTION_BOX.getBoundingClientRect().top + QUESTION_BOX.offsetHeight / 2;//質問コンテナの中心のY座標
            let translateY = screenCenterY - questionBoxCenterY; // 差分を計算

            QUESTION_BOX.style.transform = `translateY(${translateY}px)`;
        }else{
            questionBoxCenterX = QUESTION_BOX.getBoundingClientRect().left + QUESTION_BOX.offsetWidth / 2;//質問コンテナの中心のx座標
            let translateX = screenCenterX - questionBoxCenterX; // 差分を計算

            QUESTION_BOX.style.transform = `translateX(${translateX}px)`;
        }

        //③質問コンテナを中心に移動
        QUESTION_BOX.style.transition = `transform ${moveTime}ms ease, opacity ${fadeoutTime}ms ease`;

        //④質問コンテナが中心に移動するのを待つ(moveTime)
        setTimeout(() => {

            //⑤フェードアウト開始
            QUESTION_BOX.style.opacity = "0"//

            //⑥フェードアウト処理を待つ
            setTimeout(() => {

                //初期値にリセット
                BACK_BTN.style.opacity = '1';
                QUESTION_INDEX.style.opacity = '1';
                QUESTION_IMG_CONTAINER.style.opacity = "";
                QUESTION_TEXT.style.opacity = "";
                QUESTION_ANSWERS_CONTAINER.style.opacity = "";
                QUESTION_BOX.style.opacity = "";
                QUESTION_BOX.style.transform = "";

                QUESTION_CONTAINER.classList.add('hide');

                // 確認画面表示アニメーション準備
                CONFIRM_CONTAINER.classList.remove("hide");
                CONFIRM_CONTAINER.style.opacity = "0";
                CONFIRM_CONTAINER.style.transition = `opacity ${fadeinTime}ms ease`;

                screenCenterY = window.innerHeight / 2; // 画面全体の中心のY座標更新

                DeleteConfirmContainer();
                CreateConfirmContainer();

                //⑦確認画面アニメーションで表示
                setTimeout(()=>{
                    CONFIRM_CONTAINER.style.opacity = "1";

                    if(window.innerWidth < 768) {
                        let confirmCenterY = CONFIRM_BOX.getBoundingClientRect().top + CONFIRM_BOX.offsetHeight / 2; // 確認画面の中心のY座標取得
                        let translateY = screenCenterY - confirmCenterY; // 中心に移動するための差分を計算
                        CONFIRM_BOX.style.transform = `translateY(${translateY}px)`;
                        tmpY = translateY;
                    }else{
                        let confirmCenterX = CONFIRM_BOX.getBoundingClientRect().left + CONFIRM_BOX.offsetWidth / 2; // 確認画面の中心のX座標取得
                        let translateX = screenCenterX - confirmCenterX; // 中心に移動するための差分を計算
                        CONFIRM_BOX.style.transform = `translateX(${translateX}px)`;
                    }
                    // // クリックを有効化
                    EnableClicks();

                    // スクロールを有効化
                    EnableScroll();

                },50)

            }, fadeoutTime); //QUESTION_BOXフェードアウトと同時に CONFIRM_CONTAINERフェードイン

        }, moveTime);

    }, fadeoutTime);
}
// ---------------------------------------[⑥結果の表示]---------------------------------------
const CURTAIN_LEFT = document.getElementById('curtain-left');
const CURTAIN_RIGHT = document.getElementById('curtain-right');

SHOW_RESULT_BTN.addEventListener("click",ShowResult);

function ShowResult() {
    // Cookieのリセット
    document.addEventListener('DOMContentLoaded', function() {
        // XSRF-TOKEN クッキーを削除する
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';

        // laravel_session クッキーを削除する
        document.cookie = 'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
    });
    if (sessionStorage.getItem('scoreData') !== null) {
        let scoreArray = sessionStorage.getItem('scoreData');
        sessionStorage.setItem('scoreData', scoreArray);
    } else {
        sessionStorage.setItem('scoreData', JSON.stringify(scoreArray));
    }
    // カーテンを閉じる
    if (window.innerWidth < 768) {
        CURTAIN_LEFT.classList.remove('h-0')
        CURTAIN_RIGHT.classList.remove('h-0')
        CURTAIN_LEFT.style.height = '50%';
        CURTAIN_RIGHT.style.height = '50%';
    } else {
        CURTAIN_LEFT.classList.remove('md:w-0')
        CURTAIN_RIGHT.classList.remove('md:w-0')
        CURTAIN_LEFT.classList.add('md:w-1/2');
        CURTAIN_RIGHT.classList.add('md:w-1/2');
    }

    // ローディング画面を表示
    setTimeout(() => {
        let LOADING = document.getElementById('loading');
        let QUESTION_CONTENT = document.getElementById('question-content');
        let LOADING_TEXT = document.getElementById('loading_text');

        QUESTION_CONTENT.classList.remove('hide'); // 質問画面を表示
        LOADING.classList.remove('hide'); // ローディング画面を表示
        LOADING.classList.remove('fade-out'); // ローディング画面のフェードアウトをリセット
        QUESTION_CONTENT.classList.remove('fade-in'); // 質問画面のフェードインをリセット
        LOADING_TEXT.innerText = sessionStorage.getItem('nickname') + 'さんのおすすめ商品を探しています...';

        setTimeout(() => {
            LOADING.classList.add('fade-out'); // ローディング画面をフェードアウト
            QUESTION_CONTENT.classList.add('fade-in'); // 質問画面をフェードイン
        }, 2000);

        setTimeout(() => {
            LOADING.classList.add('hide'); // ローディング画面を非表示
        }, 2500);
    },1000);


    // カーテンが閉じた後に画面を切り替え
    setTimeout(() => {
        CONFIRM_CONTAINER.classList.add('hide');
        RESULT_CONTAINER.classList.add('curtain-fade-in');
        RESULT_CONTAINER.classList.remove('hide');

        // フェードイン
        setTimeout(() => {
            RESULT_CONTAINER.classList.remove('curtain-fade-in')
            RESULT_CONTAINER.classList.add('curtain-show');
        }, 1000);

        // 結果画面作成
        CreateResult(scoreArray)
        let productId = scoreArray[0]["product_id"];
        ShowQuill(productId);

        // カーテンのクラスをリセット
        setTimeout(() => {
            if (window.innerWidth < 768) {
                CURTAIN_LEFT.style.height = '';
                CURTAIN_RIGHT.style.height = '';
                CURTAIN_RIGHT.classList.add('h-0');
                CURTAIN_LEFT.classList.add('h-0');
            } else {
                CURTAIN_LEFT.classList.remove('md:w-1/2');
                CURTAIN_RIGHT.classList.remove('md:w-1/2');
                CURTAIN_RIGHT.classList.add('md:w-0');
                CURTAIN_LEFT.classList.add('md:w-0');
            }
        }, 1000);
    }, 3500);
}
// --------------------------------------[質問画面/機能]--------------------------------------
//[CREATE] 回答作成
function CreateAnswers(){

    ShowBackBtn();

    let choicesArray = questions[currentQuestionIdx].choices;

    if (questions.length === selectedAnswersArray.length){
        DisableClicks();
    }

    choicesArray.forEach((choice,idx) => {

        const ANSWER_BTN = document.createElement('button')
        const ANSWER_TEXT = document.createElement('span')
        const ARROW_TEXT = document.createElement('span')

        ANSWER_TEXT.innerText = choice["text"];
        ARROW_TEXT.innerText = "▶";

        ANSWER_BTN.appendChild(ANSWER_TEXT)
        ANSWER_BTN.appendChild(ARROW_TEXT);
        ANSWER_BTN.classList.add("answer-btn")

        QUESTION_ANSWERS_CONTAINER.appendChild(ANSWER_BTN)

        if (currentQuestionIdx === 0 &&flag === true && questions.length !== selectedAnswersArray.length) {
            setTimeout(() => {
                setTimeout(() => {
                    ANSWER_BTN.style.opacity = '1';
                    ANSWER_BTN.style.transform = 'translateY(0)';
                }, idx * fadeinAnswerTime);
            }, fadeinTime);
        } else {
            setTimeout(() => {
                ANSWER_BTN.style.opacity = '1';
                ANSWER_BTN.style.transform = 'translateY(0)';
            }, idx * fadeinAnswerTime);
        }

        // 選択肢をクリックをする
        ANSWER_BTN.addEventListener('click', ()=>{
            if(analyticsFlag === true){
                gtag('event', questions[currentQuestionIdx]["text"], {
                    'event_category': 'question' + currentQuestionIdx,
                    'event_label': 'choice_button' + idx,
                    'value': 10
                });
            }
            DisableClicks(); // クリックイベント無効化
            SelectAnswer(idx,choice["id"]);
        })
    })

    // 全ての回答選択肢のアニメーションが完了した後にクリックイベントを有効化
    if(questions.length !== selectedAnswersArray.length) {
        setTimeout(() => {
            EnableClicks();
        }, (choicesArray.length - 1) * fadeinAnswerTime + 50);
    }else{
        setTimeout(() => {
            EnableClicks();
        }, (choicesArray.length - 1) * fadeinAnswerTime +fadeinTime +50);
    }
}

//[CREATE] 画像作成 & flipアニメーション（回答選択時）
function CreateFlipImg(maxProductId) {

    // 最適な商品を取得
    let maxProduct = products.filter(product => product.id === maxProductId);

    // 現在新しく表示する画像のsrcを配列に保存
    oldSrcArray.push(maxProduct[0]["img"]);

    // 表 → 裏になる画像
    const BACK_IMAGE = document.createElement("img");
    BACK_IMAGE.classList.add("back");
    BACK_IMAGE.classList.add("question-img");
    BACK_IMAGE.src = oldSrcArray[currentQuestionIdx-1];

    // 裏 → 表になる画像
    const FRONT_IMAGE = document.createElement("img");
    FRONT_IMAGE.classList.add("front");
    FRONT_IMAGE.classList.add("question-img");
    FRONT_IMAGE.src = maxProduct[0]["img"];

    QUESTION_IMG_CONTAINER.appendChild(BACK_IMAGE);
    QUESTION_IMG_CONTAINER.appendChild(FRONT_IMAGE);
    QUESTION_IMG_CONTAINER.classList.add("content");

    // 描画時にクラスを追加してアニメーションをトリガー
    setTimeout(() => {
        BACK_IMAGE.classList.add("flip");
        FRONT_IMAGE.classList.add("flip");
    }, 50); // 50ミリ秒の遅延を設定

}

//[CREATE] 画像作成 & flipアニメーション（戻るボタンクリック時）
function CreateBackFlipImg() {

    // 表 → 裏になる画像
    const BACK_IMAGE = document.createElement("img");
    BACK_IMAGE.classList.add("back");
    BACK_IMAGE.classList.add("question-img");
    BACK_IMAGE.src = oldSrcArray[currentQuestionIdx+1];

    // 裏 → 表になる画像
    const FRONT_IMAGE = document.createElement("img");
    FRONT_IMAGE.classList.add("front");
    FRONT_IMAGE.classList.add("question-img");
    if(currentQuestionIdx===0){
        FRONT_IMAGE.src = oldSrcArray[0];
    }else{
        FRONT_IMAGE.src = oldSrcArray[currentQuestionIdx];
    }

    QUESTION_IMG_CONTAINER.appendChild(BACK_IMAGE);
    QUESTION_IMG_CONTAINER.appendChild(FRONT_IMAGE);
    QUESTION_IMG_CONTAINER.classList.add("content");

    // 描画時にクラスを追加してアニメーションをトリガー
    setTimeout(() => {
        BACK_IMAGE.classList.add("flip");
        FRONT_IMAGE.classList.add("flip");
        oldSrcArray.pop();
        flag = true;
    }, 50); // 50ミリ秒の遅延を設定
}

//[SHOW] スコア計算後、画像を表示
function ShowMaxImg(choiceId){
    // 最適な商品のIDを取得
    let maxProductId = OnCalScore(choiceId)

    // 現在の画像を削除
    DeleteQuestionImage();

    // 画像にアニメーション付与
    if (flag===true) {
        CreateFlipImg(maxProductId);
    }else{
        CreateBackFlipImg();
    }
}

//[SHOW] 戻るボタンの表示
function ShowBackBtn(){
    // 戻るボタンの表示・非表示切替
    if(currentQuestionIdx>0){
        BACK_BTN.classList.remove("hide");
    }else{
        BACK_BTN.classList.add("hide");
    }

    // 既存のイベントリスナーを削除してから追加する
    BACK_BTN.removeEventListener("click", OnBackBtn);
    BACK_BTN.addEventListener("click", OnBackBtn);
}

//[ON] 戻るボタンクリック時の処理
function OnBackBtn() {
    analyticsFlag = false;
    flag = false;
    currentQuestionIdx--;
    selectedAnswersArray.pop(); // 配列の末尾を削除
    for (let i = 0; i < scoreArray.length; i++) {
        scoreArray[i].score.pop(); // スコア配列の末尾を削除
    }
    DisableClicks();
    DeleteQuestionAnswers();
    ShowCurrentQstNum();
    ShowQuestion();
}

//[DELETE] 現在表示している回答を全て削除
function DeleteQuestionAnswers() {
    QUESTION_ANSWERS_CONTAINER.style.opacity = '1';
    QUESTION_ANSWERS_CONTAINER.style.transition = `opacity ${fadeoutTime}ms ease`;
    QUESTION_ANSWERS_CONTAINER.style.opacity = '0';

    // フェードアウトが完了する2秒後に要素を削除
    setTimeout(() => {
        while (QUESTION_ANSWERS_CONTAINER.firstChild) {
            QUESTION_ANSWERS_CONTAINER.removeChild(QUESTION_ANSWERS_CONTAINER.firstChild);
        }
        QUESTION_ANSWERS_CONTAINER.style.opacity = '1';
    }, fadeoutTime+50);
}

//[DELETE] 質問横の画像削除
function DeleteQuestionImage(){
    while(QUESTION_IMG_CONTAINER.firstChild){
        QUESTION_IMG_CONTAINER.removeChild(QUESTION_IMG_CONTAINER.firstChild);
    }
}

// --------------------------------------[確認画面/機能]--------------------------------------
//[CREATE] 確認画面作成（選択した回答と質問）
function CreateConfirmContainer(){

    // 選択した回答と質問を表示
    for(let i=0;i<questions.length;i++){

        // 質問と番号
        const CONFIRM_QUESTION_TEXT = document.createElement("p");
        if(i<10){
            CONFIRM_QUESTION_TEXT.innerText = "0"+(i+1)+"."+ questions[i]["text"];
        }else{
            CONFIRM_QUESTION_TEXT.innerText = (i+1)+"."+ questions[i]["text"];
        }
        CONFIRM_QUESTION_TEXT.style.color = "white";
        CONFIRM_QUESTION_TEXT.classList.add("confirm-question");

        // 回答
        const CONFIRM_ANSWER_BTN = document.createElement('button')
        const CONFIRM_ANSWER_TEXT = document.createElement('span')
        const CONFIRM_ARROW_TEXT = document.createElement("span");
        CONFIRM_ANSWER_TEXT.innerText = questions[i].choices[selectedAnswersArray[i]]["text"];
        CONFIRM_ARROW_TEXT.innerHTML = "修正"
        CONFIRM_ANSWER_BTN.classList.add("confirm-answer");
        CONFIRM_ANSWER_BTN.appendChild(CONFIRM_ANSWER_TEXT)
        CONFIRM_ANSWER_BTN.appendChild(CONFIRM_ARROW_TEXT);

        // 質問と回答をひとまとめに
        const CONFIRM_ANSWER_CONTAINER = document.createElement('div')
        CONFIRM_ANSWER_CONTAINER.appendChild(CONFIRM_QUESTION_TEXT);
        CONFIRM_ANSWER_CONTAINER.appendChild(CONFIRM_ANSWER_BTN)
        CONFIRM_ANSWER_CONTAINER.classList.add("confirm-answers-container")

        // コンテイナーに追加
        CONFIRM_ANSWERS_CONTAINER.appendChild(CONFIRM_ANSWER_CONTAINER);

        CONFIRM_ANSWER_BTN.addEventListener("click",function (){
            currentQuestionIdx = i;
            OnBackToQuestion();
        })
    }
}

//[SHOW] 質問画面表示（確認画面→質問画面の遷移後用）
function ShowReQuestion() {
    // 画像セット
    const CONFIRM_IMG = document.querySelector("#question_img img");
    CONFIRM_IMG.src = oldSrcArray[currentQuestionIdx];

    // 質問コンテナをフェードイン
    fadeIn(QUESTION_BOX, fadeinTime);

    // 画像コンテナをフェードイン
    fadeIn(QUESTION_IMG_CONTAINER, fadeinTime);

    // 上記fadeinが終了したら実行
    setTimeout(()=>{
        // 回答選択肢作成
        CreateAnswers();
    },fadeinTime)
}

//[ON] 確認画面→質問画面へ戻るアニメーション&&機能
function OnBackToQuestion() {
    //クリックを無効化
    DisableScroll();
    DisableClicks();

    SHOW_RESULT_BTN.style.display = 'none';

    // 既存の transform をリセット
    CONFIRM_BOX.style.transition = 'none';

    // 強制的にリフローを行う（ブラウザの再描画を強制）
    CONFIRM_BOX.offsetHeight;

    // トランジションを再度有効化
    CONFIRM_BOX.style.transition = `transform ${moveTime}ms ease, opacity ${fadeoutTime}ms ease`;

    // 質問回答とタイトルをフェードアウト
    CONFIRM_ANSWERS_CONTAINER.style.opacity = '0';
    CONFIRM_ANSWERS_CONTAINER.style.transition = `opacity ${fadeoutTime}ms ease`;
    CONFIRM_TITLE.style.opacity = '0';
    CONFIRM_TITLE.style.transition = `opacity ${fadeoutTime}ms ease`;

    // 新しい transform を適用
    setTimeout(() => {
        let currentRect = CONFIRM_BOX.getBoundingClientRect();

        if (window.innerWidth < 768) {
            let moveY = (questionBoxCenterY - (currentRect.top + currentRect.height / 2) )+ tmpY
            CONFIRM_BOX.style.transform = `translateY(${moveY}px)`;
        } else {
            let moveX = questionBoxCenterX - (currentRect.left + currentRect.width / 2);
            CONFIRM_BOX.style.transform = `translateX(${moveX}px)`;
        }

        // 移動が終わった後、フェードアウトを開始
        setTimeout(() => {
            CONFIRM_CONTAINER.style.opacity = "0";

            // 再度1000後に次の処理を実行するためのタイマーを設定
            setTimeout(() => {
                // 位置と透明度のリセット
                CONFIRM_BOX.style.transform = '';
                CONFIRM_BOX.style.transition = ''; // トランジションもリセット
                CONFIRM_ANSWERS_CONTAINER.style.opacity = '';
                CONFIRM_CONTAINER.style.opacity = '';
                CONFIRM_TITLE.style.opacity = '';
                SHOW_RESULT_BTN.style.display = 'block';

                CONFIRM_CONTAINER.classList.add("hide");
                QUESTION_CONTAINER.classList.remove('hide');
                QUESTION_BOX.style.opacity ="0";
                QUESTION_IMG_CONTAINER.style.opacity="0";
                DeleteQuestionAnswers();
                ShowCurrentQstNum();
                ShowQuestion();
                BACK_BTN.style.opacity = '0';
                BACK_BTN.classList.add("hide");

                EnableScroll();

            }, fadeoutTime);
        }, moveTime);
    }, fadeinTime); // 少し待ってから適用することでリセット後の新しいtransformを適用
}

//[DELETE] 現在表示している質問＆回答を全て削除（回答修正に対応するため）
function DeleteConfirmContainer(){
    while(CONFIRM_ANSWERS_CONTAINER.firstChild){
        CONFIRM_ANSWERS_CONTAINER.removeChild(CONFIRM_ANSWERS_CONTAINER.firstChild);
    }
}

// --------------------------------------[結果画面/機能]--------------------------------------
//[CREATE] 結果画面作成
function CreateResult(scoreArray){

    // プライオリティ計算
    OnCalPriority(scoreArray);

    // 1位の商品（トップ）
    ShowTopProduct(scoreArray);

    // 2位以下の商品作成
    CreateOtherImages(scoreArray);

    // 画像入れ替え
    OnSwapImg(scoreArray);

    // ニックネームを表示
    let nickname = sessionStorage.getItem('nickname');
    let nicknameTitle = document.getElementById('nickname_title');
    nicknameTitle.innerText = `\\${nickname}さんに合うおすすめ商品は/`;
}

//[CREATE] 2位以下の画像作成
function CreateOtherImages(scoreArray) {
    const ranks = ['第1位', '第2位', '第3位', '第4位'];
    if (scoreArray.length < 4) {
        for (let i=0; i<scoreArray.length; i++) {

            const div = document.createElement('div');

            if(i===0){
                div.classList.add('hidden');
            }else{
                div.classList.add('other-img-container');
            }
            div.setAttribute('data-id', '');

            // img 要素を作成
            const img = document.createElement('img');
            img.classList.add('otherImg', 'object-cover', 'rounded-full');

            // p 要素を作成
            const p = document.createElement('p');
            p.textContent = `【${ranks[i]}】`;

            // div に img と p を追加
            div.appendChild(img);
            div.appendChild(p);

            // コンテナに div を追加
            OTHER_IMG_CONTAINER.appendChild(div);
        }
    } else {
        for (let i=0; i<4; i++) {

            const div = document.createElement('div');

            if(i===0){
                div.classList.add('hidden');
            }else{
                div.classList.add('other-img-container');
            }
            div.setAttribute('data-id', '');

            // img 要素を作成
            const img = document.createElement('img');
            img.classList.add('otherImg', 'object-cover', 'rounded-full');

            // p 要素を作成
            const p = document.createElement('p');
            p.textContent = `【${ranks[i]}】`;

            // div に img と p を追加
            div.appendChild(img);
            div.appendChild(p);

            // コンテナに div を追加
            OTHER_IMG_CONTAINER.appendChild(div);
        }
    }
}

//[SHOW] 1位の商品を表示
function ShowTopProduct(scoreArray){
    let maxProduct = products.filter(product => product.id === scoreArray[0]["product_id"]);
    RESULT_P_NAME.innerText = maxProduct[0]["name"];
    RESULT_P_PRICE.innerText = `価格：${maxProduct[0].link["price"]}円`;
    RESULT_IMG.src = maxProduct[0]["img"];
    purchaseProductId = maxProduct[0]["id"];
}

//[SHOW] Quill表示
function ShowQuill(productId){

    // Quill表示
    quill = new Quill("#viewer", {
        //ツールバー無デザイン
        readOnly: true
    });

    let maxProduct = products.filter(product => product.id === productId);
    let details =maxProduct[0]["details"];

    let setData = [];

    if(details.length>0){
        details.forEach((value) => {
            // DBから取得したので文字列からJSON形式に戻す
            setData.push({"insert": JSON.parse(value["insert"]), "attributes": JSON.parse(value["attributes"])})
        })
    }

    //Quillデータをエディター内に表示
    quill.setContents(setData)
    setTimeout(() => {
        initializeQuillEditor();
    }, 0);
}

// [ON] 画像入れ替え
function OnSwapImg(scoreArray) {
    // 1~4位の商品（下3つの小さい画像）
    let otherImages = document.getElementsByClassName("otherImg");
    // フェード用wrapper
    let VIEWER = document.getElementById("viewer-wrapper");
    let RECOMMEND = document.getElementById("recommend-wrapper");

    if (scoreArray.length < 4) {
        for (let i=0; i<scoreArray.length; i++) {

            // スコア高い順に下の画像にsrcを付与
            let otherProduct = products.filter(product => product.id === scoreArray[i]["product_id"]);
            otherImages[i].src = otherProduct[0]["img"];

            // 表示商品の入れ替え
            otherImages[i].parentNode.addEventListener("click", function () {
                let clickedImg = otherImages[i];

                let hiddenElement = Array.from(otherImages).filter(image => image.parentNode.classList.contains('hidden'))[0];

                // フェードアウト
                RESULT_IMG.classList.add('fade-out');
                VIEWER.classList.remove('-z-10');
                VIEWER.classList.add('z-10');
                VIEWER.classList.add('fade-in');
                RECOMMEND.classList.add('fade-in');

                // フェードアウト完了後に画像を変更
                RESULT_IMG.addEventListener('transitionend', function onTransitionEnd1() {
                    RESULT_IMG.removeEventListener('transitionend', onTransitionEnd1);

                    hiddenElement.parentNode.classList.remove("hidden");
                    hiddenElement.parentNode.classList.add("other-img-container");

                    clickedImg.parentNode.classList.add("hidden");
                    clickedImg.parentNode.classList.remove("other-img-container");

                    DeleteQuill();
                    ShowQuill(otherProduct[0]["id"]);

                    RESULT_P_NAME.innerText = otherProduct[0]["name"];
                    RESULT_P_PRICE.innerText = `価格：${otherProduct[0].link["price"]}円`;
                    RESULT_IMG.src = otherProduct[0]["img"];

                    // フェードイン
                    RESULT_IMG.classList.remove('fade-out');
                    RESULT_IMG.classList.add('fade-in');
                    VIEWER.classList.remove('fade-in');
                    VIEWER.classList.add('fade-out');
                    RECOMMEND.classList.remove('fade-in');
                    RECOMMEND.classList.add('fade-out');

                    // フェードイン完了後にクラスを削除
                    RESULT_IMG.addEventListener('transitionend', function onTransitionEnd2() {
                        RESULT_IMG.removeEventListener('transitionend', onTransitionEnd2);
                        RESULT_IMG.classList.remove('fade-in');
                        VIEWER.classList.remove('z-10');
                        VIEWER.classList.add('-z-10');
                        VIEWER.classList.remove('fade-out');
                        RECOMMEND.classList.remove('fade-out');
                    });
                });

                // 購入商品のidを更新
                purchaseProductId = otherProduct[0]["id"];

                // メニューを閉じる
                NAV_MENU.classList.add('non-active');
                TOGGLE_HIDE.classList.add('hidden');
                TOGGLE_SHOW.classList.remove('hidden');
                MENU_OVERLAY.classList.add('hidden');
            });
        }
    } else {
        for (let i=0; i<4; i++) {

            // スコア高い順に下の画像にsrcを付与
            let otherProduct = products.filter(product => product.id === scoreArray[i]["product_id"]);
            otherImages[i].src = otherProduct[0]["img"];

            // 表示商品の入れ替え
            otherImages[i].parentNode.addEventListener("click", function () {
                let clickedImg = otherImages[i];

                let hiddenElement = Array.from(otherImages).filter(image => image.parentNode.classList.contains('hidden'))[0];

                // フェードアウト
                RESULT_IMG.classList.add('fade-out');
                VIEWER.classList.remove('-z-10');
                VIEWER.classList.add('z-10');
                VIEWER.classList.add('fade-in');
                RECOMMEND.classList.add('fade-in');

                // フェードアウト完了後に画像を変更
                RESULT_IMG.addEventListener('transitionend', function onTransitionEnd1() {
                    RESULT_IMG.removeEventListener('transitionend', onTransitionEnd1);

                    hiddenElement.parentNode.classList.remove("hidden");
                    hiddenElement.parentNode.classList.add("other-img-container");

                    clickedImg.parentNode.classList.add("hidden");
                    clickedImg.parentNode.classList.remove("other-img-container");

                    DeleteQuill();
                    ShowQuill(otherProduct[0]["id"]);

                    RESULT_P_NAME.innerText = otherProduct[0]["name"];
                    RESULT_P_PRICE.innerText = `価格：${otherProduct[0].link["price"]}円`;
                    RESULT_IMG.src = otherProduct[0]["img"];

                    // フェードイン
                    RESULT_IMG.classList.remove('fade-out');
                    RESULT_IMG.classList.add('fade-in');
                    VIEWER.classList.remove('fade-in');
                    VIEWER.classList.add('fade-out');
                    RECOMMEND.classList.remove('fade-in');
                    RECOMMEND.classList.add('fade-out');

                    // フェードイン完了後にクラスを削除
                    RESULT_IMG.addEventListener('transitionend', function onTransitionEnd2() {
                        RESULT_IMG.removeEventListener('transitionend', onTransitionEnd2);
                        RESULT_IMG.classList.remove('fade-in');
                        VIEWER.classList.remove('z-10');
                        VIEWER.classList.add('-z-10');
                        VIEWER.classList.remove('fade-out');
                        RECOMMEND.classList.remove('fade-out');
                    });
                });

                // 購入商品のidを更新
                purchaseProductId = otherProduct[0]["id"];

                // メニューを閉じる
                NAV_MENU.classList.add('non-active');
                TOGGLE_HIDE.classList.add('hidden');
                TOGGLE_SHOW.classList.remove('hidden');
                MENU_OVERLAY.classList.add('hidden');
            });
        }
    }
}

//[ON] 送信ボタンに購入商品のidを付与
OPEN_MODAL_BTN.addEventListener("click", function () {
    PRODUCT_NUM.setAttribute("value", purchaseProductId);
});

//[DELETE] Quill削除
function DeleteQuill(){
    quill.setContents([]);
}

// quill内のscrollアイコンの表示・非表示処理
function initializeQuillEditor() {
    let viewerContainer = document.getElementById('viewer');
    let viewerElement = document.querySelector('.ql-editor');
    const quillScrollElement = document.getElementById('quill-scroll');

    function updateScrollVisibility() {
        if (viewerElement.scrollHeight > viewerContainer.clientHeight) {
            quillScrollElement.style.display = 'block';
        } else {
            quillScrollElement.style.display = 'none';
        }
    }

    if (viewerElement) {
        viewerElement.addEventListener('scroll', function () {
            if (viewerElement.scrollTop === 0) {
                quillScrollElement.style.display = 'block';
            } else {
                quillScrollElement.style.display = 'none';
            }
        });
    }

    updateScrollVisibility();
}

// ----------------------------------------[スコア計算]----------------------------------------
//[ON] スコア計算（プライオリティなし/質問画面でのみ使用/最適な商品のproduct_idをreturn）
function OnCalScore(choiceId){

    // 戻るボタンクリック時
    if (flag===false){
        return scoreArray[0].product_id;
    }

    // 選択した選択肢の属性を取得
    let selectedChoiceAttributes = choiceAttributes.filter(choice => choice.choice_id === choiceId);

    for (let i = 0; i < products.length; i++) {
        let count = 0;

        // 商品（product_id)とそれに付随する属性を取得
        let productAttribute = productAttributes.filter(product=>product.product_id===products[i]["id"])

        // 選択した選択肢の属性と商品の属性を比較
        for (let b = 0; b < selectedChoiceAttributes.length; b++) {
            let some = productAttribute.some(
                product => product.attribute_id === selectedChoiceAttributes[b].attribute_id
            );

            // 一致するものがあればカウント
            if(some){
                count++;
                // countした属性を削除した配列を作成
                // productAttributes = productAttributes.filter(product => !(product.product_id == products[i]["id"] && product.attribute_id == selectedChoiceAttributes[b].attribute_id));
            }
        }

        if (questions.length === selectedAnswersArray.length ) {
            // 確認画面から変更した場合は更新
            let existingScoreObj = scoreArray.find(scoreObj => scoreObj.product_id === products[i]["id"]);
            existingScoreObj.score[currentQuestionIdx] = count;
        }else{
            // 確認画面でなく普通に回答した場合は追加
            if(scoreArray[i]==null){
                // 1問目
                scoreArray.push({"product_id":products[i]["id"],"score":[count]});
            }else{
                // 2問目以降
                let existingScoreObj = scoreArray.find(scoreObj => scoreObj.product_id === products[i]["id"]);
                existingScoreObj.score.push(count);
            }
        }
    }

    OnSortScore(scoreArray);
    console.log(scoreArray)
    return scoreArray[0].product_id;
}

//[ON] スコア計算（プライオリティ込/結果画面でのみ使用）
function OnCalPriority(scoreArray) {

    // // スコア配列にpriorityを追加
    // for (let i = 0; i < products.length; i++) {
    //     let existingScoreObj = scoreArray.find(scoreObj => scoreObj.product_id === products[i]["id"]);
    //     existingScoreObj.score.push(products[i]["priority"]);
    // }

    // 再度合計計算し並び替え
    OnSortScore(scoreArray,true);
}

//[ON] scoreArrayをスコア高い順に並び替え
function OnSortScore(scoreArray,priorityFlag) {
    scoreArray.sort((a, b) => {

        let sumA = 0
        a.score.forEach((num) => {
                sumA = sumA + num;
        });
        let sumB = 0;
        b.score.forEach((num) => {
            sumB = sumB + num;
        });

        // プライオリティ込/結果画面でのみ使用
        if(priorityFlag){
            let productA =products.find(product => product["id"] === a["product_id"]);
            let productB =products.find(product => product["id"] === b["product_id"]);
            sumA = sumA * productA["priority"];
            sumB = sumB * productB["priority"];
        }

        // 合計値で降順ソート
        return sumB - sumA;
    });
    console.log(scoreArray)
    return scoreArray;
}

SEND_BTN.addEventListener('click', function(event) {
    // バリデーションチェック
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const email = document.getElementById('customer-mail').value;

    // バリデーションチェック
    let errorMessages = [];
    if (name === "") {
        errorMessages.push("名前を入力してください");
    }
    if (address === "") {
        errorMessages.push("住所を入力してください");
    }
    if (email === "") {
        errorMessages.push("メールアドレスを入力してください");
    } else {
        // メールアドレスの形式チェック
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessages.push("メールアドレスの形式が正しくありません");
        }
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        event.preventDefault(); // フォーム送信を中止
        return;
    }

    window.onsubmit = function() {
        if (sessionStorage.hasOwnProperty("sent")) {
            sessionStorage.removeItem("sent");
        }
    }

    // フォームデータを取得
    let formData = new FormData(document.getElementById('form-id'));

    // リクエストを作成
    fetch('/submit-form', {
        method: 'POST',
        body: formData
    }).then(response => {
        // 成功時の処理
        if (response.ok) {
            return response.json(); // 必要に応じてレスポンスを処理
        }
        throw new Error('Network response was not ok.');
    }).then(data => {
        // レスポンスの処理
        console.log(data);
        // 成功後のリダイレクトなど
    }).catch(error => {
        // エラー処理
        console.error('There has been a problem with your fetch operation:', error);
    });
});

BACK_START_BTN.addEventListener("click",function(){
    sessionStorage.removeItem('scoreData');
    sessionStorage.removeItem('sent');
    sessionStorage.removeItem('nickname');
});

// / ----------------------------------------[その他機能]----------------------------------------
// クリックを無効化するための関数
function DisableClicks() {
    document.body.style.pointerEvents = 'none';
}

// クリックを有効化するための関数
function EnableClicks() {
    document.body.style.pointerEvents = 'auto';
}

// スクロールを無効化
function DisableScroll() {
    document.body.classList.add('no-scroll');
}

// スクロールを有効化
function EnableScroll() {
    document.body.classList.remove('no-scroll');
}

// フェードイン関数
function fadeIn(element, duration) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    setTimeout(() => {
        element.style.opacity = '1';
    }, 50);
}

//[SHOW] 結果画面再表示
function ReShowResult(scoreData) {
    // Cookieのリセット
    document.addEventListener('DOMContentLoaded', function() {
        // XSRF-TOKEN クッキーを削除する
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';

        // laravel_session クッキーを削除する
        document.cookie = 'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
    });

    let scoreArray = scoreData;

    QUESTION_CONTAINER.classList.add('hide');
    CONFIRM_CONTAINER.classList.add('hide');
    RESULT_CONTAINER.classList.remove('hide');
    CreateResult(scoreArray);

    let productId = scoreArray[0]["product_id"];
    ShowQuill(productId);
}

window.ReShowResult = ReShowResult;

// [結果画面]ナビゲーションバー
const NAV_TOGGLE_BUTTON = document.getElementById('navToggleButton');
const TOGGLE_HIDE = document.getElementById('toggleHide');
const TOGGLE_SHOW = document.getElementById('toggleShow');
const MENU_OVERLAY = document.getElementById('menuOverlay');
const NAV_MENU = document.getElementById('nav-menu');

if (NAV_TOGGLE_BUTTON && MENU_OVERLAY) {
    NAV_TOGGLE_BUTTON.addEventListener('click', () => {
        NAV_MENU.classList.toggle('non-active');
        TOGGLE_HIDE.classList.toggle('hidden');
        TOGGLE_SHOW.classList.toggle('hidden');
        MENU_OVERLAY.classList.toggle('hidden');
    });

    MENU_OVERLAY.addEventListener('click', () => {
        NAV_MENU.classList.add('non-active');
        TOGGLE_HIDE.classList.add('hidden');
        TOGGLE_SHOW.classList.remove('hidden');
        MENU_OVERLAY.classList.add('hidden');
    });
}

// メニュー以外の場所をクリックした時にメニューを閉じる
document.addEventListener('click', (event) => {
    if (!NAV_MENU.contains(event.target) && !NAV_TOGGLE_BUTTON.contains(event.target)) {
        NAV_MENU.classList.add('non-active');
        TOGGLE_HIDE.classList.add('hidden');
        TOGGLE_SHOW.classList.remove('hidden');
        MENU_OVERLAY.classList.add('hidden');
    }
});

// スクロール時のアイコン表示切り替え
function handlePageScroll() {
    const navScrollElement = document.getElementById('nav-scroll');

    if (window.scrollY === 0) {
        navScrollElement.style.display = 'block';
    } else {
        navScrollElement.style.display = 'none';
    }
}

// スクロールイベントリスナーを追加
window.addEventListener('scroll', handlePageScroll);

// 初回ロード時のスクロール位置をチェック
handlePageScroll();

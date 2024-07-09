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
let currentQuestionIdx = 0;// 現在の質問番目
let oldSrcArray = [QUESTION_IMG_CONTAINER.querySelector('img.back').src];
let flag = true;
let screenCenterX = window.innerWidth / 2; // 画面全体の中心のx座標
let questionBoxCenterX = 0;//質問コンテナのx座標を保存
let screenCenterY = window.innerHeight / 2; // 画面全体の中心のY座標
let questionBoxCenterY = 0//質問コンテナの中心のY座標

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm_container");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("confirm_box");
const SHOW_RESULT_BTN = document.getElementById("show_result_btn");

// 結果画面
const RESULT_CONTAINER = document.getElementById('result_container')
const RESULT_P_NAME = document.getElementById("result_p_name");
const RESULT_IMG = document.getElementById("result_img");
const OPEN_MODAL_BTN = document.getElementById("open_modal_btn");
let PRODUCT_NUM = document.getElementById("product-id");
const SEND_BTN = document.getElementById("send-btn");
const BACK_START_BTN = document.getElementById("back-start-btn");
const OTHER_IMG_CONTAINER = document.getElementById("other_images_container");
let quill = null;// Quillインスタンスを保持する変数
let purchaseProductId = null;

// 選択した回答のindexを保存
let selectedAnswersArray = [];

// スコア
let scoreArray =[];

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
    currentQuestionNum.innerText =  Number(currentQuestionIdx+1)+"問目/"+questionLength+"問中";
}
// -------------------------------------[③質問&回答作成]-------------------------------------
function ShowQuestion(choiceId) {

    // 質問作成
    QUESTION_TEXT.innerText = questions[currentQuestionIdx]["text"]

    // 質問コンテナをフェードイン
    fadeIn(QUESTION_BOX, 2);
    // 画像コンテナをフェードイン
    fadeIn(QUESTION_IMG_CONTAINER, 2);

    // フェードインが終わった後に次の処理を行う
    setTimeout(() => {
        // transitionスタイルをリセット
        QUESTION_BOX.style.transition = '';
        QUESTION_IMG_CONTAINER.style.transition = '';

        // 回答選択肢作成
        CreateAnswers();

        // 最適な画像を表示
        if (currentQuestionIdx > 0 && choiceId != null) {
            ShowMaxImg(choiceId);
        } else if (currentQuestionIdx > 0) {
            ShowMaxImg();
        } else if (currentQuestionIdx === 0 && flag === false) {
            ShowMaxImg();
        }
    }, 500);

}

function fadeIn(element, duration) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}s ease`;
    setTimeout(() => {
        element.style.opacity = '1';
    }, 50);
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
        currentQuestionIdx++
        DeleteQuestionAnswers()
        ShowCurrentQstNum()
        ShowQuestion(choiceId)
    } else {
        OnCalScore(choiceId);

        // デバイスによりアニメーションを変更
        if(window.innerWidth < 768){
            ShowConfirm()
            CONFIRM_CONTAINER.classList.add("min-h-screen")
        }else{
            if (CONFIRM_CONTAINER.classList.contains("min-h-screen")) {
                CONFIRM_CONTAINER.classList.remove("min-h-screen")
            }
            ShowConfirm()
        }
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
    QUESTION_IMG_CONTAINER.style.transition = 'opacity 2s ease'; // 2秒でフェードアウト
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
        QUESTION_BOX.style.transition = 'transform 1.5s ease, opacity 2s ease'; // 移動に1.5秒かけて中心に移動、フェードアウトに2秒

        //④質問コンテナが中心に移動するのを待つ(1.5ｓ）
        setTimeout(() => {

            //⑤フェードアウト開始（2s/初期値opacity1）
            QUESTION_BOX.style.opacity = "0"//

            //⑥フェードアウト処理を待つ(1.6sかけて）
            setTimeout(() => {

                //初期値にリセット
                BACK_BTN.style.opacity = '1';
                QUESTION_INDEX.style.opacity = '1';
                QUESTION_IMG_CONTAINER.style.opacity = "";
                QUESTION_BOX.style.opacity = "";
                QUESTION_BOX.style.transform = "";

                QUESTION_CONTAINER.classList.add('hide');

                // 確認画面表示アニメーション準備
                CONFIRM_CONTAINER.classList.remove("hide");
                CONFIRM_CONTAINER.style.opacity = "0";
                CONFIRM_CONTAINER.style.transition = 'opacity 2s ease'; // 2秒でフェードイン

                screenCenterY = window.innerHeight / 2; // 画面全体の中心のY座標更新

                DeleteConfirmContainer();
                CreateConfirmContainer();

                //⑦確認画面アニメーションで表示
                setTimeout(()=>{
                    CONFIRM_CONTAINER.style.opacity = "1";
                    // クリックを有効化
                    EnableClicks();

                    // スクロールを有効化
                    EnableScroll();
                },50)

            }, 1600); //QUESTION_BOXフェードアウトと同時に CONFIRM_CONTAINERフェードイン

        }, 1500);

    }, 2000);
}

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
// ---------------------------------------[⑥結果の表示]---------------------------------------
const CURTAIN_LEFT = document.getElementById('curtain-left');
const CURTAIN_RIGHT = document.getElementById('curtain-right');

SHOW_RESULT_BTN.addEventListener("click",ShowResult);

function ShowResult() {
    if (sessionStorage.getItem('scoreData') !== null) {
        let scoreArray = sessionStorage.getItem('scoreData');
        sessionStorage.setItem('scoreData', scoreArray);
    } else {
        sessionStorage.setItem('scoreData', JSON.stringify(scoreArray));
    }

    CURTAIN_LEFT.classList.remove('hide');
    CURTAIN_RIGHT.classList.remove('hide');
    setTimeout(() => {
        // カーテンを閉じる
        CURTAIN_LEFT.classList.add('close-left');
        CURTAIN_RIGHT.classList.add('close-right');
        RESULT_CONTAINER.classList.add('curtain-fade-in');
        document.body.classList.add('overflow-y-hidden');
        // カーテンが閉じた後に画面を切り替え
        setTimeout(() => {
            CONFIRM_CONTAINER.classList.add('hide');
            RESULT_CONTAINER.classList.remove('hide');

            CreateResult(scoreArray)

            let productId = scoreArray[0]["product_id"];
            ShowQuill(productId);

            // カーテンのクラスをリセット
            setTimeout(() => {
                CURTAIN_LEFT.classList.remove('close-left', 'open-left');
                CURTAIN_RIGHT.classList.remove('close-right', 'open-right');
                CURTAIN_LEFT.classList.add('curtain-left');
                CURTAIN_RIGHT.classList.add('curtain-right');
            }, 1000);
            setTimeout(() => {
                RESULT_CONTAINER.classList.remove('curtain-fade-in');
                RESULT_CONTAINER.classList.add('curtain-show');
            }, 1000);
            setTimeout(() => {
                CURTAIN_LEFT.classList.add('hide');
                CURTAIN_RIGHT.classList.add('hide');
                document.body.classList.remove('overflow-x-hidden');
                document.body.classList.remove('overflow-y-hidden');
            }, 1500);
        }, 1000);
    }, 0);
}

// --------------------------------------[質問画面/機能]--------------------------------------
//[CREATE] 回答作成
function CreateAnswers(){

    ShowBackBtn();

    let choicesArray = questions[currentQuestionIdx].choices;

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

        setTimeout(() => {
            ANSWER_BTN.style.opacity = '1';
            ANSWER_BTN.style.transform = 'translateY(0)';
        }, idx * 300);

        // 選択肢をクリックをする
        ANSWER_BTN.addEventListener('click', ()=>{
            SelectAnswer(idx,choice["id"]);
        })
    })
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
    flag = false;
    currentQuestionIdx--;
    selectedAnswersArray.pop(); // 配列の末尾を削除
    for (let i = 0; i < scoreArray.length; i++) {
        scoreArray[i].score.pop(); // スコア配列の末尾を削除
    }

    DeleteQuestionAnswers();
    ShowCurrentQstNum();
    ShowQuestion();
}

//[DELETE] 現在表示している回答を全て削除
function DeleteQuestionAnswers() {
    while (QUESTION_ANSWERS_CONTAINER.firstChild) {
        QUESTION_ANSWERS_CONTAINER.removeChild(QUESTION_ANSWERS_CONTAINER.firstChild)
    }
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

        // 回答
        const CONFIRM_ANSWER_BTN = document.createElement('button')
        const CONFIRM_ANSWER_TEXT = document.createElement('span')
        const CONFIRM_ARROW_TEXT = document.createElement("span");
        CONFIRM_ANSWER_TEXT.innerText = questions[i].choices[selectedAnswersArray[i]]["text"];
        CONFIRM_ARROW_TEXT.innerText = "▶"
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

//[ON] 確認画面→質問画面へ戻るアニメーション&&機能
function OnBackToQuestion(){

    // スクロールを無効化
    DisableScroll();

    DisableClicks();

    if(window.innerWidth < 768){
        let moveY = questionBoxCenterY - screenCenterY;
        CONFIRM_CONTAINER.style.transform = `translateY(${moveY}px)`;
    }else{
        let moveX = questionBoxCenterX - screenCenterX;
        CONFIRM_CONTAINER.style.transform = `translateX(${moveX}px)`;
    }
    CONFIRM_CONTAINER.style.transition = 'transform 1.5s ease, opacity 2s ease'; // 移動に1.5秒かけて中心に移動、フェードアウトに2秒
    SHOW_RESULT_BTN.style.opacity = '0';

    // 移動が終わった後、フェードアウトを開始
    setTimeout(() => {
        CONFIRM_CONTAINER.style.opacity = "0";

        // 再度1.6s秒後に次の処理を実行するためのタイマーを設定
        setTimeout(() => {
            // 位置と透明度のリセット
            CONFIRM_CONTAINER.style.transform = '';
            CONFIRM_CONTAINER.style.transition = ''; // トランジションもリセット
            CONFIRM_CONTAINER.style.opacity = '';
            SHOW_RESULT_BTN.style.opacity = '1';

            CONFIRM_CONTAINER.classList.add("hide");
            QUESTION_CONTAINER.classList.remove('hide');
            DeleteQuestionAnswers();
            ShowCurrentQstNum();
            ShowQuestion();
            BACK_BTN.style.opacity = '0';
            BACK_BTN.classList.add("hide");

            EnableScroll();
            EnableClicks();

        }, 1600);
    }, 1500);
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
}

//[CREATE] 2位以下の画像作成
function CreateOtherImages(scoreArray) {
    const ranks = ['第1位', '第2位', '第3位', '第4位'];

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
}

//[SHOW] 1位の商品を表示
function ShowTopProduct(scoreArray){
    let maxProduct = products.filter(product => product.id === scoreArray[0]["product_id"]);
    RESULT_P_NAME.innerText = maxProduct[0]["name"]
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
}

// [ON] 画像入れ替え
function OnSwapImg(scoreArray) {
    // 1~4位の商品（下3つの小さい画像）
    let otherImages = document.getElementsByClassName("otherImg");
    // フェード用wrapper
    let VIEWER = document.getElementById("viewer-wrapper");
    let RECOMMEND = document.getElementById("recommend-wrapper");

    for (let i = 0; i < scoreArray.length; i++) {

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

//[ON] 送信ボタンに購入商品のidを付与
OPEN_MODAL_BTN.addEventListener("click", function () {
    PRODUCT_NUM.setAttribute("value", purchaseProductId);
});

//[DELETE] Quill削除
function DeleteQuill(){
    quill.setContents([]);
}

// ----------------------------------------[スコア計算]----------------------------------------
//[ON] スコア計算（プライオリティなし/質問画面でのみ使用/最適な商品のproduct_idをreturn）
function OnCalScore(choiceId){

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
    // console.log(productAttributes)
    return scoreArray[0].product_id;
}

//[ON] スコア計算（プライオリティ込/結果画面でのみ使用）
function OnCalPriority(scoreArray) {

    // スコア配列にpriorityを追加
    for (let i = 0; i < products.length; i++) {
        let existingScoreObj = scoreArray.find(scoreObj => scoreObj.product_id === products[i]["id"]);
        existingScoreObj.score.push(products[i]["priority"]);
    }

    // 再度合計計算し並び替え
    OnSortScore(scoreArray);
}

//[ON] scoreArrayをスコア高い順に並び替え
function OnSortScore(scoreArray) {
    scoreArray.sort((a, b) => {

        let sumA = 0
        a.score.forEach((num) => {
                sumA = sumA + num;
        });
        let sumB = 0;
        b.score.forEach((num) => {
            sumB = sumB + num;
        });

        // 合計値で降順ソート
        return sumB - sumA;
    });
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
});

//[SHOW] 結果画面再表示
function ReShowResult(scoreData) {
    let scoreArray = scoreData;

    QUESTION_CONTAINER.classList.add('hide');
    CONFIRM_CONTAINER.classList.add('hide');
    RESULT_CONTAINER.classList.remove('hide');
    document.body.classList.remove('overflow-x-hidden');
    CreateResult(scoreArray);

    let productId = scoreArray[0]["product_id"];
    ShowQuill(productId);
}

window.ReShowResult = ReShowResult;

window.addEventListener('unload', function() {
    fetch('/clear-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('セッションをクリアしました');
            } else {
                console.error('セッションのクリアに失敗しました');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
        });
});

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

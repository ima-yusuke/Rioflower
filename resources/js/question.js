import "flowbite";
import Quill from "quill";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// 質問画面
const QUESTION_CONTAINER = document.getElementById('question_container');
const QUESTION_IMG_CONTAINER = document.getElementById("question_img");
const QUESTION_TEXT = document.getElementById('question_text');
const QUESTION_ANSWERS_CONTAINER = document.getElementById('question_answers_container');
const BACK_BTN = document.getElementById("back_btn");
let currentQuestionIdx = 0;// 現在の質問番目
let oldSrcArray = [QUESTION_IMG_CONTAINER.querySelector('img.back').src];
let flag = true;

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm_container");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("confirm_answers_container");
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

    // 回答選択肢作成
    CreateAnswers()

    //最適な画像を表示
    if(currentQuestionIdx>0&&choiceId!=null){
        ShowMaxImg(choiceId);
    }else if(currentQuestionIdx>0){
        ShowMaxImg();
    } else if(currentQuestionIdx===0&&flag===false){
        ShowMaxImg();
    }
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
        ShowConfirm()
    }
}
// -------------------------------------[⑤確認画面の表示]-------------------------------------
function ShowConfirm(){
    CONFIRM_CONTAINER.classList.remove("hide");
    QUESTION_CONTAINER.classList.add('hide');
    DeleteConfirmContainer();
    CreateConfirmContainer()
}
// ---------------------------------------[⑥結果の表示]---------------------------------------
SHOW_RESULT_BTN.addEventListener("click",ShowResult);

function ShowResult() {
    if (sessionStorage.getItem('scoreData') !== null) {
        let scoreArray = sessionStorage.getItem('scoreData');
        sessionStorage.setItem('scoreData', scoreArray);
    } else {
        sessionStorage.setItem('scoreData', JSON.stringify(scoreArray));
    }

    CONFIRM_CONTAINER.classList.add('hide');
    RESULT_CONTAINER.classList.remove('hide');

    CreateResult(scoreArray)

    let productId = scoreArray[0]["product_id"];
    ShowQuill(productId);
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
        BACK_BTN.parentNode.classList.remove("back-btn-container");
    }else{
        BACK_BTN.classList.add("hide");
        BACK_BTN.parentNode.classList.add("back-btn-container"); // ボタンの表示時にスペースを確保
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

    // タイトル作成
    CreateConfirmTitle();

    // 選択した回答と質問を表示
    for(let i=0;i<questions.length;i++){

        const CONFIRM_ANSWER_CONTAINER = document.createElement('div')

        // 質問
        const CONFIRM_QUESTION_TEXT = document.createElement("p");

        // 回答
        const CONFIRM_ANSWER_BTN = document.createElement('button')
        const CONFIRM_ANSWER_TEXT = document.createElement('span')
        const CONFIRM_ARROW_TEXT = document.createElement("p");

        // 質問文と番号
        if(i<10){
            CONFIRM_QUESTION_TEXT.innerText = "0"+(i+1)+"."+ questions[i]["text"];
        }else{
            CONFIRM_QUESTION_TEXT.innerText = (i+1)+"."+ questions[i]["text"];
        }
        CONFIRM_QUESTION_TEXT.style.color = "white";

        // 回答
        CONFIRM_ANSWER_TEXT.innerText = questions[i].choices[selectedAnswersArray[i]]["text"];
        CONFIRM_ARROW_TEXT.innerText = "▶"
        CONFIRM_ANSWER_BTN.classList.add("confirm-answer");
        CONFIRM_ANSWER_BTN.appendChild(CONFIRM_ANSWER_TEXT)
        CONFIRM_ANSWER_BTN.appendChild(CONFIRM_ARROW_TEXT);

        // 質問と回答をひとまとめに
        CONFIRM_ANSWER_CONTAINER.appendChild(CONFIRM_QUESTION_TEXT);
        CONFIRM_ANSWER_CONTAINER.appendChild(CONFIRM_ANSWER_BTN)
        CONFIRM_ANSWER_CONTAINER.classList.add("confirm-answers-container")

        // コンテイナーに追加
        CONFIRM_ANSWERS_CONTAINER.appendChild(CONFIRM_ANSWER_CONTAINER);

        CONFIRM_ANSWER_BTN.addEventListener("click",function (){
            CONFIRM_CONTAINER.classList.add("hide");
            QUESTION_CONTAINER.classList.remove('hide');
            currentQuestionIdx = i;
            DeleteQuestionAnswers()
            ShowCurrentQstNum()
            ShowQuestion()
            BACK_BTN.classList.add("hide");
            BACK_BTN.parentNode.classList.add("back-btn-container"); // ボタンの表示時にスペースを確保
        })
    }
}

//[CREATE] タイトル作成
function CreateConfirmTitle(){
    const confirmTitle = document.createElement('p');
    confirmTitle.classList.add('text-center', 'text-2xl', 'text-top-white');
    confirmTitle.id = 'test';
    confirmTitle.textContent = 'Confirm';

    // 境界線を含むdivの作成
    const borderContainer = document.createElement('div');
    borderContainer.classList.add('flex', 'justify-center', 'text-center');

    // 下線を追加するためのpタグの作成
    const borderElement = document.createElement('p');
    borderElement.classList.add('border-t', 'border-top-white', 'w-[50px]', 'mb-4');

    // pタグをdivに追加
    borderContainer.appendChild(borderElement);

    CONFIRM_ANSWERS_CONTAINER.appendChild(confirmTitle);
    CONFIRM_ANSWERS_CONTAINER.appendChild(borderContainer);
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
        img.classList.add('otherImg', 'object-cover', 'rounded-full', 'w-[70px]', 'md:w-[100px]', 'h-[70px]', 'md:h-[100px]');

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

//[ON] 画像入れ替え
function OnSwapImg(scoreArray) {
    // 1~4位の商品（下3つの小さい画像）
    let otherImages = document.getElementsByClassName("otherImg");

    for (let i = 0; i < scoreArray.length; i++) {

        // スコア高い順に下の画像にsrcを付与
        let otherProduct = products.filter(product => product.id === scoreArray[i]["product_id"]);
        otherImages[i].src = otherProduct[0]["img"];

        // 表示商品の入れ替え
        otherImages[i].parentNode.addEventListener("click", function () {

            // トランジション中のクリックを防ぐ
            if (document.body.classList.contains('transition-active')) {
                return;
            }

            document.body.classList.add('transition-active');

            const insertImgTop = RESULT_IMG.getBoundingClientRect().top;
            const insertImgLeft = RESULT_IMG.getBoundingClientRect().left;
            const insertImgWidth = RESULT_IMG.getBoundingClientRect().width;
            const insertImgHeight = RESULT_IMG.getBoundingClientRect().height;

            let clickedImg = otherImages[i];

            // Add transition class for smooth animation
            clickedImg.classList.add("transition");

            // クリックした画像
            const clickedImgTop = clickedImg.getBoundingClientRect().top;
            const clickedImgLeft = clickedImg.getBoundingClientRect().left;
            const clickedImgWidth = clickedImg.getBoundingClientRect().width;
            const clickedImgHeight = clickedImg.getBoundingClientRect().height;

            // 最初非表示の画像
            let hiddenElement = Array.from(otherImages).filter(image => image.parentNode.classList.contains('hidden'))[0];

            // クリックした画像をトップに移動
            clickedImg.style.transform = `translate(${(insertImgLeft - clickedImgLeft) + ((insertImgWidth - clickedImgWidth) / 2)}px, ${(insertImgTop - clickedImgTop) + ((insertImgHeight - clickedImgHeight) / 2)}px) scale(${insertImgWidth / clickedImgWidth}, ${insertImgHeight / clickedImgHeight})`;

            // transformが完了したら下記実行
            clickedImg.addEventListener('transitionend', function onTransitionEnd1() {

                // // transformを一度だけ実行
                clickedImg.removeEventListener('transitionend', onTransitionEnd1);

                hiddenElement.parentNode.classList.remove("hidden");

                // クリックした要素を非表示に
                clickedImg.parentNode.classList.add("hidden");
                clickedImg.parentNode.classList.remove("other-img-container");
                clickedImg.style.transform = "translate(0,0)";
                clickedImg.classList.remove("transition");

                // 新しく表示する画像の位置を取得
                const hiddenElementTop = hiddenElement.getBoundingClientRect().top;
                const hiddenElementLeft = hiddenElement.getBoundingClientRect().left;
                const hiddenElementWidth = hiddenElement.getBoundingClientRect().width;
                const hiddenElementHeight = hiddenElement.getBoundingClientRect().height;

                // 移動と縮小設定
                let moveY = (insertImgTop - hiddenElementTop) + ((insertImgHeight - hiddenElementHeight) / 2);
                let moveX = (insertImgLeft - hiddenElementLeft) + ((insertImgWidth - hiddenElementWidth) / 2);
                let moveWidth = insertImgWidth / hiddenElementWidth;
                let moveHeight = insertImgHeight / hiddenElementHeight;

                // 要素をトップに移動
                hiddenElement.classList.add("transition-quick");
                hiddenElement.style.transform = `translate(${moveX}px, ${moveY}px) scale(${moveWidth}, ${moveHeight})`;
                hiddenElement.classList.remove("transition-quick");

                // トップから要素を降ろす
                setTimeout(() => {
                    hiddenElement.classList.add("transition");
                    hiddenElement.parentNode.classList.add('other-img-container');
                    hiddenElement.style.transform = `translate(0px, 0px)`;
                }, 50);

                // クリックした商品をトップへ表示
                RESULT_P_NAME.innerText = otherProduct[0]["name"];
                RESULT_IMG.src = otherProduct[0]["img"];

                // Quill更新
                DeleteQuill();
                ShowQuill(otherProduct[0]["id"]);

                // トランジション完了後、クリックを再度有効にするためにhiddenElementのtransitionendイベントを監視
                hiddenElement.addEventListener('transitionend', function onTransitionEnd2() {
                    // ここで削除しておかないと再度hiddenElementをクリックした時に前回のイベントも残ったままで実装されてしまう
                    hiddenElement.removeEventListener('transitionend', onTransitionEnd2);
                    document.body.classList.remove('transition-active');
                });
            });

            // 購入商品のidを更新
            purchaseProductId = otherProduct[0]["id"];
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

    CreateResult(scoreArray)

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

// ナビゲーションバー
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

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

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm_container");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("confirm_answers_container");
const SHOW_RESULT_BTN = document.getElementById("show_result_btn");

// 結果画面
const RESULT_CONTAINER = document.getElementById('result_container')
const RESULT_P_NAME = document.getElementById("result_p_name");
const RESULT_IMG = document.getElementById("result_img");
const OPEN_MODAL_BTN = document.getElementById("open_modal_btn");
const SEND_BTN = document.getElementById("send_btn");
const RESULT_FIRST = document.getElementById("result_first");
const RESULT_SECOND = document.getElementById("result_second");
const RESULT_THIRD = document.getElementById("result_third");
const RESULT_FOURTH = document.getElementById("result_fourth");
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

    // 2問目以降、最適な画像を表示
    if(currentQuestionIdx>0&&choiceId!=null){
        CreateMaxImg(choiceId);
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
        CalMaxIdx(choiceId);
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

    CONFIRM_CONTAINER.classList.add('hide');
    RESULT_CONTAINER.classList.remove('hide');

    CreateResult()

    let productId = scoreArray[0]["product_id"];
    DisplayQuill(productId);
}


// --------------------------------------[質問画面/機能]--------------------------------------
//選択肢作成
function CreateAnswers(){

    ShowBackBtn();

    let choicesArray = questions[currentQuestionIdx].choices;

    choicesArray.forEach((choice,idx) => {

        const ANSWER_BTN = document.createElement('button')
        const NUM_TEXT_CONTAINER = document.createElement('div')
        const ANSWER_NUM = document.createElement('span')
        const ANSWER_TEXT = document.createElement('span')
        const ARROW_TEXT = document.createElement('span')

        ANSWER_NUM.innerText = idx+1;
        ANSWER_NUM.classList.add("answer-num-white")
        ANSWER_TEXT.innerText = choice["text"];

        NUM_TEXT_CONTAINER.appendChild(ANSWER_NUM);
        NUM_TEXT_CONTAINER.appendChild(ANSWER_TEXT)

        ARROW_TEXT.innerText = "▶";
        ANSWER_BTN.appendChild(NUM_TEXT_CONTAINER)
        ANSWER_BTN.appendChild(ARROW_TEXT);
        ANSWER_BTN.classList.add("answer-btn")

        QUESTION_ANSWERS_CONTAINER.appendChild(ANSWER_BTN)

        // 選択肢をクリックをする
        ANSWER_BTN.addEventListener('click', ()=>{
            SelectAnswer(idx,choice["id"]);
        })
    })
}

// 2問目以降、質問横に最適な画像を表示
function CreateMaxImg(choiceId){

    // 最適な商品のIDを取得
    let maxProductId = CalMaxIdx(choiceId)

    // 現在の画像を削除
    DeleteQuestionImage();

    // 新規画像を作成
    let newImage = document.createElement("img");
    let maxProduct = products.filter(product => product.id === maxProductId);
    newImage.src = maxProduct[0]["img"];
    newImage.classList.add("question-img")
    QUESTION_IMG_CONTAINER.appendChild(newImage)
}

// 2問目以降、前の質問に戻るボタンの表示
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
    BACK_BTN.removeEventListener("click", HandleBackButtonClick);
    BACK_BTN.addEventListener("click", HandleBackButtonClick);
}

// 戻るボタンクリック時の処理
function HandleBackButtonClick() {
    currentQuestionIdx--;
    selectedAnswersArray.pop(); // 配列の末尾を削除
    for (let i = 0; i < scoreArray.length; i++) {
        scoreArray[i].score.pop(); // スコア配列の末尾を削除
    }
    DeleteQuestionAnswers();
    ShowCurrentQstNum();
    ShowQuestion();
}

// 現在表示している回答を全て削除
function DeleteQuestionAnswers() {
    while (QUESTION_ANSWERS_CONTAINER.firstChild) {
        QUESTION_ANSWERS_CONTAINER.removeChild(QUESTION_ANSWERS_CONTAINER.firstChild)
    }
}

// 質問横の画像削除
function DeleteQuestionImage(){
    while(QUESTION_IMG_CONTAINER.firstChild){
        QUESTION_IMG_CONTAINER.removeChild(QUESTION_IMG_CONTAINER.firstChild);
    }
}

// --------------------------------------[確認画面/機能]--------------------------------------

// 選択内容確認画面
function CreateConfirmContainer(){
    for(let i=0;i<questions.length;i++){

        const CONFIRM_ANSWER_CONTAINER = document.createElement('div')

        // 質問
        const CONFIRM_QUESTION_TEXT = document.createElement("p");
        const CONFIRM_QUESTION_NUM = document.createElement("span");

        // 回答
        const CONFIRM_ANSWER_BTN = document.createElement('button')
        const CONFIRM_NUM_TEXT_CONTAINER = document.createElement('div')
        const CONFIRM_ANSWER_NUM = document.createElement('span')
        const CONFIRM_ANSWER_TEXT = document.createElement('span')
        const CONFIRM_ARROW_TEXT = document.createElement("p");

        // 質問文と番号
        CONFIRM_QUESTION_NUM.innerText = i+1+"問目";
        CONFIRM_QUESTION_NUM.classList.add("confirm-question-num");
        CONFIRM_QUESTION_TEXT.innerText = questions[i]["text"];
        CONFIRM_QUESTION_TEXT.insertBefore(CONFIRM_QUESTION_NUM,CONFIRM_QUESTION_TEXT.firstChild)

        // 回答
        CONFIRM_ANSWER_NUM.innerText = selectedAnswersArray[i]+1;
        CONFIRM_ANSWER_NUM.classList.add("confirm-answer-num")
        CONFIRM_ANSWER_TEXT.innerText = questions[i].choices[selectedAnswersArray[i]]["text"];
        CONFIRM_ANSWER_TEXT.style.color = "rgb(191,158,116)"
        CONFIRM_NUM_TEXT_CONTAINER.appendChild(CONFIRM_ANSWER_NUM);
        CONFIRM_NUM_TEXT_CONTAINER.appendChild(CONFIRM_ANSWER_TEXT)
        CONFIRM_ARROW_TEXT.innerText = "▶"
        CONFIRM_ANSWER_BTN.classList.add("confirm-answer");
        CONFIRM_ANSWER_BTN.appendChild(CONFIRM_NUM_TEXT_CONTAINER)
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

// 現在表示している質問＆回答を全て削除（回答修正した場合に対応するため）
function DeleteConfirmContainer(){
    while(CONFIRM_ANSWERS_CONTAINER.firstChild){
        CONFIRM_ANSWERS_CONTAINER.removeChild(CONFIRM_ANSWERS_CONTAINER.firstChild);
    }
}

// --------------------------------------[結果画面/機能]--------------------------------------

// 結果画面に最適な商品を表示
function CreateResult(){

    // プライオリティ計算
    CalPriority();

    // 1位の商品（トップ）
    DisplayTopProduct();


    // 1~4位の商品（下3つの小さい画像）
    let otherImages = document.getElementsByClassName("otherImg");

    for(let i=0;i<otherImages.length;i++) {

        // スコア高い順に下の画像にsrcを付与
        let otherProduct = products.filter(product => product.id === scoreArray[i]["product_id"]);
        otherImages[i].src = otherProduct[0]["img"];

        // 表示商品の入れ替え
        otherImages[i].parentNode.addEventListener("click",function(){

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

            //最初非表示の画像
            let hiddenElement = Array.from(otherImages).filter(image => image.parentNode.classList.contains('hidden'))[0];

            // クリックした画像をトップに移動
            clickedImg.style.transform = `translate(${(insertImgLeft-clickedImgLeft)+ ((insertImgWidth - clickedImgWidth)/2)}px,${(insertImgTop-clickedImgTop)+ ((insertImgHeight - clickedImgHeight)/2)}px) scale(${insertImgWidth/clickedImgWidth},${insertImgHeight/clickedImgHeight})`;

            // transformが完了したら下記実行
            clickedImg.addEventListener('transitionend', function onTransitionEnd(){

                // transformを一度だけ実行
                clickedImg.removeEventListener('transitionend', onTransitionEnd);

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
                let moveY = (insertImgTop-hiddenElementTop) + ((insertImgHeight - hiddenElementHeight)/2)
                let moveX = (insertImgLeft-hiddenElementLeft) + ((insertImgWidth - hiddenElementWidth)/2)
                let moveWidth =insertImgWidth/hiddenElementWidth;
                let moveHeight = insertImgHeight/hiddenElementHeight;

                // 要素をトップに移動
                hiddenElement.classList.add("transition-quick");
                hiddenElement.style.transform = `translate(${moveX}px, ${moveY}px) scale(${moveWidth},${moveHeight}`;
                hiddenElement.classList.remove("transition-quick");

                // トップから要素を降ろす
                setTimeout(() => {
                    hiddenElement.classList.add("transition");
                    hiddenElement.parentNode.classList.add('other-img-container');
                    hiddenElement.style.transform = `translate(0px, 0px)`;
                },50)

                // クリックした商品をトップへ表示
                RESULT_P_NAME.innerText = otherProduct[0]["name"];
                RESULT_IMG.src = otherProduct[0]["img"];

                // Quill更新
                DeleteQuill();
                DisplayQuill(otherProduct[0]["id"]);

            });

            // 購入商品のidを更新
            purchaseProductId = otherProduct[0]["id"];
        });
    }
}


// 1位の商品（トップ）を表示
function DisplayTopProduct(){
    let maxProduct = products.filter(product => product.id === scoreArray[0]["product_id"]);
    RESULT_P_NAME.innerText = maxProduct[0]["name"]
    RESULT_IMG.src = maxProduct[0]["img"];
    purchaseProductId = maxProduct[0]["id"];
}

// 送信ボタンに購入商品のidを付与
OPEN_MODAL_BTN.addEventListener("click", function () {
    console.log(purchaseProductId)
    SEND_BTN.setAttribute("data-id",purchaseProductId);
});

// Quill表示
function DisplayQuill(productId){

    // Quill表示エリアの作成
    let quillDisplayArea = document.createElement("div");
    quillDisplayArea.setAttribute("id", "viewer");
    quillDisplayArea.classList.add("bg-detail-bg","p-6");
    quillDisplayArea.style.backgroundColor = "rgb(255,248,248)";

    let quillContainer = document.getElementById("quill_view_container");
    quillContainer.appendChild(quillDisplayArea);

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

// Quill削除
function DeleteQuill(){
    let quillContainer = document.getElementById("quill_view_container");
    while(quillContainer.firstChild){
        quillContainer.removeChild(quillContainer.firstChild)
    }
}

// ----------------------------------------[スコア計算]----------------------------------------

// 修正必要！！！
function CalMaxIdx(choiceId){

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

    SortScore();

    return scoreArray[0].product_id;
}

// スコア高い順に並び替え
function SortScore() {
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

// プライオリティ計算
function CalPriority() {

    // スコア配列にpriorityを追加
    for (let i = 0; i < products.length; i++) {
        let existingScoreObj = scoreArray.find(scoreObj => scoreObj.product_id === products[i]["id"]);
        existingScoreObj.score.push(products[i]["priority"]);
    }

    // 再度合計計算し並び替え
    SortScore();
}

// 顧客情報追加
SEND_BTN.addEventListener("click",function(){
    const NAME = document.getElementById("customer-name").value;
    const ADDRESS = document.getElementById("customer-address").value;
    const EMAIL = document.getElementById("customer-mail").value;
    const ID = SEND_BTN.getAttribute("data-id");

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            name: NAME,
            address: ADDRESS,
            email: EMAIL,
            product_id: ID,
        })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 422) {
                    return response.json().then(data => {
                        throw { validationErrors: data.errors };
                    });
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.alert('顧客情報を追加しました');
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            if (error.validationErrors) {
                let errorMessage = '';
                for (const field in error.validationErrors) {
                    errorMessage += `${error.validationErrors[field].join('\n')}\n`;
                }
                window.alert(errorMessage);
            } else {
                console.error('Error:', error);
                window.alert('顧客情報の追加に失敗しました');
            }
        });
});

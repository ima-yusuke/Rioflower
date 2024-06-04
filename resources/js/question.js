import "flowbite";

// 質問画面
const QUESTION_CONTAINER = document.getElementById('question_container');
const QUESTION_IMG_CONTAINER = document.getElementById("question_img");
const QUESTION_TEXT = document.getElementById('question_text');
const QUESTION_ANSWERS_CONTAINER = document.getElementById('question_answers_container');
const BACK_BTN = document.getElementById("back_btn");

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm_container");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("confirm_answers_container");
const SHOW_RESULT_BTN = document.getElementById("show_result_btn");

// 結果画面
const RESULT_CONTAINER = document.getElementById('result_container')
const RESULT_P_NAME = document.getElementById("result_p_name");
const RESULT_IMG = document.getElementById("result_img");

// 現在の質問番目
let currentQuestionIdx = 0;
// 選択した回答のindexを保存
let selectedAnswersArray = [];

// --------------------------------------[①質問開始]--------------------------------------
function StartQuiz() {
    RESULT_CONTAINER.classList.add('hide')
    QUESTION_CONTAINER.classList.remove('hide')
    ShowQuestion()
    CountQuestions()
}

StartQuiz()
// ----------------------------------[②残り質問数計算＆表示]----------------------------------
function CountQuestions(){
    let questionLength = questions.length;
    let currentQuestionNum = document.getElementById("question_num");
    currentQuestionNum.innerText =  Number(currentQuestionIdx+1)+"問目/"+questionLength+"問中";
}
// -------------------------------------[③質問&回答作成]-------------------------------------
function ShowQuestion() {

    // 質問作成
    QUESTION_TEXT.innerText = questions[currentQuestionIdx]["question"]

    // 回答選択肢作成
    CreateAnswers()

    // 2問目以降、最適な画像を表示
    if(currentQuestionIdx>0){
        CreateMaxImg();
    }
}
// ---------------------------------------[④回答選択]---------------------------------------
function SelectAnswer(idx) {

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
        CountQuestions()
        ShowQuestion()
    } else {
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
    // 修正必要!!!!!!!
    // let maxIndex = calMaxIdx()

    CONFIRM_CONTAINER.classList.add('hide');
    RESULT_CONTAINER.classList.remove('hide');

    // 修正必要!!!!!!!(0固定でなくスコア最大のindex⇒上記maxIndex)
    CreateResult(0)
}
// --------------------------------------[質問画面/機能]--------------------------------------
//選択肢作成
function CreateAnswers(){

    ShowBackBtn();

    let answersArray = questions[currentQuestionIdx]["answer"]

    answersArray.forEach((value,idx) => {

        const ANSWER_BTN = document.createElement('button')
        const NUM_TEXT_CONTAINER = document.createElement('div')
        const ANSWER_NUM = document.createElement('span')
        const ANSWER_TEXT = document.createElement('span')
        const ARROW_TEXT = document.createElement('span')

        ANSWER_NUM.innerText = idx+1;
        ANSWER_NUM.classList.add("answer-num-white")
        ANSWER_TEXT.innerText = value;

        NUM_TEXT_CONTAINER.appendChild(ANSWER_NUM);
        NUM_TEXT_CONTAINER.appendChild(ANSWER_TEXT)

        ARROW_TEXT.innerText = "▶";
        ANSWER_BTN.appendChild(NUM_TEXT_CONTAINER)
        ANSWER_BTN.appendChild(ARROW_TEXT);
        ANSWER_BTN.classList.add("answer-btn")

        QUESTION_ANSWERS_CONTAINER.appendChild(ANSWER_BTN)

        // 選択肢をクリックをする
        ANSWER_BTN.addEventListener('click', ()=>{
            SelectAnswer(idx);
        })
    })
}

// 2問目以降、質問横に最適な画像を表示
function CreateMaxImg(){
    // 修正必要!!!!!!!
    // let maxIndex = calMaxIdx()

    // 現在の画像を削除
    DeleteQuestionImage();

    // 新規画像を作成
    // 修正必要!!!!!!!(0固定でなくスコア最大のindex⇒上記maxIndex)
    let newImage = document.createElement("img");
    newImage.src = products[0]["img"];
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
    DeleteQuestionAnswers();
    CountQuestions();
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
        CONFIRM_QUESTION_TEXT.innerText = questions[i]["question"];
        CONFIRM_QUESTION_TEXT.insertBefore(CONFIRM_QUESTION_NUM,CONFIRM_QUESTION_TEXT.firstChild)

        // 回答
        CONFIRM_ANSWER_NUM.innerText = i+1;
        CONFIRM_ANSWER_NUM.classList.add("confirm-answer-num")
        CONFIRM_ANSWER_TEXT.innerText = questions[i]["answer"][selectedAnswersArray[i]];
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
            CountQuestions()
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
function CreateResult(maxIndex){
    RESULT_P_NAME.innerText = products[maxIndex]["name"];
    RESULT_IMG.src = products[maxIndex]["img"];
}

// ----------------------------------------[スコア計算]----------------------------------------

// 修正必要！！！
function calMaxIdx(){
    let maxCount = 0; // 最大のincludes()カウント
    let maxIndex = null; // 最大のincludes()カウントが見つかったインデックス

    for (let i = 0; i < products.length; i++) {
        let count = 0; // includes()が真に評価された回数をカウントする変数

        // includes()のカウントを計算
        for (let b = 0; b < selectedAnswersArray.length; b++) {
            if (products[i]["attributes"].includes(selectedAnswersArray[b])) {
                count++; // includes()が真に評価されたらカウントを増やす
            }
        }

        // プライオリティの計算
        count += products[i]["priority"];

        // より大きいカウントが見つかった場合は更新
        if (count > maxCount) {
            maxCount = count;
            maxIndex = i;
        }
    }
    return maxIndex;
}




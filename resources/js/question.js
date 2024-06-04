import "flowbite";

// 質問画面
const QUESTION_CONTAINER = document.getElementById('quiz')
const QUESTION_IMG_CONTAINER = document.getElementById("tmpImg");
const QUESTION_TEXT = document.getElementById('question')
const QUESTION_ANSWERS_CONTAINER = document.getElementById('answer-buttons')
const BACK_BTN = document.getElementById("back-btn");

// 確認画面
const CONFIRM_CONTAINER = document.getElementById("confirm");
const CONFIRM_ANSWERS_CONTAINER = document.getElementById("reconfirm");
const SHOW_RESULT_BTN = document.getElementById("show-result-btn");

// 結果画面
const RESULT_CONTAINER = document.getElementById('result')
const RESULT_P_NAME = document.getElementById("result_p_name");
const RESULT_IMG = document.getElementById("result_img");

// 現在の質問番目
let currentQuestionIdx = 0;
// 選択した回答のindexを保存
let selectedAnswersArray = [];

// ------------------------------[①質問開始]---------------------------------------------------
function StartQuiz() {
    RESULT_CONTAINER.classList.add('hide')
    QUESTION_CONTAINER.classList.remove('hide')
    ShowQuestion()
    CountQuestions()
}

StartQuiz()

// ------------------------------[②残り質問数計算＆表示]---------------------------------------------------
function CountQuestions(){
    let questionLength = questions.length;
    let currentQuestionNum = document.getElementById("question_num");
    currentQuestionNum.innerText =  Number(currentQuestionIdx+1)+"問目/"+questionLength+"問中";
}

// ------------------------------[③質問&回答作成]---------------------------------------------------
function ShowQuestion() {

    // 質問作成
    QUESTION_TEXT.innerText = questions[currentQuestionIdx]["question"]

    // 回答選択肢作成
    CreateOptions()
}

// ------------------------------[④質問選択]---------------------------------------------------
function SelectAnswer(idx) {

    // 配列に選択されたボタンのindexを追加 or indexを更新
    if(questions.length !== selectedAnswersArray.length){
        selectedAnswersArray.push(idx);
    }else{
        selectedAnswersArray[currentQuestionIdx] = idx;
    }

    // まだ残りの質問があるかチェック
    if (questions.length !== selectedAnswersArray.length ) {
        currentQuestionIdx++
        ResetState()
        CountQuestions()
        ShowQuestion()
        ShowResult();
    } else {
        ShowConfirm()
    }
}
// ------------------------------[⑤確認画面の表示]---------------------------------------------------
function ShowConfirm(){
    CONFIRM_CONTAINER.classList.remove("hide");
    QUESTION_CONTAINER.classList.add('hide');
    ResetConfirm();
    CreateConfirmContainer()
}
// ------------------------------[⑥結果の表示/ 画像作成]---------------------------------------------------
SHOW_RESULT_BTN.addEventListener("click",ShowResult);

function ShowResult() {

    // 修正必要!!!!!!!
    // let maxIndex = calMaxIdx()

    // 現在の画像を削除
    ResetImage();

    // 新規画像を作成
    // 修正必要!!!!!!!(0固定でなくスコア最大のindex⇒上記maxIndex)
    CreateImage(products[0]["img"])

    // 全ての回答を終えた場合のみ実行
    if(questions.length === selectedAnswersArray.length){
        CONFIRM_CONTAINER.classList.add('hide');
        RESULT_CONTAINER.classList.remove('hide');

        // 結果画面詳細作成
        // 修正必要!!!!!!!(0固定でなくスコア最大のindex⇒上記maxIndex)
        CreateResult(0)
    }
}
// -----------------------[スコア計算]-------------------------
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

// --------------------------[作成]-------------------------------
// 2問目以降前の質問に戻るボタンの表示
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

function HandleBackButtonClick() {
    if (currentQuestionIdx > 0) {
        currentQuestionIdx--;
        // 配列の末尾を削除
        selectedAnswersArray.pop();
        ResetState();
        CountQuestions();
        ShowQuestion();
    }
}

// 選択肢作成
function CreateOptions(){

   ShowBackBtn();

    let optionsArray = questions[currentQuestionIdx]["answer"]

    optionsArray.forEach((value,idx) => {
        // ボタンタグを生成して、設問を挿入
        const ANSWER_BTN = document.createElement('button')
        const NUM_TEXT_CONTAINER = document.createElement('div')
        const ANSWER_NUM = document.createElement('span')
        const ANSWER_TEXT = document.createElement('span')
        const ARROW_TEXT = document.createElement('span')
        ANSWER_NUM.innerText = idx+1;
        ANSWER_NUM.classList.add("rounded-circle")
        ANSWER_TEXT.innerText = value;
        ARROW_TEXT.innerText = "▶";
        NUM_TEXT_CONTAINER.appendChild(ANSWER_NUM);
        NUM_TEXT_CONTAINER.appendChild(ANSWER_TEXT)
        ANSWER_BTN.appendChild(NUM_TEXT_CONTAINER)
        ANSWER_BTN.appendChild(ARROW_TEXT);
        ANSWER_BTN.classList.add("option-btn")
        QUESTION_ANSWERS_CONTAINER.appendChild(ANSWER_BTN)

        // 選択肢をクリックをする
        ANSWER_BTN.addEventListener('click', ()=>{
            SelectAnswer(idx);
        })
    })
}

// 選択内容確認画面
function CreateConfirmContainer(){
    for(let i=0;i<questions.length;i++){
        const container = document.createElement('div')
        const answerBtn = document.createElement('button')
        const answerDiv = document.createElement('div')
        const arrowIcon = document.createElement("p");
        const num = document.createElement('span')
        const text = document.createElement('span')
        const question = document.createElement("p");
        const questionNum = document.createElement("span");
        // 選択した回答
        num.innerText = i+1;
        num.classList.add("rounded-circle2")
        text.innerText = questions[i]["answer"][selectedAnswersArray[i]];
        text.style.color = "rgb(191,158,116)"
        answerDiv.appendChild(num);
        answerDiv.appendChild(text)
        arrowIcon.innerText = "▶"
        answerBtn.classList.add("confirm-answer");
        answerBtn.appendChild(answerDiv)
        answerBtn.appendChild(arrowIcon);
        // 質問文と番号
        questionNum.innerText = i+1+"問目";
        questionNum.classList.add("confirm-span");
        question.innerText = questions[i]["question"];
        question.insertBefore(questionNum,question.firstChild)
        // コンテイナーに追加
        container.appendChild(question);
        container.appendChild(answerBtn)
        container.classList.add("confirm-container")
        CONFIRM_ANSWERS_CONTAINER.appendChild(container);

        answerBtn.addEventListener("click",function (){
            CONFIRM_CONTAINER.classList.add("hide");
            QUESTION_CONTAINER.classList.remove('hide');
            currentQuestionIdx = i;
            ResetState()
            CountQuestions()
            ShowQuestion()
            BACK_BTN.classList.add("hide");
            BACK_BTN.parentNode.classList.add("back-btn-container"); // ボタンの表示時にスペースを確保
        })
    }
}

// 質問横の画像作成
function CreateImage(imageSrc){
    let newImage = document.createElement("img");
    newImage.src = imageSrc;
    newImage.classList.add("tmp-img")
    QUESTION_IMG_CONTAINER.appendChild(newImage)
}

// 結果画面に最適な商品を表示
function CreateResult(maxIndex){
    RESULT_P_NAME.innerText = products[maxIndex]["name"];
    RESULT_IMG.src = products[maxIndex]["img"];
}

// ------------------------------[リセット]---------------------------------------------------

// 現在表示している質問を全て削除し、新規で質問作成
function ResetState() {
    while (QUESTION_ANSWERS_CONTAINER.firstChild) {
        QUESTION_ANSWERS_CONTAINER.removeChild(QUESTION_ANSWERS_CONTAINER.firstChild)
    }
}

// おすすめ画像を削除
function ResetImage(){
    while(QUESTION_IMG_CONTAINER.firstChild){
        QUESTION_IMG_CONTAINER.removeChild(QUESTION_IMG_CONTAINER.firstChild);
    }
}


// 確認画面リセット（回答修正した場合に対応するため）
function ResetConfirm(){
    while(CONFIRM_ANSWERS_CONTAINER.firstChild){
        CONFIRM_ANSWERS_CONTAINER.removeChild(CONFIRM_ANSWERS_CONTAINER.firstChild);
    }
}






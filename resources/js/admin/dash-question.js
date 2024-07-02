const EDIT_BTN = document.querySelectorAll('.editBtn');
const ADD_QUESTION_BTN  =document.getElementById("add_btn");
const DELETE_QUESTION_BUTTONS = document.querySelectorAll('.deleteBtn');//削除ボタン
const ADD_ANSWER_BUTTONS = document.querySelectorAll('.add-answer-btn');//回答追加ボタン
const DELETE_ANSWER_BUTTONS = document.querySelectorAll('.delete-answer');//回答削除ボタン
let accordionId =null;

//アコーディオンの開閉
EDIT_BTN.forEach((btn,idx) => {
    btn.addEventListener('click', function() {

        accordionId = idx;

        let selected_qa_body = btn.parentNode.parentNode.nextElementSibling;//アコーディオン中身

        // 現在表示している要素を再度クリックした場合はそのアコーディオンを閉じる
        if (selected_qa_body.classList.contains('visible')) {
            selected_qa_body.classList.remove('visible')
            btn.innerHTML = "編集"
        } else {
            // 全てを一度非表示
            for (let i = 0; i < EDIT_BTN.length; i++) {
                let tmpBody = EDIT_BTN[i].parentNode.parentNode.nextElementSibling;
                tmpBody.classList.remove('visible')
                EDIT_BTN[i].innerHTML = "編集"
            }

            // クリックされた要素のみ表示
            selected_qa_body.classList.add('visible');
            btn.innerHTML = "閉じる";
        }
    });
});

// 【追加】質問
ADD_QUESTION_BTN.addEventListener("click",function (){
    let questionText = document.getElementById("question_text").value;
    let answerInput = document.getElementsByClassName("new-answer");
    let answerArray =[];

    for(let i=0;i<answerInput.length;i++){
        // trimでスペースだけを入力した場合でも、そのスペースを無視して適切にチェック
        let answerText = answerInput[i].value.trim();
        if (answerText !== "") {
            answerArray.push(answerText);
        }
    }

    // 質問入力チェック
    if (questionText === "") {
        alert("質問を入力してください。");
        return;
    }
    // 回答入力チェック
    if (answerArray.length === 0) {
        alert("少なくとも1つの回答を入力してください。");
        return;
    }

    FetchData('/dashboard/question','POST',true,JSON.stringify({
        question: questionText,
        answers: answerArray,
    }))
        .then(data => {
            alert(data.message);
            window.location.href = data.redirect;
        })
        .catch(error => {
            alert(error.message);
        });
})

//【削除】質問
for (let i = 0; i < DELETE_QUESTION_BUTTONS.length; i++) {
    DELETE_QUESTION_BUTTONS[i].addEventListener('click', function () {
        DeleteQuestion(DELETE_QUESTION_BUTTONS[i]);
    });
}

function DeleteQuestion(btn) {

    let id = btn.getAttribute('data-product-id');

    // 確認ダイアログを表示し、ユーザーがOKを押した場合のみ削除処理を実行
    if (confirm('本当に削除しますか？')) {
        // Ajaxリクエストを送信して削除処理を行う
        FetchData('/dashboard/question','DELETE',true,JSON.stringify({ id: id }))
            .then(data => {
                alert(data.message);
                window.location.href = data.redirect;
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        console.log('削除がキャンセルされました');
    }
}

//【追加】回答
for (let i = 0; i <ADD_ANSWER_BUTTONS.length; i++) {
    ADD_ANSWER_BUTTONS[i].addEventListener('click', function () {
        AddAnswer(ADD_ANSWER_BUTTONS[i],i);
    });
}

function AddAnswer(btn,idx) {
    let newAnswer = document.getElementsByClassName("add-answer")[idx].value;
    let id = btn.getAttribute('data-product-id');

    FetchData('/dashboard/choice','POST',true,JSON.stringify({
        id: id,
        choice:newAnswer,
        accordionId:accordionId
    }))
        .then(data => {
            alert(data.message);
            localStorage.setItem('accordionId', data.accordionId);
            window.location.href = data.redirect;
        })
        .catch(error => {
            alert(error.message);
        });
}

//【削除】回答
for (let i = 0; i <DELETE_ANSWER_BUTTONS.length; i++) {
    DELETE_ANSWER_BUTTONS[i].addEventListener('click', function () {
        DeleteAnswer(DELETE_ANSWER_BUTTONS[i]);
    });
}

function DeleteAnswer(btn) {

    let id = btn.getAttribute('data-product-id');

    // 確認ダイアログを表示し、ユーザーがOKを押した場合のみ削除処理を実行
    if (confirm('本当に削除しますか？')) {

        FetchData('/dashboard/choice','DELETE',true,JSON.stringify({
            id: id,
            accordionId:accordionId
        }))
            .then(data => {
                alert(data.message);
                localStorage.setItem('accordionId', data.accordionId);
                window.location.href = data.redirect;
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        console.log('削除がキャンセルされました');
    }
}

// 新規回答input作成
let inpContainer = document.getElementById("answerInp");
let createInpBtn = document.getElementById("createInpBtn");

createInpBtn.addEventListener("click",function (){
    let newInp = document.createElement("input");
    let newBtn = document.createElement("button");
    let newInpContainer = document.createElement("div");
    newInp.name = 'text';
    newBtn.innerHTML = "×";
    newInp.classList.add("new-answer")
    newBtn.classList.add("close-button");
    newInpContainer.style.position = "relative";
    newInpContainer.appendChild(newInp);
    newInpContainer.appendChild(newBtn);
    inpContainer.appendChild(newInpContainer);

    newBtn.addEventListener("click",function (){
        newInpContainer.remove();
    })
})

// --------------------------------[質問並び替え]-------------------------------------------------

window.onload = (e)=>{

    // 1, SortableJS
    const elem = document.getElementById("my_sortable");
    Sortable.create(elem, {
        animation: 150,
        onStart:  onStartEvent,  // 2-1, ドラッグ開始時
        onEnd:    onEndEvent,    // 2-2, ドラッグ終了時
        onChange: onChangeEvent, // 2-3, ドラッグ変化時
        onSort:   onSortEvent    // 2-4, 並び替え終了時
    });
}

function onStartEvent(e){
    console.log("onStart!!");
}

function onEndEvent(e){
    console.log("onEnd!!");
}

function onChangeEvent(e){
    console.log("onChange!!");
}

// 【順番更新】質問
function onSortEvent(e){
    UpdateOrder(e.target, "li div.qa__head div p", "data-question-id", '/dashboard/update-question-order');
}

// 【順番更新】回答
function onSortEventAnswer(e){
    UpdateOrder(e.target, "aside p", "data-answer-id", '/dashboard/update-answer-order');
}

function UpdateOrder(target, selector, dataAttribute, url) {

    const items = target.querySelectorAll(selector);

    let orderData = [];

    for (let i = 0; i < items.length; i++) {
        let str = items[i].innerHTML;

        // 旧番号と"."を削除
        items[i].innerHTML = str.slice(2);

        // 並び替えた最新の番号を書き込み
        items[i].innerHTML = `${i + 1}. ${items[i].innerHTML}`;

        // IDを順番に保存
        let id = items[i].closest(`[${dataAttribute}]`).getAttribute(dataAttribute);
        orderData.push({ id: id, order: i + 1 });
    }
    // 順番をサーバーに送信
    UpdateOrderOnServer(url, orderData);
}

function UpdateOrderOnServer(url, orderData) {
    FetchData(url, 'POST', true, JSON.stringify({
        orderData: orderData,
        accordionId:accordionId
    }))
        .then(data => {
            alert(data.message);
            localStorage.setItem('accordionId', data.accordionId);
            window.location.href = data.redirect;
        })
        .catch(error => {
            alert(error.message);
        });
}


// リダイレクト時の処理
document.addEventListener('DOMContentLoaded', (event) => {

    let accordionId = localStorage.getItem('accordionId');

    if (accordionId) {

        // アコーディオン（質問）選択ボタン
        let editBtn = EDIT_BTN[accordionId];
        if (editBtn) {
            // 手動でクリックイベントを発生させる
            editBtn.click();
        }
    }

    // 状態をリセット
    localStorage.removeItem('accordionId');
});

// --------------------------------[回答並び替え]-------------------------------------------------

let questions = document.getElementsByClassName("qa__item");

for (let i=0;i<questions.length;i++){
    const elem = document.getElementsByClassName("answer_sortable");
    Sortable.create(elem[i], {
        animation: 150,
        onStart:  onStartEvent,  // 2-1, ドラッグ開始時
        onEnd:    onEndEvent,    // 2-2, ドラッグ終了時
        onChange: onChangeEvent, // 2-3, ドラッグ変化時
        onSort:   onSortEventAnswer   // 2-4, 並び替え終了時
    });
}

function FetchData(url,method,headerData,bodyData) {

    const headers = {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };

    // headerDataがtrueであれば、既存のheadersにマージする
    if (headerData) {
        Object.assign(headers, {
            'Content-Type': 'application/json'
        });
    }

    return fetch(url, {
        method: method,
        headers: headers,
        body: bodyData
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error.message);
        });
}

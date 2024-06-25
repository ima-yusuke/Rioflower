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
        answerArray.push(answerInput[i].value);
    }

    fetch('/dashboard/question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            question: questionText,
            answers: answerArray,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.alert('質問を追加しました')
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('質問の追加に失敗しました');
        });

})

//【質問削除】
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
        fetch('/dashboard/question', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // トークンをメタタグから取得
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // JSONレスポンスをパースする
                } else {
                    throw new Error('削除に失敗しました');
                }
            })
            .then(data => {
                location.reload(); // ページをリロードして削除を反映
            })
            .catch(error => {
                console.error('削除に失敗しました:', error);
            });
    } else {
        console.log('削除がキャンセルされました');
    }
}

//【回答追加】
for (let i = 0; i <ADD_ANSWER_BUTTONS.length; i++) {
    ADD_ANSWER_BUTTONS[i].addEventListener('click', function () {
        AddAnswer(ADD_ANSWER_BUTTONS[i],i);
    });
}

function AddAnswer(btn,idx) {
    let newAnswer = document.getElementsByClassName("add-answer")[idx].value;
    let id = btn.getAttribute('data-product-id');

    fetch('/dashboard/choice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            id: id,
            choice:newAnswer ,
            accordionId:accordionId
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.alert('回答を追加しました')
                localStorage.setItem('accordionId', data.accordionId);
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('回答の追加に失敗しました');
        });

}

//【回答削除】
for (let i = 0; i <DELETE_ANSWER_BUTTONS.length; i++) {
    DELETE_ANSWER_BUTTONS[i].addEventListener('click', function () {
        DeleteAnswer(DELETE_ANSWER_BUTTONS[i]);
    });
}

function DeleteAnswer(btn) {

    let id = btn.getAttribute('data-product-id');

    // 確認ダイアログを表示し、ユーザーがOKを押した場合のみ削除処理を実行
    if (confirm('本当に削除しますか？')) {
        // Ajaxリクエストを送信して削除処理を行う
        fetch('/dashboard/choice', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // トークンをメタタグから取得
            },
            body: JSON.stringify({
                id: id,
                accordionId:accordionId
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // JSONレスポンスをパースする
                } else {
                    throw new Error('削除に失敗しました');
                }
            })
            .then(data => {
                localStorage.setItem('accordionId', data.accordionId);
                location.reload(); // ページをリロードして削除を反映
            })
            .catch(error => {
                console.error('削除に失敗しました:', error);
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
    newInp.name = 'text';
    newInp.classList.add("new-answer")
    inpContainer.appendChild(newInp);
})



// --------------------------------[質問並び替え]-------------------------------------------------

window.onload = (e)=>{
    console.log("onload!!");

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

function onSortEvent(e){
    console.log("onSort!!");
    // 並び替え後のエレメントを確認
    const items = e.target.querySelectorAll("li div.qa__head div p");
    let questionOrder = [];
    for(let i = 0; i < items.length; i++){
        let str = items[i].innerHTML;
        // 旧番号と"."を削除
        items[i].innerHTML = str.slice(2);
        // 並び替えた最新の番号を書き込み
        items[i].innerHTML = `${i + 1}. ${items[i].innerHTML}`;
        // 質問のIDを順番に保存
        let questionId = items[i].closest('li').getAttribute('data-question-id');
        questionOrder.push({ id: questionId, order: i + 1 });
    }

    // 質問の順番をサーバーに送信
    updateQuestionOrder(questionOrder);
}

function updateQuestionOrder(orderData) {
    fetch('/dashboard/update-question-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ orderData: orderData })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('質問の順番を更新しました');
                window.location.href = '/dashboard/question'; // リダイレクト先のURLを設定する
            } else {
                console.error('質問の順番更新に失敗しました');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
        });
}

function onSortEventAnswer(e){
    console.log("onSort!!");
    // 並び替え後のエレメントを確認
    const items = e.target.querySelectorAll("aside p");
    let answerOrder = [];
    for(let i = 0; i < items.length; i++){
        let str = items[i].innerHTML;
        // 旧番号と"."を削除
        items[i].innerHTML = str.slice(2);
        // 並び替えた最新の番号を書き込み
        items[i].innerHTML = `${i + 1}. ${items[i].innerHTML}`;
        // 回答のIDを順番に保存
        let answerId = items[i].closest('aside').getAttribute('data-answer-id');
        answerOrder.push({ id: answerId, order: i + 1 });
    }
    console.log(answerOrder)
    // 回答の順番をサーバーに送信
    updateAnswerOrder(answerOrder);
}

function updateAnswerOrder(orderData) {
    fetch('/dashboard/update-answer-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ orderData: orderData })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('回答の順番を更新しました');
                // window.location.href = '/dashboard/question'; // リダイレクト先のURLを設定する
            } else {
                console.error('回答の順番更新に失敗しました');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
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



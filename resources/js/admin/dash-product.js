import Quill from "quill";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const ADD_BUTTON = document.getElementById("add-product-btn");//新規登録ボタン
const EDIT_BUTTONS = document.querySelectorAll('.editBtn');//編集ボタン
const DELETE_BUTTONS = document.querySelectorAll('.deleteBtn');//削除ボタン
const SUBMIT_BUTTONS = document.getElementsByClassName('submit-btn');//登録/更新ボタン
const TOGGLE_INPUT = document.querySelectorAll('.toggleBtn');//toggle input
const FORM_ELEMENT = document.getElementById('productForm');//新規登録form

let quill = null; // Quillインスタンスを保持する変数
let quillContentArray =[]//Quill情報を保存
let currentIndex = null;//更新時に何番目のQuillかindexを保存
let selectedId = null//現在の商品id
let addUpdateFlag = false;//追加か更新か判断用

EDIT_BUTTONS.forEach((btn,idx) => {
    btn.addEventListener('click', function() {

        SaveCurrentQuillContent();

        currentIndex = idx;
        selectedId = this.getAttribute('data-product-id');

        let selectedAccordion = btn.parentNode.parentNode.nextElementSibling;//アコーディオン中身

        ToggleAccordion(selectedAccordion, btn);

        if (selectedAccordion.classList.contains('visible')) {
            CreateQuill(idx);

            if (this.classList.contains("addProductBtn")) {
                addUpdateFlag = true;
            }

            if (selectedId != null) {
                ShowData(selectedId);
            }
        }
    });
});

// 現在のQuillデータを保存
function SaveCurrentQuillContent() {
    if (quill != null) {
        let found = false;
        for (let i = 0; i < quillContentArray.length; i++) {
            if (quillContentArray[i].id === selectedId) {
                quillContentArray[i]["quillContent"] = quill.getContents().ops;
                found = true;
                break;
            }
        }
        if (!found) {
            quillContentArray.push({
                "id": selectedId,
                "quillContent": quill.getContents().ops
            });
        }
    }
}

function ToggleAccordion(selectedAccordion, btn) {
    if (selectedAccordion.classList.contains('visible')) {
        selectedAccordion.classList.remove('visible');
        btn.innerHTML = "編集";
    } else {
        EDIT_BUTTONS.forEach(button => {
            let tmpBody = button.parentNode.parentNode.nextElementSibling;
            tmpBody.classList.remove('visible');
            button.innerHTML = "編集";
        });
        selectedAccordion.classList.add('visible');
        btn.innerHTML = "閉じる";
    }
}


// [Quill作成]
function CreateQuill(idx){

    DeleteQuillToolbar(idx)

    let quillId = null;
    if (selectedId=== null) {
        quillId = "#new_editor";
    }else{
        quillId = `#editor${idx}`
    }


    // Quill設定
    quill=new Quill(quillId, {
        modules: {
            toolbar: [
                [{ header: [1, 2,3,4,5,6,false] },],
                [{'size':[]}],
                [{ 'font': [] }],
                ['bold', 'italic', 'underline','strike'],
                ['blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],

                [{ 'align': [] }],
                ["image"],

                //URLリンク
                ['link'] ,
                ['clean']
            ],
        },
        placeholder: 'こちらにご入力ください...',
        theme: 'snow', // or 'bubble'
        bounds: document.body
    });

    // toolbarのimageをクリックしたときに下記selectLocalImage()が実行される
    // quill.getModule('toolbar').addHandler('image', () => {
    //     SelectLocalImage();
    // });
}

// [Quill表示]
function ShowData(id) {

    let currentData = [];

    let found = false;

    if(quillContentArray.length>0) {
        for (let i = 0; i < quillContentArray.length; i++) {
            if (quillContentArray[i].id === selectedId) {
                currentData = quillContentArray[i]["quillContent"];
                found = true;
                break;
            }
        }
    }

    if(currentData.length === 0) {
        let detailsAllData =Laravel.data;
        detailsAllData.forEach((value)=>{
            if(value["product_id"]==id){
                currentData.push(value);
            }
        })
    }

    let setData = [];

    if(currentData.length>0){
        currentData.forEach((value) => {
            if(found===false) {
                // DBから取得したので文字列からJSON形式に戻す
                setData.push({"insert": JSON.parse(value["insert"]), "attributes": JSON.parse(value["attributes"])})
            }else{
                // そのまま追加
                setData.push({"insert": value["insert"], "attributes": value["attributes"]})
            }
        })
    }

    //Quillデータをエディター内に表示
    quill.setContents(setData);
}

// [Quillツールバー削除(重複回避)]
function DeleteQuillToolbar(idx){

    let quillId = null;
    if (selectedId=== null) {
        quillId = "new_editor";
    }else{
        quillId = `editor${idx}`
    }

    let editorContainer = document.getElementById(quillId);

    if (editorContainer) {
        // Quillインスタンスを取得
        let quillInstance = Quill.find(editorContainer);

        if (quillInstance) {
            // ツールバーを削除
            let toolbar = editorContainer.previousSibling;
            if (toolbar && toolbar.classList.contains('ql-toolbar')) {
                toolbar.remove();
            }
        }
    }
}

//Quillデータinputへ保存
function SendData(){
    const OPS = quill.getContents().ops;
    const DATAS = [];

    OPS.forEach((value) => {
        if(value.attributes !== "undefined") {
            DATAS.push({"insert": JSON.stringify(value.insert), "attributes": value.attributes});
        }
    });
    const NEW_QUILL_DATA = {
        "ops": DATAS
    };

    if(addUpdateFlag===true){
        // 新規登録
        const NEW_QUILL_INPUT = document.getElementById('quillData');
        NEW_QUILL_INPUT.value = JSON.stringify(NEW_QUILL_DATA);

    }else{
        // 更新
        const UPDATE_QUILL_INPUT = document.getElementsByClassName("quillData")[currentIndex];
        UPDATE_QUILL_INPUT.value =JSON.stringify(NEW_QUILL_DATA);
    }
}

for(let  i =0;i<SUBMIT_BUTTONS.length;i++){
    SUBMIT_BUTTONS[i].addEventListener("click",function (){
        SendData();
    })
}

// ---------------------------------------------------


//商品追加
ADD_BUTTON.addEventListener('click', function() {
    const formData = new FormData(FORM_ELEMENT);
    const imgInput = document.getElementById('img');
    const nameInput = document.getElementById('new_product_name');

    // バリデーション
    if (!imgInput.files.length) {
        alert('商品画像を選択してください。');
        return;
    }

    // バリデーション
    if (nameInput.value.trim() === "") {
        alert('商品名を入力してください。');
        return;
    }

    FetchData('/dashboard/product', 'POST',null, formData)
        .then(data => {
            alert(data.message);
            window.location.href = data.redirect;
        })
        .catch(error => {
            alert(error.message);
        });
});


//商品更新
document.querySelectorAll('.update-btn').forEach((btn) => {
    btn.addEventListener('click', function() {
        const ID = btn.getAttribute('data-product-id');
        const FORM_ELEMENTS = btn.closest('.productForm');
        const FORM_DATA = new FormData(FORM_ELEMENTS);

        FetchData(`/dashboard/product/${ID}`, 'POST',null, FORM_DATA)
            .then(data => {
                alert(data.message);
                window.location.href = data.redirect;
            })
            .catch(error => {
                alert(error.message);
            });
    });
});

//商品削除
for (let i = 0; i < DELETE_BUTTONS.length; i++) {
    DELETE_BUTTONS[i].addEventListener('click', function () {
        DeleteProduct(DELETE_BUTTONS[i]);
    });
}

function DeleteProduct(btn) {
    let id = btn.getAttribute('data-product-id');

    // 確認ダイアログを表示し、ユーザーがOKを押した場合のみ削除処理を実行
    if (confirm('本当に削除しますか？')) {

        // Ajaxリクエストを送信して削除処理を行う
        FetchData('/dashboard/product', 'DELETE',true,JSON.stringify({ id: id }))
            .then(data => {
                alert(data.message);
                window.location.href = data.redirect;
            })
            .catch(error => {
                console.error('削除に失敗しました:', error);
            });
    }
}

//表示設定
for (let i = 0; i < TOGGLE_INPUT.length; i++) {
    TOGGLE_INPUT[i].addEventListener('change', function () {
        ToggleProduct(TOGGLE_INPUT[i]);
    });
}
function ToggleProduct(btn) {

    let id = btn.value;
    let is_enabled = btn.checked ? 1 : 0; // チェックボックスがチェックされているかどうかでis_enabledを設定

    FetchData('/dashboard/toggle-product', 'POST',true,JSON.stringify({ id: id, is_enabled: is_enabled }))
        .then(data => {
            alert(data.message);
            window.location.href = data.redirect;
        })
        .catch(error => {
            alert(error.message);
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


// 価格帯データ有無チェック
let priceSelectBoxes = document.getElementsByClassName('price-select-box');
let productTitle = document.getElementsByClassName('product-title');

for (let i=0;i<priceSelectBoxes.length;i++){

    let savedPrices = priceSelectBoxes[i].querySelectorAll('.saved-price');

    if (savedPrices.length===0){
        let newOptionElement = document.createElement("option");
        newOptionElement.value = null;
        newOptionElement.innerText = '価格帯を選択してください';
        newOptionElement.selected = true;
        priceSelectBoxes[i].insertBefore(newOptionElement, priceSelectBoxes[i].firstChild);

        let newAlertElement = document.createElement("p");
        newAlertElement.innerText ="※価格帯が登録されていません";
        newAlertElement.style.color = "red";
        newAlertElement.classList.add("text-xs");
        productTitle[i].appendChild(newAlertElement);
    }
}

// [Quillのimgアイコンクリック時の処理]
// function SelectLocalImage() {
//
//     const IMG_INPUT = document.createElement('input');
//     IMG_INPUT.setAttribute('type', 'file');
//     IMG_INPUT.setAttribute("accept", "image/*");
//     IMG_INPUT.click();
//
//     IMG_INPUT.onchange = () => {
//         const UPLOAD_IMG = IMG_INPUT.files[0];
//
//         // FileReader インスタンスを作成
//         const READER = new FileReader();
//
//         // 読み込みが完了したときの処理
//         READER.onload = () => {
//
//             //アップロードした画像を文字にしたデータを保存
//             const newImgString64 = READER.result;
//
//             if (newImgString64 !== null) {
//                 let index = GetCurrentIndex();
//                 // 現在のカーソル位置に画像データを追加
//                 quill.insertEmbed(index, 'image', newImgString64);
//             }
//
//             SaveCurrentQuillContent();
//             ShowData();
//         };
//
//         // ここで読み込みが完了したときに onload イベントが発生し、上記コールバック関数が呼び出される。
//         READER.readAsDataURL(UPLOAD_IMG);
//     };
// }
//
// //[現在のカーソル位置取得]
// function GetCurrentIndex() {
//     // 現在のカーソル位置を取得
//     let selection = quill.getSelection();
//
//     if(selection) {
//         return selection.index;
//     } else {
//         return 0; // カーソル位置がない場合は0を返す
//     }
// }


// 商品更新
// for (let i = 0; i < SUBMIT_BUTTONS.length; i++) {
//     SUBMIT_BUTTONS[i].addEventListener('click', function () {
//         const FORM_ELEMENTS = document.getElementsByClassName('productForm');
//         const formData = new FormData(FORM_ELEMENTS[i]);
//         const id = SUBMIT_BUTTONS[i].getAttribute('data-product-id');
//         fetch(`/dashboard/product/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // CSRFトークン
//             },
//             body: formData
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.redirect) {
//                     alert(data.message);
//                     window.location.href = data.redirect;
//                 } else if (data.message) {
//                     alert(data.message);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('商品更新に失敗しました');
//             });
//     });
// }


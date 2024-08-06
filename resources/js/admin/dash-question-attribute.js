import interact from 'interactjs'

// メニューバー
const QUESTIONS = document.getElementsByClassName("qa__head")
const CHOICE_BUTTONS = document.getElementsByClassName("select-btn");

// ドラッグゾーン画面
const NEW_CHOICE_CONTAINER = document.getElementById("choice_container");
const DROPZONE = document.getElementById("outer-dropzone");
const DEFAULT_TITLE = document.getElementById("default_title");
const SELECTED_TITLE = document.getElementById("selected_title");
const CLEAR_BUTTON = document.getElementById("clear_button");
let attributeContainer = null;


// 属性画面
const CHOICE_CONTAINER = document.querySelector('.overflow-true');
let initialWidth = null;//ドラッグ要素width

// 各id
let attributeId = null;
let choiceId = null;
let accordionId = null;

// DBデータ
let choiceAttributeData =Laravel.data;
let attributeData = Laravel.attributeData;
let categoryData = Laravel.categoryData;

// 保存済の要素のid
let registerdIdArray = [];

//アコーディオンの開閉
for (let i = 0; i < QUESTIONS.length; i++) {
    QUESTIONS[i].addEventListener('click', function() {

        let selected_qa_body =  QUESTIONS[i].nextElementSibling;//アコーディオン中身

        // 現在表示している要素を再度クリックした場合はそのアコーディオンを閉じる
        if (selected_qa_body.classList.contains('visible')) {
            selected_qa_body.classList.remove('visible')
        } else {
            // 全てを一度非表示
            for (let i = 0; i < QUESTIONS.length; i++) {
                let tmpBody =QUESTIONS[i].nextElementSibling;
                tmpBody.classList.remove('visible')
            }

            // クリックされた要素のみ表示
            selected_qa_body.classList.add('visible');
            accordionId = i;
        }
    });
}

//編集する回答の選択
for (let i = 0; i < CHOICE_BUTTONS.length; i++) {
    CHOICE_BUTTONS[i].addEventListener('click', function() {

        choiceId = CHOICE_BUTTONS[i].getAttribute("data-product-id");

        if(document.getElementsByClassName("yes-drop")[0]!=null){
            initialWidth = document.getElementsByClassName("yes-drop")[0].getBoundingClientRect();

        }

        // interact.jsの開始
        startInteract();

        //dropzoneの表示
        ShowDropzone(i)

        //dropzoneのリセット
        ResetDropzone();

        //既存属性表示
        DisplayAttribute()

        // 既存属性一覧からドラッグ不加に
        HideAttribute()

    });
}

// enable draggables to be dropped into this
function DragMoveListener(event) {

    var target = event.target;

    if(target.classList.contains("drag-drop")){
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        // update the position attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
}

// dropzoneの表示
function ShowDropzone(idx){
    NEW_CHOICE_CONTAINER.classList.remove("hide");
    DEFAULT_TITLE.classList.add("hide");
    CLEAR_BUTTON.classList.remove("hide");
    SELECTED_TITLE.innerHTML = "回答："+CHOICE_BUTTONS[idx].innerText;
}



// DB登録済みのattributeデータを取得
function GetAttributeById(id) {
    return attributeData.find(attribute => attribute.id == id);
}

// DB登録済みのcategoryデータを取得
function GetCategoryById(id) {
    return categoryData.find(category => category.id == id);
}

// カテゴリーエリアの表示
function ShowCategoryArea(idx){
    attributeContainer = document.getElementById(`category${idx}`)
    attributeContainer.classList.remove("hidden")
    attributeContainer.classList.add("addedCategory")
}


// 登録済みの属性を選択不可に
function HideAttribute() {
    let attributes = document.getElementsByClassName("drop-item");

    for (let i = 0; i < attributes.length; i++) {
        // 要素を初期化
        attributes[i].classList.add("yes-drop");
        attributes[i].classList.add("l-wrapper_06");
        attributes[i].classList.remove("unselectable");

        // registerdIdArrayの要素に基づいて特定の要素のクラスを変更
        for (let b = 0; b < registerdIdArray.length; b++) {
            if (attributes[i].getAttribute("data-product-id") == registerdIdArray[b]) {
                attributes[i].classList.remove("yes-drop");
                attributes[i].classList.remove("l-wrapper_06");
                attributes[i].classList.add("unselectable");
            }
        }
    }
}

// 既存属性表示
function DisplayAttribute(){
    registerdIdArray=[];
    choiceAttributeData.forEach((value)=>{
        if(value["choice_id"] == choiceId){

            let registeredAttribute = GetAttributeById(value["attribute_id"]);
            let registeredCategory = GetCategoryById(registeredAttribute["category_id"]);

            // 一致したカテゴリーエリアの表示
            let categoryId = registeredAttribute["category_id"];
            ShowCategoryArea(categoryId);

            // 登録済みの属性を配列に追加
            registerdIdArray.push(registeredAttribute["id"])

            // html/cssを作成しappend
            let newAttribute = document.createElement("div");
            newAttribute.classList.add("w-[30%]", "my-4", "mx-auto","bg-gray-600");

            let categoryText = registeredCategory.name;
            let nameText = registeredAttribute.name;

            newAttribute.innerHTML = `
                        <div class="relative bg-white rounded-lg shadow-md shadow-gray-300">
                            <button data-product-id="${registeredAttribute['id']}" type="button" class="absolute close-button">×</button>
                            <div class="flex flex-col items-center justify-center px-4 py-2">
                                <p class="text-gray-500 text-sm leading-6 mb-1">【${categoryText}】</p>
                                <p class="text-xl text-gray-800 font-bold">${nameText}</p>
                            </div>
                        </div>
                    `;

            // 削除ボタンクリック時の処理
            let closeBtn = newAttribute.querySelector('.close-button');
            DeleteAttribute(closeBtn)

            attributeContainer.appendChild(newAttribute)
            DROPZONE.appendChild(attributeContainer);
        }
    })
}

// dropzoneのリセット
function ResetDropzone(){
    let attributeContainers = document.getElementsByClassName("attributeContainer");

    for (let i=0;i<attributeContainers.length;i++){
        attributeContainers[i].innerHTML = ''; // 中身を全て消す
    }
}

// 属性削除
function DeleteAttribute(btn){
    btn.addEventListener("click", function() {
        let attributeId =  btn.getAttribute("data-product-id")
        // if (!confirm('属性を削除しますか？')) {
        //     return;
        // }
        fetch(`/dashboard/attribute/question/${attributeId}?choiceId=${choiceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                choiceId: choiceId,
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
                    // window.alert(data.message);
                    localStorage.setItem('choiceId', data.choiceId);
                    localStorage.setItem('accordionId', data.accordionId);
                    window.location.href = data.redirect;
                } else if (data.message) {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('属性の削除に失敗しました');
            });

    });
}

// 属性全て削除
CLEAR_BUTTON.addEventListener("click",function (){
    if (!confirm('属性を全て削除しますか？')) {
        return;
    }
    fetch(`/dashboard/attribute/delete-attributes/${choiceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            choiceId: choiceId,
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
                window.alert(data.message);
                localStorage.setItem('choiceId', data.choiceId);
                localStorage.setItem('accordionId', data.accordionId);
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('属性の削除に失敗しました');
        });
})

// event.targetは指定エリア（ドラッグアイテムでない）
interact('.dropzone').dropzone({
    // .yes-drop classを付けたタグが動く
    accept: '.yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // ドラッグを始めると、ドロップ可能エリアにボーダーを追加
    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('show-border')
        CHOICE_CONTAINER.classList.remove("overflow-true")
        CHOICE_CONTAINER.classList.add("overflow-false");
    },

    // 指定エリアに入った時のfunction
    ondragenter: function (event) {
        // 指定ドロップエリア（指定エリアのbgを変更しエリアを分かりやすくする）
        event.target.classList.add('drop-target')
    },

    //指定エリアから出た時のfunction
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
    },

    // 指定エリアでドラッグが終了した時のfunction
    ondrop: function (event) {
        event.relatedTarget.classList.add("success-drop");
        attributeId = event.relatedTarget.getAttribute("data-product-id")

        fetch('/dashboard/attribute/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                attributeId: attributeId,
                choiceId: choiceId,
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
                    localStorage.setItem('choiceId', data.choiceId);
                    localStorage.setItem('accordionId', data.accordionId);
                    window.location.href = data.redirect;
                } else if (data.message) {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('属性の付与に失敗しました');
            });

    },

    // ドラッグが終了した時のfunction（指定エリア外にて終了した場合も含む）
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('show-border')
        event.target.classList.remove('drop-target')
        CHOICE_CONTAINER.classList.add("overflow-true")
        CHOICE_CONTAINER.classList.remove("overflow-false")
    }
});

function startInteract(){
    interact('.yes-drop')
        .draggable({
            inertia: false,
            modifiers: [
                interact.modifiers.restrictRect({
                    // restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                start(event) {
                    event.target.classList.remove("l-wrapper_06");
                    event.target.classList.add("drag-drop");

                    // ドラッグ開始時に幅を固定
                    if(initialWidth!=null){
                        event.target.style.width = initialWidth.width+"px";
                        // ドラッグ開始時に初期位置を設定
                        const rect = event.target.getBoundingClientRect();
                        const x = event.clientX - rect.left - rect.width / 2;
                        const y = event.clientY - rect.top - rect.height / 2;
                        event.target.setAttribute('data-x', x);
                        event.target.setAttribute('data-y', y);
                    }
                },
                move: DragMoveListener,
                end(event) {
                    // ドラッグ要素を元の位置に戻す
                    event.target.classList.remove("drag-drop");
                    event.target.classList.add("l-wrapper_06");

                    // 一旦リフレッシュするためにスタイルをクリア
                    setTimeout(() => {
                        event.target.style.transform = '';
                    }, 0);

                    // 指定エリアでドロップした場合、ドラッグ要素のコピーを指定エリアに配置
                    if (event.target.classList.contains("success-drop")) {
                        event.target.classList.remove("yes-drop");
                        event.target.classList.add("unselectable");

                        // 新しい要素を作成する
                        let newAttribute = document.createElement("div");
                        newAttribute.classList.add("w-[30%]", "my-4", "mx-auto","bg-gray-600");

                        let categoryText = event.target.getElementsByTagName('p')[0].innerHTML;
                        let nameText = event.target.getElementsByTagName('p')[1].innerHTML;

                        newAttribute.innerHTML = `
                        <div class="relative bg-white rounded-lg shadow-md shadow-gray-300">
                            <button class="absolute close-button">×</button>
                            <div class="flex flex-col items-center justify-center px-4 py-2">
                                <p class="text-gray-500 text-sm leading-6 mb-1">${categoryText}</p>
                                <p class="text-xl text-gray-800 font-bold">${nameText}</p>
                            </div>
                        </div>
                    `;
                        DROPZONE.appendChild(newAttribute);
                    }
                }
            }
        });

}

// リダイレクト時の処理
document.addEventListener('DOMContentLoaded', (event) => {

    let choiceId = localStorage.getItem('choiceId');
    let accordionId = localStorage.getItem('accordionId');

    if (choiceId&&accordionId) {

        // アコーディオン（質問）選択ボタン
        let question = QUESTIONS[accordionId];
        if (question) {
            // 手動でクリックイベントを発生させる
            question.click();
        }

        // 回答選択ボタン
        let selectButton = document.querySelector(`.select-btn[data-product-id="${choiceId}"]`);
        if (selectButton) {
            // 手動でクリックイベントを発生させる
            selectButton.click();
        }
    }

    // 状態をリセット
    localStorage.removeItem('accordionId');
    localStorage.removeItem('choiceId');
});

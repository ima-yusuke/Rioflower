import Quill from "quill";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const EDIT_BUTTONS = document.querySelectorAll('.editBtn');//編集ボタン
const EDITOR_CONTAINERS = document.getElementsByClassName("editor");//Quill挿入箇所
const SUBMIT_BUTTONS = document.getElementsByClassName('submit-btn');//登録/更新ボタン
let quill = null; // Quillインスタンスを保持する変数
let newImgString64 = null;//画像データを文字にして保存
let flag = false;
let newImgQuillData = null;//現在のQuill内のデータを保存
let currentIndex = null;//更新時に何番目のQuillかindexを保存

EDIT_BUTTONS.forEach((btn,idx) => {
    btn.addEventListener('click', function() {

        currentIndex = idx;

        let selectedAccordion = btn.parentNode.parentNode.nextElementSibling;//アコーディオン中身

        // 現在表示している要素を再度クリックした場合はそのアコーディオンを閉じる
        if(selectedAccordion.classList.contains('visible')){
            selectedAccordion.classList.remove('visible')
            btn.innerHTML = "編集"
            DeleteQuill(idx)

        }else {
            // 全てを一度非表示
            for (let i = 0; i < EDIT_BUTTONS.length; i++) {
                let tmpBody =  EDIT_BUTTONS[i].parentNode.parentNode.nextElementSibling;
                tmpBody.classList.remove('visible')
                EDIT_BUTTONS[i].innerHTML = "編集"
            }

            // クリックされた要素のみ表示
            selectedAccordion.classList.add('visible');
            btn.innerHTML = "閉じる";

            // Quill実装
            DeleteQuill(idx)
            CreateQuill(idx)

            // DBに保存されてるデータの表示
            if(this.getAttribute('data-product-id')!=null){
                ShowData(this.getAttribute('data-product-id'));
            }
        }
    });
});

// [Quill作成]
function CreateQuill(idx){

    // 編集用Quill(リッチテキスト)作成
    let quillDiv = document.createElement("div");
    quillDiv.setAttribute("id", "editor");

    // タイトル作成
    let title = document.createElement("p");
    title.classList.add("quillTitle")
    title.innerHTML = "5.商品詳細";

    // 選択されたアコーディオンにappend
    EDITOR_CONTAINERS[idx].appendChild(title);
    EDITOR_CONTAINERS[idx].appendChild(quillDiv);

    // Quill設定
    quill=new Quill('#editor', {
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
    quill.getModule('toolbar').addHandler('image', () => {
        SelectLocalImage();
    });

    flag = false;
}

// [Quill表示]
function ShowData(id) {

    let currentData = [];
    if(flag === false) {
        // 編集をクリックしアコーディオンを開いたときDBに既にデータがあればcurrentDataに追加
        let detailsAllData =Laravel.data;
        detailsAllData.forEach((value)=>{
            if(value["product_id"]==id){
                currentData.push(value);
            }
        })
    }else{
        // 画像をQuillにアップロードした場合
        currentData = newImgQuillData;
    }

    let setData = []
    if(currentData.length>0){
        currentData.forEach((value) => {
            if(flag===false) {
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

    newImgString64 = null;
    flag = true;
}

// [Quill削除]
function DeleteQuill(idx){
    let quillContainer = EDITOR_CONTAINERS[idx];
    while(quillContainer.firstChild){
        quillContainer.removeChild(quillContainer.firstChild)
    }

    if (quill) {
        quill.off(); // イベントリスナーを解除
        let quillContainer = document.querySelector('.ql-container');
        if (quillContainer) {
            quillContainer.parentNode.removeChild(quillContainer);
        }
        quill = null;
    }
    flag = true;
}


// [Quillのimgアイコンクリック時の処理]
function SelectLocalImage() {

    const IMG_INPUT = document.createElement('input');
    IMG_INPUT.setAttribute('type', 'file');
    IMG_INPUT.setAttribute("accept", "image/*");
    IMG_INPUT.click();

    // Listen upload local image and save to server
    IMG_INPUT.onchange = () => {

        const UPLOAD_IMG = IMG_INPUT.files[0];

        // FileReader インスタンスを作成
        const READER = new FileReader();

        // 読み込みが完了したときの処理
        READER.onload = () => {

            //アップロードした画像を文字にしたデータを保存
            const IMG_STRING64 = READER.result;

            newImgString64 = IMG_STRING64;

            // 現在のカーソル位置に画像データを追加
            if(newImgString64 !== null) {
                // 挿入する位置を取得
                let index = GetCurrentIndex();
                // 画像を挿入する
                quill.insertEmbed(index, 'image', newImgString64);
            }
            newImgQuillData = quill.getContents().ops;
            flag = true;
            ShowData()
        };

        // ここで読み込みが完了したときに onload イベントが発生し、上記コールバック関数が呼び出される。
        READER.readAsDataURL(UPLOAD_IMG);
    };
}

//[現在のカーソル位置取得]
function GetCurrentIndex() {
    // 現在のカーソル位置を取得
    let selection = quill.getSelection();
    if(selection) {
        return selection.index;
    } else {
        return 0; // カーソル位置がない場合は0を返す
    }
}

// [データ受け渡しfunction]
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

    if(flag ===false){
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
        SendData(SUBMIT_BUTTONS[i]);
    })
}


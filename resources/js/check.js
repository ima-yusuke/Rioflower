import "flowbite"
import Quill from "quill";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const SEND_BTN = document.getElementById("mail-btn");
const PRODUCT_ID = document.getElementById("product-id").textContent;
let quill = null;// Quillインスタンスを保持する変数

// 顧客情報追加
SEND_BTN.addEventListener("click",function(){
    const NAME = document.getElementById("customer-name").textContent;
    const ADDRESS = document.getElementById("customer-address").textContent;
    const EMAIL = document.getElementById("customer-mail").textContent;
    const ID = document.getElementById("product-id").textContent;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    sessionStorage.removeItem('sent');

    document.querySelectorAll('.show').forEach((element) => {
        element.classList.add('hidden');
    });
    document.querySelectorAll('.mail').forEach((element) => {
        element.classList.remove('hidden');
    });
    document.getElementById('sent').classList.add('hidden');

    // Quillの内容を取得
    initializeQuillViewer('#detail', details);

    setTimeout(() => {
        const htmlContents = document.documentElement.outerHTML;
        fetch('/check', {
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
                html: htmlContents,
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
                    sessionStorage.setItem('sent', 'true');
                    window.location.href = '/check';
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
});

const initializeQuillViewer = (selector, contents) => {
    const quill = new Quill(selector, {
        modules: {
            toolbar: false
        },
        theme: 'bubble',
        readOnly: true,
    });

    // contentsをJSON文字列に変換する前に、正しい形式に整形する必要があります
    let setData = contents.map(item => ({
        insert: JSON.parse(item.insert),
        attributes: item.attributes ? JSON.parse(item.attributes) : null
    }));
    quill.setContents({ ops: setData });
}

// quill表示
function DisplayQuill(){

    // Quill表示
    quill = new Quill("#detail", {
        //ツールバー無デザイン
        readOnly: true
    });

    let detail = details;

    let setData = [];

    if(detail.length>0){
        detail.forEach((value) => {
            // DBから取得したので文字列からJSON形式に戻す
            setData.push({"insert": JSON.parse(value["insert"]), "attributes": JSON.parse(value["attributes"])})
        })
    }

    //Quillデータをエディター内に表示
    quill.setContents(setData)
}

// ページ読み込み時に実行
window.onload = function(){
    DisplayQuill(PRODUCT_ID);
    if(sessionStorage.getItem('sent') === 'true') {
        document.getElementById('sent').classList.remove('hidden');
        document.getElementById('check-text').classList.add('hidden');
    }
}

// セッションクリア
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

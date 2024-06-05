<x-template title="診断ページ" css="app.css">
    <div class="bg-main-bg flex flex-col justify-center items-center w-full pb-10">
        {{--質問画面--}}
        <x-question-component></x-question-component>

        {{--確認画面--}}
        <x-confirm-component></x-confirm-component>

        {{--結果画面--}}
        <x-result-component></x-result-component>
    </div>

    <script>
        const questions = @json($data);

        let products = @json($products);

        // let tmpArray =[];

        // 非表示なのは除外(is_enabledが1でないもの)
        // products.forEach((value)=>{
        //     if(value["is_enabled"]===1){
        //         tmpArray.push(value);
        //     }
        // })

        // products = tmpArray;

        // 購入ボタンを押したときにmodalでbodyのoverflow-hiddenが外れる問題に対応
        let mail_btn = document.getElementsByClassName("mail-btn");
        for (let i = 0; i < mail_btn.length; i++) {
            mail_btn[i].addEventListener("click", function () {
                let body = document.querySelector("body");
                body.style.overflow = "hidden";
            });
        }
    </script>
</x-template>


<div id="question_container" class="quiz hide flex flex-col gap-4">
    {{--残質問数--}}
    <div id="question_num" class="flex justify-end text-main-brown ml-auto pr-2"></div>

    {{--画像と質問--}}
    <div class="flex justify-center items-center gap-6 h-full">
        {{--左側コンテンツ（画像）--}}
        <div style="width: 500px; height: 500px;" id="question_img" >
            <img src="{{ asset("/img/box.jpg") }}" style="width: 100%; height: 100%; object-fit: cover;" class="rounded-3xl">
        </div>

        {{--戻るボタン--}}
        <div class="back-btn-container">
            <button id="back_btn" class="text-main-brown font-bold text-6xl hide"><i class="fa-solid fa-arrow-left"></i></button>
        </div>

        {{--右側コンテンツ（質問＆選択肢）--}}
        <div class="flex flex-col bg-white rounded-3xl border-4 border-solid border-answers-container-border" style="width: 500px; height: 500px;">
            {{--質問文--}}
            <div id="question_text" class="font-bold text-main-brown text-xl text-center mt-12"></div>
            {{--選択肢--}}
            <div id="question_answers_container" class="flex flex-col justify-center h-full gap-4 mx-8"></div>
        </div>
    </div>
</div>


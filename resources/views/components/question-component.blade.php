<div id="question_container" class="question-container hide w-full">

    <div class="flex flex-col justify-center items-center gap-6 w-full">
        {{--残質問数--}}
        <div id="question_num" class="text-main-brown text-sm md:text-base"></div>

        {{--画像と質問--}}
        <div class="flex flex-col items-center justify-center md:flex-row gap-6 md:gap-28">
            {{--左側コンテンツ（画像）--}}
            <div id="question_img" class="w-[45vh] h-[45vh] md:w-[500px] md:h-[500px] relative">
                <img src="{{ asset('/img/box.jpg') }}" class="question-img">
            </div>

            {{--右側コンテンツ（質問＆選択肢）--}}
            <div class="flex items-center">
                <div class="relative flex flex-col justify-center gap-6 md:py-12 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white rounded-3xl border-4 border-solid border-answers-container-border">
                    {{--質問文--}}
                    <div id="question_text" class="font-bold text-main-brown md:text-xl text-center"></div>
                    {{--選択肢--}}
                    <div id="question_answers_container" class="flex flex-col overflow-y-auto gap-4 mx-4 md:mx-8 h-full"></div>
                </div>
            </div>
        </div>
    </div>

    {{--戻るボタン--}}
    <div id="back_btn_container" class="flex justify-start">
        <button id="back_btn" class="text-main-brown font-bold hide"><i class="fa-solid fa-arrow-left text-xl md:text-6xl"></i></button>
    </div>
</div>

<div id="question_container" class="question-container hide w-full pb-4 md:pb-0">

    <div class="flex flex-col justify-center items-center gap-6 w-full">
        {{--残質問数--}}
        <div id="question_num" class="text-main-brown text-sm md:text-base"></div>

        {{--画像と質問--}}
        <div class="flex flex-col items-center justify-center md:flex-row gap-6 md:gap-28 w-full">
            {{--左側コンテンツ（画像）--}}
            <div id="question_img" class="w-[120px] h-[120px] md:w-[500px] md:h-[500px] rounded-full md:rounded-3xl">
                <img src="{{ asset('storage/img/botanical.jpg') }}" class="question-img back" draggable="false">
            </div>

            {{--右側コンテンツ（質問＆選択肢）--}}
            <div class="flex items-center rounded-3xl" id="question">
                <div id="bg" class="relative flex flex-col justify-center gap-6 md:gap-12 md:py-8 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-main-brown rounded-3xl shadow-custom-dark">
                    {{--質問文--}}
                    <div id="question_text" class="font-bold text-top-white md:text-xl text-center mx-4 md:mx-8"></div>
                    {{--選択肢--}}
                    <div id="question_answers_container" class="flex flex-col items-center overflow-y-auto gap-4 md:gap-6 mx-4 md:mx-8 h-full"></div>
                </div>
            </div>
        </div>
    </div>

    {{--戻るボタン--}}
    <button id="back_btn" class="absolute md:bottom-16 md:left-4 text-main-brown bg-white rounded-full shadow-back-btn-shadow flex justify-center items-center h-[60px] w-[60px] ml-4 md:mt-4 font-bold hide">
       <span class="text-sm">戻る</span>
    </button>

</div>
<style>
    #question {
        background-image: url('{{asset("storage/img/confirm.jpg")}}'); /* ここに画像のパスを入力 */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        height: 500px;
        width: 500px;
        z-index: 1;
    }
    @media (max-width: 767px) {
        #question {
            height: 300px;
            width: 300px;
        }
    }
    #bg {
        background-color: rgba(191, 158, 116, 0.8); /* 半透明の背景色 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.2); /* 浮き出るような影 */
    }
</style>

<div id="question_container" class="question-container hide w-full pb-4 md:pb-0 h-full relative">

    <div class="flex flex-col justify-center items-center gap-2 w-full h-full">
        {{--残質問数--}}
        <div id="question_num" class="text-main-brown text-sm md:text-base absolute top-2 left-1/2 transform -translate-x-1/2"></div>

        {{--画像と質問--}}
        <div class="flex flex-col items-center justify-center md:flex-row gap-4 md:gap-28 w-full h-full">
            {{--左側コンテンツ（画像）--}}
            <div id="question_img" class="w-[120px] h-[120px] md:w-[500px] md:h-[500px] rounded-full md:rounded-3xl z-10">
                <img src="{{ asset('storage/img/botanical.jpg') }}" class="question-img back" draggable="false">
            </div>

            {{--右側コンテンツ（質問＆選択肢）--}}
            <div class="flex items-center rounded-3xl -mt-10 md:mt-0" id="question">
                <div id="bg" class="relative flex flex-col justify-center gap-6 md:gap-12  w-[300px] h-[330px] md:w-[500px] md:h-[500px] bg-main-brown rounded-3xl shadow-custom-dark">
                    {{--質問文--}}
                    <div id="question_text" class="font-bold text-top-white md:text-xl text-center mx-4 md:mx-8 mt-6"></div>
                    {{--選択肢--}}
                    <div id="question_answers_container" class="flex flex-col items-center overflow-y-auto gap-4 md:gap-6 mx-4 md:mx-8 h-full"></div>
                </div>
            </div>
        </div>
    </div>

    {{--戻るボタン--}}
    <button id="back_btn" class="absolute z-20 bottom-2 md:bottom-16 md:left-4 text-main-brown bg-white rounded-full shadow-back-btn-shadow flex justify-center items-center h-[55px] w-[55px] md:h-[60px] md:w-[60px] ml-4 mt-2 md:mt-4 font-bold hide">
       <span class="text-[10px] md:text-sm">戻る</span>
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
            height: 330px;
            width: 300px;
        }
    }
    #bg {
        background-color: rgba(191, 158, 116, 0.8); /* 半透明の背景色 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.2); /* 浮き出るような影 */
    }
</style>

<div id="question_container" class="question-container hide">
    {{--残質問数--}}
    <div id="question_num" class="flex justify-end text-main-brown text-sm md:text-base ml-auto mb-2 pr-2"></div>

    {{--画像と質問--}}
    <div class="flex flex-col md:flex-row justify-center items-center gap-6 h-full">
        {{--左側コンテンツ（画像）--}}
        <div id="question_img" class="w-[45vh] h-[45vh] md:w-[500px] md:h-[500px]">
            <img src="{{ asset('/img/box.jpg') }}" class="question-img">
        </div>

        <div class="flex items-center">
            {{--戻るボタン--}}
            <div id="back_btn_container" class="back-btn-container">
                <button id="back_btn" class="text-main-brown font-bold hide"><i class="fa-solid fa-arrow-left text-xl md:text-6xl"></i></button>
            </div>

            {{--右側コンテンツ（質問＆選択肢）--}}
            <div class="relative flex flex-col justify-center gap-6 md:py-12 w-[45vh] h-[45vh] md:w-[500px] md:h-[500px] bg-white rounded-3xl border-4 border-solid border-answers-container-border">
                {{--質問文--}}
                <div id="question_text" class="font-bold text-main-brown md:text-xl text-center"></div>
                {{--選択肢--}}
                <div id="question_answers_container" class="flex flex-col overflow-y-auto gap-4 mx-4 md:mx-8 h-full"></div>
            </div>
        </div>
    </div>
</div>


<script>
    function handleResize() {
        const backBtnContainer = document.getElementById('back_btn_container');

        if (window.innerWidth < 768) {
            backBtnContainer.classList.remove('back-btn-container');
            backBtnContainer.classList.add('position-absolute');
        } else {
            backBtnContainer.classList.add('back-btn-container');
        }
    }

    // 初期ロード時の処理
    handleResize();

    // 画面サイズ変更時の処理
    window.addEventListener('resize', handleResize);
</script>


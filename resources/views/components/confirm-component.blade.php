<div id="confirm_container" class="confirm-container hide w-full flex flex-col items-center justify-center gap-4">
    <div class="flex items-center rounded-3xl" id="confirm">
        <div id="confirm_answers_container" class="relative flex flex-col justify-center items-center gap-6 py-4 md:py-8 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-main-brown rounded-3xl shadow-custom-dark">
            <p class="text-center text-2xl text-top-white" id="test">Confirm</p>
            <div class="flex justify-center text-center">
                <p class="border-t border-top-white w-[50px] mb-2 md:mb-4"></p>
            </div>
            <p class="text-top-white text-sm md:text-base">以下の回答内容でよろしいですか</p>
            <div class="flex flex-col overflow-y-auto py-4 md:py-0 gap-6 mx-4 md:mx-8 h-full w-full" id="confirm_box"></div>
        </div>
    </div>
    <button id="show_result_btn" class="absolute bottom-12 ml-0 m-auto md:right-8 pink-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">診断結果を見る→</button>
</div>
<style>
    #confirm {
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
        #confirm {
            height: 300px;
            width: 300px;
        }
    }
    #confirm_answers_container {
        background-color: rgba(191, 158, 116, 0.8); /* 半透明の背景色 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.2); /* 浮き出るような影 */
    }
</style>

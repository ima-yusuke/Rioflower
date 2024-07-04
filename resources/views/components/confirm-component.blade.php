<div id="confirm_container" class="confirm-container hide w-full flex flex-col items-center justify-center gap-4">
    <div id="confirm_answers_container" class="flex flex-col items-center gap-6 bg-main-brown w-[50%] max-h-[60dvh] py-8 rounded-2xl overflow-y-auto"></div>
    <button id="show_result_btn" class="pink-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">診断結果を見る</button>
</div>
<style>
    #confirm_container {
        background-image: url('{{asset("storage/img/confirm.jpg")}}'); /* ここに画像のパスを入力 */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 1;
    }
    #confirm_answers_container {
        background-color: rgba(191, 158, 116, 0.8); /* 半透明の背景色 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.2); /* 浮き出るような影 */
    }
</style>

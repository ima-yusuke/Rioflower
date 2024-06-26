<div id="result_container" class="relative flex flex-col justify-center items-center hide gap-8 w-full min-h-screen">
    {{--１位商品詳細--}}
    <div class="flex flex-col md:flex-row justify-between items-center gap-80 md:gap-0 h-full md:w-full w-full">
        {{--左側詳細--}}
        <div class="w-full md:w-[50%] relative mt-8">
            <div id="big_ball" class="big-screen w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-main-brown rounded-full">
                <img id="result_img" class="object-cover absolute left-[22%] md:left-1/3 top-[80%] md:top-1/4 transform translate-x-20 -translate-y-56 z-10 rounded-full w-[280px] md:w-[400px] h-[280px] md:h-[400px]">
            </div>

            <!-- その他おすすめ画像の表示エリア -->
            <div class="absolute bottom-12 z-30 w-full flex justify-center gap-10 md:gap-32 my-6">
                <div class="flex flex-col items-center justify-center gap-2">
                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
                    <p>【第2位】</p>
                </div>
                <div class="flex flex-col items-center justify-center gap-2">
                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
                    <p>【第3位】</p>
                </div>
                <div class="flex flex-col items-center justify-center gap-2">
                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
                    <p>【第4位】</p>
                </div>
            </div>
        </div>

        {{--右側詳細--}}
        <div class="flex flex-col justify-center items-center gap-4 md:w-[50%] mx-10 w-full">
            <div class="flex flex-col gap-4 w-full">
                {{--タイトル--}}
                <div class="font-bold flex flex-col  gap-2">
                    <p class="text-center">あなたにおすすめなのは</p>
                    <aside class="flex justify-center items-center md:items-end gap-2">
                        <h2 class="text-2xl md:text-4xl">商品名:<span id="result_p_name"></span></h2>
                        <p>です！</p>
                    </aside>
                </div>

                {{--Quill表示エリア--}}
                <div class="h-[450px] overflow-scroll" id="quill_view_container">

                </div>

                {{--ボタン--}}
                <aside class="flex justify-center gap-4 mx-6 md:mx-0">
                    <button class="back-start-btn">
                        <a href="{{route('Index')}}">初めからやり直す</a>
                    </button>

                    {{--modal open button--}}
                    <button data-modal-target="default-modal1" data-modal-toggle="default-modal1" id="open-modal-btn1" class="open-modal pink-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                        購入
                    </button>
                </aside>
            </div>
        </div>
    </div>
</div>

<!-- 購入 modal -->
<div id="default-modal1" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    お客情報入力フォーム
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    メールアドレスを入力して『送信』ボタンを押してください。<br>
                    ご入力頂いたメールアドレスに購入先リンクをお送り致します。
                </p>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">氏名</p>
                <input type="text" placeholder="氏名" id="customer-name" class="w-full rounded-md">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">住所</p>
                <input type="text" placeholder="住所" id="customer-address" class="w-full rounded-md">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">メールアドレス</p>
                <input type="email" placeholder="example@example.com" id="customer-mail" class="w-full rounded-md">
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button data-modal-hide="default-modal1" type="button" class="mail-btn py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">閉じる</button>
                <button data-modal-hide="default-modal1" data-id="" type="button" id="send_btn" class="mail-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">送信</button>
            </div>
        </div>
    </div>
</div>

<script>
    function handleBallResize() {
        const BIG_BALL = document.getElementById('big_ball');

        if (window.innerWidth < 768) {
            BIG_BALL.classList.remove('big-screen');
            BIG_BALL.classList.add('small-screen');
        }else{
            BIG_BALL.classList.remove('small-screen');
            BIG_BALL.classList.add('big-screen');
        }
    }

    // 初期ロード時の処理
    handleBallResize();

    // 画面サイズ変更時の処理
    window.addEventListener('resize', handleBallResize);
</script>

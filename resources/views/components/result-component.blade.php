<div id="result_container" class="relative flex flex-col justify-center items-center hide gap-8 w-full min-h-screen">

    <!-- その他おすすめ画像の表示エリア -->
    <div class="z-30 w-full flex justify-center gap-10 md:gap-32 my-6 md:my-16">
        <div>
            <img src="{{asset('img/flower01.jpeg')}}" class="object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
        </div>
        <div>
            <img src="{{asset('img/flower02.jpeg')}}" class="object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
        </div>
        <div>
            <img src="{{asset('img/flower03.jpg')}}" class="object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">
        </div>
    </div>

    {{--１位商品詳細--}}
    <div class="flex flex-col md:flex-row justify-between items-center h-full md:w-full w-full">
        {{--左側詳細--}}
        <div class="md:w-[50%]">
            <div id="big_ball" class="big-screen w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-main-brown rounded-full">
                <img id="result_img" class="object-cover absolute left-[30%] md:left-1/3 top-[90%] md:top-1/4 transform translate-x-20 -translate-y-56 z-10 rounded-full w-[250px] md:w-[450px] h-[250px] md:h-[450px]">
            </div>
        </div>

        {{--右側詳細--}}
        <div class="flex flex-col justify-center items-center gap-4 md:w-[50%] mx-10 w-full">
            <div class="flex flex-col gap-8 w-full">
                {{--タイトル--}}
                <div class="font-bold flex flex-col gap-2">
                    <p>あなたにおすすめなのは</p>
                    <aside class="flex items-end gap-2">
                        <h2 class="text-4xl">商品名<span id="result_p_name"></span></h2>
                        <p>です！</p>
                    </aside>
                </div>

                {{--詳細--}}
                <div class="flex flex-col gap-4 bg-detail-bg p-6 rounded-lg">
                    <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                    <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                    <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                    <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                    <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                </div>

                {{--ボタン--}}
                <aside class="flex justify-center gap-4">
                    <button class="back-start-btn">
                        <a href="{{route('index')}}">初めからやり直す</a>
                    </button>

                    {{--modal open button--}}
                    <button data-modal-target="default-modal" data-modal-toggle="default-modal" id="open-modal-btn" class="pink-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                        購入する
                    </button>
                </aside>
            </div>
        </div>
    </div>
</div>

<!-- Main modal -->
<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    購入先リンク
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    メールアドレスを入力して『送信』ボタンを押してください。<br>
                    ご入力頂いたメールアドレスに購入先リンクをお送り致します。
                </p>
                <input type="email" placeholder="test@com" class="w-full rounded-md">
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button data-modal-hide="default-modal" type="button" class="mail-btn py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">閉じる</button>
                <button data-modal-hide="default-modal" type="button" class="mail-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">送信</button>
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

<div id="result_container" class="result hide flex flex-col items-center gap-8 w-full min-h-screen">
    <div class="flex justify-between w-full">
        {{--左側詳細--}}
        <div class="absolute -bottom-48 -left-24 w-[800px] h-[800px] bg-main-brown rounded-full">
            <img id="result_img" class="object-cover absolute left-1/3 top-1/4 transform translate-x-20 -translate-y-56 z-10 rounded-full w-[400px] h-[400px]">
        </div>
        <div class="w-[50%]"></div>

        {{--右側詳細--}}
        <div class="flex flex-col justify-center items-center gap-4 w-[50%] mx-10">
            <div class="flex flex-col gap-8">
                {{--タイトル--}}
                <div class="font-bold flex flex-col gap-2">
                    <p>あなたにおすすめなのは</p>
                    <aside class="flex items-end gap-2">
                        <h2 class="text-4xl">商品名<span id="result_p_name"></span></h2>
                        <p>です！</p>
                    </aside>
                </div>

                {{--詳細--}}
{{--                <div></div>--}}

                {{--項目--}}
                <aside></aside>
            </div>
            <aside class="flex gap-4">
                <button class="btn-white">
                    <a href="{{route('index')}}">初めからやり直す</a>
                </button>

                {{--modal open button--}}
                <button data-modal-target="default-modal" data-modal-toggle="default-modal" id="open-modal-btn" class="btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                    購入する
                </button>
            </aside>

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
        </div>
    </div>

    <!-- 画像の表示エリア -->
    <div class="fixed bottom-0 left-0 w-full flex justify-center gap-32 p-4">
        <div>
            <img src="{{asset('img/flower01.jpeg')}}" class="object-cover rounded-full w-[100px] h-[100px]">
        </div>
        <div>
            <img src="{{asset('img/flower02.jpeg')}}" class="object-cover rounded-full w-[100px] h-[100px]">
        </div>
        <div>
            <img src="{{asset('img/flower03.jpg')}}" class="object-cover rounded-full w-[100px] h-[100px]">
        </div>
    </div>
</div>

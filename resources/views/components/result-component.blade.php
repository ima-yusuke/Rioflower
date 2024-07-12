<div id="result_container" class="relative flex flex-col justify-center items-center hide gap-8 w-full">

    <x-nav-menu />

    <div class="flex flex-col md:flex-row justify-center items-center h-full md:w-full w-full">
        {{--左側詳細--}}
        <div class="w-full md:w-[50%] md:h-full h-[55dvh]">
            {{--茶色ボール&1位写真--}}
            <div class="w-full h-full relative">
                <img id="result_img" class="absolute md:top-1/2 top-2/3 md:-translate-y-1/2 -translate-y-2/3 left-1/2 -translate-x-1/2 w-[60%] h-auto aspect-square object-cover z-20 rounded-full" draggable="false">
                <div id="big_ball" class="absolute md:top-1/3 -top-1/2 -left-1/3 z-10 bg-main-brown rounded-full w-full aspect-square"></div>
            </div>
        </div>

        {{--右側詳細--}}
        <div class="flex flex-col justify-center items-center gap-4 md:w-[50%] mx-10 w-full max-w-[600px] mb-3">
            <div class="flex flex-col gap-4 w-full">
                {{--タイトル--}}
                <div class="font-bold flex flex-col items-center gap-2 md:ml-4">
                    <p class="text-center text-main-brown">\あなたに合うおすすめ商品は/</p>
                    <div class="relative">
                        <aside class="flex justify-center items-center md:items-end gap-2">
                            <h2 class="text-2xl md:text-4xl text-main-brown"><span id="result_p_name"></span></h2>
                        </aside>
                        <div id="recommend-wrapper" class="absolute top-0 left-0 w-full h-full bg-main-bg opacity-0">

                        </div>
                    </div>
                </div>

                {{--Quill表示エリア--}}
                <div class="relative md:h-[450px] h-[400px] mx-10 md:mx-0" id="quill_view_container">
                    <div id="viewer" class="quill-bg"></div>
                    <div id="viewer-wrapper" class="absolute top-0 left-0 h-full w-full opacity-0 -z-10" style="background-color: rgb(237,230,215)"></div>
                    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col" style="line-height: 0; color: rgba(100, 100, 100, 0.8)">
                        <div id="quill-scroll">
                            <p>scroll</p>
                        </div>
                    </div>
                </div>

                {{--ボタン--}}
                <aside class="flex justify-center gap-4 mx-6 mt-8 md:mt-0 md:mx-0">
                    <button id="back-start-btn" class="back-start-btn border hover:bg-gray-700 hover:text-white hover:border-white text-nowrap" onclick="location.href='{{ route('Index') }}'">初めからやり直す</button>

                    {{--modal open button--}}
                    <button data-modal-target="default-modal1" data-modal-toggle="default-modal1" id="open_modal_btn" class="open-modal pink-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
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
            <form method="POST" action="{{ route('SubmitForm') }}">
                @csrf
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        必要事項を入力して『確認画面へ』ボタンを押してください。<br>
                    </p>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">氏名</p>
                    <input type="text" name="customer-name" id="customer-name" placeholder="氏名" value="{{ session()->has('name') ? session('name') : '' }}" class="w-full rounded-md">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">住所</p>
                    <input type="text" name="customer-address" id="customer-address" placeholder="住所" value="{{ session()->has('address') ? session('address') : '' }}" class="w-full rounded-md">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">メールアドレス</p>
                    <input type="email" name="customer-mail" id="customer-mail" placeholder="example@example.com" value="{{ session()->has('email') ? session('email') : '' }}" class="w-full rounded-md">
                    <input type="hidden" name="product_id" id="product-id" value="">
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button data-modal-hide="default-modal1" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">閉じる</button>
                    <button data-modal-hide="default-modal1" type="submit" id="send-btn" class="mail-btn text-white bg-top-button-pink hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">確認画面へ</button>
                </div>
            </form>
        </div>
    </div>
</div>

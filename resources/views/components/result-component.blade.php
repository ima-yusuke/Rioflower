<div id="result_container" class="relative flex flex-col justify-center items-center hide gap-8 w-full">

    <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 h-full md:w-full w-full">
        {{--左側詳細--}}
        <div class="w-full md:w-[50%] relative md:mt-8 flex flex-col md:flex-row md:gap-0">
            {{--１位商品詳細--}}
            <div id="big_ball" class="big-ball w-[450px] md:w-[90vh] h-[450px] md:h-[90vh] bg-main-brown rounded-full">
                <img id="result_img" class="result-img w-[300px] md:w-[350px] h-[300px] md:h-[350px]">
            </div>

            <!-- その他おすすめ画像の表示エリア -->
            <div id="other_images_container" class="md:absolute md:bottom-12 z-30 w-full flex justify-center gap-x-12 md:gap-32 md:mt-6">
{{--                <div class="hidden" data-id="">--}}
{{--                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">--}}
{{--                    <p>【第1位】</p>--}}
{{--                </div>--}}
{{--                <div class="other-img-container" data-id="" >--}}
{{--                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">--}}
{{--                    <p>【第2位】</p>--}}
{{--                </div>--}}
{{--                <div class="other-img-container" data-id="">--}}
{{--                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">--}}
{{--                    <p>【第3位】</p>--}}
{{--                </div>--}}
{{--                <div class="other-img-container" data-id="">--}}
{{--                    <img class="otherImg object-cover rounded-full w-[70px] md:w-[100px] h-[70px] md:h-[100px]">--}}
{{--                    <p>【第4位】</p>--}}
{{--                </div>--}}
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
                <div class="md:h-[450px] h-[400px] mx-4 md:mx-0" id="quill_view_container">
                    <p class=""></p>
                    <div id="viewer" class="bg-detail-bg">
                    </div>
                </div>

                {{--ボタン--}}
                <aside class="flex justify-center gap-4 mx-6 md:mx-0">
                    <button id="back-start-btn" class="back-start-btn">
                        <a href="{{route('Index')}}">初めからやり直す</a>
                    </button>

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
                        メールアドレスを入力して『送信』ボタンを押してください。<br>
                        ご入力頂いたメールアドレスに購入先リンクをお送り致します。
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
                    <button data-modal-hide="default-modal1" type="submit" id="send-btn" class="mail-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">送信</button>
                </div>
            </form>
        </div>
    </div>
</div>



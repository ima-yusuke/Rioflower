<x-app-layout>
    <div class="w-full flex flex-col justify-center items-center my-10">
        <div class="w-11/12 bg-white rounded-t-xl flex items-center justify-center">
            <div class="w-3/4 my-4 p-4 flex flex-col justify-center">
                <div class="w-full flex flex-col px-2">
                    <div class="flex items-center mb-8">
                        <p class="text-3xl font-bold">メール文章設定</p>
                        <button id="preview-btn" class="ms-10 px-3 py-2 rounded-xl text-white font-bold border border-gray-300" style="background-color: rgb(254, 135, 185)">表示切り替え</button>
                    </div>
                    <div class="flex flex-col w-full md:mx-auto mx-3 rounded-xl justify-center bg-main-bg">
                        <div class="m-5">
                            <p class="text-2xl font-bold my-3">〇〇様</p>
                            <textarea id="top" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full my-5" rows="8">{{ $word['top'] }}</textarea>
                            <p id="preview-top" class="mail-preview hidden mt-10 ms-2">{!! nl2br(e($word['top'])) !!}</p>
                            <div class="flex w-full mt-8 mb-3">
                                <div class="px-2" style="background-color: rgb(140, 130, 115)">

                                </div>
                                <div class="w-full" style="background-color: rgb(210, 195, 180)">
                                    <p class="px-3 py-3 font-bold">お客様情報</p>
                                </div>
                            </div>
                            <p class="py-1">【氏名】<span id="customer-name">〇〇様</span></p>
                            <p class="py-1">【住所】<span id="customer-address">〇〇県〇〇市〇〇</span></p>
                            <p class="py-1">【メールアドレス】<span id="customer-mail">mail@example.com</span></p>
                            <div class="flex w-full mt-8 mb-3">
                                <div class="px-2" style="background-color: rgb(140, 130, 115)">

                                </div>
                                <div class="w-full" style="background-color: rgb(210, 195, 180)">
                                    <p class="px-3 py-3 font-bold">商品情報</p>
                                </div>
                            </div>
                            <p class="py-1">【商品名】〇〇セット</p>
                            <p class="py-1">【商品詳細】</p>
                            <div class="mt-8 flex justify-center">
                                <img class="md:w-2/3 w-full rounded-3xl" src="{{ asset('img/top2.png') }}" alt="product">
                            </div>
                            <div id="link-area" class="flex-col mt-8">
                                <div class="flex w-full mt-8 mb-8">
                                    <div class="px-2" style="background-color: rgb(140, 130, 115)">

                                    </div>
                                    <div class="w-full" style="background-color: rgb(210, 195, 180)">
                                        <p class="px-3 py-3 font-bold">購入リンク</p>
                                    </div>
                                </div>
                                <div class="link-display flex justify-center items-center py-1">
                                    <p class="link-btn mx-3">店舗受取は<br>こちら</p>
                                    <p class="link-btn mx-3">郵送受取は<br>こちら</p>
                                </div>
                            </div>
                            <textarea id="bottom" class="my-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full" rows="8">{{ $word['bottom'] }}</textarea>
                            <p id="preview-bottom" class="mail-preview hidden pt-5 my-10 ms-2">{!! nl2br(e($word['bottom'])) !!}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{--                    更新ボタン--}}
        <div class="w-11/12 bg-white rounded-b-xl flex items-center justify-center py-4">
            <button id="updateBtn" class="btn-border text-center text-3xl px-4 py-2 rounded-lg" data-id="{{ $word['id'] }}">更新</button>
        </div>
    </div>
    @vite('resources/js/admin/dash-word.js')
</x-app-layout>

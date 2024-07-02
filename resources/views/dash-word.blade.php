<x-app-layout>
    <div class="w-full flex flex-col justify-center items-center mt-10">
        <div class="w-11/12 bg-white rounded-t-xl flex items-center justify-center">
            {{--                入力フォーム--}}
            <div class="w-1/2 my-4 p-4 flex flex-col justify-center">
                <div class="w-full flex px-2">
                    <div class="w-full">
{{--                    メール上部--}}
                        <div class="my-4">
                            <div class="ps-2 text-xl">
                                メール上部
                            </div>
                            <div class="px-2 py-1">
                                <textarea id="top" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full" rows="8">{{ $word['top'] }}</textarea>
                            </div>
                        </div>
{{--                    メール下部--}}
                        <div class="my-4">
                            <div class="ps-2 text-xl">
                                メール下部
                            </div>
                            <div class="px-2 py-1">
                                <textarea id="bottom" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full" rows="8">{{ $word['bottom'] }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{-- プレビュー表示 --}}
            <div class="w-1/2 my-4 p-4 flex flex-col justify-center">
                <div class="w-full flex flex-col px-2">
                    <h2 class="text-xl mb-4">プレビュー</h2>
                    <div id="preview" class="w-full p-4 border border-gray-300 rounded-md bg-gray-50">
                        <div class="mb-4 text-red-600">〇〇様</div>
                        <div id="preview-top" class="mb-4">{!! nl2br(e($word['top'])) !!}</div>
                        <div class="mb-4 text-red-600">
                            <span class="underline">お客様情報</span><br>
                            【氏名】〇〇様<br>
                            【住所】〇〇県〇〇市〇〇町〇〇丁目〇〇番地<br>
                            【メールアドレス】example@example.com<br>
                            <br>
                            <span class="underline">商品情報<br></span>
                            【商品名】〇〇〇〇<br>
                            【商品詳細】<br>
                            〇〇〇〇〇〇〇〇<br>
                            〇〇〇〇〇〇〇〇<br>
                            〇〇〇〇〇〇〇〇<br>
                            <br>
                            <span class="underline">商品リンク<br></span>
                            <div class="flex py-1">
                                <div class="link-btn mx-3 my-2">店舗受取は<br>こちら</div>
                                <div class="link-btn mx-3 my-2">郵送受取は<br>こちら</div>
                            </div>
                        </div>
                        <div id="preview-bottom">{!! nl2br(e($word['bottom'])) !!}</div>
                    </div>
                </div>
            </div>
        </div>
        {{--                    更新ボタン--}}
        <div class="w-11/12 bg-white rounded-b-xl flex items-center justify-center py-4">
            <button id="updateBtn" class="border border-solid border-black text-center text-2xl px-2 py-1 rounded-lg" data-id="{{ $word['id'] }}">更新</button>
        </div>
    </div>
    @vite('resources/js/admin/dash-word.js')
</x-app-layout>

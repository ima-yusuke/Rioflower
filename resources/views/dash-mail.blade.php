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
                                <textarea id="mail-top" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full" rows="6"></textarea>
                            </div>
                        </div>
                        {{--                    メール下部--}}
                        <div class="my-4">
                            <div class="ps-2 text-xl">
                                メール下部
                            </div>
                            <div class="px-2 py-1">
                                <textarea id="mail-top" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full" rows="6"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{--        プレビュー表示--}}
            <div class="w-1/2 my-4 p-4 flex flex-col justify-center">
                <div class="w-full flex px-2">
                    ここにプレビュー表示
                </div>
            </div>
        </div>
        {{--                    登録ボタン--}}
        <div class="w-11/12 bg-white rounded-b-xl flex items-center justify-center py-4">
            <button class="border border-solid border-black text-center text-2xl px-2 py-1 rounded-lg">登録</button>
        </div>
    </div>
    @vite('resources/js/admin/dash-mail.js')
</x-app-layout>

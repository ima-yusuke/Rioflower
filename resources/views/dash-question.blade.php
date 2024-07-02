<x-app-layout>

    {{--表示質問一覧--}}
    <div class="flex flex-col items-center w-full pt-12">
        <div class="flex justify-start w-[80%]">
            <h2 class="text-base pb-4 md:text-xl font-semibold text-gray-800">表示質問一覧</h2>
        </div>

        {{--既存質問--}}
        <div id="my_sortable" class="flex flex-col items-center w-full">
            @foreach($questions as $idx=>$value)
                <li data-question-id="{{ $value['id'] }}" id="{{$idx}}" class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0 list-none">
                    {{-- 質問 --}}
                    <div class="qa__head js-ac flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 py-6 px-2 ml-4">
                        <div>
                            <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$idx+1}}.{{$value["text"]}}</p>
                        </div>
                        <aside>
                            <label class="inline-flex items-center cursor-pointer mr-4">
                                <span class="ms-3 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">非表示</span>
                                <input onclick="ToggleQuestion({{$value['id']}})" type="checkbox" value="" class="sr-only peer" checked>
                                <div class="relative w-7 h-4 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="ms-3 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">表示</span>
                            </label>
                            <a class="editBtn text-xs md:text-base font-medium text-blue-600 hover:underline mr-4">編集</a>
                            <a data-product-id="{{$value["id"]}}" class="deleteBtn text-xs md:text-base font-medium text-blue-600 hover:underline">削除</a>
                        </aside>
                    </div>

                    {{-- 回答（最初非表示） --}}
                    <div class="qa__body flex flex-col gap-8">
                        <div class="answer_sortable flex flex-col gap-4">
                            @foreach($value->choices as $key=>$choice)
                                <aside  data-answer-id="{{ $choice['id'] }}" id="{{$key}}" class="flex justify-between items-center w-full md:w-[60%] h-[35px] md:h-[45px]">
                                    <p class="select-btn flex-1 flex items-center py-1 pl-2 mr-2 rounded-lg h-full">{{$key+1}}.{{$choice["text"]}}</p>
                                    <button data-product-id="{{$choice["id"]}}" class="delete-answer h-full border border-solid border-black text-center px-2 py-1 rounded-lg">削除</button>
                                </aside>
                            @endforeach
                        </div>
                        <aside class="w-full md:w-[60%] flex">
                            <input type="text" placeholder="新しい回答" class="add-answer h-[35px] md:h-full flex-grow p-2 border-2 border-gray-400 mr-2 flex-1 rounded-lg">
                            <button data-product-id="{{$value["id"]}}" class="add-answer-btn border border-solid border-black text-center px-2 py-1 rounded-lg">追加</button>
                        </aside>
                    </div>
                </li>
            @endforeach
        </div>

        {{--新規質問追加--}}
        <div class="flex flex-col items-center w-full pb-12">
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
                {{-- 新規質問 --}}
                <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-2 md:ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">
                            <span class="bg-red-500 text-white text-xs md:text-sm font-medium me-2 px-2.5 py-0.5 rounded-8">New</span>新規質問の追加
                        </p>
                    </div>
                    <aside>
                        <a class="editBtn font-medium text-xs md:text-base text-blue-600 hover:underline">編集</a>
                    </aside>
                </div>

                {{--新規回答フォーム（最初非表示）--}}
                <div class="qa__body flex flex-col">
                    <div class="flex items-center border-y border-solid border-gray-200 py-4">
                        <x-required-title title="1.質問" />
                        <div class="flex-1">
                            <input name="text" id="question_text" class="w-full border-2 border-solid border-gray-400 rounded-md" required />
                        </div>
                    </div>
                    <div class="flex flex-col items-center gap-4 border-b border-solid border-gray-200 py-4">
                        <div class="flex items-center w-full">
                            <x-required-title title="2.回答" />
                            <div class="flex flex-col gap-6 w-full" id="answerInp">
                                <input name="text" class="new-answer" required />
                            </div>
                        </div>
                        <div>
                            <button type="button" id="createInpBtn" class="select-btn text-center text-xs md:text-base px-2 py-1 rounded-lg">回答の追加</button>
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <button type="button" id="add_btn" class="submit-btn btn-border shadow-xl text-xs md:text-sm px-10 py-3 text-center">
                            登録
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{--非表示質問一覧--}}
    <div class="flex flex-col items-center w-full py-8">
        <div class="flex justify-start w-[80%]">
            <h2 class="text-base pb-4 md:text-xl font-semibold text-gray-800">非表示質問一覧</h2>
        </div>

        <div class="flex flex-col items-center w-full">
            @foreach($hiddenQuestions as $idx=>$value)
                <div id="{{$idx}}" class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0 list-none">
                    {{-- 質問 --}}
                    <div class="qa__head js-ac flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 py-6 px-2 ml-4">
                        <div>
                            <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$idx+1}}.{{$value["text"]}}</p>
                        </div>
                        <aside>
                            <label class="inline-flex items-center cursor-pointer mr-4">
                                <span class="ms-3 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">非表示</span>
                                <input onclick="ToggleQuestion({{$value['id']}})" type="checkbox" value="" class="sr-only peer">
                                <div class="relative w-7 h-4 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="ms-3 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">表示</span>
                            </label>
                            <a data-product-id="{{$value["id"]}}" class="deleteBtn text-xs md:text-base font-medium text-blue-600 hover:underline">削除</a>
                        </aside>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js"></script>
    @vite(['resources/js/admin/dash-question.js'])
</x-app-layout>
<script>
    {{--// 表示設定--}}
    function ToggleQuestion(id) {

        // Ajaxリクエストを送信して更新処理を行う
        fetch('{{route('ToggleQuestion')}}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (response.ok) {
                    // 更新が成功したらページをリロードするなどの処理を行う
                    location.reload();
                    console.log("更新完了")
                } else {
                    // エラーメッセージを表示するなどの処理を行う
                    console.error('更新に失敗しました');
                }
            })
            .catch(error => {
                console.error('更新に失敗しました:', error);
            });
    }

    let div = document.querySelectorAll("body > div")[0];
    div.classList.remove("h-[100dvh]"); // 100dvh を削除
    div.classList.add("h-full"); // h-full を追加
    div.style.minHeight = "100vh"; // 最低でも画面の高さになるように設定
</script>

<x-app-layout>
    {{--画面枠--}}
    <div class="flex w-full h-full">

        {{--メニューバー--}}
        <section class="w-[20%] h-full bg-white">
            @foreach($questions as $question)
                <li class="qa__item bg-white border border-solid border-gray-200 shrink-0 list-none">
                    {{-- 質問 --}}
                    <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$question["text"]}}</p>
                    </div>

                    {{-- 回答（最初非表示） --}}
                    <div class="qa__body flex flex-col gap-8">
                        @foreach($question["choices"] as $key=>$val)
                            <aside  data-answer-id="{{$val['id']}}" class="flex w-[80%] justify-between items-center border border-solid border-gray-200">
                                <p class="pl-2">{{$val["text"]}}</p>
                                <div>
                                    <button data-product-id="{{$val["id"]}}" class="delete-answer border border-solid border-black">選択</button>
                                </div>
                            </aside>
                        @endforeach
                    </div>
                </li>
            @endforeach
        </section>

        {{--左画面/質問--}}
        <section class="w-[40%] border-r border-solid border-gray-500">

        </section>

        {{--右画面/属性--}}
        <section class="w-[40%] flex items-center justify-center">
            <div class="flex flex-col gap-4 bg-white h-[600px] overflow-y-scroll m-6 p-6 rounded-lg">
                @foreach($categories as $category)
                    <div class="flex flex-col gap-2">
                        <p class="text-gray-800">カテゴリー：{{$category["name"]}}</p>
                        <div class="flex flex-wrap">
                            @foreach($category->attributes as $attribute)
                                <div class="l-wrapper_06 w-[30%] my-4 mx-auto">
                                    <div class="bg-white rounded-lg shadow-md shadow-gray-300">
                                        <div class="flex flex-col items-center justify-center px-4 py-2">
                                            <p class="text-gray-500 text-sm leading-6 mb-1">【{{$category["name"]}}】</p>
                                            <p class="text-xl text-gray-800 font-bold">{{$attribute["name"]}}</p>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    </div>

    @vite(['resources/js/admin/dash-question-attribute.js'])
</x-app-layout>

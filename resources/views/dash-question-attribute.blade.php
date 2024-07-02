<x-app-layout>
    {{--画面枠--}}
    <div class="flex w-full h-full">

        {{--メニューバー--}}
        <section class="w-[20%] h-full bg-white">
            <article class="max-h-[90vh] overflow-y-scroll">
                @for($i=1;$i>=0;$i--)
                    <li class="bg-gray-300 border border-solid border-gray-200 shrink-0 list-none">
                        <div class="js-ac flex items-center justify-between gap-4 py-1 px-2 ml-4">
                            <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$i==1?"表示":"非表示"}}</p>
                        </div>
                    </li>
                    @foreach($questions as $question)
                        @if($question["is_enabled"] == $i)
                            <li class="qa__item bg-white border border-solid border-gray-200 shrink-0 list-none">
                                {{-- 質問 --}}
                                <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                                    <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$question["text"]}}</p>
                                </div>

                                {{-- 回答（最初非表示） --}}
                                <div class="qa__body flex flex-col items-center gap-8">
                                    @foreach($question["choices"] as $key=>$val)
                                        <button data-product-id="{{$val["id"]}}" class="select-btn w-[80%] rounded-lg">{{$val["text"]}}</button>
                                    @endforeach
                                </div>
                            </li>
                        @endif
                    @endforeach
                @endfor
            </article>
        </section>

        {{--左画面/質問--}}
        <section class="relative w-[40%] flex items-center justify-center border-r border-solid border-gray-500">
            <article id="default_title">質問をクリックし回答を選択してください</article>
            <article id ="choice_container" class="hide flex flex-col bg-white h-[600px] w-full overflow-y-scroll m-6 p-6 rounded-lg">
                <div id="outer-dropzone" class="dropzone h-[100dvh] w-full">
                    @foreach($categories as $category)
                        <div id="category{{$category["id"]}}" class="hidden attributeContainer"></div>
                    @endforeach
                </div>
            </article>
            <p id="selected_title" class="absolute top-4 left-8 text-2xl"></p>
            <button id="clear_button" data-choice-id="" class="hide absolute bottom-4 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">一括削除</button>
        </section>


        {{--右画面/属性--}}
        <section class="w-[40%] flex items-center justify-center">
            <article class="flex flex-col gap-4 bg-white overflow-true h-[600px] w-full m-6 p-6 rounded-lg">
                @foreach($categories as $category)
                    @if($category ->attributes->isEmpty())
                        @continue
                    @else
                        <div class="flex flex-col gap-2">
                            <p class="text-gray-800">カテゴリー：{{$category["name"]}}</p>
                            <div class="flex flex-wrap">
                                @foreach($category->attributes as $attribute)
                                    <div data-product-id="{{$attribute["id"]}}" class="drop-item yes-drop l-wrapper_06 w-[30%] my-4 mx-auto">
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
                    @endif

                @endforeach
            </article>
        </section>
    </div>

    @vite(['resources/js/admin/dash-question-attribute.js'])
</x-app-layout>
<script>
    // Quillデータの受け渡し
    window.Laravel = {};
    window.Laravel.data = @json($choice_attributes);
    window.Laravel.attributeData = @json($attributes);
    window.Laravel.categoryData = @json($categories);
</script>



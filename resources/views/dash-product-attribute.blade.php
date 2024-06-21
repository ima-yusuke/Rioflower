<x-app-layout>
    {{--画面枠--}}
    <div class="flex w-full h-[calc(100vh-4rem-1px)]">

        {{--メニューバー--}}
        <section class="w-[20%] h-full bg-white">
            <article class="max-h-[90vh] overflow-y-scroll">
                @foreach($products as $product)
                    <li class="qa__item bg-white border border-solid border-gray-200 shrink-0 list-none">
                        {{-- 商品 --}}
                        <div data-product-id="{{$product["id"]}}" class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                            <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$product["name"]}}</p>
                        </div>
                    </li>
                @endforeach
            </article>
        </section>

        {{--左画面/商品--}}
        <section class="relative w-[40%] flex items-center justify-center border-r border-solid border-gray-500">
            <article id="default_title">商品を選択してください</article>
            <article id ="choice_container" class="hide flex flex-col bg-white h-5/6 w-full overflow-y-scroll m-6 p-6 rounded-lg">
                <div id="outer-dropzone" class="dropzone h-[100dvh] w-full">
                    @foreach($categories as $category)
                        <div id="category{{$category["id"]}}" class="hidden attributeContainer"></div>
                    @endforeach
                </div>
            </article>
            <p id="selected_title" class="absolute top-4 left-8 text-2xl"></p>
        </section>

        {{--右画面/属性--}}
        <section class="w-[40%] flex items-center justify-center">
            <article class="flex flex-col gap-4 bg-white overflow-true h-[600px] w-full m-6 p-6 rounded-lg">
                @foreach($categories as $category)
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
                @endforeach
            </article>
        </section>
    </div>
    @vite('resources/js/admin/dash-product-attribute.js')
</x-app-layout>
<script>
    // Quillデータの受け渡し
    window.Laravel = {};
    window.Laravel.data = @json($product_attributes);
    window.Laravel.attributeData = @json($attributes);
    window.Laravel.categoryData = @json($categories);
</script>

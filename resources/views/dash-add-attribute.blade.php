<x-app-layout>
{{--    カテゴリー追加--}}
    <div class="flex justify-center items-center w-full py-12">
        <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
            <div class="qa__head js-ac flex items-center justify-between gap-4 py-5 px-5">
                <div class="flex flex-col w-full">
                    <p class="text-xl pb-2">新規属性カテゴリー追加</p>
                    <div class="flex items-end w-full pt-8 pb-4">
                        <div class="flex flex-1 items-center">
                            <div class="flex flex-col">
                                <p class="bg-red-500 w-[40px] md:w-[40px] text-white text-xs md:text-xs me-2 p-[1px] text-nowrap text-center rounded-lg">必須</p>
                                <div class="flex flex-col md:flex-row items-center">
                                    <label for="category" class="pe-2 font-medium text-gray-900 text-nowrap">新規属性カテゴリー：</label>
                                    <input type="text" name="category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="新規属性カテゴリー"/>
                                </div>
                            </div>
                        </div>
                        <button id="addBtn" class="addBtn btn-border px-3 py-2">追加</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{{--    カテゴリ一覧表示--}}
    <div class="flex flex-col items-center w-full py-12">
        @foreach($categories as $idx => $cat)
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
{{--                 カテゴリー--}}
                <div class="qa__head btn-area js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{ $cat['name'] }}</p>
                    </div>
                    <div>
                        <a data-category-id="{{$cat["id"]}}" class="editBtn att-name font-medium text-blue-600 px-2">編集</a>
                        <button class="deleteBtn font-medium text-blue-600 px-2" data-id="{{ $cat['id'] }}">削除</button>
                    </div>
                </div>
{{--                 属性（最初非表示）--}}
                <div class="qa__body link-area flex flex-col justify-between gap-4">
                    @foreach($attributes as $index => $att)
                        @if($cat['id'] === $att['category_id'])
                            <div class="w-full flex">
                                <p type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-2/3 md:w-1/3 p-2.5">{{ $att['name'] }}</p>
                                <button class="att-deleteBtn ms-5 border border-solid bg-red-600 text-white px-3 py-2 text-nowrap" data-id="{{ $att['id'] }}">削除</button>
                            </div>
                        @endif
                    @endforeach
                    <div class="w-full flex">
                        <input type="text" class="attAdd bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-2/3 md:w-1/3 p-2.5">
                        <button class="att-addBtn ms-5 btn-border px-3 py-2 text-nowrap">追加</button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    @vite('resources/js/admin/dash-add-attribute.js')
</x-app-layout>

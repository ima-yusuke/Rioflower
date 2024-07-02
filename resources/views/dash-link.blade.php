<x-app-layout>
    <meta name="csrf-token" content="{{ csrf_token() }}">
{{--    新規リンク先の追加--}}
    <div class="flex justify-center items-center w-full py-12">
        <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
            <div class="qa__head js-ac flex items-center justify-between gap-4 py-5 px-5">
                <div class="flex flex-col">
                    <p class="flex items-center text-xl pb-2">新規コース/価格帯の追加</p>
                    <div class="new-course flex">
                        <div class="flex flex-col md:pe-2 my-3">
                            <div class="flex flex-col">
                                <p class="bg-red-500 w-[40px] md:w-[40px] text-white text-xs md:text-xs me-2 p-[1px] text-nowrap text-center rounded-lg">必須</p>
                                <div class="flex justify-center items-center pb-2">
                                    <label for="category" class="pe-2 font-medium text-gray-900 text-nowrap">新規コース：</label>
                                    <input type="text" name="course" id="course" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="新規コース"/>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <p class="bg-red-500 w-[40px] md:w-[40px] text-white text-xs md:text-xs me-2 p-[1px] text-nowrap text-center rounded-lg">必須</p>
                                <div class="flex justify-center items-center pb-2">
                                    <label for="category" class="pe-2 font-medium text-gray-900 text-nowrap">新規価格帯：</label>
                                    <input type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="新規価格帯"/>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:ps-2 justify-center">
                            <div class="flex justify-center items-center py-2">
                                <label for="category" class="pe-2 font-medium text-gray-900 text-nowrap">受取リンク：</label>
                                <input type="text" name="pickup" id="pickup" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="受取リンク"/>
                            </div>
                            <div class="flex justify-center items-center py-2">
                                <label for="category" class="pe-2 font-medium text-gray-900 text-nowrap">郵送リンク：</label>
                                <input type="text" name="delivery" id="delivery" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="郵送リンク"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-10 flex items-center sm:ps-10">
                    <button id="addBtn" class="addBtn border border-solid border-black px-2 py-2">追加</button>
                </div>
            </div>
        </div>
    </div>
{{--    既存リンク先の表示--}}
    <div class="flex flex-col items-center w-full py-12">
        @foreach($data as $idx=>$value)
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
                {{-- コース表示 --}}
                <div class="qa__head btn-area js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{ $value["course"] }}/{{ $value["price"] }}円</p>
                    </div>
                    <div>
                        <a class="editBtn font-medium text-blue-600 px-2">編集</a>
                        <button class="deleteBtn font-medium text-blue-600 px-2" data-id="{{ $value['id'] }}">削除</button>
                    </div>
                </div>
                {{-- リンク（最初非表示） --}}
                <div class="qa__body link-area flex justify-between gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <div class="w-full">
                            <label id="get-mail" class="font-medium text-gray-900 text-nowrap w-full">受取リンク：
                                <input type="text" id="get-mail" class="pickup-link bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5" value="{{ $value["pickup_link"] }}">
                            </label>
                        </div>
                        <div class="w-full">
                            <label id="get-mail" class="font-medium text-gray-900 text-nowrap w-full">郵送リンク：
                                <input type="text" id="get-mail" class="delivery-link bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5" value="{{ $value["delivery_link"] }}">
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center sm:ps-10 text-nowrap">
                        <button class="updateBtn border border-solid border-black px-2 py-2" data-id="{{ $value['id'] }}">更新</button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    @vite('resources/js/admin/dash-link.js')
</x-app-layout>

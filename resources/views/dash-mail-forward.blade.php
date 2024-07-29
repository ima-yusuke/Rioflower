<x-app-layout>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <div class="flex justify-center items-center w-full py-12">
        <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
            <div class="qa__head js-ac flex items-center justify-between gap-4 py-5 px-5">
                <div class="flex flex-col md:w-1/3 w-full">
                    <p class="flex items-center text-xl pb-2 w-full">メール転送先設定</p>
                    <div class="flex flex-col w-full mt-5">
                        @foreach($forwards as $index => $value)
                            <div class="flex justify-center items-center pb-2 w-full">
                                <input type="hidden" name="id-{{ $index + 1 }}" value="{{ $value->id }}">
                                <input type="text" name="forward-{{ $index + 1 }}" id="forward-{{ $index + 1 }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-2 p-2.5" placeholder="転送先メールアドレス" value="{{ $value->email }}"/>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="pt-10 flex items-center sm:ps-10">
                    <button id="updateBtn" class="updateBtn btn-border px-3 py-2">更新</button>
                </div>
            </div>
        </div>
    </div>
    @vite('resources/js/admin/dash-mail-forward.js')
</x-app-layout>

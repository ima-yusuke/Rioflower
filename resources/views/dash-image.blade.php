<x-app-layout>
    <div class="flex flex-col justify-center items-center w-full py-12">
        <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
            <div class="qa__head js-ac flex items-center justify-between gap-4 py-5 px-5">
                <div class="flex flex-col w-full">
                    <p class="flex items-center text-2xl pb-2 w-full">TOP画像設定</p>
                    <form id="image-form" action="{{ route('UpdateTopImage') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="flex flex-col justify-center w-full mt-8">
                            <div class="flex my-5">
                                <p class="w-1/2">左側の画像<br>(スマホではこちらのみ表示されます)</p>
                                <input type="file" accept="image/jpeg,image/png" id="left-img" name="img" class="w-full text-xs md:h-full" data-image-id="1">
                            </div>
                            <div class="flex my-5">
                                <p class="w-1/2">右側の画像</p>
                                <input type="file" accept="image/jpeg,image/png" id="right-img" name="img" class="w-full text-xs md:h-full" data-image-id="2">
                            </div>
                            <button type="submit" id="updateBtn" class="btn-border mx-auto mt-10 px-3 py-2">更新</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex flex-col bg-white border border-solid border-gray-200 w-[80%] p-5">
            <p class="flex items-center text-2xl font-bold w-full mb-10">プレビュー</p>
            <div class="flex">
                @foreach($images as $index => $image)
                    <div class="w-1/2">
                        <img src="{{ asset($image->img) }}" alt="TOP画像" class="preview-{{ $index + 1 }} w-full h-[30vw] object-cover">
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    @vite('resources/js/admin/dash-image.js')
</x-app-layout>

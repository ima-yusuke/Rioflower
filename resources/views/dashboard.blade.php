<x-app-layout>
    <div class="py-12 flex flex-wrap gap-4 justify-center items-center">
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{route("ShowProduct")}}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-gift text-4xl"></i></p>
                    <p class="font-bold">商品登録・編集</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{route("ShowQuestion")}}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-magnifying-glass text-4xl"></i></p>
                    <p class="font-bold">質問設定</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{ route('ShowLink') }}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-link text-4xl"></i></p>
                    <p class="font-bold">リンク設定</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{ route('ShowAddAttribute') }}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-palette text-4xl"></i></p>
                    <p class="font-bold">属性追加</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{ route('ShowAttributeQuestion') }}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-pen-to-square text-4xl"></i></p>
                    <p class="font-bold">回答への属性付与</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{ route('ShowAttributeProduct') }}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-cart-plus text-4xl"></i></p>
                    <p class="font-bold">商品への属性付与</p>
                </div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center shadow-xl text-center border-4 border-solid border-black bg-white w-[30%]">
            <a href="{{ route('ShowWord') }}" class="w-full h-full hover:bg-black hover:text-white p-3">
                <div class="flex flex-col gap-2">
                    <p><i class="fa-solid fa-envelope text-4xl"></i></p>
                    <p class="font-bold">メール設定</p>
                </div>
            </a>
        </div>
    </div>
</x-app-layout>

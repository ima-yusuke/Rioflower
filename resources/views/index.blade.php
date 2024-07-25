<x-template title="Rio flower" css="app.css">
    <div id="index-wrapper" class="flex p-4 h-full relative max-h-[calc(100dvh-90px)]">
        <div class="relative">
            <img src="{{ asset('/img/top1.png') }}" alt="flower" class="rounded-3xl md:rounded-r-none object-cover h-full" draggable="false">
            <div class="md:hidden absolute left-1/2 -translate-x-1/2 top-1/4 text-xl text-nowrap">
                <p class="text-white">Step by Step Bloom by Bloom</p>
                <p class="text-[#DA9F9F] bg-white p-2">Find Your Perfect Dry Flower</p>
            </div>
            <div class="absolute left-1/2 -translate-x-1/2 top-1/2 text-2xl md:left-32 md:-translate-x-0 md:top-64 lg:text-3xl xl:text-5xl text-nowrap text-white font-bold">
                簡単な質問に答えて<br>
                あなたにピッタリな花を<br>
                見つけよう
            </div>
        </div>
        <div class="relative hidden md:inline-block">
            <img src="{{ asset('/img/top2.png') }}" alt="flower" class="rounded-r-3xl object-cover h-full" draggable="false">
            <div class="absolute left-10 top-64 text-xl">
                <p class="text-white">Step by Step Bloom by Bloom</p>
                <p class="text-[#DA9F9F] bg-white p-2">Find Your Perfect Dry Flower</p>
            </div>
        </div>
        <a href="{{ route('ShowQuestionPage') }}" class="pink-btn block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center absolute bottom-16 left-1/2 -translate-x-1/2">花診断を始める</a>
    </div>
    @vite('resources/js/index.js')
</x-template>

<script>
    // Cookieのリセット
    document.addEventListener('DOMContentLoaded', function() {
        // XSRF-TOKEN クッキーを削除する
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';

        // laravel_session クッキーを削除する
        document.cookie = 'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
    });

</script>

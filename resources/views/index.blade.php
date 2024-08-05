<x-template title="flaver" css="app.css">
    {{--背景画像--}}
    <div class="flex items-center p-4 w-full h-full">
        <div id="index-wrapper" class="flex items-center h-full relative">
            <div class="relative md:w-1/2 max-h-[100dvh]">
                <img src="{{ asset($leftImage->img) }}" alt="flower" class="rounded-3xl md:rounded-r-none object-cover w-full md:h-[calc(100dvh-110px-4rem)] h-[calc(100dvh-85px-4rem)]" draggable="false">
            </div>
            <div class="relative hidden md:inline-block md:w-1/2 max-h-[100vh]">
                <img src="{{ asset($rightImage->img) }}" alt="flower" class="rounded-r-3xl object-cover w-full md:h-[calc(100dvh-110px-4rem)]" draggable="false">
            </div>
            <a id="start_question" class="pink-btn z-50 block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2">花診断を始める</a>
            <p class="text-sm absolute z-50 bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white">所要時間2.3分</p>
        </div>
    </div>

    {{--テキスト箇所--}}
    <div class="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center gap-8 z-20">
        <div>
            <p class="text-white text-center text-7xl md:text-8xl pb-4" id="top_text">Step<span class="text-6xl md:text-7xl mx-4" id="top_text">by</span>Step Bloom<span class="text-6xl md:text-7xl mx-4" id="top_text">by</span>Bloom</p>
            <p class="text-[#DA9F9F] p-2 md:text-2xl text-center">Find Your Perfect Dry Flower</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center text-center w-full md:w-full text-white font-bold text-3xl md:text-5xl">
            <p>質問に答えて大切な人に</p>
            <p>贈る作品をご提案！</p>
        </div>
    </div>

    {{--背景色--}}
    <div class="h-full w-full bg-top-bg absolute top-0 left-0 z-10"></div>
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

    document.getElementById("start_question").addEventListener("click",function (){

        if (sessionStorage.getItem('scoreData') != null) {
            location.href = '/question';
        }else{
            location.href = '/nickname';
        }
    })
</script>

<x-template title="Rio flower" css="app.css">
    <div class="flex mx-4 my-4 h-full relative">
        <div class="relative">
            <img src="{{ asset('/img/top1.png') }}" alt="flower" class="rounded-l-3xl object-cover h-full">
            <div class="md:hidden absolute left-1/2 -translate-x-1/2 top-1/4 text-xl text-nowrap">
                <p class="text-white">Step by Step Bloom by Bloom</p>
                <p class="text-[#DA9F9F] bg-white p-2">Find Your Perfect Dry Flower</p>
            </div>
            <div class="absolute left-1/2 -translate-x-1/2 top-1/2 text-2xl md:left-32 md:-translate-x-0 md:top-64 md:text-5xl text-nowrap text-white font-bold">
                簡単な質問に答えて<br>
                あなたにピッタリな花を<br>
                見つけよう
            </div>
        </div>
        <div class="relative hidden md:inline-block">
            <img src="{{ asset('/img/top2.png') }}" alt="flower" class="rounded-r-3xl object-cover h-full">
            <div class="absolute left-10 top-64 text-xl">
                <p class="text-white">Step by Step Bloom by Bloom</p>
                <p class="text-[#DA9F9F] bg-white p-2">Find Your Perfect Dry Flower</p>
            </div>
        </div>
        <div class="pink-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center absolute bottom-16 left-1/2 -translate-x-1/2">
            <a href="{{ route('ShowQuestionPage') }}">花診断を始める</a>
        </div>
    </div>
</x-template>

<x-template title="Rio flower" css="app.css">
    <div class="flex mx-4 my-4">
        <div class="w-[50%] relative">
            <img src="{{ asset('/img/top1.png') }}" alt="flower" class="w-full rounded-l-3xl object-cover">
            <div class="absolute left-32 top-80 text-white text-5xl">
                簡単な質問に答えて<br>
                あなたにピッタリな花を<br>
                見つけよう
            </div>
        </div>
        <div class="w-[50%] relative">
            <img src="{{ asset('/img/top2.png') }}" alt="flower" class="w-full rounded-r-3xl object-cover">
            <div class="absolute left-10 top-80 text-xl">
                <p class="text-white">Step by Step Bloom by Bloom</p>
                <p class="text-[#DA9F9F] bg-white p-2">Find Your Perfect Dry Flower</p>
            </div>
        </div>
    </div>
</x-template>

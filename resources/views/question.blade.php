<x-template title="診断ページ" css="app.css">
    <div id="loading" class="fixed flex justify-center items-center text-2xl z-30 w-full md:h-[calc(100dvh-1rem-110px)] h-full bg-main-brown">
        <div class="loading-wrapper">
            <div class="loading-circle"></div>
            <div class="loading-circle"></div>
            <div class="loading-circle"></div>
            <div class="loading-shadow"></div>
            <div class="loading-shadow"></div>
            <div class="loading-shadow"></div>
            <span>Loading</span>
        </div>
    </div>
    <div id="question-content" class="bg-main-bg flex flex-col justify-center items-center w-full md:h-[calc(100dvh-1rem-110px)] h-full relative hide">
        {{--質問画面--}}
        <x-question-component></x-question-component>

        {{--確認画面--}}
        <x-confirm-component></x-confirm-component>

        {{--結果画面--}}
        <x-result-component></x-result-component>

        {{-- カーテン要素 --}}
        <div id="curtain-left" class="curtain absolute top-0 left-0 md:w-0 w-full md:h-full h-0 z-50"></div>
        <div id="curtain-right" class="curtain absolute md:top-0 bottom-0 right-0 md:w-0 w-full md:h-full h-0 z-50"></div>
    </div>
    @vite('resources/js/question.js')
    <script>
        let questions = @json($questions);
        let products = @json($products);
        let productAttributes = @json($productAttributes);
        let choiceAttributes = @json($choiceAttributes);

        window.onload = function() {
            if (sessionStorage.getItem('scoreData') != null) {
                let scoreData = JSON.parse(sessionStorage.getItem('scoreData'));
                window.ReShowResult(scoreData);
            }
        };
    </script>
</x-template>


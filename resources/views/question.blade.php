<x-template title="診断ページ" css="app.css">
    <div class="bg-main-bg flex flex-col justify-center items-center w-full md:h-[calc(100dvh-1rem-110px)] relative">
        {{--質問画面--}}
        <x-question-component></x-question-component>

        {{--確認画面--}}
        <x-confirm-component></x-confirm-component>

        {{--結果画面--}}
        <x-result-component></x-result-component>

        {{-- カーテン要素 --}}
        <div id="curtain-left" class="curtain curtain-left hide"></div>
        <div id="curtain-right" class="curtain curtain-right hide"></div>
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


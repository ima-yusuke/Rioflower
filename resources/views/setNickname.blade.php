<x-template title="Rio flower" css="app.css">
    <section class="flex flex-col justify-center items-center gap-24 h-full">
        <div class="flex flex-col items-center gap-6">
            <h1 class="text-4xl text-main-brown" id="test">START</h1>
            <div class="flex flex-col items-center gap-2 text-sm md:text-base text-main-brown">
                <p>あなたや贈り先の方にとって特別なお花をお探しします</p>
                <p>ニックネームを教えてください</p>
            </div>

        </div>
        <div class="flex flex-col items-center gap-4 md:gap-12 w-full">
            <input placeholder="ニックネーム" name="nickname" id="nickname" class="w-[65%] md:w-[30%] rounded-md" required>
            <button><a class="pink-btn hover:bg-blue-800 block" id="nickname_button">NEXT</a></button>
        </div>
    </section>
    @vite('resources/js/nickname.js')
</x-template>
<script>
    // nicknameページでのクリックイベント設定
    const SHOW_QUESTION_BTN = document.getElementById('nickname_button');

    if (SHOW_QUESTION_BTN != null) {
        SHOW_QUESTION_BTN.addEventListener('click', function(event) {
            sessionStorage.setItem('nickNameFlag', 'true'); // セッションストレージにフラグを設定
        });
    }
</script>


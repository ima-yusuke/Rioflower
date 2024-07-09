<div id="nav-menu" class="flex flex-col gap-2 bg-main-bg fixed left-0 top-0 w-80 h-full p-0 border-r justify-start duration-500 z-50 non-active rounded-r-xl">
{{--    "top-0"を消して"h-full"→"h-4/5"にするとヘッダー・フッターに被らないようになる--}}
    <div class="w-full h-full m-0 p-2 flex gap-2 justify-center items-center relative">
        <button id="navToggleButton" class="absolute top-16 md:top-1/3 md:-right-8 md:w-8 md:h-28 -right-6 w-6 h-24 rounded-r-xl bg-top-button-pink text-white border-t border-r border-b flex items-center justify-center">
            <div id="toggleHide" class="hidden">
                <i class="bi bi-chevron-double-left"></i>
                <span class="nav-text">
                    close
                </span>
            </div>
            <div id="toggleShow" class="relative">
                <i class="bi bi-chevron-double-right"></i>
                <span class="nav-text">
                    show
                </span>
                <div class="absolute md:-top-28 top-10 md:left-10 left-8 md:w-28 w-20 md:h-24 h-20 flex justify-center items-center recommend-img">
                    <div>その他の<br>おすすめ</div>
                </div>
            </div>
        </button>
        <!-- その他おすすめ画像の表示エリア -->
        <div id="other_images_container" class="z-30 w-full flex flex-col justify-center gap-x-12 gap-8">
            <p class="text-center font-bold text-2xl py-2 rounded-xl">その他のおすすめ</p>
        </div>
    </div>
    <div id="menuOverlay" class="fixed top-0 left-0 w-[100%-20rem] h-full z-40 hidden"></div>
</div>

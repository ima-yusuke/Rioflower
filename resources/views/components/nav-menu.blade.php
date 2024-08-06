<div id="nav-menu" class="flex flex-col gap-2 bg-main-bg fixed left-0 top-0 w-80 h-full p-0 border-r justify-start duration-500 z-50 non-active rounded-r-xl">
    <div class="w-full h-full m-0 p-2 flex gap-2 justify-center items-center relative">
        <button id="navToggleButton" class="absolute top-20 md:top-28 md:-right-8 md:w-8 md:h-28 -right-6 w-6 h-24 rounded-r-xl bg-top-button-pink text-white border-t border-r border-b flex items-center justify-center">
            <div id="toggleHide" class="hidden">
                <i class="bi bi-chevron-double-left"></i>
                <span class="nav-text">
                    close
                </span>
            </div>
            <div id="toggleShow" class="pt-1 md:pt-3 rounded-r-xl relative">
                <i class="bi bi-chevron-double-right"></i>
                <span class="nav-text">
                    show
                </span>
                <div id="nav-scroll" class="absolute md:top-0 top-0 md:left-11 left-9 md:w-32 w-24">
                    <img src="{{ asset('img/recommend.png') }}" alt="recommend" class="relative">
                    <p class="absolute md:top-7 top-3 md:left-8 left-5 text-black md:text-xl leading-7">その他の<br>おすすめ</p>
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

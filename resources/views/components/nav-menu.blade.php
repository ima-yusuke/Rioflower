<div id="nav-menu" class="flex flex-col gap-2 bg-blue-300 fixed left-0 top-0 w-80 h-full p-0 border-r justify-start duration-500 z-50 non-active rounded-r-xl">
{{--    "top-0"を消して"h-full"→"h-4/5"にするとヘッダー・フッターに被らないようになる--}}
    <div class="w-full h-full m-0 p-2 flex gap-2 justify-center items-center relative">
        <button id="navToggleButton" class="absolute top-1/3 -right-6 w-6 h-24 rounded-r-xl bg-white border-t border-r border-b flex items-center justify-center">
            <div id="toggleHide" class="hidden">
                <i class="bi bi-chevron-double-left"></i>
                <span class="nav-text">
                    close
                </span>
            </div>
            <div id="toggleShow" class="">
                <i class="bi bi-chevron-double-right"></i>
                <span class="nav-text">
                    show
                </span>
            </div>
        </button>
        <ul class="px-2">
            <li>これはテストです</li>
            <li>これはテストです</li>
            <li>これはテストです</li>
            <li>これはテストです</li>
        </ul>
    </div>
    <div id="menuOverlay" class="fixed top-0 left-0 w-[100%-20rem] h-full z-40 hidden"></div>
</div>

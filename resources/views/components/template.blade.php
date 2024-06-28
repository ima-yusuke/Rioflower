<!DOCTYPE html>
<html lang="ja">
<x-head :title="$title">
    @if(isset($description))
        <meta name="description" content="{{ $description }}"/>
    @endif
    @vite(['resources/css/'.$css])
</x-head>
<div class="flex flex-col justify-between h-[100dvh]">
    <x-header>

    </x-header>
    <body class="bg-main-bg flex-1">
    {{ $slot }}
    </body>
    <x-footer>

    </x-footer>
</div>

</html>

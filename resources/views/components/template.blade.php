<!DOCTYPE html>
<html lang="ja">
<x-head :title="$title">
    @if(isset($description))
        <meta name="description" content="{{ $description }}"/>
    @endif
    @vite(['resources/css/'.$css])
</x-head>
<body class="bg-main-bg h-full flex flex-col md:overflow-y-hidden">
<x-header></x-header>
<main class="flex-1">
    {{ $slot }}
</main>
<x-footer></x-footer>
</body>

</html>

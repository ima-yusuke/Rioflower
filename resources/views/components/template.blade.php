<!DOCTYPE html>
<html lang="ja">
<x-head :title="$title">
    @if(isset($description))
        <meta name="description" content="{{ $description }}"/>
    @endif
    @vite(['resources/css/'.$css])
</x-head>
<body class="bg-main-bg h-full flex flex-col">
<x-header></x-header>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SS3MSY633"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-1SS3MSY633');
</script>
<main class="flex-1">
    {{ $slot }}
</main>
<x-footer></x-footer>
</body>
</html>

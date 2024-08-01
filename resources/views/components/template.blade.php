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
<script async src="https://www.googletagmanager.com/gtag/js?id=G-332NXEEPRL"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-332NXEEPRL');
</script>
<main class="flex-1">
    {{ $slot }}
</main>
<button id="my-button" class="absolute bottom-20 z-50">Click me</button>
<x-footer></x-footer>
</body>
<script>
    document.getElementById('my-button').addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'engagement',
            'event_label': 'homepage_button',
            'value': 1
        });
    });
</script>

</html>

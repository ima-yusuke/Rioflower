<!DOCTYPE html>
<html lang="ja">
<x-head :title="$title">
    @if(isset($description))
        <meta name="description" content="{{ $description }}"/>
    @endif
    @vite(['resources/css/'.$css,'resources/js/question.js'])
</x-head>
<x-header>

</x-header>
<body class="overflow-hidden">
{{ $slot }}
</body>
<x-footer>

</x-footer>
</html>

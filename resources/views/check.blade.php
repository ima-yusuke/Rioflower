<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/icon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>購入情報確認</title>
    @vite(['resources/css/app.css'])
    <title>購入情報確認</title>
</head>
<body>
    <p>{{ $name }}様</p>
    <p>{!! nl2br(e($word['top'])) !!}</p>
    <p class="underline">購入者情報</p>
    <p>氏名：<span id="customer-name">{{ $name }}</span></p>
    <p>住所：<span id="customer-address">{{ $address }}</span></p>
    <p>メールアドレス：<span id="customer-mail">{{ $email }}</span></p>
    <p class="hidden">商品ID：<span id="product-id">{{ $product_id }}</span></p>
    <p class="underline">商品情報</p>
    <p>商品名：{{ $product->name }}</p>
    <p>商品詳細</p>
    <p>ここに商品詳細が入ります</p>
    <p class="underline">商品リンク</p>
    店舗受取リンク：<a href="{{ $link->pickup_link }}">{{ $link->pickup_link }}</a>
    <br>
    配送リンク：<a href="{{ $link->delivery_link }}">{{ $link->delivery_link }}</a>
    <p>{!! nl2br(e($word['bottom'])) !!}</p>
    <button type="button" onclick="location.href='{{ route('ShowQuestionPage') }}'" id="back-btn" class="pink-btn">やり直す</button>
    <button data-id="" type="button" id="mail-btn" class="mail-btn pink-btn text-sm px-5 py-2.5 text-center">送信</button>
</body>
@vite('resources/js/check.js')

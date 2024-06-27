<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>購入情報確認</title>
</head>
<body>
    <p>氏名：<span id="customer-name">{{ $name }}</span></p>
    <p>住所：<span id="customer-address">{{ $address }}</span></p>
    <p>メールアドレス：<span id="customer-mail">{{ $email }}</span></p>
    <p>商品ID：<span id="product-id">{{ $product_id }}</span></p>
    <a href="{{ route('ShowQuestionPage') }}"><button id="back-btn">やり直す</button></a>
    <button data-id="" type="button" id="mail-btn" class="mail-btn text-sm px-5 py-2.5 text-center">送信</button>
</body>
@vite('resources/js/check.js')

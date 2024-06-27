<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>購入リンクのご送信</title>
</head>
<body>
    <p>{{ $customer['name'] }}様</p>
    <p>{!! nl2br(e($word['top'])) !!}</p>
    <p class="underline">購入者情報</p>
    <p>氏名：{{ $customer['name'] }}</p>
    <p>住所：{{ $customer['address'] }}</p>
    <p>メールアドレス：{{ $customer['email'] }}</p>
    <p class="underline">商品情報</p>
    <p>商品名：{{ $product['name'] }}</p>
    <p>商品詳細</p>
    <p>ここに商品詳細が入ります</p>
    <p class="underline">商品リンク</p>
    店舗受取リンク：<a href="{{ $link['pickup_link'] }}">{{ $link['pickup_link'] }}</a>
    <br>
    配送リンク：<a href="{{ $link['delivery_link'] }}">{{ $link['delivery_link'] }}</a>
    <p>{!! nl2br(e($word['bottom'])) !!}</p>
</body>
</html>

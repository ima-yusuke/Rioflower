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
</head>
<body>
    <div class="flex flex-col w-11/12 md:w-1/2 md:mx-auto mx-3 my-10 rounded-xl justify-center bg-main-bg">
        <div class="m-5">
            @if($showLinkArea === false)
                <p class="text-2xl md:text-3xl font-bold my-3 mx-auto text-center">入力情報をご確認ください</p>
            @else
                <p class="text-2xl font-bold my-3">{{ $name }}様</p>
            @endif
            <p class="mt-5 mb-10 {{ $showLinkArea ? 'flex' : 'hidden' }}">{!! nl2br(e($word['top'])) !!}</p>
            <div class="flex w-full mt-8 mb-3">
                <div class="px-2" style="background-color: rgb(140, 130, 115)">

                </div>
                <div class="w-full" style="background-color: rgb(210, 195, 180)">
                    <p class="px-3 py-3 font-bold">お客様情報</p>
                </div>
            </div>
            <p class="py-1">【氏名】<span id="customer-name">{{ $name }}</span></p>
            <p class="py-1">【住所】<span id="customer-address">{{ $address }}</span></p>
            <p class="py-1">【メールアドレス】<span id="customer-mail">{{ $email }}</span></p>
            <div class="flex w-full mt-8 mb-3">
                <div class="px-2" style="background-color: rgb(140, 130, 115)">

                </div>
                <div class="w-full" style="background-color: rgb(210, 195, 180)">
                    <p class="px-3 py-3 font-bold">商品情報</p>
                </div>
            </div>
            <p class="hidden">商品ID：<span id="product-id">{{ $product_id }}</span></p>
            <p class="py-1">【商品名】{{ $product->name }}</p>
            <p class="py-1">【商品詳細】</p>
            <p id="detail"></p>
            <img class="md:w-2/3 w-full rounded-3xl mt-8" src="{{ asset($product->img) }}" alt="product">
            <div id="link-area" class="{{ $showLinkArea ? 'flex' : 'hidden' }} flex-col mt-8">
                <div class="flex w-full mt-8 mb-8">
                    <div class="px-2" style="background-color: rgb(140, 130, 115)">

                    </div>
                    <div class="w-full" style="background-color: rgb(210, 195, 180)">
                        <p class="px-3 py-3 font-bold">購入リンク</p>
                    </div>
                </div>
                <div class="link-display flex justify-center items-center py-1">
                    <a class="link-btn mx-3" href="{{ $link->pickup_link }}">店舗受取は<br>こちら</a>
                    <a class="link-btn mx-3" href="{{ $link->delivery_link }}">郵送受取は<br>こちら</a>
                </div>
            </div>
            <p class="mt-10 {{ $showLinkArea ? 'flex' : 'hidden' }}">{!! nl2br(e($word['bottom'])) !!}</p>
            <div id="mail-area" class="{{ $showLinkArea ? 'hidden' : 'flex' }} justify-center mt-10">
                <button type="button" onclick="location.href='{{ route('ShowQuestionPage') }}'" id="back-btn" class="check-btn mx-3 text-center">やり直す</button>
                <button data-id="" type="button" id="mail-btn" class="mail-btn check-btn mx-3 text-center">メール送信</button>
            </div>
        </div>
    </div>
</body>
<script>
    let details = @json($details);
</script>

@vite('resources/js/check.js')

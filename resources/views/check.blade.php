<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/icon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>購入情報確認</title>
    @vite(['resources/css/app.css'])
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SS3MSY633"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-1SS3MSY633');
</script>
<body class="pb-1 bg-white">
    <div class="flex flex-col w-11/12 md:w-2/3 md:mx-auto mx-3 my-10 rounded-xl justify-center bg-main-bg">
        <div class="m-5">
            <div id="sent" class="sent hidden">
                <p class="text-xl md:text-2xl font-bold my-3 mx-auto text-center">メールを送信しました</p>
                <p class="my-3 mx-auto text-center md:text-2xl text-red-600">※まだ商品の購入は確定していません。<br>送信されたメールのリンクから購入手続きを進めてください。</p>
                <div id="flow-chart" class="flex my-10 py-5 rounded-xl">
                    <div class="md:flex justify-center w-full mx-auto">
                        <div class="md:w-[30%] w-11/12 text-center mx-auto">
                            <div class="text-center mx-auto mb-2"><i class="bi bi-1-circle text-2xl"></i></div>
                            <p class="text-xl mb-4">確認メール</p>
                            <i class="bi bi-envelope text-4xl"></i>
                            <p class="mt-4">届いたメールにて購入リンクを押してください</p>
                            <br>
                            <p class="text-sm">※届いていない場合は迷惑メールをご確認ください</p>
                        </div>
                        <div class="md:w-[30%] w-11/12 text-center mx-auto my-10 md:my-0">
                            <div class="text-center mx-auto mb-2"><i class="bi bi-2-circle text-2xl"></i></div>
                            <p class="text-xl mb-4">ストアページ</p>
                            <i class="bi bi-cart3 text-4xl"></i>
                            <p class="mt-4">メールで選択したリンク先のページで対象の商品をカートに入れ、購入手続きを完了してください</p>
                        </div>
                        <div class="md:w-[30%] w-11/12 text-center mx-auto">
                            <div class="text-center mx-auto mb-2"><i class="bi bi-3-circle text-2xl"></i></div>
                            <p class="text-xl mb-4">商品の受取</p>
                            <i class="bi bi-shop text-4xl"></i>
                            <p class="mt-4">受取のために店舗へお越しください<br>その他のよくある質問は<a href="https://rioflower.net/type6.aspx" target="_blank" class="text-blue-500 underline">こちら</a>をご覧ください</p>
                        </div>
                    </div>
                </div>
            </div>
            <p id="check-text" class="show text-2xl md:text-3xl font-bold my-3 mx-auto text-center">入力情報をご確認ください</p>
            <p class="mail hidden text-2xl font-bold my-3">{{ $name }}様</p>
            <p class="mail hidden mt-5 mb-10 ms-2">{!! nl2br(e($word['top'])) !!}</p>
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
            <p class="ms-2" id="detail"></p>
            <div class="mt-8 flex justify-center">
                <img class="md:w-2/3 w-full rounded-3xl" src="{{ asset($product->img) }}" alt="product" draggable="false">
            </div>
            <div id="link-area" class="mail hidden flex-col mt-8">
                <div class="flex w-full mt-8 mb-8">
                    <div class="px-2" style="background-color: rgb(140, 130, 115)">

                    </div>
                    <div class="w-full" style="background-color: rgb(210, 195, 180)">
                        <p class="px-3 py-3 font-bold">購入リンク</p>
                    </div>
                </div>
                <div class="link-display flex justify-center items-center py-1">
                    <a class="link-btn mx-3" href="{{ $link->pickup_link }}">購入はこちら</a>
{{--                    <a class="link-btn mx-3" href="{{ $link->delivery_link }}">郵送受取はこちら</a>--}}
                </div>
            </div>
            <p class="mail hidden mt-14 mb-8 ms-2">{!! nl2br(e($word['bottom'])) !!}</p>
            <div id="mail-area" class="show flex justify-center mt-24">
                <a href="{{ route('ShowQuestionPage') }}" id="back-btn" class="check-back-btn mx-3 text-center">やり直す</a>
                <button data-id="" type="button" id="mail-btn" class="mail-btn check-btn mx-3 text-center hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-100">メール送信</button>
            </div>
        </div>
    </div>
</body>
<script>
    let details = @json($details);
    window.Laravel = {};
    window.Laravel.csrfToken = "{{ csrf_token() }}";

    // Cookieのリセット
    document.getElementById("back-btn").addEventListener("click",function (){
        // XSRF-TOKEN クッキーを削除する
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';

        // laravel_session クッキーを削除する
        document.cookie = 'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
    })
</script>
@vite('resources/js/check.js')
</html>

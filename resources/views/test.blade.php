<x-app-layout>
    <style>
        * {
            transition: all 0.5s;
        }

        .square {
            display: block;
            position: relative;
        }

        .square::before {
            content: "";
            padding-top: 100%;
            display: block;
        }

        .square img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <div class="flex justify-center items-center py-12">
        {{--swap コンテイナー--}}
        <div class="image-container flex flex-col justify-center items-center gap-y-24">

            {{--too画像--}}
            <div class="flex justify-center gap-12">
                <div>
                    <div class="square" style="width: 300px">
                        <img src="{{asset($data[0]["img"])}}" id="image0" data-key="{{$data[0]['order']}}" class="relative z-50 object-cover rounded-full">
                        <img src="{{asset($data[0]["img"])}}" id="image0-fill" data-key="{{$data[0]['order']}}" class="relative z-40 object-cover rounded-full">
                    </div>
                </div>
                <div id="description" class="flex flex-col gap-8 w-[500px]">
                    <div class="font-bold flex flex-col gap-2">
                        <p>あなたにおすすめなのは</p>
                        <aside class="flex items-end gap-2">
                            <h2 class="text-4xl">商品名<span class="p_name" id="p_name">{{$data[0]["name"]}}</span></h2>
                            <p>です！</p>
                        </aside>
                    </div>

                    <p class="p_detail" id="p_detail">{{$data[0]["text"]}}</p>
                </div>
            </div>
            {{--下の画像3つ--}}
            <div class="flex w-full" id="small_image_container">
                @foreach($data as $key=>$value)
                    @if($value["order"] == 1)
                        <div id="{{ __('imgContainer-'.$value['order']) }}" class="flex justify-center items-center w-0">
                            <div id="{{ __('imgWrapper-'.$value['order']) }}" class="hidden border shadow rounded-lg p-4 flex-col items-center gap-2 cursor-pointer img-wrapper" data-key="{{ $value['order']}}">
                                <div class="square" style="width: 100px">
                                    <img src="{{asset($value["img"])}}" class="object-cover rounded-full" style="transform: translate(0, 0);">
                                </div>
                                <p class="rank">【第{{$value["order"]}}位】</p>
                            </div>
                        </div>
                    @else
                        <div id="{{ __('imgContainer-'.$value['order']) }}" class="flex flex-1 justify-center items-center w-0">
                            <div id="{{ __('imgWrapper-'.$value['order']) }}" class="flex border shadow rounded-lg p-4 flex-col items-center gap-2 cursor-pointer  img-wrapper" data-key="{{ $value['order']}}">
                                <div class="square" style="width: 100px">
                                    <img src="{{asset($value["img"])}}" class="object-cover rounded-full" style="transform: translate(0, 0);">
                                </div>
                                <p class="rank">【第{{$value["order"]}}位】</p>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    </div>

    <script>
        window.Laravel = {};
        window.Laravel.data = @json($data);
        console.log(window.Laravel.data);

        document.querySelectorAll('.img-wrapper').forEach((element) => {
            element.addEventListener('click', (e) => {
                const topImg = document.querySelector('#image0');
                const topImgOrder = topImg.getAttribute('data-key');
                const insertImg = document.querySelector(`#imgWrapper-${element.getAttribute('data-key')} img`);
                const insertImgOrder = element.getAttribute('data-key');
                const insertContainer = document.querySelector(`#imgContainer-${insertImgOrder}`);
                const moveWrapper = document.querySelector(`#imgWrapper-${topImgOrder}`);
                const moveImg = document.querySelector(`#imgWrapper-${topImgOrder} img`);
                const moveContainer = document.querySelector(`#imgContainer-${topImgOrder}`);
                let targetOrder = Number(topImgOrder) - 1;
                if (Number(topImgOrder) < Number(insertImgOrder)) {
                    targetOrder = Number(topImgOrder) + 1;
                }
                const targetWrapper = document.querySelector(`#imgWrapper-${targetOrder}`);
                const targetImg = document.querySelector(`#imgWrapper-${targetOrder} img`);

                const topImgFill = document.querySelector('#image0-fill');

                const topImgTop = topImg.getBoundingClientRect().top;
                const topImgLeft = topImg.getBoundingClientRect().left;
                const topImgWidth = topImg.getBoundingClientRect().width;
                const topImgHeight = topImg.getBoundingClientRect().height;

                const insertImgTop = insertImg.getBoundingClientRect().top;
                const insertImgLeft = insertImg.getBoundingClientRect().left;
                const insertImgWidth = insertImg.getBoundingClientRect().width;
                const insertImgHeight = insertImg.getBoundingClientRect().height;

                const targetImgTop = targetImg.getBoundingClientRect().top;
                const targetImgLeft = targetImg.getBoundingClientRect().left;
                const targetImgWidth = targetImg.getBoundingClientRect().width;
                const targetImgHeight = targetImg.getBoundingClientRect().height;

                insertImg.style.transform = 'translate(' + ((topImgLeft - insertImgLeft) + (topImgWidth - insertImgWidth)/2) + 'px, ' + ((topImgTop - insertImgTop) + (topImgHeight - insertImgHeight)/2) + 'px)';
                insertImg.style.zIndex = 20;

                moveImg.style.transform = 'translate(' + ((topImgLeft - targetImgLeft) + (topImgWidth - targetImgWidth)/2) + 'px, ' + ((topImgTop - targetImgTop) + (topImgHeight - targetImgHeight)/2) + 'px)';
                moveImg.style.opacity = 0;

                topImgFill.src = insertImg.src;
                topImg.setAttribute('data-key', insertImgOrder);
                topImgFill.setAttribute('data-key', insertImgOrder);

                setTimeout(() => {
                    topImg.style.opacity = 0;
                    element.style.opacity = 0;
                    setTimeout(() => {
                        topImg.src = insertImg.src;
                        topImg.setAttribute('data-key', insertImgOrder);
                        topImg.style.opacity = 1;
                        insertContainer.classList.remove('flex-1');
                        moveContainer.classList.add('flex-1');
                        moveWrapper.classList.remove('hidden');
                        moveWrapper.classList.add('flex');
                        setTimeout(() => {
                            moveWrapper.style.opacity = 1;
                            moveImg.style.opacity = 1;
                            moveImg.style.transform = 'translate(0, 0)';
                        }, 150);
                    }, 500);
                }, 500);
            });
        });
    </script>
</x-app-layout>

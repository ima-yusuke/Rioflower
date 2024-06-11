<x-template title="管理画面" css="app.css">

    {{--表示商品一覧--}}
    <div class="flex flex-col items-center w-full py-12">
        <div class="flex justify-start w-[80%]">
            <h2 class="dash_h2 font-semibold text-gray-800">表示商品一覧</h2>
        </div>

    @foreach($products as $idx=>$value)
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
                {{--既存商品名--}}
                <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$value["name"]}}</p>
                    </div>
                    <aside>
                        <label class="inline-flex items-center cursor-pointer mr-4">
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">非表示</span>
                            <input onclick="ToggleProduct({{$value['id']}})" type="checkbox" value="" class="sr-only peer" checked>
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">表示</span>
                        </label>
                        <a data-product-id="{{$value["id"]}}"  class="editBtn font-medium text-blue-600 hover:underline mr-4">編集</a>
                        <a onclick="DeleteProduct({{$value['id']}})" class="deleteBtn font-medium text-blue-600 hover:underline">削除</a>
                    </aside>
                </div>

                {{--既存商品詳細（最初非表示）--}}
                <div class="qa__body">
                    <form class="flex flex-col" method="post" action="{{route('UpdateProduct',$value)}}" enctype="multipart/form-data">
                        @csrf
                        @method("patch")
                        <div class="flex items-center border-y border-solid border-gray-200 py-4">
                            <p class="w-[250px]">1.商品画像の設定</p>
                            <div class="flex gap-16">
                                <aside class="flex flex-col items-center gap-2">
                                    <p>【現在の画像】</p>
                                    <img src="{{asset($value->img)}}" width="100px">
                                </aside>
                               <aside class="flex flex-col gap-2">
                                   <p>【新しい画像】</p>
                                   <input type="file" accept="image/jpeg,image/png" name="img">
                               </aside>
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <p class="w-[250px]">2.商品名</p>
                            <div class="flex-1">
                                <input name="name" value="{{$value['name']}}" class="w-full border border-solid border-gray-400 rounded-md">
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <p class="w-[250px]">3.プライオリティ</p>
                            <div class="flex-1">
                                <select name="priority" class="w-full border border-solid border-gray-400 rounded-md">
                                    <option value="0" @if($value["priority"]==0) selected @endif>優先度：低</option>
                                    <option value="1" @if($value["priority"]==1) selected @endif>優先度：中</option>
                                    <option value="2" @if($value["priority"]==2) selected @endif>優先度：高</option>
                                </select>
                            </div>
                        </div>
                        {{--テキスト箇所--}}
                        <div class="editor flex flex-col py-4 border-b border-solid border-gray-200">

                        </div>
                        <x-register-btn></x-register-btn>
                    </form>
                </div>
            </div>
        @endforeach

        {{-- 新規商品 --}}
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
                <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">
                            <span class="bg-red-500 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-8">New</span>新規商品の追加
                        </p>
                    </div>
                    <aside>
                        <a class="editBtn addProductBtn font-medium text-blue-600 hover:underline">編集</a>
                    </aside>
                </div>

                {{--新規商品詳細登録フォーム（最初非表示）--}}
                <div class="qa__body flex flex-col">
                    <form class="flex flex-col" id="productForm" method="post" action="{{route("AddProduct")}}" enctype="multipart/form-data">
                        @csrf
                        <div class="flex items-center border-y border-solid border-gray-200 py-4">
                            <div class="flex flex-col gap-2">
                                <p class="bg-red-500 w-[50px] text-white text-sm font-medium me-2 text-center px-2.5 py-0.5 rounded-lg">必須</p>
                                <p class="w-[250px]">1.商品画像</p>
                            </div>
                            <div class="flex-1">
                                <input type="file" accept="image/jpeg,image/png" name="img" id="img" class="w-full border border-solid border-gray-400 rounded-md" required />
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <div class="flex flex-col gap-2">
                                <p class="bg-red-500 w-[50px] text-white text-sm font-medium me-2 text-center px-2.5 py-0.5 rounded-lg">必須</p>
                                <p class="w-[250px]">2.商品名</p>
                            </div>
                            <div class="flex-1">
                                <input name="name" class="w-full border border-solid border-gray-400 rounded-md" required />
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <p class="w-[250px]">3.プライオリティ</p>
                            <div class="flex-1">
                                <select name="priority" class="w-full border border-solid border-gray-400 rounded-md">
                                    <option value="0">優先度：低</option>
                                    <option value="1">優先度：中</option>
                                    <option value="2">優先度：高</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <p class="w-[250px]">4.受取リンク</p>
                            <div class="flex-1">
                                <input name="pickup_link" class="w-full border border-solid border-gray-400 rounded-md">
                            </div>
                        </div>
                        <div class="flex items-center border-b border-solid border-gray-200 py-4">
                            <p class="w-[250px]">5.郵送リンク</p>
                            <div class="flex-1">
                                <input name="delivery_link" class="w-full border border-solid border-gray-400 rounded-md">
                            </div>
                        </div>
                        {{--テキスト箇所--}}
                        <div class="editor flex flex-col border-b border-solid border-gray-200 py-4">

                        </div>
                        <!-- Hidden input to store Quill data -->
                        <input type="hidden" name="quill_data" id="quillData">
                        <x-register-btn></x-register-btn>
                    </form>
                </div>
            </div>
    </div>

    {{--非表示商品一覧--}}
    <div class="flex flex-col items-center w-full py-12">
        <div class="flex justify-start w-[80%]">
            <h2 class="dash_h2 font-semibold text-gray-800">非表示商品一覧</h2>
        </div>

        @foreach($hiddenProducts as $idx=>$value)
            <div class="qa__item bg-white border border-solid border-gray-200 w-[80%] shrink-0">
                <div class="qa__head js-ac flex items-center justify-between gap-4 py-6 px-2 ml-4">
                    <div>
                        <p class="text-xs md:text-base lg:text-lg font-bold leading-6 opacity-90">{{$value["name"]}}</p>
                    </div>
                    <aside>
                        <label class="inline-flex items-center cursor-pointer mr-4">
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">非表示</span>
                            <input onclick="ToggleProduct({{$value['id']}})" type="checkbox" value="" class="sr-only peer">
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">表示</span>
                        </label>
                        <a onclick="DeleteProduct({{$value['id']}})" class="deleteBtn font-medium text-blue-600 hover:underline">削除</a>
                    </aside>
                </div>
            </div>
        @endforeach
    </div>
</x-template>
<script>

    // 削除
    function DeleteProduct(id) {

        // Ajaxリクエストを送信して削除処理を行う
        fetch('{{route('DeleteProduct')}}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (response.ok) {
                    // 削除が成功したらページをリロードするなどの処理を行う
                    location.reload();
                    console.log("削除完了")
                } else {
                    // エラーメッセージを表示するなどの処理を行う
                    console.error('削除に失敗しました');
                }
            })
            .catch(error => {
                console.error('削除に失敗しました:', error);
            });
    }

    // 表示設定
    function ToggleProduct(id) {

        // Ajaxリクエストを送信して更新処理を行う
        fetch('{{route('ToggleProduct')}}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (response.ok) {
                    // 更新が成功したらページをリロードするなどの処理を行う
                    location.reload();
                    console.log("更新完了")
                } else {
                    // エラーメッセージを表示するなどの処理を行う
                    console.error('更新に失敗しました');
                }
            })
            .catch(error => {
                console.error('更新に失敗しました:', error);
            });
    }

    window.Laravel = {};
    window.Laravel.data = @json($data);

</script>

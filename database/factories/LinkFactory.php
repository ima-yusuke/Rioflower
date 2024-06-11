<?php

namespace Database\Factories;

use App\Models\Link;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class LinkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Link::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // 日本語のダミーデータを生成するために、Fakerを日本語ロケールで設定
        $faker = FakerFactory::create('ja_JP');

        return [
            'course' => $faker->word, // ランダムな日本語の単語
            'price' => $faker->unique()->numberBetween(1, 10) * 1000, // 1000から10000の間のランダムな数値
            'pickup_link' => $faker->url, // ランダムなURL
            'delivery_link' => $faker->url, // ランダムなURL
        ];
    }
}

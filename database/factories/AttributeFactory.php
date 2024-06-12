<?php

namespace Database\Factories;

use App\Models\Attribute;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttributeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Attribute::class;

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
            'category_id' => mt_rand(1, 10), // 1から10のランダムな数値
            'name' => $faker->unique()->word, // ランダムな日本語の単語
            'is_enabled' => $faker->numberBetween(0, 1), // 0か1のランダムな数値
        ];
    }
}

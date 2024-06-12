<?php

namespace Database\Factories;

use App\Models\Category;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

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
            'name' => $faker->unique()->word, // ランダムな日本語の単語
        ];
    }
}

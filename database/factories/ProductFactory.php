<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = FakerFactory::create('ja_JP');
        return [
            'name' => $faker->realText(10),
            'img' => $faker->imageUrl,
            'pickup_link' => $faker->url,
            'delivery_link' => $faker->url,
            'priority' => $faker->unique()->numberBetween(1, 30),
            'is_enabled' => $faker->boolean,
        ];
    }
}

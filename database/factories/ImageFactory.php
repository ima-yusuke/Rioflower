<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // このファクトリでは固定値を使って画像パスを設定
            'img' => 'storage/img/test1.jpg',
        ];
    }

    /**
     * Customize the factory instance with the second image path.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withSecondImagePath()
    {
        return $this->state(function (array $attributes) {
            return [
                'img' => 'storage/img/test2.jpg',
            ];
        });
    }
}

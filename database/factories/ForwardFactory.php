<?php

namespace Database\Factories;

use App\Models\Forward;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForwardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Forward::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => null, // emailはnullに設定
        ];
    }
}

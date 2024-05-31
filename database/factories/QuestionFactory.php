<?php

namespace Database\Factories;

use App\Models\Question;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Question::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = FakerFactory::create('ja_JP');
        return [
            'text' => $faker->realText(10),
            'order' => $faker->unique()->numberBetween(1, 30),
            'is_enabled' => $faker->boolean,
        ];
    }
}

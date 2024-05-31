<?php

namespace Database\Factories;

use App\Models\Choice;
use App\Models\Question;
use Faker\Factory as FakerFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChoiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Choice::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = FakerFactory::create('ja_JP');
        return [
            'question_id' => Question::factory(),
            'text' => $faker->realText(10),
            'order' => $faker->unique()->numberBetween(1, 100),
        ];
    }
}

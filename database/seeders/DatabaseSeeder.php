<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            LinksTableSeeder::class,
            ProductsTableSeeder::class,
            QuestionsTableSeeder::class,
            ChoicesTableSeeder::class,
            CategoriesTableSeeder::class,
            AttributesTableSeeder::class,
            ForwardsTableSeeder::class,
        ]);
    }
}

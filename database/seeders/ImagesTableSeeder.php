<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 1つ目のデータを挿入
        Image::factory()->create();
        // 2つ目のデータを挿入
        Image::factory()->withSecondImagePath()->create();
    }
}

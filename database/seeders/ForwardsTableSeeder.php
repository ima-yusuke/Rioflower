<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Forward;

class ForwardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 3件のデータを生成して挿入
        Forward::factory()->count(3)->create();
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("img")->unique();
            $table->bigInteger("price")->nullable()->unsigned();
            $table->integer("priority")->unsigned()->default(0);
            $table->tinyInteger("is_enabled")->default(1);

            $table->foreign('price')->references('id')->on('links')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

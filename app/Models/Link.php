<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'course',
        'price',
        'pickup_link',
        'delivery_link',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'price');
    }
}

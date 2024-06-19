<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_attributes extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'product_id',
        'attribute_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}

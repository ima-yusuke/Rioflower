<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    use HasFactory;

    protected $fillable =[
        "insert",
        "attributes",
        "product_id"
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

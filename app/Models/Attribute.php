<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'name',
        'is_enable',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'img',
        'price',
        'priority',
        'is_enabled',
    ];

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes');
    }

    public function details()
    {
        return $this->hasMany(Detail::class);
    }

    public function link()
    {
        return $this->belongsTo(Link::class, 'price');
    }
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_enabled' => 'boolean',
    ];
}

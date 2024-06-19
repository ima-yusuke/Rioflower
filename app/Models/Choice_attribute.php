<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice_attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'choice_id',
        'attribute_id',
    ];


    public function choice()
    {
        return $this->belongsTo(Choice::class);
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}

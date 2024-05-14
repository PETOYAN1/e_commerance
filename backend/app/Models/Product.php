<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id',
        'disCount_id',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function discount() {
        return $this->belongsTo(DisCount::class);
    }

    public function Images() {
        return $this->hasMany(Images::class);
    }
}

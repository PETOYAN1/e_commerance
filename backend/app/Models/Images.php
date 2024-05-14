<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'product_id',
    ];

    public function Product() {
        return $this->hasMany(Product::class);
    }
}

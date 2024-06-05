<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'b_name',
        'slug',
        'logo',
        'product_id'
    ];

    public function products() {
        return $this->hasMany(Product::class);
    }

}

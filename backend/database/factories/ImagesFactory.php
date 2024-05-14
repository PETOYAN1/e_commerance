<?php

namespace Database\Factories;

use App\Models\Images;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */
class ImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    protected $model = Images::class;
    public function definition(): array
    {
        if(!Storage::drive('public')->exists('product_images')) {
            Storage::drive('public')->makeDirectory('product_images');
        }

        $productId = Product::pluck('id')->random();

        return [
            "image" => 'product_images/mercedes_cls.jpg', 
            "product_id" => $productId,
        ];
    }
}

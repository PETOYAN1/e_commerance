<?php

namespace Database\Factories;

use App\Models\Images;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\File;
use Illuminate\Container\Container;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */

class ImagesFactory extends Factory
{
    protected $model = Images::class;

    public function definition(): array
    {
        $dir = storage_path('app/public/product_images');

        if (!File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        // $faker = Container::getInstance()->make(Faker::class);
        // $filePath = $faker->image($dir, 640, 480, true, null, true);

        $productId = Product::pluck('id')->random();

        return [
            "image" => 'product_images/model_female_triplelayer_black_solid_mask_3000px.webp', 
            "product_id" => $productId,
        ];
    }
}

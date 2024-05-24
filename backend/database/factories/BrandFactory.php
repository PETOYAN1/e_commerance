<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productId = Product::pluck('id')->random();

        return [
            'b_name' => $this->faker->name,
            'slug' => Str::slug($this->faker->unique()->name),
            'logo' => $this->faker->imageUrl(250, 150, 'animals', true),
            'product_id' => $productId
        ];
    }
}

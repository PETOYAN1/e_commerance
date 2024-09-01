<?php

namespace Database\Factories;

use App\Models\Color;
use App\Models\Material;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productId = Product::pluck('id')->random();
        $sizeId = Size::pluck('id')->random();
        $colorId = Color::pluck('id')->random();
        $materialId = Material::pluck('id')->random();
        return [
            'product_id' => $productId,
            'size_id' => $sizeId,
            'color_id' => $colorId,
            'material_id' => $materialId
        ];
    }
}

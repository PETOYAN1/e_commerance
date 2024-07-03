<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\DisCount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyId = Category::inRandomOrder()->first();
        $disCountId = DisCount::inRandomOrder()->first();

        return [
            "name"=> $this->faker->name(),
            "slug" => Str::slug($this->faker->unique()->name),
            "description" => $this->faker->paragraph(),
            "rating" => $this->faker->numberBetween(0.5, 5),
            "price"=> $this->faker->randomFloat(2,0,0),
            "category_id" => $companyId ? $companyId->id : '',
            "disCount_id" => $disCountId ? $disCountId->id : '',
        ];
    }
}

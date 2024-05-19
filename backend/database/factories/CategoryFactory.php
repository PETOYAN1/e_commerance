<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if(!Storage::drive('public')->exists('category_images')) {
            Storage::drive('public')->makeDirectory('category_images');
        }
        return [
            "name"=> $this->faker->name,
            "slug"=> Str::slug($this->faker->unique()->name),
            "description" => $this->faker->paragraph,
            "picture" => $this->faker->imageUrl(640, 480, 'animals', true)
        ];
    }
}

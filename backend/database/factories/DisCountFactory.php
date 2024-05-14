<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DisCount>
 */
class DisCountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name"=> $this->faker->name,
            "description"=> $this->faker->paragraph,
            "percent" => $this->faker->numberBetween(1,10),
            "active"=> $this->faker->boolean(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Deck;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'deck_id' => fake()->uuid(),
            'imgUrl' => '',
            'front' => fake()->paragraph($nbSentences = 3, $variableNbSentences = true),
            'back' => fake()->paragraph($nbSentences = 3, $variableNbSentences = true),
        ];
    }

}

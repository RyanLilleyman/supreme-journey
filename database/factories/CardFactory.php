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
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * I wrote this with the help of chat gpt to configure the faker library correctly and set up the
     * fake uuids and paragraphs.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'deck_id' => $this->faker->uuid(),
            'imgUrl' => '',
            'front' => $this->faker->paragraph(),
            'back' => $this->faker->paragraph(),
        ];
    }

}

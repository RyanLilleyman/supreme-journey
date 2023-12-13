<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Deck;
use App\Models\Card;

class CardSeeder extends Seeder
{


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
         * With the help of chat gpt it was suggested to create a single seeder file that would
         * create a random number of decks and then a random number of cards for each deck and associate each new
         * card with the deck uuid.
         */
        $deck_count = rand(10,15);
        $decks = Deck::factory()->count($deck_count)->create();
        $decks->each(function ($deck) {
            $cardCount = rand(10, 20);
            Card::factory()->count($cardCount)->create(['deck_id' => $deck->id]);
        });
    }
}

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

        $deck_count = rand(6,10);
        $decks = Deck::factory()->count($deck_count)->create();
        $decks->each(function ($deck) {
            dump('Deck ID: ' . $deck->id); // Output the deck ID
            $cardCount = rand(10, 30);
            Card::factory()->count($cardCount)->create(['deck_id' => $deck->id]);
        });
    }
}

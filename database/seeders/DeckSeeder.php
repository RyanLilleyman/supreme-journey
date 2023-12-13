<?php

namespace Database\Seeders;
use App\Models\Deck;
use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CardSeeder;

class DeckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * I wrote this method to call the static methods on the cardseeder sub class.
         */
        $this->call(CardSeeder::class);
    }
}

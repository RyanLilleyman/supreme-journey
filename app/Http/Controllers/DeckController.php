<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminage\Support\Facades\Log;
use App\Models\Deck;
use App\Models\Card;
use App\Http\Requests\StoreDeckRequest;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Deck::with('cards')->get();
        //MariaDB [supremeback]> SELECT decks.*, cards.* FROM decks JOIN cards ON cards.deck_id = decks.id WHERE decks.id = 1;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('create_deck');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $deck_name = $request->input('name');
        $deck = Deck::create([
            'name' => $deck_name
        ]);

        $cards = $request->input('cards');
        $length = count($cards);

        $cards_test_array = array();
        for ($i = 0; $i < $length; $i++) {
            $to_add = new Card();
            $to_add->front = $request->input('cards.'.$i.'.front.text');
            $to_add->back = $request->input('cards.'.$i.'.back');

            $blob = $request->file('cards.'.$i.'.front.blob');
            if ($blob) {
                $disk = \Illuminate\Support\Facades\Storage::disk('public');
                $to_add->imgUrl = $disk->putFile('images/'.$deck->id, $blob);
            } else {
                $to_add->imgUrl = '';
            }

            $deck->cards()->save($to_add);
        }
        return response()->json(['message' => 'Deck created successfully', 'deck'=>$cards_test_array]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Deck::with('cards')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return view('edit_deck');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deck_images = \Storage::allFiles('public/images/'.$id);
        if($deck_images){
            \Storage::deleteDirectory('public/images/'.$id);
        }
        Deck::destroy($id);
        return response()->json(['message' => 'Deck deleted successfully']);
    }
}

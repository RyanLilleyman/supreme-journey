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
        /**
         * [1] “Eager Loading Multiple Relationships,” Laravel, https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships (accessed Dec. 12, 2023).
         * This eager loads all decks with cards.
         */
        return Deck::with('cards')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /**
         * [17] “Nested View Directories,” Laravel, https://laravel.com/docs/10.x/views#nested-view-directories (accessed Dec. 12, 2023).
         * The below method returns the create view.
         */
        return view('create_deck');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /**
         * [19] “Retrieving An Input Value,” Laravel, https://laravel.com/docs/10.x/requests#retrieving-an-input-value (accessed Dec. 12, 2023).
         */
        $deck_name = $request->input('name');

        /**
         * [20] “The create Method,” Laravel, https://laravel.com/docs/10.x/eloquent-relationships#the-create-method (accessed Dec. 12, 2023).
         */
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

            /**
             * [13] “File Storage,” Laravel, https://laravel.com/docs/10.x/filesystem#automatic-streaming (accessed Dec. 12, 2023).
             * The specific disk assignment and relevant putFile method can be found in the above documentation.
             */
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
        /**
         * [1] “Eager Loading Multiple Relationships,” Laravel, https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships (accessed Dec. 12, 2023).
         * This eager loads all cards for a specific card from a uuid.
         */
        return Deck::with('cards')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        /**
         * [17] “Nested View Directories,” Laravel, https://laravel.com/docs/10.x/views#nested-view-directories (accessed Dec. 12, 2023).
         * The below view() method returns the view from the resources/views directory.
         */
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
        /**
         * [15] “Get All Files Within A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory (accessed Dec. 12, 2023).
         * The below method comes from the above documentation.
         */
        $deck_images = \Storage::allFiles('public/images/'.$id);
        if($deck_images){

            /**
             * [14] “Delete A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#delete-a-directory (accessed Dec. 12, 2023).
             * The below method comes from the above documentation.
             */
            \Storage::deleteDirectory('public/images/'.$id);
        }
        /**
         * [16] “Deleting An Existing Model By Its Primary Key,” Laravel, https://laravel.com/docs/10.x/eloquent#deleting-an-existing-model-by-its-primary-key (accessed Dec. 12, 2023).
         * The below destroy by id method comes from the above documentation.
         */
        Deck::destroy($id);
        return response()->json(['message' => 'Deck deleted successfully']);
    }
}

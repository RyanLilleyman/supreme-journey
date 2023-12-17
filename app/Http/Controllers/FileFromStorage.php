<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Cache;

use App\Models\fronts;
use App\Models\backs;
use App\Models\Deck;

use Illuminate\Http\Request;

class FileFromStorage extends Controller
{
    /**
     * I wrote this method to grab the session view based on the deck uuid from the
     * server file system.
     */
    public function show($id){
        $file_content = Storage::get("cardsView/{$id}.html");
        $mime_type = Storage::mimeType("cardsView/{$id}.html");
        $res = Response::make($file_content, 200, [
            'Content-Type' => $mime_type,
            'Content-Disposition' => "inline; filename={$id}.html",
        ]);
        return $res;
    }

    /**
     * I wrote this method to search in the fronts table the specific front based on the uuid of the
     * front of the card.
     */
    public function show_front($id){

        // Finds the front model by the id.
        $front = fronts::find($id);

        // Finds the front_url of the model
        $front_url = $front->front_url;

        // Grabs the 'fronts' substring at the first index within the
        // $front_url
        $pos = strpos($front_url, 'fronts');

        // Returns a new url from the above position and through the rest
        // of the $front_url.
        $front_dest = substr($front_url, $pos);

        // Grabs the file from the stripped url.
        $file_content = Storage::get($front_dest);

        // Grabs the mimetype of the file front the url.
        $mime_type = Storage::mimeType($front->front_url);

        /**
         * [28] “HTTP headers: Content-disposition,” GeeksforGeeks, https://www.geeksforgeeks.org/http-headers-content-disposition/ (accessed Dec. 13, 2023).
         * Creates a response object from the file content, sets a status code, and
         * relevant headers.
         */
        $res = Response::make($file_content, 200, [
            'Content-Type' => $mime_type,
            'Content-Disposition' => "inline; filename={$id}.html",
        ]);
        return $res;
    }

    /**
     * Same as above but for the back of the cards.
     */
    public function show_back($id){
        $back = backs::find($id);
        $back_url = $back->back_url;
        $pos = strpos($back_url, 'backs');
        $back_dest = substr($back_url, $pos);
        $file_content = Storage::get($back_dest);
        $mime_type = Storage::mimeType($back_dest);
        $res = Response::make($file_content, 200, [
            'Content-Type' => $mime_type,
            'Content-Disposition' => "inline; filename={$id}.html",
        ]);
        return $res;
    }

    /**
     * Same as above for the results.
     */
    public function show_results(){
        $file_content = Storage::get("cardsView/results.html");
        $mime_type = Storage::mimeType("cardsView/results.html");
        /**
         * The only difference is the results.html to save locally.
         */
        $res = Response::make($file_content, 200, [
            'Content-Type' => $mime_type,
            'Content-Disposition' => "inline; filename=results.html",
        ]);
        return $res;
    }

    /**
     * [30] Solomon Eseme, “Everything you need to know about Laravel caching,” Kinsta®, https://kinsta.com/blog/laravel-caching/ (accessed Dec. 14, 2023).
     * I wrote this function to Cache the id for a specific duration.
     */
    public function post_cache_id($id){
        $deck = Deck::with('cards')->find($id);
        Cache::put('deck', $deck, 3600);
    }

    /**
     * I wrote this function to grab the cached deck.
     */
    public function grab_cache_id(){
        $deck = Cache::get('deck');
        return response()->json(['deck'=>$deck]);
    }

    public function grab_blob_from_url(Request $request){
        $url = $request->query('param1');
        $file = Storage::disk('public')->get($url);
        $type = Storage::disk(
            'public'
        )->mimeType($url);

        return response($file)->header('Content-Type',$type);
    }
}

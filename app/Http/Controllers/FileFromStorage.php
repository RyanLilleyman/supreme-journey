<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Models\fronts;
use App\Models\backs;

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
        $front = fronts::find($id);
        $front_url = $front->front_url;
        $pos = strpos($front_url, 'fronts');
        $front_dest = substr($front_url, $pos);
        $file_content = Storage::get($front_dest);
        $mime_type = Storage::mimeType($front->front_url);
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
        $res = Response::make($file_content, 200, [
            'Content-Type' => $mime_type,
            'Content-Disposition' => "inline; filename=results.html",
        ]);
        return $res;
    }
}

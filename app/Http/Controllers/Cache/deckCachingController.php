<?php

namespace App\Http\Controllers\Cache;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class deckCachingController extends Controller
{
    public function cacheImage(Request $request, $deck_uuid, $image_id){
        $key = $deck_uuid . '_' . $image_id;
        $image = $request->getContent();

        if (Cache::has($key)){
            Cache::forget($key);
        }

        Cache::put($key,$image,6400);

        $image = Cache::get($key);
        $response = response($image);
        return $response;
    }
}

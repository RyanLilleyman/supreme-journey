<?php

namespace App\Http\Controllers\Cache;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class deckCachingController extends Controller
{
    public function cacheImage(Request $request, $card_uuid){
        $key = $card_uuid;
        $image = $request->getContent();

        if (Cache::has($key)){
            Cache::forget($key);
        }

        Cache::put($key,$image,6400);

        $image = Cache::get($key);
        $response = response($image);

        $tempFilePath = tempnam(sys_get_temp_dir(), 'temp_blob_');
        file_put_contents($tempFilePath, $image);
        $mimeType = mime_content_type($tempFilePath);
        unlink($tempFilePath);

        $response->header('Content-Type', $mimeType);
        return $response;
    }

    public function grabImage(Request $request, $card_uuid){
        $key = $card_uuid;
        $image = Cache::get($key);
        $response = response($image);

        $tempFilePath = tempnam(sys_get_temp_dir(), 'temp_blob_');
        file_put_contents($tempFilePath, $image);
        $mimeType = mime_content_type($tempFilePath);
        unlink($tempFilePath);

        $response->header('Content-Type', $mimeType);
        return $response;
    }

    public function deleteImage($card_uuid){
        Cache::forget($card_uuid);
    }

    public function clearCache(){
        Cache::flush();
        return response()->json(['message' => 'Cache cleared']);
    }
}

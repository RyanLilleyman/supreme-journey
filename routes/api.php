<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileFromStorage;
use App\Http\Controllers\GrabResultsController;
use App\Http\Controllers\Cache\deckCachingController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Grabs blobs
Route::get('/grab-blob', [FileFromStorage::class, 'cache_blob_from_url']);

// Grabs results.pdf files
Route::get('/fetch-results', GrabResultsController::class);

// Caches the deck and card by index in the deck during creation.
Route::post('/cache/{card_uuid}',[deckCachingController::class, 'cacheImage']);

// Grabs cached image
Route::get('/cache/{card_uuid}',[deckCachingController::class, 'grabImage']);

// Deletes cached image
Route::get('/del_cache/{card_uuid}',[deckCachingController::class, 'deleteImage']);

// Deletes the cache
Route::get('/api/cache/clear',[deckCachingController::class, 'clearCache']);

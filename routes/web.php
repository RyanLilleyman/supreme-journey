<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\Fession;
use App\Http\Controllers\EnvironmentController;
use App\Http\Controllers\FileFromStorage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// General routes
Route::get('/', function(){
    Fession::delete_session_files();
    return view('index');
});
Route::view('/edit-deck', 'edit_deck');
Route::view('/catalogue', 'catalogue');
Route::view('/back-session', 'back_session');
Route::view('/frontsess', 'front_session');
Route::view('/results', 'results');
Route::view('/references', 'references');
Route::view('/about', 'about');

//
// Route::get('/',[Fession::class,'delete_session_files']);

// Deck Route handler
Route::resource('decks',DeckController::class);

// Grabbing environment variable from the .env file and setting it client side
Route::get('get-env-variable', EnvironmentController::class);

// Session starter
Route::get('/fession', [Fession::class, 'show_settings']);

// Grabbing the session url
Route::get('get_sess_url', [Fession::class, 'generate_session_url']);

// Serving session html
Route::get('cardsView/{id}', [FileFromStorage::class, 'show'])->name('file.show');

// Serving the results html
Route::get('cardsView/results', [FileFromStorage::class, 'show_results'])->name('file.show_results');

// Grabs current fronts and backs json
Route::get('fetch_arrays', [Fession::class, 'fetch_arrays']);

// Serving the front html
Route::get('fetch_front/{id}', [FileFromStorage::class, 'show_front'])->name('file.show_front');

// Serving the back html
Route::get('fetch_back/{id}', [FileFromStorage::class, 'show_back'])->name('file.show_back');

Route::post('cardsView/save-results', [Fession::class, 'save_results']);

// Grabs CSRF token
Route::get('/csrf-token', function () {
    return csrf_token();
});


// General Post test
Route::get('cardsView/{id}/test', function () {
    return response()->json(['message' => 'Test successful']);
});




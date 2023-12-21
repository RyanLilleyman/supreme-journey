<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CardController;
use App\Http\Controllers\Fession;
use App\Http\Controllers\EnvironmentController;
use App\Http\Controllers\FileFromStorage;
use App\Http\Controllers\DeckController;

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

/**
 * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
 * [12] “The PHP framework for web artisans,” Laravel, https://laravel.com/docs/10.x/routing#route-parameters (accessed
 * Dec. 12, 2023).
 * All relevant below syntax for routing comes from the above documentation.
 */

// General routes
Route::get('/', function(){
    return view('welcome');
});
Route::get('sign-up',function(){
    return view('auth.sign-up');
});
Route::get('sign-in',function(){
    return view('auth.sign-in');
});
Route::get('home', function(){
    Fession::delete_session_files();
    return view('home');
});

// Handles login form submission
Route::post('login',function(Request $request){
    $data = $request::all();
    return response()->json(['data'=>$data]);
});

Route::view('/edit-deck', 'edit_deck');
Route::view('/catalogue', 'catalogue');
Route::view('/back-session', 'back_session');
Route::view('/frontsess', 'front_session');
Route::view('/results', 'results');
Route::view('/references', 'references');
Route::view('/about', 'about');

// Route::get('/',[Fession::class,'delete_session_files']);

// Deck Route handler
Route::resource('/decks',DeckController::class);

// Grabbing environment app url from the .env file and setting it client side
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

// Saves the results.html
Route::post('cardsView/save-results', [Fession::class, 'save_results']);

// Caches the deck based on the deck_id
Route::post('cache/{id}', [FileFromStorage::class,'post_cache_id']);

// Grabs the deck based on the deck_id
Route::get('cache/', [FileFromStorage::class, 'grab_cache_id']);

// Redirects to the correct api route for fetching results
Route::get('/fetch-results', function () {
    // return 'hello world';
    return redirect('/api/fetch-results');
});

// Grabs CSRF token
Route::get('/csrf-token', function () {
    return csrf_token();
});


// General Post test
Route::get('cardsView/{id}/test', function () {
    return response()->json(['message' => 'Test successful']);
});




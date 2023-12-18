<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use App\Models\Deck;
use App\Models\Sess;
use App\Models\fronts;
use App\Models\backs;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class Fession extends Controller
{
    public function show_settings(Request $request)
    {
        /**
         * [23] “Retrieving Input From The Query String,” Laravel, https://laravel.com/docs/10.x/requests#retrieving-input-from-the-query-string (accessed Dec. 12, 2023).
         * The below query() method pulls the deck uuid from the request query string.
         */
        $deck_id = $request->query('deck');
        /**
         * I wrote this to eager load the deck based on the uuid.
         */
        $deck = Deck::with('cards')->find($deck_id);
        // To delete session files
        $this->delete_session_files();

        if($deck){
            /**
             * [24] “shuffle(),” Laravel, https://laravel.com/docs/10.x/collections#method-shuffle (accessed Dec. 12, 2023).
             * The below shuffle() method shuffles the deck cards and then creates an associative array with toArray()
             */
            $shuffledCardsArray = $deck->cards->shuffle()->toArray();
        }

        // To hold front urls
        $front_urls = array();
        // To hold back urls
        $back_urls = array();

        /**
         * [25] “Creating &amp; Rendering Views,” Laravel, https://laravel.com/docs/10.x/views#creating-and-rendering-views (accessed Dec. 12, 2023).
         * The following make method creates a new view and injects the keys  into the similar named
         * variables within the access identifier of the blade.php file. It then renders the html...
         */
        $session_view =  View::make('front_session', [
            'deck'=>$deck_id,
            'card_color'=>$request->query('cardColor'),
            'card_font'=>$request->query('cardFont'),
            'font_size'=>$request->query('fontSize'),
            'font_weight'=>$request->query('fontWeight'),
            'font_color'=>$request->query('fontColor'),
            ])->render();

        /**
         * [26] “Storing Files,” Laravel, https://laravel.com/docs/10.x/filesystem#storing-files (accessed Dec. 12, 2023).
         * The below method puts the newly created session view into the local file system.
         */
        Storage::put('cardsView/'.$deck_id.'.html', $session_view);
        $showSessionTimer = $request->query('showSessionTimer');
        // If the session timer is 'true' then set the value to 1 otherwise set it to 0.
        $showSessionTimer = $showSessionTimer == 'true' ? 1 : 0;
        $showRoundTimer = $request->query('showRoundTimer');
        // If the round timer is 'true' then set the value to 1 otherwise set it to 0.
        $showRoundTimer = $showRoundTimer == 'true' ? 1 : 0;
        // Create a new session model to save to the database with the multiple query parameters set to the session settings.
        $session = Sess::create(['session_url'=>url('cardsView/'.$deck_id.'.html'), 'session_timer'=>$request->query('sessionTimer'), 'round_timer'=>$request->query('roundTimer'),
        'show_session_timer'=>$showSessionTimer, 'show_round_timer'=>$showRoundTimer]);
        // Simply put, for each card in the shuffled array. if the card has an imgUrl
        // then make a front html page based on the 'front_card_with_image' blade template inside the resources/view directory.
        // Otherwise, use the default template. Then use the default back template.
        // This loop also stores each card in the local file system under storage/app/fronts and storage/app/backs respectively.
        foreach ($shuffledCardsArray as $card){

            if ($card['imgUrl']!='') {
                $front_card = View::make('front_card_with_image',[
                    'front'=>$card['front'],
                    'imgUrl'=>$card['imgUrl'],
                ])->render();
                Storage::put('fronts/'.$card['id'].'.html', $front_card);
                array_push($front_urls, url('fronts/'.$card['id'].'.html'));
            } else {
                $front_card = View::make('front_card', [
                    'front'=>$card['front'],
                ])->render();
                Storage::put('fronts/'.$card['id'].'.html', $front_card);
                array_push($front_urls, url('fronts/'.$card['id'].'.html'));
            }



            $back_card = View::make('back_card',[
                'deck'=>$deck_id,
                'back'=>$card['back'],
                'id' => $card['id'],
            ])->render();
            Storage::put('backs/'.$card['id'].'.html', $back_card);
            array_push($back_urls, url('backs/'.$card['id'].'.html'));

            // Make a new front and back model with the urls pointing to the relevant files in the storage/app directory
            $front_model = new fronts(['front_url'=>url('fronts/'.$card['id'].'.html')]);
            $back_model = new backs(['back_url'=>url('backs/'.$card['id'].'.html')]);

            // Save to the current session model the front urls and the back urls. This ensures that I can later
            // access the files in the local storage network
            $session->fronts()->save($front_model);
            $session->backs()->save($back_model);

        };
        return response()->json(['showSessionTimer'=>$showSessionTimer, 'showRoundTimer'=>$showRoundTimer, 'fronts'=>$front_urls, 'backs'=>$back_urls]);

    }

    public static function delete_session_files(){
        /**
         * [27] “Get All Files Within A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory (accessed Dec. 12, 2023).
         */
        // I wrote this method to delete the files inside the cardsView directory.
        $cardViews = Storage::files('cardsView');
        foreach($cardViews as $cardView){
            Storage::delete($cardView);
        }

        // I wrote this method to delete the files underneath the fronts directory
        $fronts = Storage::files('fronts');
        foreach($fronts as $front){
            Storage::delete($front);
        }
        // Same as above but for the backs directory
        $backs = Storage::files('backs');
        foreach($backs as $back){
            Storage::delete($back);
        }
        // This method deletes all current session models from the database.
        $session = Sess::all();
        foreach($session as $sess){
            $sess->delete();
        }

    }

    // I wrote thie method to generate a session url from the rendered session page and based on the uuid.
    // The uuid must match the session inside the cardsView directory otherwise it won't return
    // the correct url.
    public function generate_session_url(Request $request){
        $session_id = $request->query('deck_id');
        $url = route('file.show', ['id' => $session_id]);
        return response()->json(['url'=>$url]);
    }

    /**
     * I wrote thie method to grab all the front, back, and session data. It returns as a json object which the front end uses to encapsulate the session logic.
     */
    public function fetch_arrays(){
        $fronts = fronts::all();
        $backs = backs::all();
        $session = Sess::all();
        $session = $session[0];
        $session_timer = $session->session_timer;
        $round_timer = $session->round_timer;
        $showSessTime = $session->show_session_timer;
        $showRoundTime = $session->show_round_timer;
        return response()->json(['fronts'=>$fronts, 'backs'=>$backs, 'session_timer'=>$session_timer, 'round_timer'=>$round_timer, 'showSessTime'=>$showSessTime, 'showRoundTime'=>$showRoundTime]);
    }

    /**
     * I wrote this method to save statistics and then make a new view based on the results blade template.
     */
    public function save_results(Request $request){
        $results_id = $request->input('results_id');
        $correct = $request->input('correct');
        $correct_html_string = $this->return_html_string_from_array($request->input('correct_array'));
        $incorrect = $request->input('incorrect');
        $incorrect_html_string = $this->return_html_string_from_array($request->input('incorrect_array'));
        $number_of_cards_in_deck =  $request->input('number_of_cards_in_deck');
        $number_of_cards_viewed = $request->input('number_of_cards_viewed');
        $roundTime = $request->input('roundTime');
        $sessionTime = $request->input('sessTime');
        $skipped_latency = $request->input('skipped_latency');
        $skipped_latency_html_string =$this->return_html_string_from_array($request->input('skipped_array_latency'));
        $skipped_manual = $request->input('skipped_manual');
        $skipped_manual_html_string = $this->return_html_string_from_array($request->input('skipped_array_manual'));
        $skipped_total = $request->input('skipped_total');





        // $incorrect_array_html_string = '';
        // for($incorrect_url as $incorrect_array){
        //     $front = Storage::disk
        // }



        /**
         * I wrote the below code to create a new view with the results.blade.php inside
         * resources/views
         */
        $results_view = View::make('results',[
            'correct'=>$correct,
            'incorrect'=>$incorrect,
            'number_of_cards_in_deck'=>$number_of_cards_in_deck,
            'number_of_cards_viewed'=>$number_of_cards_viewed,
            'roundTime'=>$roundTime,
            'sessionTime'=>$sessionTime,
            'skipped_latency'=>$skipped_latency,
            'skipped_manual'=>$skipped_manual,
            'skipped_total'=>$skipped_total,
            'incorrect_array'=>$incorrect_html_string,
            'correct_array'=>$correct_html_string,
            'skipped_array_latency'=>$skipped_latency_html_string,
            'skipped_array_manual'=>$skipped_manual_html_string
        ])->render();

        //Puts the new results into the storage/app/cardsView directory
        Storage::put('cardsView/results.html', $results_view);

        $data = $request->except(['results_id']);
        //Exposes the url on the server for the frontend to then redirect to.
        $url = route('file.show_results');

        // Caches the results for later retrieval for an hour
        // Cache::put($results_id,$data,3600);

        return response()->json(['data'=>$data,'results_id'=>$results_id,'url'=>$url]);
    }

    public function return_html_string_from_array($array){
        $toReturn = '';
        $index = 0;
        if ($array){
            foreach ($array as $element){

                $toAppend = '';
                $toAppend .= '<div>';
                $toAppend .= '<h4>Front of the '. $index. ' card.</h4>';
                $front_info = $element[0];
                $front_id = $front_info['id'];
                $front = fronts::find($front_id);
                $front_url = $front->front_url;
                $pos = strpos($front_url, 'fronts');
                $front_dest = substr($front_url, $pos);
                $front_file_content = Storage::get($front_dest);
                $toAppend .= $front_file_content;

                $toAppend .= '<h4>Back of the '. $index. ' card.</4>';
                $back_info = $element[1];
                $back_id = $back_info['id'];
                $back = backs::find($back_id);
                $back_url = $back->back_url;
                $pos = strpos($back_url, 'backs');
                $back_dest = substr($back_url, $pos);
                $back_file_content = Storage::get($back_dest);
                $toAppend .= $back_file_content;
                $toAppend .= '</div>';

                $toReturn .= $toAppend;
                $index++;
            }
            return $toReturn;
        }
    }

    public function grab_cached_results(Request $request){
        $id = $request->input('request_id');
        $results = Cache::get($id);
        return response()->json(['results' => $results]);
    }
}

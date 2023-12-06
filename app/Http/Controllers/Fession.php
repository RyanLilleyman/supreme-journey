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

class Fession extends Controller
{
    public function show_settings(Request $request)
    {
        $deck_id = $request->query('deck');
        $deck = Deck::with('cards')->find($deck_id);
        $this->delete_session_files();

        if($deck){
            $shuffledCardsArray = $deck->cards->shuffle()->toArray();
        }


        $front_urls = array();
        $back_urls = array();

        $session_view =  View::make('front_session', [
            'deck'=>$deck_id,
            'card_color'=>$request->query('cardColor'),
            'card_font'=>$request->query('cardFont'),
            'font_size'=>$request->query('fontSize'),
            'font_weight'=>$request->query('fontWeight'),
            'font_color'=>$request->query('fontColor'),
            ])->render();

        Storage::put('cardsView/'.$deck_id.'.html', $session_view);
        $showSessionTimer = $request->query('showSessionTimer');
        $showSessionTimer = $showSessionTimer == 'true' ? 1 : 0;
        $showRoundTimer = $request->query('showRoundTimer');
        $showRoundTimer = $showRoundTimer == 'true' ? 1 : 0;
        $session = Sess::create(['session_url'=>url('cardsView/'.$deck_id.'.html'), 'session_timer'=>$request->query('sessionTimer'), 'round_timer'=>$request->query('roundTimer'),
        'show_session_timer'=>$showSessionTimer, 'show_round_timer'=>$showRoundTimer]);
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


            $front_model = new fronts(['front_url'=>url('fronts/'.$card['id'].'.html')]);
            $back_model = new backs(['back_url'=>url('backs/'.$card['id'].'.html')]);

            $session->fronts()->save($front_model);
            $session->backs()->save($back_model);

        };
        return response()->json(['showSessionTimer'=>$showSessionTimer, 'showRoundTimer'=>$showRoundTimer, 'fronts'=>$front_urls, 'backs'=>$back_urls]);

    }

    public static function delete_session_files(){
        $cardViews = Storage::files('cardsView');
        foreach($cardViews as $cardView){
            Storage::delete($cardView);
        }

        $fronts = Storage::files('fronts');
        foreach($fronts as $front){
            Storage::delete($front);
        }

        $backs = Storage::files('backs');
        foreach($backs as $back){
            Storage::delete($back);
        }

        $session = Sess::all();
        foreach($session as $sess){
            $sess->delete();
        }

    }

    public function show_session($id){
        $viewContent = Storage::get("cardsView/{$id}.html");
        return response($viewContent)->header('Content-Type', 'text/html');
    }

    public function generate_session_url(Request $request){
        $session_id = $request->query('deck_id');
        $url = route('file.show', ['id' => $session_id]);
        return response()->json(['url'=>$url]);
    }

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
}

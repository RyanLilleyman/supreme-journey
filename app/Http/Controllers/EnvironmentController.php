<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnvironmentController extends Controller
{
    public function __invoke(Request $request){
        $value = env('APP_URL','default');
        return response()->json(['value' => $value]);
    }
}

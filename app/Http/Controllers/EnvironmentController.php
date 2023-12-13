<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnvironmentController extends Controller
{
    /**
     * [1] “Single Action Controllers,” Laravel, https://laravel.com/docs/10.x/controllers#single-action-controllers (accessed Dec. 12, 2023).
     * The below single action controller comes from the above documentation.
     */
    public function __invoke(Request $request){
        /**
         * [22] “env(),” Laravel, https://laravel.com/docs/10.x/helpers#method-env (accessed Dec. 12, 2023).
         * The below env method grabs the specified environment variable or a default version.
         */
        $value = env('APP_URL','default');
        return response()->json(['value' => $value]);
    }
}

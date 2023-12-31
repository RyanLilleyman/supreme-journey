<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class GrabResultsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /**
         * [32]“Laravel and DomPDF: Generate Simple Invoice PDF with Images and CSS,” Laravel Daily. https://laraveldaily.com/post/laravel-dompdf-generate-simple-invoice-pdf-with-images-css (accessed Dec. 17, 2023).
         */

        $download_no_array = \Storage::get('cardsView/download_no_arrays.html');
        $download_arrays = \Storage::get('cardsView/download_arrays.html');
        $pdf = Pdf::loadView('results.success',['noarrays'=>$download_no_array,'arrays'=>$download_arrays]);
        return $pdf->download();
    }
}

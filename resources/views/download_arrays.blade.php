@php
    if (!empty($incorrect_array)) {
        echo '<div class=' .
            '"incorrect_array"' .
            '>
            <h1>Incorrect:</h1>' .
            $incorrect_array .
            '</div>';
    }
    if (!empty($correct_array)) {
        echo '<div class=' .
            '"correct_array"' .
            '>
            <h1>Correct:</h1>' .
            $correct_array .
            '</div>';
    }
    if (!empty($skipped_array_manual)) {
        echo '<div class=' .
            '"skipped_array_manual"' .
            '>
            <h1>Skipped Manually</h1>' .
            $skipped_array_manual .
            '</div>';
    }
    if (!empty($skipped_array_latency)) {
        echo '<div class=' .
            '"skipped_array_latency"' .
            '>
            <h1>Skipped by Latency:</h1>' .
            $skipped_array_latency .
            '</div>';
    }
@endphp

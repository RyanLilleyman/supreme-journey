<div class = 'firstFour'>
    <div class="correctResponses">Correct Responses: <span value={{ $correct }}>{{ $correct }}</span></div>
    <div class="incorrectResponses">Incorrect Reponses: <span value = "{{ $incorrect }}">{{ $incorrect }}</span>
    </div>
    <div class="skippedResponses">Skipped Responses: <span value = '{{ $skipped_manual }}'>{{ $skipped_manual }}</span>
    </div>
    <div class="skippedLatency">Skipped (Latency): <span value={{ $skipped_latency }}>{{ $skipped_latency }}</span></div>
</div>
<div class="divider"></div>
<div class='lastFour'>
    <div class="cardsViewed">Cards Viewed: <span
            value='{{ $number_of_cards_viewed }}'>{{ $number_of_cards_viewed }}</span></div>
    <div class="cardsInDeck">Cards in Deck: <span
            value='{{ $number_of_cards_in_deck }}'>{{ $number_of_cards_in_deck }}</span></div>
    <div class="sessionTime">Total Session Time: <span value={{ $sessionTime }}>{{ $sessionTime }}</span>
    </div>
    <div class="timeToRespond">Time to Respond: <span value = '{{ $roundTime }}'>{{ $roundTime }}</span></div>
</div>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Results</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[8] “Free icons and stickers - millions of images to download,” Flaticon, https://www.flaticon.com/ (accessed Dec. 12, 2023).
    I imported a modified image to make relevant flaticons for the webpage.-->
    <link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
    <link rel="manifest" href="../favicons/site.webmanifest" />
    <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href="../favicons/favicon.ico" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />

    @vite(['resources/styles/mainStyle.css', 'resources/styles/results.css', 'resources/styles/navStyle.css', 'resources/styles/startSessStyle.css', 'resources/scripts/results_handling/inject_results.mjs'])
</head>

<body>
    <nav class="navbar">
        <!-- [6] Responsive navbar (HTML and CSS) - codepen, https://codepen.io/sanketbodke/pen/LYyzzYb?anon=true&amp;view=pen (accessed Dec. 12, 2023).
        I note where modifications were made to the navbar styling and overall structure.
        -->
        <div class="navbar-container container">
            <input type="checkbox" name="" id="" />
            <div class="hamburger-lines">
                <span id="line1" class="line line1"></span>
                <span id="line2" class="line line2"></span>
                <span id="line3" class="line line3"></span>
            </div>
            <ul class="menu-items">
                <!--I added classes to the list items below, added a new name for the webapp inside the h1 tag,
           and added a custom image for the branding.-->
                <li class="navListItem"><a href="/">Home</a></li>
                <li class="navListItem"><a href="/about">About</a></li>
                <li class="navListItem">
                    <a href="/catalogue">Deck Catalog</a>
                </li>
                <li class="navListItem">
                    <a href="/references">References</a>
                </li>
            </ul>
            <a href="/">
                <h1 class="logo">
                    SAFMEDS
                    <img class="BrainTree" src="{{ asset('images/MoM.png') }}" alt="Picture of Brain Tree." />
                </h1>
            </a>
        </div>
    </nav>
    <main class="mainBar">
        <h2 class="resultHeader">Results</h2>
        <div class="resultsContainer">
            <div class="outcomes">
                <div class="correctResponses">Correct Responses: <span
                        value={{ $correct }}>{{ $correct }}</span></div>
                <div class="incorrectResponses">Incorrect Reponses: <span
                        value = "{{ $incorrect }}">{{ $incorrect }}</span></div>
                <div class="skippedResponses">Skipped Responses: <span
                        value = '{{ $skipped_manual }}'>{{ $skipped_manual }}</span></div>
                <div class="skippedLatency">Skipped (Latency): <span
                        value={{ $skipped_latency }}>{{ $skipped_latency }}</span></div>
                <div class="divider"></div>
                <div class="cardsViewed">Number of Cards Viewed: <span
                        value='{{ $number_of_cards_viewed }}'>{{ $number_of_cards_viewed }}</span></div>
                <div class="cardsInDeck">Number of Cards in Deck: <span
                        value='{{ $number_of_cards_in_deck }}'>{{ $number_of_cards_in_deck }}</span></div>
                <div class="sessionTime">Total Session Time: <span
                        value={{ $sessionTime }}>{{ $sessionTime }}</span>
                </div>
                <div class="timeToRespond">Time to Respond: <span
                        value = '{{ $roundTime }}'>{{ $roundTime }}</span></div>
            </div>
            <div class='outcomes arrays'>
                <div class="incorrect_array">
                    <h3>Incorrect:</h3>
                    {!! $incorrect_array !!}
                </div>
                <div class='correct_array'>
                    <h3>Correct:</h3>
                    {!! $correct_array !!}
                </div>
                <div class='skipped_array_manual'>
                    <h3>Skipped Manually:</h3>
                    {!! $skipped_array_manual !!}
                </div>
                <div class='skipped_array_latency'>
                    <h3>Skipped by Latency</h3>
                    {!! $skipped_array_latency !!}
                </div>
            </div>
            {{-- <div class="cardResults">
                <ol class="cards">
                    <li>Future Cards List</li>
                </ol>
            </div> --}}
        </div>
        <!--[9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
        I modified the class names and the relevant text content within the below buttons.-->
        <div class="flipAndSkip">
            <button type="submit" class="downloadButton">
                <span class="downloadShadow"></span>
                <span class="downloadEdge"></span>
                <span class="downloadFront">Download</span>
            </button>
            <button type="submit" class="mainButton">
                <a href="{{ url('/') }}">
                    <span class="mainShadow"></span>
                    <span class="mainEdge"></span>
                    <span class="mainFront">Main Page</span>
                </a>
            </button>
        </div>
    </main>

    <footer class="footer">&copy; Something Copyright</footer>

</body>

</html>

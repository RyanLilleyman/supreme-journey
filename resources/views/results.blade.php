<!DOCTYPE html>
<html lang="en">

<head>
    <title>Results</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
    <link rel="manifest" href="../favicons/site.webmanifest" />
    <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href="../favicons/favicon.ico" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />

    @vite(['resources/styles/mainStyle.css', 'resources/styles/results.css', 'resources/styles/navStyle.css', 'resources/styles/startSessStyle.css'])
</head>

<body>
    <nav class="navbar">
        <!--The main structure of this nav bar came from https://codepen.io/sanketbodke/pen/LYyzzYb -->
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
                <div class="sessionTime">Total Session Time: 60 sec</div>
                <div class="correctResponses">Correct Responses: 25</div>
                <div class="incorrectResponses">Incorrect Reponses: 10</div>
                <div class="skippedResponses">Skipped Responses: 10</div>
                <div class="skippedLatency">Skipped (Latency): 3</div>
                <div class="divider"></div>
                <div class="cardsViewed">Number of Cards Viewed: 48</div>
                <div class="cardsInDeck">Number of Cards in Deck: 50</div>
                <div class="timeToRespond">Time to Respond: 5 sec</div>
            </div>
            <div class="cardResults">
                <ol class="cards">
                    <li>California - Correct</li>
                    <li>Texas - Incorrect</li>
                    <li>Washington - Skipped</li>
                    <li>Idaho - Incorrect</li>
                    <li>Montana - Correct</li>
                    <li>Arizona - Correct</li>
                    <li>New Mexico - Skipped (Latency)</li>
                    <li>Florida - Incorrect</li>
                    <li>Oklahoma - Correct</li>
                    <li>Ohio - Skipped</li>
                </ol>
            </div>
        </div>
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

    <script type="module" src="../scripts/bundle.mjs"></script>
</body>

</html>

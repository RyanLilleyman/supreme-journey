<!DOCTYPE html>
<html lang="en">

<head>
    <title>Front Session</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
    <link rel="manifest" href="../favicons/site.webmanifest" />
    <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href="../favicons/favicon.ico" />
    <script src="https://kit.fontawesome.com/c1c8aa52a6.js" crossorigin="anonymous"></script>

    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />

    @vite(['resources/styles/mainStyle.css', 'resources/styles/startSessStyle.css', 'resources/styles/navStyle.css', 'resources/scripts/session_handling/session_inject.mjs'])
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
        <div class="showHeaderAndTimer">
            <span><span class = 'totalTime'></span></span>
            <span><span class = 'roundTime'></span></span>
        </div>
        <div class="showCard">
            <div class="frontOfCard"
                style="background-color: {{ $card_color }}; font-family: {{ $card_font }}; font-size: {{ $font_size }}; font-weight: {{ $font_weight }}; color: {{ $font_color }}">
            </div>
        </div>
        <div class="flipAndSkip">
        </div>
        <button><a href="{{ url('http://127.0.0.1:8000/results') }}">to results</a></button>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

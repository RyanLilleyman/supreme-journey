<!DOCTYPE html> <html lang="en"> <head> <title>Edit Deck</title> <meta charset="UTF-8" /> <meta name="viewport"
    content="width=device-width, initial-scale=1" /> <link rel="apple-touch-icon" sizes="180x180"
    href="../favicons/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" /> <link rel="icon"
    type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" /> <link rel="manifest"
    href=".../favicons/site.webmanifest" />
<link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="../favicons/favicon.ico" />
<meta name="msapplication-TileColor" content="#da532c" />
<meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
<meta name="theme-color" content="#ffffff" />
@vite(['resources/styles/mainStyle.css','resources/styles/createDeck.css','resources/styles/navStyle.css'])
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
                    <img class="BrainTree" src="images/MoM.png" alt="Picture of Brain Tree." />
                </h1>
            </a>
        </div>
    </nav>
    <main class="mainBar">
        <div class="createHeaderContainer">
            <a href="{{url('/')}}">
                <div class="upArrow"></div>
            </a>
            <h1 class="createHeader">Edit Deck</h1>
        </div>
        <section class="createCard">
            <div class="topContainer">
                <div class="frontContainer">
                    <h3>Front:</h3>
                    <div class="frontCardCreate"></div>
                </div>
                <div class="backContainer">
                    <h3>Back:</h3>
                    <div class="backCardCreate"></div>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="deckContainer">
                    <div class="deckSettings">
                        <div class="deckName">
                            Name:
                            <input required type="text" name="deckName" value="deckName" />
                        </div>
                    </div>
                    <div class="deckSettings">
                        <div class="cardNumberContainer">
                            Card Number: <span class="cardNumber">01</span>
                        </div>
                    </div>
                </div>

                <div class="buttonContainer">
                    <div class="buttonsForCreating">
                        <button type="submit" class="previousButton">
                            <span class="previousShadow"></span>
                            <span class="previousEdge"></span>
                            <span class="previousFront">Previous</span>
                        </button>
                        <button type="submit" class="nextButton">
                            <span class="nextShadow"></span>
                            <span class="nextEdge"></span>
                            <span class="nextFront">Next</span>
                        </button>
                    </div>
                    <div class="buttonsForCreating">
                        <button type="submit" class="clearButton">
                            <span class="clearShadow"></span>
                            <span class="clearEdge"></span>
                            <span class="clearFront">Clear</span>
                        </button>
                        <button type="submit" class="finishButton">
                            <span class="finishShadow"></span>
                            <span class="finishEdge"></span>
                            <span class="finishFront">Finish</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
    <script type="module" src="../scripts/bundle.mjs"></script>
</body>

</html>
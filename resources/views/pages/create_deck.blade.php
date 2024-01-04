<!DOCTYPE html>
<html lang="en">

<head>
    <title>Create Deck</title>
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
    <script src="https://kit.fontawesome.com/c1c8aa52a6.js" crossorigin="anonymous"></script>
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />

    @vite(['resources/styles/mainStyle.css', 'resources/styles/createDeck.css', 'resources/styles/navStyle.css', 'resources/scripts/deck_creation/inject_dom.mjs'])
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
                    <img class="BrainTree" src={{ asset('images/MoM.png') }} alt="Picture of Brain Tree." />
                </h1>
            </a>
        </div>
    </nav>
    <main class="mainBar">
        {{-- <div class="createHeaderContainer">
            <a href="{{ url('/') }}">
                <img class='upArrow' src={{ asset('images/blue_arrowTest.png') }} alt="Back Button" srcset="">
            </a>
            <h1 class="createHeader">Create Deck</h1>
        </div> --}}
        <section class="createCard">
            <div class="topContainer">
                <div class="frontContainer">
                    <h3>Front of Card:</h3>
                    <div class="frontCardCreation">
                        <span class="uploadImageContainer">
                            <span id="uploadImage">
                                <input type="file" id="fileInput" style="display: none" />
                                <img src="../images/icons8-upload-image-24.png" alt="upload image" />
                                Add Image
                            </span>
                            <span id="removeImage" style="display: none">
                                <span>Remove</span>
                                <img src="../images/delete.png" alt="deletion of image" />
                            </span>
                        </span>
                        <hr>

                        <div id="imagePossible"></div>
                        <textarea class="frontCardCreate" name="frontOfCardText" placeholder="Front of Card Text Here" spellcheck="True"
                            cols="36" rows="10"></textarea>
                    </div>
                </div>

                <div class="backContainer">
                    <h3>Back of Card:</h3>
                    <textarea class="backCardCreate" name="backOfCardText" placeholder=" ...And Back of Card Text Here" spellcheck="True"
                        cols="36" rows="10"></textarea>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="deckContainer">
                    <div class="deckSettings">
                        <div class="deckName">
                            <input required type="text" name="deckName" placeholder="Enter Deck Name Here" />
                            <span>Card #<span class="cardNumber">1</span></span>
                        </div>
                    </div>
                    <div class="deckSettings">
                        <!--[9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
                        I modified the class names and the inner content of these buttons.-->
                        <button type="submit" class="previousButton" title='Previous'>
                            <span class="previousShadow"></span>
                            <span class="previousEdge"></span>
                            <span class="previousFront"><i class="fa-solid fa-arrow-left fa-xl"
                                    style="color: #ffffff;"></i></span>
                        </button>
                        <button type="submit" class="nextButton" title='Next'>
                            <span class="nextShadow"></span>
                            <span class="nextEdge"></span>
                            <span class="nextFront"><i class="fa-solid fa-arrow-right fa-xl"
                                    style="color: #ffffff;"></i></span>
                        </button>

                    </div>
                </div>

                <div class="buttonContainer">
                    <div class="buttonsForCreating">
                        <!--[9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
                        I modified the class names and the inner content of these buttons.-->
                        <button type="submit" class="createButton" title="Add Card">
                            <span class="createButtonShadow"></span>
                            <span class="createButtonEdge"></span>
                            <span class="createButtonFront">Add Card</span>
                        </button>
                        <button type="submit" class="clearButton" title='Clear'>
                            <span class="clearShadow"></span>
                            <span class="clearEdge"></span>
                            <span class="clearFront">Erase Card</span>
                        </button>

                    </div>
                    <div class="buttonsForCreating">
                        <!--[9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
                        I modified the class names and the inner content of these buttons.-->

                        <button type="submit" class="indexButton destroyButton" title="Destroy Card">
                            <span class="destroyShadow"></span>
                            <span class="destroyEdge"></span>
                            <span class="destroyFront">Delete Card</span>
                        </button>
                        <button type="submit" class="finishButton" title='Finish'>
                            <span class="finishShadow"></span>
                            <span class="finishEdge"></span>
                            <span class="finishFront">Finish Deck</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

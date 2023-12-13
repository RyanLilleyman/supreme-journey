<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[7] “W3Schools online HTML editor,” W3Schools Tryit Editor, https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select (accessed Dec. 12, 2023).
    I imported a modified image to make relevant flaticons for the webpage.-->
    <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
    <link rel="manifest" href="favicons/site.webmanifest" />
    <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href="favicons/favicon.ico" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <script src="https://kit.fontawesome.com/c1c8aa52a6.js" crossorigin="anonymous"></script>
    <meta name="msapplication-config" content="~/Repos/supreme-journey/front/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    @vite(['resources/styles/mainStyle.css', 'resources/styles/navStyle.css', 'resources/scripts/utility/utility.mjs', 'resources/scripts/utility/style_change.mjs', 'resources/scripts/global/globalDecks.mjs', 'resources/scripts/services/deckServices.mjs'])
</head>

<body>
    <nav class="navbar">
        <!-- [6] Responsive navbar (HTML and CSS) - codepen, https://codepen.io/sanketbodke/pen/LYyzzYb?anon=true&amp;view=pen (accessed Dec. 12, 2023).
        I note where modifications were made to the navbar styling and overall structure.
        -->
        <div class="navbar-container container"> <input type="checkbox" name="" id="" />
            <div class="hamburger-lines">
                <span id="line1" class="line line1"></span>
                <span id="line2" class="line line2"></span>
                <span id="line3" class="line line3"></span>
            </div>
            <ul class="menu-items">
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
        <section class="instructionsAndLib">
            <div class="deckLibrary">
                <div class="deckBarAndSearch">
                    <h3>1. Choose a Deck</h3>
                </div>
                <div class="decks">

                    <div class="dl"></div>
                    <input type="text" class = 'search'name="searchDecks" id="searchDecks" placeholder="Search...">
                    <div class="createButtonContainer">
                        <div class="editAndDestroy">
                            <!--[1] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
                        I modified the class names and the inner content of these buttons.-->
                            <button type=" submit" class="createButton">
                                <a href="{{ url('/decks/create') }}" title='Create a Deck'>
                                    <span class="createButtonShadow"></span>
                                    <span class="createButtonEdge"></span>
                                    <span class="createButtonFront"><i class="fa-solid fa-plus fa-xl"
                                            style="color: #ffffff;"></i></span>
                                </a>
                            </button>
                            <button type="submit" class="indexButton editButton">
                                <a class = 'edit-button' title='Edit a Deck'>
                                    <span class="editShadow"></span>
                                    <span class="editEdge"></span>
                                    <span class="editFront"><i class="fa-solid fa-pencil fa-xl"
                                            style="color: #ffffff;"></i></span>
                                </a>
                            </button>

                            <button type="submit" class="indexButton destroyButton">
                                <a title="Destroy Deck/s">
                                    <span class="destroyShadow"></span>
                                    <span class="destroyEdge"></span>
                                    <span class="destroyFront"><i class="fa-solid fa-trash fa-xl"
                                            style="color: #ffffff;"></i></span>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="generalInstructions">
                <!--The below header and following styles that display on press are
          inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover -->
                <div class="generalHeader">
                    <button type="submit" class="instructionsButton">
                        <h3>2. Deck Settings</h3>
                    </button>

                </div>

                <ol class="generalInstList">
                    <li class="instructionItem">Choose a deck.</li>
                    <li class="instructionItem">
                        Consider the parameters:
                        <ul id="parameterInstList">
                            <li class="parameterItem">Set the session duration.</li>
                            <li class="parameterItem">Set the time to respond.</li>
                        </ul>
                    </li>
                    <li class="instructionItem">Start the Session.</li>
                </ol>

                <div class="deckSetter">
                    <!--[7] “W3Schools online HTML editor,” W3Schools Tryit Editor, https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select (accessed Dec. 12, 2023).
                    The below selects took inspiration from the above link. I made many modifications such as the
                    subject type, the values, the classes, the options, etc. -->
                    <span>
                        Background Color:
                        <select class="cardColor" required>
                            <option value="#ffffff">White</option>
                            <option value="#000000">Black</option>
                            <option value="#FFF8E7">Cream</option>
                            <option value="#D3D3D3">Light Gray</option>
                            <option value="#36454F">Charcoal</option>
                            <option value="#87CEEB">Sky Blue</option>
                            <option value="#FADADD">Pale Pink</option>
                            <option value="#98FF98">Mint Green</option>
                            <option value="#E6E6FA">Lavender</option>
                            <option value="#FFFFE0">Soft Yellow</option>
                            <option value="#F5F5DC">Tan</option>
                        </select>
                    </span>
                    <span>
                        Deck Font Style:
                        <select class="cardFont" id="fontSelector" name="fonts">
                            <optgroup label="Serif">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Garamond">Garamond</option>
                                <option value="Baskerville">Baskerville</option>
                                <option value="Georgia">Georgia</option>
                            </optgroup>
                            <optgroup label="Sans-Serif">
                                <option value="Helvetica">Helvetica</option>
                                <option value="Arial">Arial</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Open Sans">Open Sans</option>
                            </optgroup>
                            <optgroup label="Script">
                                <option value="Lobster">Lobster</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Great Vibes">Great Vibes</option>
                            </optgroup>
                            <optgroup label="Display">
                                <option value="Bevan">Bevan</option>
                                <option value="Abril Fatface">Abril Fatface</option>
                                <option value="Bebas Neue">Bebas Neue</option>
                            </optgroup>
                        </select>
                    </span>
                    <span>
                        Deck Font Size:
                        <select class="fontSize" required>

                            <option value="16px">16</option>
                            <option value="18px">18</option>
                            <option value="20px">20</option>
                            <option value="22px">22</option>
                            <option value="24px">24</option>
                            <option value="26px">26</option>
                            <option value="28px">28</option>
                            <option value="30px">30</option>
                        </select>
                    </span>

                    <span>
                        Deck Font Weight:
                        <select class="howManyCards" required>
                            <option value="100">100 - Thin/Hairline</option>
                            <option value="200">200 - Extra Light/Ultra Light</option>
                            <option value="300">300 - Light</option>
                            <option value="400">400 - Normal/Regular</option>
                            <option value="500">500 - Medium</option>
                            <option value="600">600 - Semi Bold/Demi Bold</option>
                            <option value="700">700 - Bold</option>
                            <option value="800">800 - Extra Bold/Ultra Bold</option>
                            <option value="900">900 - Black/Heavy</option>
                        </select>
                    </span>
                    <span>
                        Deck Font Color:
                        <select class="font_color" required>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                            <option value="orange">Orange</option>
                            <option value="purple">Purple</option>
                            <option value="brown">Brown</option>
                            <option value="pink">Pink</option>
                            <option value="gray">Gray</option>
                            <option value="cyan">Cyan</option>
                        </select>

                    </span>
                </div>
            </div>
            <div class="thisHoldsStepThree">
                <h3>3. Session Settings</h3>
                <div class="sessionSettings">
                    <div class = "Session_Holder">
                        <span class='Session_Holder_Span'>
                            Total Session Time:
                            <select class="sessionTimeSelect" name="seconds">
                                <option value="60">60 sec.</option>
                                <option value="90">90 sec.</option>
                                <option value="120">120 sec.</option>
                                <option value="150">150 sec.</option>
                                <option value="180">180 sec.</option>
                                <option value="210">210 sec.</option>
                                <option value="240">240 sec.</option>
                                <option value="270">270 sec.</option>
                                <option value="300">300 sec.</option>
                            </select>
                        </span>
                        <span class = 'Session_Holder_Span'>Time Round Time:
                            <select class="timePerRoundSelect" name="seconds">
                                <option value="0">No Timer</option>
                                <option value="5">5 sec.</option>
                                <option value="6">6 sec.</option>
                                <option value="7">7 sec.</option>
                                <option value="8">8 sec.</option>
                                <option value="10">10 sec.</option>
                                <option value="15">15 sec.</option>
                                <option value="20">20 sec.</option>
                                <option value="25">25 sec.</option>
                                <option value="30">30 sec.</option>
                            </select>
                        </span>
                        <span class ='Session_Holder_Span'>Show Session Time: <span
                                class = 'toggleSessionTime'></span></span>
                        <span class='Session_Holder_Span'>Show Round Time:<span
                                class = 'toggleRoundTime'></span></span>
                    </div>
                    <!--[1] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
                        I modified the class names and the inner content of these buttons.-->
                    <button type="submit" class="indexButton startSessButton">
                        <a title="Start Session">
                            <span class="startSessShadow"></span>
                            <span class="startSessEdge"></span>
                            <span class="startSessFront">Start Session</span>
                        </a>
                    </button>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

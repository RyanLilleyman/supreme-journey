<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[8] “Free icons and stickers - millions of images to download,” Flaticon, https://www.flaticon.com/ (accessed Dec. 12, 2023).
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
            <a href="/">
                <h1 class="logo">
                    SAFMEDS
                    <img class="BrainTree" src="images/MoM.png" alt="Picture of Brain Tree." />
                </h1>
            </a>
        </div>
    </nav>
    <main class="mainBar">
        <section class='totalContainer'>
            <div class='welcomeContainer'>
                Welcome!
            </div>
            <div class='buttonContainer'>
                <button type="" name='login' id='login'><label for="login">Log In</Label></button>
                <div>- or -</div>
                <button type="" name='register' id=register'><label for="register">Register</label></button>
            </div>
        </section>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

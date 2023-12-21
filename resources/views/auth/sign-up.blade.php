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
    @vite(['resources/styles/mainStyle.css', 'resources/styles/navStyle.css', 'resources/styles/signin.css', 'resources/scripts/utility/utility.mjs', 'resources/scripts/global/globalDecks.mjs', 'resources/scripts/services/deckServices.mjs'])
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
        <form action="" method="post" class='signInForm'>
            @csrf
            <div class='emailContainer'>
                <h4>Email:</h4>
                <input required type="email" name="" id="">
            </div>
            <div class='passwordContainer'>
                <h4>Password:</h4>
                <input required type="text" name="" id=""
                    pattern='^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Za-z]).{8,}$'>
            </div>
            <div class='confirmPasswordContainer'>
                <h4>Confirm Password:</h4>
                <input required type="text" name="" id=""
                    pattern="^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Za-z]).{8,}$">
            </div>
            <div class='buttonContainer'>
                <button type="button" class="indexButton back">
                    <a title="Back to Sign-In" href="{{ url('sign-in') }}">
                        <span class="backShadow"></span>
                        <span class="backEdge"></span>
                        <span class="backFront">Back</span>
                    </a>
                </button>
                <div>- or -</div>
                <button type='button' class="indexButton signUpButton">
                    <a title="signUp Deck/s" href={{ url('sign-up') }}>
                        <span class="signUpShadow"></span>
                        <span class="signUpEdge"></span>
                        <span class="signUpFront">Sign Up</span>
                    </a>

                </button>
            </div>
        </form>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

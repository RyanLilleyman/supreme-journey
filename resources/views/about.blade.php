<!doctype html>
<html lang="en">

<head>
    <title>About This Project.</title>
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
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    @vite(['resources/styles/mainStyle.css', 'resources/styles/navStyle.css', 'resources/styles/aboutStyle.css'])

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
                    <img class="BrainTree" src="images/MoM.png" alt="Picture of Brain Tree." />
                </h1>
            </a>
        </div>
    </nav>
    <div class="aboutContainer">
        {{-- <h3>About Application</h3>
        <div class="aboutApplication">
            <p>
                SAFMEDS is a humble flash card app. Perfect for studying languages,
                preparing for exams, or expanding your knowledge. Efficient, and
                effective.
            </p>
        </div> --}}
        <!--[11] “Hugo Curiel,” Western Michigan University, https://wmich.edu/psychology/directory/curiel-0#:~:text=and%20intellectual%20disabilities.-,Dr.,preference%20and%20reinforcer%20assessment%20procedures. (accessed Dec. 12, 2023).
        All below information on Dr. Curiel is straight from the above link. -->
        <h3>About Dr. Curiel</h3>
        <div class="aboutCuriel">
            <div class="educationContainer">
                <div class="leftEdu">
                    <h4>Education:</h4>
                    <ul class="">
                        <li>Ph.D., Western Michigan University, 2018</li>
                        <li>M.A., California State University, Fresno, 2012</li>
                        <li>B.A., California State University, Fresno, 2009</li>
                    </ul>
                    <h4>Research Interests:</h4>
                    <ul class="">
                        <li>Stimulus preference assessments</li>
                        <li>Reinforcer assessments</li>
                        <li>Gender issues</li>
                    </ul>
                </div>
                <div class="imageContainer"> <img src={{ asset('images/Curiel.png') }} alt="Professor Curiel"></div>
            </div>
            <h4>Bio:</h4>
            <p>
                <span class="tab"></span>
                Dr. Hugo Curiel is an assistant professor in the Department of
                Psychology at Western Michigan University. He earned his B.A. and M.A.
                from California State University, Fresno. He then earned his Ph.D. in
                Behavior Analysis from Western Michigan University. Dr. Curiel’s
                training has been primarily in early comprehensive behavioral
                intervention for children diagnosed with developmental and
                intellectual disabilities. Dr. Curiel is bilingual in Spanish and
                English, which has allowed him to work with families of diverse
                cultural backgrounds. His primary area of research focuses on
                integrating technology with well-established stimulus preference and
                reinforcer assessment procedures. His research has focused on the
                systematic identification of preferences for video content. Dr. Curiel
                is also interested in gender issues in behavior analysis and assessing
                matrix training procedures with individuals with and without
                disabilities.
            </p>
        </div>
    </div>

    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

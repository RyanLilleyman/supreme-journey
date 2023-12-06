<!doctype html>
<html lang="en">

<head>
    <title>References</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
    <link rel="manifest" href="../favicons/site.webmanifest" />
    <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href=".,/favicons/favicon.ico" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    @vite(['resources/styles/mainStyle.css', 'resources/styles/references.css', 'resources/styles/navStyle.css'])
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

    <!-- references -->
    <main class="references">
        {{-- <h1 class="referenceHeader">References List</h1> --}}
        <h1></h1>
        <ul>
            <li>
                Bodke, S. (n.d.).
                <a href="https://codepen.io/sanketbodke/pen/LYyzzYb">Responsive Navigation Bar Design</a>. Retrieved
                from CodePen.
            </li>
            <li>
                W3Schools. (n.d.).
                <a href="https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover">Dropdown Menu
                    Interaction</a>. Retrieved from W3Schools.
            </li>
            <li>
                W3Schools. (n.d.).
                <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">HTML Select Element
                    Example</a>. Retrieved from W3Schools.
            </li>
            <li>
                OpenAI. (n.d.).
                <a href="https://chat.openai.com/">Chat GPT Interface for Color and Typography Suggestions</a>.
                Retrieved from OpenAI.
            </li>
            <li>
                Morrison, C. (n.d.).
                <a href="https://codepen.io/cveg2112/pen/waPxXy">Interactive Arrow Design</a>. Retrieved from CodePen.
            </li>
            <li>
                Flaticon. (n.d.).
                <a href="https://cdn-icons-png.flaticon.com/512/20/20679.png">Uparrow Image Icon</a>. Retrieved from
                Flaticon.
            </li>
            <li>
                Comeau, J. W. (n.d.).
                <a href="https://www.joshwcomeau.com/animation/3d-button/">3D Button Animation Inspiration</a>.
                Retrieved from Josh W Comeau's Blog.
            </li>
            <li>
                Comeau, J. W. (n.d.).
                <a href="https://www.joshwcomeau.com/gradient-generator/">
                    All Linear Gradients Inspiration
                </a>
                . Retrieved from Josh W Comeau's Blog.
            </li>
            <li>
                Western Michigan University, (n.d.).
                <a
                    href="https://wmich.edu/psychology/directory/curiel-0#:~:text=and%20intellectual%20disabilities.-,Dr.,preference%20and%20reinforcer%20assessment%20procedures.">For
                    information on Dr. Curiel.</a>
                . Retreived from WMU's contact page.
            </li>
        </ul>
    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

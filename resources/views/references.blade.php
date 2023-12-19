<!doctype html>
<html lang="en">

<head>
    <title>References</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[8] “Free icons and stickers - millions of images to download,” Flaticon, https://www.flaticon.com/ (accessed Dec. 12, 2023).
    I imported a modified image to make relevant flaticons for the webpage.-->
    <link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png" />
    <link rel="manifest" href="../favicons/site.webmanifest" />
    <link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href=".,/favicons/favicon.ico" />
    <script src="https://kit.fontawesome.com/c1c8aa52a6.js" crossorigin="anonymous"></script>

    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="~/Repos/IWT/midterm/src/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    @vite(['resources/styles/mainStyle.css', 'resources/styles/references.css', 'resources/styles/navStyle.css'])
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

    <!-- references -->

    <main class="references">
        {{-- <div class='referencesContainer'> --}}
        <h1 class="referenceHeader">References List</h1>
        <ul>
            <li>
                [1] “Chatgpt,” ChatGPT, <a href="https://openai.com/chatgpt">https://openai.com/chatgpt</a>
                (accessed
                Dec. 12, 2023).
            </li>
            <li>
                [2] Codeium · Free AI Code Completion &amp; Chat, <a
                    href="https://codeium.com/">https://codeium.com/</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [3] JavaScript array methods, <a
                    href="https://www.w3schools.com/js/js_array_methods.asp">https://www.w3schools.com/js/js_array_methods.asp</a>
                (accessed Dec. 11, 2023).
            </li>
            <li>
                [4] MozDevNet, “Using FormData objects - web apis: MDN,” MDN Web Docs, <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects">
                    https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects</a>
                (accessed
                Dec. 11, 2023).
            </li>
            <li>
                [5] “Getting started,” Getting Started |&nbsp;Axios Docs, <a
                    href="https://axios-http.com/docs/intro">https://axios-http.com/docs/intro</a> (accessed Dec.
                11,
                2023).
            </li>
            <li>
                [6] Responsive navbar (HTML and CSS) - codepen, <a
                    href="https://codepen.io/sanketbodke/pen/LYyzzYb?anon=true&amp;view=pen">
                    https://codepen.io/sanketbodke/pen/LYyzzYb?anon=true&amp;view=pen</a> (accessed Dec. 12, 2023).
            </li>
            <li>
                [7] “W3Schools online HTML editor,” W3Schools Tryit Editor,
                <a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select">
                    https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select</a> (accessed Dec. 12, 2023).
            </li>
            <li>
                [8] “Free icons and stickers - millions of images to download,” Flaticon, <a
                    href="https://www.flaticon.com/">https://www.flaticon.com/</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS,
                <a
                    href="https://www.joshwcomeau.com/animation/3d-button/">https://www.joshwcomeau.com/animation/3d-button/</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [10] “CSS Gradient Generator,” CSS, <a
                    href="https://www.joshwcomeau.com/gradient-generator/">https://www.joshwcomeau.com/gradient-generator/</a>
                (accessed Dec. 12,
                2023).
            </li>
            <li>
                [11] “Hugo Curiel,” Western Michigan University, <a
                    href="https://wmich.edu/psychology/directory/curiel-0#:~:text=and%20intellectual%20disabilities.-,Dr.,preference%20and%20reinforcer%20assessment%20procedures.">https://wmich.edu/psychologydirectory/curiel-0#:~:text=and%20intellectual%20disabilities.-,Dr.,preference%20and%20reinforcer%20assessment%20procedures.</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [12] “The PHP framework for web artisans,” Laravel, <a
                    href="https://laravel.com/docs/10.x/routing#route-parameters">https://laravel.com/docs/10.x/routing#route-parameters</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [13] “File Storage,” Laravel, <a
                    href="https://laravel.com/docs/10.x/filesystem#automatic-streaming">https://laravel.com/docs/10.x/filesystem#automatic-streaming</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [14] “Delete A Directory,” Laravel, <a
                    href="https://laravel.com/docs/10.x/filesystem#delete-a-directory">https://laravel.com/docs/10.x/filesystem#delete-a-directory</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [15] “Get All Files Within A Directory,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory">https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [16] “Deleting An Existing Model By Its Primary Key,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/eloquent#deleting-an-existing-model-by-its-primary-key">https://laravel.com/docs/10.x/eloquent#deleting-an-existing-model-by-its-primary-key</a>
                (accessed Dec. 12,
                2023).
            </li>
            <li>
                [17] “Nested View Directories,” Laravel, <a
                    href="https://laravel.com/docs/10.x/views#nested-view-directories">https://laravel.com/docs/10.x/views#nested-view-directories</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [18] “Eager Loading Multiple Relationships,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships">https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships</a>
                (accessed Dec.
                12, 2023).
            </li>
            <li>
                [19] “Retrieving An Input Value,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/requests#retrieving-an-input-value">https://laravel.com/docs/10.x/requests#retrieving-an-input-value</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [20] “The create Method,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/eloquent-relationships#the-create-method">https://laravel.com/docs/10.x/eloquent-relationships#the-create-method</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [21] “Single Action Controllers,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/controllers#single-action-controllers">https://laravel.com/docs/10.x/controllers#single-action-controllers</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [22] “env(),” Laravel, <a
                    href="https://laravel.com/docs/10.x/helpers#method-env">https://laravel.com/docs/10.x/helpers#method-env</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [23] “Retrieving Input From The Query String,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/requests#retrieving-input-from-the-query-string">https://laravel.com/docs/10.x/requests#retrieving-input-from-the-query-string</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [24] “shuffle(),” Laravel, <a
                    href="https://laravel.com/docs/10.x/collections#method-shuffle">https://laravel.com/docs/10.x/collections#method-shuffle</a>
                (accessed Dec. 12,
                2023).
            </li>
            <li>
                [25] “Creating &amp; Rendering Views,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/views#creating-and-rendering-views">https://laravel.com/docs/10.x/views#creating-and-rendering-views</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [26] “Storing Files,” Laravel, <a
                    href="https://laravel.com/docs/10.x/filesystem#storing-files">https://laravel.com/docs/10.x/filesystem#storing-files</a>
                (accessed Dec. 12,
                2023).
            </li>
            <li>
                [27] “Get All Files Within A Directory,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory">https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory</a>
                (accessed Dec. 12, 2023).
            </li>
            <li>
                [28] “HTTP headers: Content-disposition,” GeeksforGeeks,
                <a
                    href="https://www.geeksforgeeks.org/http-headers-content-disposition/">https://www.geeksforgeeks.org/http-headers-content-disposition/</a>
                (accessed Dec. 13, 2023).
            </li>
            <li>
                [29] “Boot Method Dependency Injection,” Laravel,
                <a
                    href="https://laravel.com/docs/10.x/providers#boot-method-dependency-injection">https://laravel.com/docs/10.x/providers#boot-method-dependency-injection</a>
                (accessed Dec. 13, 2023).
            </li>
            <li>
                [30] Solomon Eseme, “Everything you need to know about Laravel caching,” Kinsta®,
                <a href="https://kinsta.com/blog/laravel-caching/">https://kinsta.com/blog/laravel-caching/</a>
                (accessed Dec. 14, 2023).
            </li>
            <li>
                [31] MozDevNet, ::“-webkit-scrollbar - CSS: Cascading style sheets: MDN,” MDN Web Docs,
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar">https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar</a>
                (accessed Dec. 14, 2023).
            </li>
            <li>
                [32]“Laravel and DomPDF: Generate Simple Invoice PDF with Images and CSS,” Laravel Daily.
                <a
                    href="https://laraveldaily.com/post/laravel-dompdf-generate-simple-invoice-pdf-with-images-css">https://laraveldaily.com/post/laravel-dompdf-generate-simple-invoice-pdf-with-images-css</a>
                (accessed Dec.
                17, 2023).

            </li>
            <li>
                [33]“Generate a UUID in JavaScript,” www.uuidgenerator.net.
                <a
                    href="https://www.uuidgenerator.net/dev-corner/javascript#:~:text=The%20JavaScript%20library%20we%20recommend">https://www.uuidgenerator.net/dev-corner/javascript#:~:text=The%20JavaScript%20library%20we%20recommend</a>
                (accessed Dec. 17, 2023).

            </li>
        </ul>
        {{-- </div> --}}

    </main>
    <footer class="footer">&copy; Something Copyright</footer>
</body>

</html>

# SAFMEDS

## About SAFMEDS

SAFMEDS is a humble flashcard application.
Its use is intended for research and general knowledge building. 

It was initially built with HTML 5, CSS, JavaScript, and Php. 
It was ported over to the Laravel framework for server-side rendering and other capabilities.

I learned routing inside [Laravel](https://laravel.com/docs/10.x/routing#route-parameters), semantic structuring of elements in [HTML 5](https://www.w3schools.com/html/html5_semantic_elements.asp), the inline-block layout in [CSS](https://www.w3schools.com/css/css_inline-block.asp), useful array methods in [Javascript](https://www.w3schools.com/js/js_array_methods.asp), and much more.


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation-local)
- [Usage](#usage)
- [Bugs](#bugs)
- [Credits](#credits)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
- You need to have a webserver installed. Either [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) or [Apache2](https://httpd.apache.org/).
- You need [php](https://www.php.net/manual/en/install.php).
- You need the latest version of [NodeJs](https://nodejs.org/en).
- This project uses Vite and Vite Mix to compile the frontend assets. You will need either [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).
- You need a database. I recommend either [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) or [MariaDB](https://www.tutorialspoint.com/mariadb/mariadb_installation.htm).
- You also need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Installation (Local)
If you wish to download SAFMEDS locally, follow the below steps only after installing the above prerequisites.
This will ONLY cover local development and not configuration for either the Nginx or Apache2 servers. I included them if you wish to continue on your own.
1. Create a repositories directory.
```bash
mkdir <repositories/directory> | cd <repositories/directory>
```

2. Clone this repository.
   For https:
   ```bash
   git clone https://github.com/RyanLilleyman/supreme-journey.git
   ```
   For ssh:
   ```bash
   git clone git@github.com:RyanLilleyman/supreme-journey.git
   ```

3. Set up your database.
   For [MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/), follow this tutorial and note down database credentials.
   For [MariaDB](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/), follow the provided tutorials and again note down your database credentials.

4. Run the following command.
   ```bash
   cp .env.example .env
   ```
5. Install dependecies
   First,
   ```bash
   composer install
   ```
   Then,
   ```bash
   npm install
   ```
6. Create the base key for your project.
   ```bash
   php artisan key:generate
   ```
7. Ensure the database credentials you noted down earlier inside the .env file.

8. Migrate to the database.
   ```bash
   php artisan migrate --force
   ```
9. (Optional) Run seeders
   ```bash
   php artisan db:seed --force
   ```
10. (Optional) You may need to check file permissions and ownership for Nginx or Apache2.
    Both the storage and bootstrap/cache need specific permissions for Laravel to bootstrap.
    For documentation, [chmod](https://en.wikipedia.org/wiki/Chmod) and [chown](https://www.geeksforgeeks.org/chown-command-in-linux-with-examples/).
    As an example of setting ownership,
    ```bash
    sudo chown -R <relevant-group>:<relevant-group> storage bootstrap/cache
    ```
    As an example of setting permissions
    ```bash
    sudo chmod -R 775 storage bootstrap/cache
    ```
    You may need to set permissions for .env.
    ```bash
    chmod 600 .env
    ```

## Usage
1. For optimizing the php development server,
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
2. Create a symbolic link between storage/public and storage/app/public
   ```bash
   php artisan storage:link
   ```
3. Run the development server.
   ```bash
   ./start.sh
   ```

## Future Features/ Bugs
- I have yet to finish 
## Credits
- [1] “Chatgpt,” ChatGPT, https://openai.com/chatgpt (accessed Dec. 12, 2023).
- [2] Codeium · Free AI Code Completion & Chat, https://codeium.com/ (accessed Dec. 12, 2023).
- [3] JavaScript array methods, https://www.w3schools.com/js/js_array_methods.asp (accessed Dec. 11, 2023).
- [4] MozDevNet, “Using FormData objects - web apis: MDN,” MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects (accessed Dec. 11, 2023).
- [5] “Getting started,” Getting Started | Axios Docs, https://axios-http.com/docs/intro (accessed Dec. 11, 2023).
- [6] Responsive navbar (HTML and CSS) - codepen, https://codepen.io/sanketbodke/pen/LYyzzYb?anon=true&view=pen (accessed Dec. 12, 2023).
- [7] “W3Schools online HTML editor,” W3Schools Tryit Editor, https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select (accessed Dec. 12, 2023).
- [8] “Free icons and stickers - millions of images to download,” Flaticon, https://www.flaticon.com/ (accessed Dec. 12, 2023).
- [9] “Building a magical 3D button,” Building a Magical 3D button with HTML and CSS, https://www.joshwcomeau.com/animation/3d-button/ (accessed Dec. 12, 2023).
- [10] “CSS Gradient Generator,” CSS, https://www.joshwcomeau.com/gradient-generator/ (accessed Dec. 12, 2023).
- [11] “Hugo Curiel,” Western Michigan University, https://wmich.edu/psychologydirectory/curiel-0#:~:text=and%20intellectual%20disabilities.-,Dr.,preference%20and%20reinforcer%20assessment%20procedures. (accessed Dec. 12, 2023).
- [12] “The PHP framework for web artisans,” Laravel, https://laravel.com/docs/10.x/routing#route-parameters (accessed Dec. 12, 2023).
- [13] “File Storage,” Laravel, https://laravel.com/docs/10.x/filesystem#automatic-streaming (accessed Dec. 12, 2023).
- [14] “Delete A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#delete-a-directory (accessed Dec. 12, 2023).
- [15] “Get All Files Within A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory (accessed Dec. 12, 2023).
- [16] “Deleting An Existing Model By Its Primary Key,” Laravel, https://laravel.com/docs/10.x/eloquent#deleting-an-existing-model-by-its-primary-key (accessed Dec. 12, 2023).
- [17] “Nested View Directories,” Laravel, https://laravel.com/docs/10.x/views#nested-view-directories (accessed Dec. 12, 2023).
- [18] “Eager Loading Multiple Relationships,” Laravel, https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships (accessed Dec. 12, 2023).
- [19] “Retrieving An Input Value,” Laravel, https://laravel.com/docs/10.x/requests#retrieving-an-input-value (accessed Dec. 12, 2023).
- [20] “The create Method,” Laravel, https://laravel.com/docs/10.x/eloquent-relationships#the-create-method (accessed Dec. 12, 2023).
- [21] “Single Action Controllers,” Laravel, https://laravel.com/docs/10.x/controllers#single-action-controllers (accessed Dec. 12, 2023).
- [22] “env(),” Laravel, https://laravel.com/docs/10.x/helpers#method-env (accessed Dec. 12, 2023).
- [23] “Retrieving Input From The Query String,” Laravel, https://laravel.com/docs/10.x/requests#retrieving-input-from-the-query-string (accessed Dec. 12, 2023).
- [24] “shuffle(),” Laravel, https://laravel.com/docs/10.x/collections#method-shuffle (accessed Dec. 12, 2023).
- [25] “Creating & Rendering Views,” Laravel, https://laravel.com/docs/10.x/views#creating-and-rendering-views (accessed Dec. 12, 2023).
- [26] “Storing Files,” Laravel, https://laravel.com/docs/10.x/filesystem#storing-files (accessed Dec. 12, 2023).
- [27] “Get All Files Within A Directory,” Laravel, https://laravel.com/docs/10.x/filesystem#get-all-files-within-a-directory (accessed Dec. 12, 2023).
- [28] “HTTP headers: Content-disposition,” GeeksforGeeks, https://www.geeksforgeeks.org/http-headers-content-disposition/ (accessed Dec. 13, 2023).
- [29] “Boot Method Dependency Injection,” Laravel, https://laravel.com/docs/10.x/providers#boot-method-dependency-injection (accessed Dec. 13, 2023).
- [30] Solomon Eseme, “Everything you need to know about Laravel caching,” Kinsta®, https://kinsta.com/blog/laravel-caching/ (accessed Dec. 14, 2023).
- [31] MozDevNet, ::“-webkit-scrollbar - CSS: Cascading style sheets: MDN,” MDN Web Docs,
https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar (accessed Dec. 14, 2023).

## Contributing
Email me @ LilleymanRyan2020@gmail.com

## License

SAFMEDS is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

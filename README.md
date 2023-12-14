# SAFMEDS

## About SAFMEDS

SAFMEDS is a humble flashcard application.
Its use is intended for research and general knowledge building. 

It was initially built with HTML 5, CSS, JavaScript, and Php. 
It was ported over to the Laravel framework for server-side rendering and other capabilities.

I learned routing inside [Laravel](https://laravel.com/docs/10.x/routing#route-parameters), semantic structuring of elements in [HTML 5](https://www.w3schools.com/html/html5_semantic_elements.asp), the inline-block layout in [CSS](https://www.w3schools.com/css/css_inline-block.asp), useful array methods in [Javascript](https://www.w3schools.com/js/js_array_methods.asp), and much more.


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Bugs](#bugs)
- [Credits](#credits)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites ( You need these installed for Laravel to work. )
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
3. 
## Credits

## Contributing


## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

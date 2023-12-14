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
5. Create the base key for your project.
   ```bash
   php artisan key:generate
   ```
6. Ensure the database credentials you noted down earlier insdie the .env file.
7. Install dependecies
   First,
   ```bash
   composer install
   ```
   Then,
   ```bash
   npm install
   ```
8. Migrate to the database.
   ```bash
   php artisan migrate --force
   ```
9. (Optional) Run seeders
   ```bash
   php artisan db:seed --force
   ```

## Usage
## Credits

## Contributing


## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

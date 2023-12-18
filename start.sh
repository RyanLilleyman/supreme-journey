#!/bin/bash

# Clear existing caches
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear

# Build and cache new configurations
php artisan route:cache
php artisan config:cache
php artisan view:cache

# composer install

npm run build
trap 'kill $(jobs -p)' SIGINT
npm run dev &

sleep 3

php artisan serve



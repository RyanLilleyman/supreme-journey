#!/bin/bash

npm run build
php artisan route:cache
php artisan config:cache
php artisan view:cache
npm run dev &
sleep 5
php artisan serve


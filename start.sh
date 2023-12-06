#!/bin/bash

npm run build
npm run dev &
sleep 5
php artisan serve

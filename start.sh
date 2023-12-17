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

# Install Composer dependencies (if needed)
composer install

npm run build
npm run dev &

sleep 5

php artisan serve


# sleep 10 # Wait for server to start
# curl -f http://localhost:8000/ || (echo "Server failed to start" && exit 1)
echo "Development environment setup complete."


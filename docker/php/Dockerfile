FROM php:8.2-apache

# Устанавливаем необходимые зависимости для расширения MongoDB
RUN apt-get update && \
    apt-get install -y \
    libssl-dev \
    pkg-config

# Устанавливаем расширение MongoDB
RUN pecl install mongodb && \
    docker-php-ext-enable mongodb

# Устанавливаем права на директорию приложения
RUN chown -R www-data:www-data /var/www/html

# Устанавливаем рабочую директорию
WORKDIR /var/www/html
# nodehill-home-page
 2023 home page 

### This branch uses php and mongo db

How to go live:
* Your server must have nginx, php-fpm, mongodb and php with the mongodb driver installed.
* Clone the respository into */var/www* and make sure to check out the php-and-mongodb branch!
* After initial cloning and after each git pull:
  * npm install
  * npm run build
  * cp backend.php dist/
  * mongorestore --drop dump

Explanation of the last two commands:
* make a copy of **backend.php** into **dist**
* restore the database from the database dump in the dump folder (and drop the old data if the db already exists).

In your nginx setup serve the dist folder on one your domains (replace *thomas.nodehill.com* with your domain):

```
server {
  listen 443 ssl http2;
  ssl_certificate /etc/letsencrypt/live/nodehill.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/nodehill.com/privkey.pem;

  server_name thomas.nodehill.com;
  root /var/www/nodehill-home-page/dist;

  index index.html index.htm index.php;

  # important for hard reload of frontend based routes
  error_page 404 =200 /index.html;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

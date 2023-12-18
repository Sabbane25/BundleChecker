#!/bin/bash

# Install mysql
sudo apt-get update
sudo apt-get install mysql-server -y && clear;

# start mysql server
sudo service mysql start && clear;

# import sql
mysql -u root < sql-export.sql

# create user
mysql -u root -e "CREATE USER 'tim'@'localhost' IDENTIFIED BY '201922255';"
mysql -u root -e "GRANT ALL PRIVILEGES ON BundleChecker.* TO 'tim'@'localhost' WITH GRANT OPTION;"
mysql -u root -e "FLUSH PRIVILEGES;"

clear && echo "Database created and initialized."

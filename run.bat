@echo off
start cmd.exe @cmd /k "php -S localhost:8080 index.php"
start "" http://localhost:8080
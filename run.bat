@echo off
netstat -o -n -a | @findstr 8080 | @findstr LISTENING
if %ERRORLEVEL% equ 0 (@echo "Port 8080 is taken") else (@start cmd.exe @cmd /k "php -S localhost:8080 .")
start "" http://localhost:8080/
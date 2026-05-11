@echo off
echo Iniciando el Ecommerce de Zapatillas...

echo Iniciando el backend...
cd /d "%~dp0sneakers-ecommerce-backend"
start "Backend" cmd /k "npm install && npm run dev"

echo Iniciando el frontend...
cd /d "%~dp0sneakers-ecommerce-frontend"
start "Frontend" cmd /k "npm install && npm start"

echo Servicios iniciados correctamente en nuevas ventanas.
pause

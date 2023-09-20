ionic start sqlApp blank --type angular
cd ./sqlApp

npm i @capacitor/splash-screen
npm i @capacitor-community/sqlite
ionic g service services/database

ionic build
ionic cap add ios
ionic cap add android
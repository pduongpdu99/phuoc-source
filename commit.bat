@echo off
cls
set /p describe="Enter your describe this commit: "
git reset & git add . & git commit -m "%describe%" & git push & git push heroku main

@REM restart program
npm run start
# FbTestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Requirements
  * Nodejs
  * AngularCLI
  * [Supervisor](https://www.npmjs.com/package/supervisor)

## Installation

Pull this repository and run `npm install`. After it's finished run `npm run start` and app will start on `htpp://localhost:4200`.

## NPM scripts

`watch-api`: Compiles typescript inside `api` folder and moves it to `dist/api`. Also watches for any changes. `tsc -w -p api`

`serve-api`: Runs API server with supervisor `supervisor ./dist/api/app`.

`serve-app`: Runs Angular app with `ng serve`.

`start`: Runs all above scripts in parallel `concurrently --kill-others --names \"NG APP,API-W,API\" \"npm run serve-app\" \"npm run watch-api\" \"npm run serve-api\"`

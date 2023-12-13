# BundleChecker

## Server

Es müssen alle Dateien, bis auf `node_modules` und `backend` in `~/frontend` kopiert werden`

### Frontend-Server im Hintergrund starten

```shell
forever start ~/frontend/node_modules/@angular/cli/bin/ng.js serve --host 192.168.198.48
```

### Frontend im Hintergrund NEU starten
```shell
forever restart ~/frontend/node_modules/@angular/cli/bin/ng.js serve --host 192.168.198.48
```

### Frontend im Hintergrund stoppen
```shell
forever list
```

Wähle die ID des Prozesses aus, wo in grau der Pfad mit `@angular` steht.
![](./docs/img.png)

```shell
forever stop 1
```

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

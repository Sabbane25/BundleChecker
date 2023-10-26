Der Ordner muss auf den Server kopiert werden.
Anschließend muss `npm install` in diesem Ordner, auf dem Server, ausgeführt werden.
Danach kann mit `npm run backend` der Server **manuell** gestartet werden oder im Hintergrund automatisch gestartet werden:

## Im Hintergrund starten

### Ersteinrichtung

```shell
npm install forever -g
```

### App im Hintergrund starten
```shell
forever start ~/backend-server/index.js
```

### App im Hintergrund NEU starten
```shell
forever restart ~/backend-server/index.js
```

### App im Hintergrund stoppen
```shell
forever stop ~/backend-server/index.js
```

### Hintergrund Apps auflisten

```shell
forever list
```

In der Datei [nutzer.service.ts](../src/services/nutzer.service.ts) muss unter `apiURL` die IP-Adresse des Servers hinterlegt sein.

## Routen hinzufügen

Um Routen hinzuzufügen, muss eine Datei im Ordner `routes` angelegt werden und anschließend in der `index.js` ergänzt werden.

```js
require('./routes/auth.routes')(app);
```

Eine Route sollte auf einen Controller in `controllers` verweisen.

Wenn Daten abgerufen oder in die Datenbank hinzugefügt werden sollten, sollte ein Model in `models` angelegt werden: https://sequelize.org/docs/v6/core-concepts/model-instances/
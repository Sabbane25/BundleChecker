# Backend Server

Führe lokal folgenden Befehl aus:

```shell
npm run init
npm run build
```

Mit diesem Befehl wird das Projekt gebaut und in den Ordner `backend/dist` kopiert.

Kopiere anschließend den Ordner `backend` auf den Server in das Verzeichnis `~/backend`.

## Projekt auf Server starten

## Im Hintergrund starten (empfohlen)

Alle Befehle werden im Ordner `~/backend` ausgeführt.

### App im Hintergrund starten

Der Befehl `npm run bg:start` startet die App im Hintergrund. Die Shell kann geschlossen werden, ohne dass die App beendet wird.

```shell
npm run bg:start
```

### App im Hintergrund NEU starten

Der Befehl `npm run bg:restart` startet die App im Hintergrund neu und ist erforderlich, wenn Änderungen auf dem Server
veröffentlicht wurden. Die Shell kann geschlossen werden, ohne dass die App beendet wird.

```shell
npm run bg:restart
```

### App im Hintergrund stoppen

Der Befehl `npm run bg:stop` stoppt die App im Hintergrund.

```shell
npm run bg:stop
```

### Hintergrund Apps auflisten

Der Befehl `npm run bg:status` listet alle Apps auf, die im Hintergrund laufen.

```shell
npm run bg:status
```

### Manuell starten

Mit dem Befehl `npm run backend` wird der Server **manuell** gestartet. Wird die Shell geschlossen, wird die App ebenfalls beendet.

## Routen hinzufügen

Um Routen hinzuzufügen, muss eine Datei im Ordner `routes` angelegt werden und anschließend in der `index.js` ergänzt werden.

```js
require('./routes/auth.routes')(app);
```

Eine Route sollte auf einen Controller in `controllers` verweisen.

Wenn Daten abgerufen oder in die Datenbank hinzugefügt werden sollten, sollte ein Model in `models` angelegt werden: https://sequelize.org/docs/v6/core-concepts/model-instances/

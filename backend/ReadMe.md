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
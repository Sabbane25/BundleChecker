# BundleChecker

## Projekt initialisieren

Führe folgende Befehle im Projektverzeichnis aus.

### Datenbank installieren und initialisieren

Mit folgendem Befehl wird die Datenbank als Service installiert und mit einem entsprechenden Nutzer und den passenden Rechten initialisiert.

```shell
./database.sh
```

### Projekt installieren

Führe folgenden Befehl aus, um die benötigten Pakete zu installieren.

```shell
./install.sh
```

### Projekt starten

Hier ist eine Übersicht mit Befehlen, um das Projekt für die Entwicklung oder für den Server zu starten.

#### In Entwicklungsumgebung starten

##### SSH-Verbindung zum Server

Damit der Backend-Server lokal genutzt werden kann, muss folgender Befehl zuerst genutzt werden.
Das Terminal-Fenster ___MUSS___ im Hintergrund geöffnet bleiben.

```shell
npm run ssh
```

Anschließend muss das SSH-Passwort eingegeben werden: <code>0EcKRCYYxZ</code>

##### Backend-Server starten

Startet in einem neuen Terminal-Fenster den lokalen Backend-Server.

```shell
npm run backend
```

##### Frontend

Bearbeite folgende Datei [api.config.ts](./src/config/api.config.ts) und setze die Variabel `lokal_backend` auf `true`, da sonst alle Anfragen
an den Hauptserver geschickt werden und nicht an das lokale Backend.

Startet in einem neuen Terminal-Fenster den lokalen Frontend-Server. Der Befehl macht dasselbe wie `ng serve`.
```shell
npm run frontend
```

#### Auf Server starten

Lies die Anleitung im Backend-Ordner: [backend/ReadMe.md](./backend/ReadMe.md)

---

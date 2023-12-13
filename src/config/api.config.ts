/**
 * Den Wert auf `true` setzen, damit das lokale Backend verwendet wird und nicht der vom Server
 *
 * @autor Mokhtar Yosofzay
 */
const lokal_backend = false;

/*
Verwende mit:

```
const apiConfig = require("../config/api.config.js");

const url = `http://${apiConfig.HOST}:3000/api`;
```

 */
export const apiConfig = {
    HOST: lokal_backend ? '127.0.0.1' : '192.168.198.48',
};

/**
 * Den Wert auf `true` setzen, damit das lokale Backend verwendet wird und nicht der vom Server
 *
 * @autor Mokhtar Yosofzay
 */
const lokal_backend = true;

/*
Verwende mit:

```
const { apiConfig } = require("../config/api.config.ts");

const url = `http://${apiConfig.URL}/api`;
```

 */
export const apiConfig = {
    HOST: lokal_backend ? 'localhost' : '192.168.198.48',
    PORT: 3000,
    URL: (lokal_backend ? 'localhost' : '192.168.198.48') + ':3000',
};

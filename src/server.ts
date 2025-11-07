// server.ts

// ✅ Solo cargar Zone.js en Node.js (SSR)
if (typeof process !== 'undefined' && process.release?.name === 'node') {
  await import('zone.js');
}

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Ruta al build del navegador
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Ejemplo de API endpoints, opcional
 * app.get('/api/hello', (req, res) => {
 *   res.json({ message: 'Hello from server!' });
 * });
 */

/**
 * Servir archivos estáticos desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Manejar todas las demás rutas con Angular SSR
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Arrancar el servidor si es el módulo principal o se corre con PM2
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler usado por Angular CLI o Firebase Cloud Functions
 */
export const reqHandler = createNodeRequestHandler(app);

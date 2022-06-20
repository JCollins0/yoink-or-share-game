//Install express server
import express from 'express';
const app = express();
import userRouter from './controllers/users.js';
import permissionsRouter from './controllers/permissions.js';
import { fileURLToPath, URL } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createChatNamespace } from './sockets/sockets.js';

const localized = true;
const IS_PROD = process.env.PORT ? true : false;
if (!IS_PROD) {
  import('cors')
    .then((cors_module) => {
      app.use(cors_module.default());
      loadRoutes();
    })
    .catch((err) => console.log(err));
} else {
  loadRoutes();
}

function loadRoutes() {
  app.use(express.json());
  // Serve only the static files form the dist directory
  app.use(express.static(fileURLToPath(new URL('../dist/yoink-or-share', import.meta.url))));

  app.use('/api/user', userRouter);
  app.use('/api/permissions', permissionsRouter);
  app.get('/*', function (req, res) {
    const pathToFiles = ['../dist/yoink-or-share/'];
    if (localized) {
      const supportedLocales = ['en', 'es'];
      const defaultLocale = 'en';
      const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);

      // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
      const locale = matches && supportedLocales.indexOf(matches[1]) !== -1 ? matches[1] : defaultLocale;
      pathToFiles.push(`${locale}/`);
    }
    pathToFiles.push('index.html');
    const finalFilesPath = pathToFiles.reduce((prev, curr) => prev + curr);
    res.sendFile(fileURLToPath(new URL(finalFilesPath, import.meta.url)));
  });

  const httpServer = createServer(app);
  // websockets
  const io = new Server(httpServer, {
    serveClient: false,
    cors: {
      origin: ['http://localhost:4200', 'http://localhost:8080'],
    },
  });

  createChatNamespace(io);

  io.of(/^\/game-[0-9a-zA-Z]{4}$/).on('connection', (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });

  //io.listen(process.env.WEBSOCKET_PORT || 3000);

  // Start the app by listening on the default Heroku port
  httpServer.listen(process.env.PORT || 8080);
  console.log('App is up and running');
}

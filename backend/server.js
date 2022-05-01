//Install express server
import express from 'express';
const app = express();
import userRouter from './controllers/users.js';
import { fileURLToPath, URL } from 'url';
import { createServer } from "http";
import { Server } from "socket.io";
import { createChatNamespace } from './sockets/sockets.js';

const IS_PROD = process.env.PORT ? true : false;
if (!IS_PROD) {
    import('cors')
        .then( (cors_module) => {
            app.use(cors_module.default());
            loadRoutes();
        })
        .catch( err => console.log(err));
}else{
    loadRoutes();
}


function loadRoutes() {
    app.use(express.json());
    // Serve only the static files form the dist directory
    app.use(
        express.static(
            fileURLToPath(new URL('../dist/yoink-or-share', import.meta.url))
        )
    );

    app.use('/api/user', userRouter);

    app.get('/*', function (req, res) {
        res.sendFile(fileURLToPath(new URL('../dist/yoink-or-share/index.html', import.meta.url)));
    });


    const httpServer = createServer(app);
    // websockets 
    const io = new Server(httpServer,{
        
        serveClient: false,
        cors: {
            origin: ["http://localhost:4200", "http://localhost:8080"]
        }
    });

    createChatNamespace(io);

    io.of(/^\/game-[0-9a-zA-Z]{4}$/).on("connection", (socket) => {
        console.log(`connect ${socket.id}`);

        socket.on("disconnect", (reason) => {
            console.log(`disconnect ${socket.id} due to ${reason}`);
        });
    });

    //io.listen(process.env.WEBSOCKET_PORT || 3000);


    // Start the app by listening on the default Heroku port
    httpServer.listen(process.env.PORT || 8080);
    console.log("App is up and running")
}
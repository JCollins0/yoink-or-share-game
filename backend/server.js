//Install express server
import express from 'express';
const app = express();
import userRouter from './controllers/users.js';
import cors from 'cors';
import { fileURLToPath, URL } from 'url';

const IS_PROD = process.env.PORT ? true : false;
if (!IS_PROD) {

    app.use(cors());
}
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

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("App is up and running")
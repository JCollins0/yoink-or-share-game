//Install express server
import express from 'express';
const app = express();
import userRouter from './controllers/users.js';
import { fileURLToPath, URL } from 'url';

const IS_PROD = process.env.PORT ? true : false;
if (!IS_PROD) {
    import('cors')
        .then( (cors_module) => app.use(cors_module.default()))
        .catch( err => console.log(err));
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
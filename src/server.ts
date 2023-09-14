import * as express from 'express';
import { getEnvironmentVariables } from './environments/env';
import * as mongoose from 'mongoose';
import UserRouter from './routers/UserRouter';
import bodyParser = require('body-parser');

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.error400Handler();
        this.handleErrors();
    }
    
    setConfiguration() {
        this.connectMongoDB();
        this.configureBodyParser();
    }

    connectMongoDB() {
        const db_url = getEnvironmentVariables().db_url;
        mongoose.connect(db_url)
        .then(() => {
            console.log('MongoDB Connection Successful');
        }).catch(err => {
            console.log('MongoDB Connection Failed', err);
        })
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }

    error400Handler() {
        this.app.use((req, res) => {
            res.status(404).send({
                message: 'Not Found',
                status_code: 404
            });
        })
    }

    handleErrors() {
        this.app.use((err, req, res, next) => {
            const status_code = req.status_code || 500;
            res.status(status_code).json({
                message: err.message || 'Something Went Wrong, Please Try Again.',
                status_code
            })
        })
    }
}
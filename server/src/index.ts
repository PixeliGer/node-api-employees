import express, { Application } from 'express';

import morgan from 'morgan';
import cors from 'cors';

// Import routes
import employeeRoutes from './routes/employee-routes';

class Server {
    // Application declaration
    public app: Application;

    constructor() {
        // App initialize
        this.app = express();
        // Run application configuration
        this.config();
        // Run application routes
        this.routes();
    }

    config(): void {
        // Set port from environment if exists else set to 3000
        this.app.set('port', process.env.PORT || 3000);
        // Use morgan for log requests
        this.app.use(morgan('dev'));
        // Use cors for enable cross-origin requests
        this.app.use(cors());
        // Use json for application
        this.app.use(express.json());
    }

    routes(): void {
        // Application routes
        this.app.use('/', employeeRoutes);

    }

    start(): void {
        // Server start
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
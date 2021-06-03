import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager;

    public constructor() {
        this.connectionManager = getConnectionManager();
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME: string = `default`;

        let connection: Connection;

        if (this.connectionManager.has(CONNECTION_NAME)) {
            console.info(`[Database]: using existing connection.`);
            connection = await this.connectionManager.get(CONNECTION_NAME);

            if (!connection.isConnected) {
                connection = await connection.connect();
            }
        } else {
            console.info(`[Database]: creating new connection.`);

            let connectionOptions: ConnectionOptions;
            if (!process.env.DB_CONFIG) {
                throw new ReferenceError('Environment Variable DB_CONFIG is not defined.');
            }

            if (process.env.DB_CONFIG === 'LOCAL') {
                console.info(`[Database]: using DB config for LOCAL environment.`);
                connectionOptions = {
                    database: 'dale',
                    entities: [
                        __dirname + '/entities/*.*'
                    ],
                    host: 'localhost',
                    logging: true,
                    name: `default`,
                    namingStrategy: new SnakeNamingStrategy(),
                    password: 'augusto',
                    port: 3306,
                    type: `mysql`,
                    username: 'augusto'
                };
            } else if (process.env.DB_CONFIG === 'AWS') {
                console.info(`[Database]: using DB config for AWS environment.`);
                connectionOptions = {
                    database: 'dale',
                    entities: [
                        __dirname + '/entities/*.*'
                    ],
                    namingStrategy: new SnakeNamingStrategy(),
                    region: 'us-east-1',
                    resourceArn: 'arn:aws:rds:us-east-1:292052096336:cluster:dale-test-database',
                    secretArn: ' arn:aws:secretsmanager:us-east-1:292052096336:secret:dev/dale-AuQZ1s',
                    type: 'aurora-data-api'
                };
            } else {
                throw new ReferenceError('Environment Variable DB_CONFIG doesnt contain any of the two valid options (LOCAL, AWS).');
            }

            // Don't need a pwd locally
            // if (process.env.DB_PASSWORD) {
            //     Object.assign(connectionOptions, {
            //         password: process.env.DB_PASSWORD
            //     })
            // }

            connection = await createConnection(connectionOptions);
        }

        return connection;
    }
}

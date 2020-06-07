import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager

    constructor() {
        this.connectionManager = getConnectionManager()
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = `default`

        let connection: Connection

        if (this.connectionManager.has(CONNECTION_NAME)) {
            console.info(`Database.getConnection()-using existing connection ...`)
            connection = await this.connectionManager.get(CONNECTION_NAME)

            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        } else {
            console.info(`Database.getConnection()-creating connection ...`)

            // const connectionOptions: ConnectionOptions = {
            //     name: `default`,
            //     type: `mysql`,
            //     port: 3306,
            //     logging: true,
            //     host: 'localhost',
            //     username: 'elumen',
            //     database: 'dale',
            //     password: 'elumen',
            //     namingStrategy: new SnakeNamingStrategy(),
            //     entities: [
            //         __dirname + "/entities/*.*"
            //     ]
            // }

            const connectionOptions: ConnectionOptions = {
                type: 'aurora-data-api',
                database: 'dale',
                secretArn: 'arn:aws:secretsmanager:us-east-1:292052096336:secret:rds-db-credentials/cluster-Y7OFC5JYNXVPIKRRQD53NLVGVY/admin-qpdIjX',
                resourceArn: 'arn:aws:rds:us-east-1:292052096336:cluster:date-test-database',
                region: 'us-east-1',
                namingStrategy: new SnakeNamingStrategy(),
                entities: [
                    __dirname + "/entities/*.*"
                ]
            }

            // Don't need a pwd locally
            // if (process.env.DB_PASSWORD) {
            //     Object.assign(connectionOptions, {
            //         password: process.env.DB_PASSWORD
            //     })
            // }

            connection = await createConnection(connectionOptions)
        }

        return connection
    }
}

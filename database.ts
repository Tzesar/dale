import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'

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
        }
        else {
            console.info(`Database.getConnection()-creating connection ...`)

            const connectionOptions: ConnectionOptions = {
                name: `default`,
                type: `mysql`,
                port: 3306,
                synchronize: true,
                logging: true,
                host: 'localhost',
                username: 'elumen',
                database: 'dale',
                password: 'elumen',
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

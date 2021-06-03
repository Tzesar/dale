import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import { Connection } from 'typeorm';
import { Database } from './database';
import { IncomingEvent } from './entities/user.entity';

const database: Database = new Database();

export const hello: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
    _context.callbackWaitsForEmptyEventLoop = false;

    const dbConn: Connection = await database.getConnection();

    const users: IncomingEvent[] = await dbConn.getRepository(IncomingEvent).find();

    const IDENTATION_SPACES_RETURNED_JSON: number = 2;
    return {
        body: JSON.stringify(
            {
                message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
                users,
            },
            undefined,
            IDENTATION_SPACES_RETURNED_JSON
        ),
        statusCode: 200,
    };
};

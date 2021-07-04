import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Connection, Repository } from 'typeorm';
import { Database } from '../database';
import { IncomingEvent } from '../entities/incoming-event.entity';

const database: Database = new Database();

export const store: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent, _context: Context
): Promise<APIGatewayProxyResult> => {
    _context.callbackWaitsForEmptyEventLoop = false;

    const dbConn: Connection = await database.getConnection();

    let newIncomingEventRequest: NewIncomingEventRequest = new NewIncomingEventRequest();
    if (typeof event.body === 'string') {
        newIncomingEventRequest = JSON.parse(event.body);
    }

    const incomingEventRepository: Repository<IncomingEvent> = await dbConn.getRepository(IncomingEvent);
    const newIncomingEvent: IncomingEvent = incomingEventRepository.create({rawContent: newIncomingEventRequest.rawContent});
    const persistedIncomingEvent: IncomingEvent = await incomingEventRepository.save(newIncomingEvent);

    const IDENTATION_SPACES_RETURNED_JSON: number = 2;
    return {
        body: JSON.stringify(
            {
                persistedEvent: persistedIncomingEvent,
                status: 200,
            },
            undefined,
            IDENTATION_SPACES_RETURNED_JSON
        ),
        statusCode: 200,
    };
};

export const get: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent, _context: Context
): Promise<APIGatewayProxyResult> => {
    _context.callbackWaitsForEmptyEventLoop = false;

    const dbConn: Connection = await database.getConnection();

    const incomingEvents: IncomingEvent[] = await dbConn.getRepository(IncomingEvent).find();

    const INDENTATION_SPACES_RETURNED_JSON: number = 2;
    return {
        body: JSON.stringify(
            {
                incomingEvents,
                message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            },
            undefined,
            INDENTATION_SPACES_RETURNED_JSON
        ),
        statusCode: 200,
    };
};

export class NewIncomingEventRequest {

    public rawContent: string = '';

}

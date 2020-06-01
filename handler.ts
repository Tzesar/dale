import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Database } from './database';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';

export const hello: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
  _context.callbackWaitsForEmptyEventLoop = false;

  const database: Database = new Database();

  let dbConn: Connection = await database.getConnection();

  const users: User[] = await dbConn.getRepository(User).find();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    }, null, 2),
    users: users,
  };
}

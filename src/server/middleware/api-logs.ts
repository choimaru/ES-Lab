import type { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, _res: ServerResponse, next: any) => {
  // console.log('server/middleware/api-logs.ts');
  // console.log(`${new Date().toLocaleString()}:`, req.method);
  // console.log(`${new Date().toLocaleString()}:`, req.toString());
  // console.log('-----------------------------');
};

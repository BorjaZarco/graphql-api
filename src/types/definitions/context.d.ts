import { Request, Response } from 'express';
import { User } from '../../graphql/user/dtos/user.dto';

export interface IContext {
  req: Request;
  res: Response;
  connection: ExecutionParams;
  requestUser?: User;
}

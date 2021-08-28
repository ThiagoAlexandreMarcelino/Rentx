import { Request, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authhHeader = request.headers.authorization;

  if (!authhHeader) {
    throw new AppError("Token Missing", 401);
  }

  const [, token] = authhHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "blablabla") as IPayload;

    //    console.log(sub);

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    next();
  } catch (error) {
    throw new AppError("invalid Token", 401);
  }
}

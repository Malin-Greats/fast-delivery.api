import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(req: Request, response: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
  
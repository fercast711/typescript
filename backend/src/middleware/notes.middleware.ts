import { NextFunction, Request, Response } from "express";
import createHttpError, {isHttpError} from "http-errors";

export const notFound = (req: Request, res: Response, next: NextFunction)=>{
    next(createHttpError(404,"Endpoint not found"));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getError = (error: { message: string; }, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let message = "An error occurred";
    let statusCode = 500;
    if (isHttpError(error)){
        statusCode = error.status;
        message = error.message;
    }
    res.status(statusCode).json({message});
};
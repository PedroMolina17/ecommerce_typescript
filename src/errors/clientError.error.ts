import { ERROR } from "../constants/errorName.constants";
import CustomError from "./customError.error";

export default class ClientError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = ERROR.CLIENT_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}
